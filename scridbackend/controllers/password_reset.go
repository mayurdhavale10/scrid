package controllers

import (
	"fmt"
	"net/http"
	"time"

	"scridbackend/db"
	"scridbackend/models"
	"scridbackend/utils"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// STEP 1: Send OTP for password reset
func ForgotPasswordRequest(c *gin.Context) {
	var input struct {
		Identifier string `json:"identifier"`
	}

	if err := c.ShouldBindJSON(&input); err != nil || input.Identifier == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid identifier"})
		return
	}

	code := utils.GenerateOTP()
	otp := models.OTP{
		Identifier: input.Identifier,
		Code:       code,
		ExpiresAt:  time.Now().Add(5 * time.Minute),
	}

	if err := db.DB.Create(&otp).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to store OTP"})
		return
	}

	// Send OTP via email or fallback to dev log
	if utils.IsEmail(input.Identifier) {
		if err := utils.SendEmailOTP(input.Identifier, code); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send email"})
			return
		}
	} else {
		fmt.Printf("📱 [DEV ONLY] OTP for %s is %s\n", input.Identifier, code)
	}

	c.JSON(http.StatusOK, gin.H{"message": "OTP sent"})
}

// STEP 2: Reset Password using OTP
func ResetPassword(c *gin.Context) {
	var input struct {
		Identifier  string `json:"identifier"`
		Code        string `json:"code"`
		NewPassword string `json:"newPassword"` // must match frontend camelCase
	}

	if err := c.ShouldBindJSON(&input); err != nil ||
		input.Identifier == "" || input.Code == "" || input.NewPassword == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
		return
	}

	// Find OTP entry
	var otp models.OTP
	if err := db.DB.Where("identifier = ? AND code = ?", input.Identifier, input.Code).
		Order("created_at desc").First(&otp).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid OTP"})
		return
	}

	if time.Now().After(otp.ExpiresAt) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "OTP expired"})
		return
	}

	otp.Verified = true
	db.DB.Save(&otp)

	// Find user
	var user models.User
	query := db.DB
	if utils.IsEmail(input.Identifier) {
		query = query.Where("email = ?", input.Identifier)
	} else {
		query = query.Where("phone = ?", input.Identifier)
	}
	if err := query.First(&user).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	// Hash & update password
	hashed, err := bcrypt.GenerateFromPassword([]byte(input.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Password hash error"})
		return
	}

	user.Password = string(hashed)
	db.DB.Save(&user)

	c.JSON(http.StatusOK, gin.H{"message": "Password reset successful"})
}

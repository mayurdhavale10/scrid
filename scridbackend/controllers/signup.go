package controllers

import (
	"fmt"
	"net/http"
	"scridbackend/db"
	"scridbackend/models"
	"scridbackend/utils"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type SignupInput struct {
	Username   string `json:"username"`
	Password   string `json:"password"`
	Identifier string `json:"identifier"` // email or phone
	Otp        string `json:"otp"`
}

func Signup(c *gin.Context) {
	var input SignupInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if input.Username == "" || input.Password == "" || input.Identifier == "" || input.Otp == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "All fields are required"})
		return
	}

	// 🔍 Check OTP validity
	var otp models.OTP
	if err := db.DB.
		Where("identifier = ? AND code = ?", input.Identifier, input.Otp).
		Order("created_at desc").
		First(&otp).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid OTP"})
		return
	}

	if otp.Verified {
		c.JSON(http.StatusBadRequest, gin.H{"error": "OTP already used"})
		return
	}

	if time.Now().After(otp.ExpiresAt) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "OTP expired"})
		return
	}

	// ✅ Mark OTP as verified
	otp.Verified = true
	db.DB.Save(&otp)

	// 🔐 Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error hashing password"})
		return
	}

	// 🧠 Prepare user record
	user := models.User{
		Username: input.Username,
		Password: string(hashedPassword),
	}

	// Email or Phone assignment
	if utils.IsEmail(input.Identifier) {
		user.Email = &input.Identifier
	} else {
		user.Phone = &input.Identifier
	}

	// Save user
	if err := db.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to create user", "details": err.Error()})
		return
	}

	fmt.Printf("✅ User created: %+v\n", user)
	c.JSON(http.StatusOK, gin.H{"message": "Signup successful"})
}

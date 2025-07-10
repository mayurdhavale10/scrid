package controllers

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"net/smtp"
	"os"
	"regexp"
	"time"

	"scridbackend/db"
	"scridbackend/models"

	"github.com/gin-gonic/gin"
)

// 🔐 Generate a 4-digit OTP
func generateOTP() string {
	return fmt.Sprintf("%04d", rand.Intn(10000))
}

// 📧 Send OTP to email
func sendEmailOTP(to, code string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	emailUser := os.Getenv("EMAIL_USER")
	emailPass := os.Getenv("EMAIL_PASS")
	emailFrom := os.Getenv("EMAIL_FROM")

	auth := smtp.PlainAuth("", emailUser, emailPass, smtpHost)

	subject := "Subject: Your Scrid OTP Code\n"
	body := fmt.Sprintf("Your OTP code is: %s\nThis code is valid for 5 minutes.\n", code)
	msg := []byte(subject + "\n" + body)

	addr := smtpHost + ":" + smtpPort
	return smtp.SendMail(addr, auth, emailFrom, []string{to}, msg)
}

// ✅ Send OTP (Email/SMS)
func SendOTP(c *gin.Context) {
	var input struct {
		Identifier string `json:"identifier"`
	}

	if err := c.ShouldBindJSON(&input); err != nil || input.Identifier == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	code := generateOTP()
	expiry := time.Now().Add(5 * time.Minute)

	otp := models.OTP{
		Identifier: input.Identifier,
		Code:       code,
		ExpiresAt:  expiry,
	}

	if err := db.DB.Create(&otp).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save OTP"})
		return
	}

	if isEmail(input.Identifier) {
		if err := sendEmailOTP(input.Identifier, code); err != nil {
			log.Printf("❌ Failed to send OTP email: %v", err)
		} else {
			log.Printf("✅ OTP sent to email: %s", input.Identifier)
		}
	} else {
		log.Printf("📱 [DEV ONLY] OTP for %s is %s", input.Identifier, code)
		// TODO: Add SMS integration here
	}

	c.JSON(http.StatusOK, gin.H{"message": "OTP sent"})
}

// ✅ Verify OTP
func VerifyOTP(c *gin.Context) {
	var input struct {
		Identifier string `json:"identifier"`
		Code       string `json:"code"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var otp models.OTP
	if err := db.DB.Where("identifier = ? AND code = ?", input.Identifier, input.Code).
		Order("created_at desc").
		First(&otp).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid OTP"})
		return
	}

	if time.Now().After(otp.ExpiresAt) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "OTP expired"})
		return
	}

	if otp.Verified {
		c.JSON(http.StatusBadRequest, gin.H{"error": "OTP already used"})
		return
	}

	otp.Verified = true
	db.DB.Save(&otp)

	c.JSON(http.StatusOK, gin.H{"message": "OTP verified"})
}

// ✅ Improved email validator
func isEmail(s string) bool {
	re := regexp.MustCompile(`^[a-zA-Z0-9._%%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)
	return re.MatchString(s)
}

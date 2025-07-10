package utils

import (
	"fmt"
	"log"
	"math/rand"
	"net/smtp"
	"os"
	"time"
)

// GenerateOTP returns a random 4-digit OTP
func GenerateOTP() string {
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("%04d", rand.Intn(10000))
}

// SendEmailOTP sends an OTP via Gmail SMTP
func SendEmailOTP(to, code string) error {
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	emailUser := os.Getenv("EMAIL_USER")
	emailPass := os.Getenv("EMAIL_PASS")
	emailFrom := os.Getenv("EMAIL_FROM")

	auth := smtp.PlainAuth("", emailUser, emailPass, smtpHost)

	subject := "Subject: Scrid Password Reset OTP\n"
	body := fmt.Sprintf("Your OTP code is: %s\nThis code is valid for 5 minutes.\n", code)
	msg := []byte(subject + "\n" + body)

	addr := smtpHost + ":" + smtpPort
	err := smtp.SendMail(addr, auth, emailFrom, []string{to}, msg)
	if err != nil {
		log.Printf("❌ Failed to send email: %v\n", err)
	}
	return err
}

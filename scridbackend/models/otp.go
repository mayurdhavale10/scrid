package models

import "time"

type OTP struct {
	ID         uint      `gorm:"primaryKey"`
	Identifier string    `gorm:"not null"` // phone or email
	Code       string    `gorm:"not null"`
	ExpiresAt  time.Time `gorm:"not null"`
	Verified   bool      `gorm:"default:false"`
	CreatedAt  time.Time
}

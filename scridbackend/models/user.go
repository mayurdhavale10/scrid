package models

type User struct {
	ID       uint    `gorm:"primaryKey"`
	Username string  `gorm:"unique;not null"`
	Email    *string `gorm:"uniqueIndex"` // ✅ Optional, nullable
	Phone    *string `gorm:"uniqueIndex"` // ✅ Optional, nullable
	Password string  `gorm:"not null"`
}

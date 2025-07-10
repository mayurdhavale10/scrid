package db

import (
	"fmt"
	"log"

	"scridbackend/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	dsn := "host=localhost user=postgres password=@Abdrocks17 dbname=scrid port=5432 sslmode=disable"
	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("❌ Failed to connect to database: %v", err)
	}

	fmt.Println("🔄 Running migrations for models...")

	// 🛠️ For development: Drop tables (optional, avoid in production)
	// _ = DB.Migrator().DropTable(&models.User{}, &models.OTP{})

	// ✅ AutoMigrate all models
	if err := DB.AutoMigrate(&models.User{}, &models.OTP{}); err != nil {
		log.Fatalf("❌ Failed to run auto migration: %v", err)
	}

	fmt.Println("✅ Connected to PostgreSQL and ran migrations successfully!")
}

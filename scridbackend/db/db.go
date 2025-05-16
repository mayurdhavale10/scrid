package db

import (
	"github.com/mayurdhavale10/scridbackend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	_ "modernc.org/sqlite" // ✅ Import modern driver
)

var DB *gorm.DB

func Init() {
	var err error
	// GORM will now use modernc.org/sqlite
	DB, err = gorm.Open(sqlite.Open("scrid.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	DB.AutoMigrate(&models.User{})
}

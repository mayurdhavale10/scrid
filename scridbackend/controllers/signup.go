package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mayurdhavale10/scridbackend/db" // ✅ use the db package
	"github.com/mayurdhavale10/scridbackend/models"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	// hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Password encryption failed"})
		return
	}
	user.Password = string(hashedPassword)

	// save user in DB
	if err := db.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email already registered or DB error"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Signup successful"})
}

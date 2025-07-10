package routes

import (
	"scridbackend/controllers"
	"scridbackend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	// Auth routes
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)

	// Protected route with middleware
	r.GET("/dashboard", middleware.AuthMiddleware(), controllers.Dashboard)

	// Public API route for scheduling scrap pickup
	r.POST("/api/schedule", controllers.SchedulePickup)
}

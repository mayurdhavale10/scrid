package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/mayurdhavale10/scridbackend/controllers"
)

func SetupRoutes(router *gin.Engine) {
	router.POST("/login", controllers.Login)
	router.POST("/signup", controllers.Signup) // ✅ Add this line
}

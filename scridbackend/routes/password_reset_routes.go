package routes

import (
	"scridbackend/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterPasswordResetRoutes(router *gin.Engine) {
	reset := router.Group("/password")
	{
		reset.POST("/forgot", controllers.ForgotPasswordRequest)
		reset.POST("/reset", controllers.ResetPassword)
	}
}

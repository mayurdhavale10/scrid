package routes

import (
	"scridbackend/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterOTPRoutes(router *gin.Engine) {
	otp := router.Group("/otp")
	{
		otp.POST("/send", controllers.SendOTP)     // Send OTP to email/phone
		otp.POST("/verify", controllers.VerifyOTP) // Optional: if you verify OTP separately
	}
}

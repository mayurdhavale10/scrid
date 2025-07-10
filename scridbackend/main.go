package main

import (
	"log"
	"os"
	"time"

	"scridbackend/db"
	"scridbackend/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// ✅ Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️  No .env file found, using system environment variables")
	}

	// ✅ Ensure required email env variables are present
	required := []string{"EMAIL_USER", "EMAIL_PASS", "EMAIL_FROM"}
	for _, key := range required {
		if os.Getenv(key) == "" {
			log.Fatalf("❌ Missing required environment variable: %s", key)
		}
	}

	// ✅ Initialize the database
	db.Init()

	// ✅ Setup Gin router
	r := gin.Default()

	// ✅ Apply CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"}, // frontend origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// ✅ Register all routes
	routes.SetupRoutes(r)                 // Signup, login, dashboard, schedule pickup
	routes.RegisterOTPRoutes(r)           // OTP send/verify
	routes.RegisterPasswordResetRoutes(r) // Forgot/reset password flow

	// ✅ Start the server
	log.Println("🚀 Server is running on http://localhost:8080")
	if err := r.Run(":8080"); err != nil {
		log.Fatalf("❌ Failed to start server: %v", err)
	}
}

// TODO (Future): Integrate Twilio
// import "github.com/twilio/twilio-go"
// func sendSMS(to string, msg string) {
//     client := twilio.NewRestClient()
//     params := &openapi.CreateMessageParams{}
//     params.SetTo(to)
//     params.SetFrom(os.Getenv("TWILIO_FROM"))
//     params.SetBody(msg)
//     client.Api.CreateMessage(params)
// }

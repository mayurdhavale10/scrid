package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/mayurdhavale10/scridbackend/db"
	"github.com/mayurdhavale10/scridbackend/routes"
)

func main() {
	db.Init() // ✅ NEW
	r := gin.Default()
	r.Use(cors.Default())
	routes.SetupRoutes(r)
	r.Run(":8080")
}

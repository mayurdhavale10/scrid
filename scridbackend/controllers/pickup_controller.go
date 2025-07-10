package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type PickupRequest struct {
	ScrapType string `json:"scrapType"`
	Quantity  string `json:"quantity"`
	Address   string `json:"address"`
	Date      string `json:"date"`
	Time      string `json:"time"`
}

func SchedulePickup(c *gin.Context) {
	var req PickupRequest

	if err := c.BindJSON(&req); err != nil ||
		req.ScrapType == "" || req.Address == "" || req.Date == "" || req.Time == "" {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Missing required fields"})
		return
	}

	// TODO: Store in DB or notify ScrapPal

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Pickup scheduled successfully",
	})
}

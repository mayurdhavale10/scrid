// inside controllers/schedule.go
type SchedulePayload struct {
	ScrapType string  `json:"scrapType"`
	Quantity  string  `json:"quantity"`
	Address   string  `json:"address"`
	Date      string  `json:"date"`
	Time      string  `json:"time"`
	Lat       float64 `json:"lat"`
	Lng       float64 `json:"lng"`
}

type ScrapPal struct {
	ID       string  `json:"id"`
	Name     string  `json:"name"`
	Phone    string  `json:"phone"`
	Rating   float64 `json:"rating"`
	Distance float64 `json:"distance"`
}

// Mock query - replace with real SQL filtering
func findNearestScrapPal(lat, lng float64) ScrapPal {
	return ScrapPal{
		ID:       "KW38291",
		Name:     "Rajesh Kumar",
		Phone:    "+919876543210",
		Rating:   4.6,
		Distance: 1.2, // km
	}
}

func SchedulePickup(c *gin.Context) {
	var req SchedulePayload
	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	pal := findNearestScrapPal(req.Lat, req.Lng)

	// TODO: Store pickup in DB with pal assigned
	// TODO: Notify pal via Twilio, Email, Firebase etc.

	c.JSON(200, gin.H{
		"success":  true,
		"scrapPal": pal,
		"message":  "Pickup scheduled successfully",
	})
}

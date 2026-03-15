package handler

import (
	"encoding/json"
	"net/http"
	"time"
)

type Health struct {
	Status    string `json:"status"`
	Message   string `json:"message"`
	Timestamp time.Time `json:"timestamp"`
}

// AAAAAAAAAAAAAAAA
func HealthCheck(w http.ResponseWriter, _ *http.Request) {

		w.Header().Set("Content-Type","application/json")

		h := Health{Status: "online", Message: "NiteLog API is running", Timestamp: time.Now()}

		err := json.NewEncoder(w).Encode(h)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
	}
}
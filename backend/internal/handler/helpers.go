package handler

import (
	"encoding/json"
	"net/http"
)

func respondWithError(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(statusCode)

	m := map[string]string{"error": message}

	json.NewEncoder(w).Encode(m)
}

// // func projectExists(id string) bool {
// // 	for _, p := range projectsDB {
// // 		if p.ID == id {
// // 			return true
// // 		}
// // 	}
// // 	return false
// // }

// func findTaskIndex(projectID string, taskID string) int {
// 	for i, t := range tasksDB {
// 		if t.ID == taskID && t.ProjectID == projectID {
// 			return i
// 		}
// 	}
// 	return -1
// }
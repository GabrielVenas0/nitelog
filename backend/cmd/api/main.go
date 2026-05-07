package main

import (
	"backend/internal/database"
	"backend/internal/handler"
	. "backend/internal/middleware"
	"log"
	"net/http"
)

func main() {

	db := database.Connect()
	defer db.Close()
	queries := database.New(db)

	api := handler.ApiConfig{
		DB: queries,
	}

	api.SeedUsers()

	router := http.NewServeMux()

	router.HandleFunc("POST /auth/register", api.Register)
	router.HandleFunc("POST /auth/login", api.Login)
	router.HandleFunc("POST /auth/logout", AuthMiddleware(handler.Logout))
	router.HandleFunc("GET /auth/me", AuthMiddleware(api.GetMe))

	router.HandleFunc("POST /projects", AuthMiddleware(api.CreateProject))
	router.HandleFunc("GET /projects", AuthMiddleware(api.ListProject))
	router.HandleFunc("GET /projects/{id}", AuthMiddleware(api.GetProjectByID))
	// router.HandleFunc("DELETE /projects/{id}",AuthMiddleware(handler.DeleteProject))

	router.HandleFunc("POST /projects/{project_id}/tasks", AuthMiddleware(api.CreateTask))
	router.HandleFunc("GET /projects/{project_id}/tasks", AuthMiddleware(api.ListProjectTasks))

	// router.HandleFunc("DELETE /projects/{project_id}/tasks/{task_id}", middleware.AuthMiddleware(handler.DeleteTask))

	router.HandleFunc("/health", handler.HealthCheck)

	log.Fatal(http.ListenAndServe(":8080", EnableCORS(router)))
}

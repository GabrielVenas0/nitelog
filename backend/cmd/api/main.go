package main

import (
	"backend/internal/handler"
	"backend/internal/middleware"
	"log"
	"net/http"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Erro ao carregar o .env")
		return
	}

	router := http.NewServeMux()

	router.HandleFunc("/auth/register", handler.Register)
	router.HandleFunc("/auth/login", handler.Login)
	router.HandleFunc("/auth/logout", handler.Logout)
	
	router.HandleFunc("/auth/me", middleware.AuthMiddleware(handler.GetMe))

	router.HandleFunc("POST /projects", middleware.AuthMiddleware(handler.CreateProject))
	router.HandleFunc("GET /projects", middleware.AuthMiddleware(handler.ListProject))
	router.HandleFunc("GET /projects/{id}", middleware.AuthMiddleware(handler.GetProject))
	router.HandleFunc("DELETE /projects/{id}", middleware.AuthMiddleware(handler.DeleteProject))
	
	router.HandleFunc("POST /projects/{project_id}/tasks", middleware.AuthMiddleware(handler.CreateTask))
	router.HandleFunc("GET /projects/{project_id}/tasks", middleware.AuthMiddleware(handler.ListTask))
	router.HandleFunc("DELETE /projects/{project_id}/tasks/{task_id}", middleware.AuthMiddleware(handler.DeleteTask))

	router.HandleFunc("/health", handler.HealthCheck)

	log.Fatal(http.ListenAndServe(":8080", middleware.EnableCORS(router)))
}
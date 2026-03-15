package handler

import (
	"backend/internal/models"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
)

var tasksDB = []models.Task{}

func CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	projectId := r.PathValue("project_id")
	
	userID, ok := r.Context().Value("userID").(string)

	if !ok {
		respondWithError(w, http.StatusInternalServerError, "Erro interno: usuário não identificado no contexto")
		return
	}

	var t models.Task
	
	if !projectExists(projectId) {
		respondWithError(w, http.StatusNotFound, "[CreateTask] ProjectID não encontrado.")
		return
	}
	
	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "[CreateTask] json invalido.")
		return
	}
	
	t.ID = uuid.New().String()
	t.ProjectID = projectId
	t.CreatorID = userID
	t.CreatedAt = time.Now()
	t.UpdatedAt = time.Now()
	
	tasksDB = append(tasksDB, t)
	
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(t)
	if err != nil {
		log.Printf("[CreateTask] Erro ao encodar %v", err)
		return
	}
}

func ListTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	
	projectId := r.PathValue("project_id")
	
	if !projectExists(projectId) {
		respondWithError(w, http.StatusNotFound, "[ListTask] ProjectID fornecido não foi encontrado.")
		return
	}

	filteredTasks := []models.Task{}

	for _, v := range tasksDB {
		if v.ProjectID == projectId {
			filteredTasks = append(filteredTasks, v)
		}
	}

	w.WriteHeader(http.StatusOK)
	err := json.NewEncoder(w).Encode(filteredTasks)
	if err != nil {
		log.Printf("[ListTask] Erro ao encodar %v", err)
	}
}

func DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	projectId := r.PathValue("project_id")
	taskId := r.PathValue("task_id")

	if !projectExists(projectId) {
		respondWithError(w, http.StatusNotFound, "[DeleteTask] Project não encontrado.")
		return
	}

	i := findTaskIndex(projectId, taskId)

	if i == -1 {
		respondWithError(w, http.StatusNotFound, "[DeleteTask] Task não encontrada")
		return
	}

	tasksDB = tasksDB[:i+copy(tasksDB[i:], tasksDB[i+1:])]
	w.WriteHeader(http.StatusNoContent)
}
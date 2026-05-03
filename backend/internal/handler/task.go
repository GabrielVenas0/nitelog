package handler

import (
	// "backend/internal/models"
	"backend/internal/database"
	"encoding/json"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type taskReq struct {
	ID string `json:"id"`
	Name string `json:"name"`
	ProjectID string `json:"project_id"`
	CreatorID string `json:"creator_id"`
}

func (api *ApiConfig) CreateTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req taskReq

	projectID := r.PathValue("project_id")

	userID, ok := r.Context().Value("userID").(string)
	if !ok {
		respondWithError(w, http.StatusInternalServerError, "Erro interno: usuário não identificado no contexto")
		return
	}

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Erro ao gerar o userUUID")
		return
	}

	projectUUID, err := uuid.Parse(projectID)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Erro ao gerar o projectUUID")
		return
	}

	err = json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if req.Name == "" {
		respondWithError(w, http.StatusBadRequest, "O campo de nome não pode ser vazio.")
		return
	}
	
	if len(req.Name) < 3 || len(req.Name) >= 20 {
		respondWithError(w, http.StatusBadRequest, "O nome da tarefa deve ter de 4 a 20 caracteres")
		return
	}

	taskUUID := uuid.New()

	params := database.CreateTaskParams {
		ID: taskUUID,
		Name: req.Name,
		ProjectID: projectUUID,
		CreatorID: userUUID,
	}

	task, err := api.DB.CreateTask(r.Context(), params)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			if pqErr.Code == "23505" {
				respondWithError(w, http.StatusConflict, "Já existe um projeto com esse nome.")
				return
			}
		}
		respondWithError(w, http.StatusInternalServerError, "Erro ao criar o projeto.")
		return
	}
	
	res := taskReq{
		ID: task.ID.String(),
		Name: task.Name,
		ProjectID: task.ProjectID.String(),
		CreatorID: task.CreatorID.String(),
	}
	
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(res)
	if err != nil {
		log.Printf("[CreateTask] Erro ao encodar %v", err)
		return
	}
}

func (api *ApiConfig) ListProjectTasks(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	projectId := r.PathValue("project_id")

	projectUUID, err := uuid.Parse(projectId)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Erro ao gerar o projectUUID")
		return
	}

	tasks, err := api.DB.ListProjectTasks(r.Context(), projectUUID)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Erro ao buscar as tarefas")
		return
	}
	
	w.WriteHeader(http.StatusOK)
	
	err = json.NewEncoder(w).Encode(tasks)
	if err != nil {
		log.Printf("[ListProject] Erro ao encodar %v", err)
		return
	}
}

// func DeleteTask(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")

// 	projectId := r.PathValue("project_id")
// 	taskId := r.PathValue("task_id")

// 	if !projectExists(projectId) {
// 		respondWithError(w, http.StatusNotFound, "[DeleteTask] Project não encontrado.")
// 		return
// 	}

// 	i := findTaskIndex(projectId, taskId)

// 	if i == -1 {
// 		respondWithError(w, http.StatusNotFound, "[DeleteTask] Task não encontrada")
// 		return
// 	}

// 	tasksDB = tasksDB[:i+copy(tasksDB[i:], tasksDB[i+1:])]
// 	w.WriteHeader(http.StatusNoContent)
// }
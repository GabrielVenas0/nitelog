package handler

import (
	// "backend/internal/models"
	"backend/internal/database"
	"backend/internal/github"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/google/uuid"
)

type taskReq struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
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

	userNullUUID := uuid.NullUUID{UUID: userUUID, Valid: true}

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

	params := database.CreateTaskParams{
		Name:      req.Name,
		ProjectID: projectUUID,
		CreatorID: userNullUUID,
	}

	task, err := api.DB.CreateTask(r.Context(), params)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Erro ao criar a tarefa.")
		return
	}

	res := taskReq{
		ID:        task.ID.String(),
		Name:      task.Name,
		ProjectID: task.ProjectID.String(),
		CreatorID: task.CreatorID.UUID.String(),
	}

	repoName := "nitelog"
	test := "Testando"

	ghService := github.NewService()
	issueURL, err := ghService.GitHubTaskSync(repoName, req.Name, test)
	if err != nil {
		println("Não foi possível criar a issue no GitHub:", err.Error())
	}

	fmt.Print(issueURL)

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

func (api *ApiConfig) DeleteTask(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	taskID := r.PathValue("task_id")
	// projectID := r.PathValue("project_id")
	// userID, ok := r.Context().Value("userID").(string)
	// if !ok {
	// 	respondWithError(w, http.StatusInternalServerError, "Erro interno: usuário não identificado no contexto")
  //   return
	// }

	taskUUID, err := uuid.Parse(taskID)
	if err != nil {
			respondWithError(w, http.StatusInternalServerError, "Erro ao gerar o projectUUID")
			return
	}
	// projectUUID, err := uuid.Parse(projectID)
	// if err != nil {
	// 		respondWithError(w, http.StatusInternalServerError, "Erro ao gerar o projectUUID")
	// 		return
	// }
	// userUUID, err := uuid.Parse(userID)
	// if err != nil {
	// 		respondWithError(w, http.StatusInternalServerError, "Erro ao gerar o projectUUID")
	// 		return
	// }

	err = api.DB.DeleteTaskById(r.Context(), taskUUID)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Erro ao deletar a tarefa.")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
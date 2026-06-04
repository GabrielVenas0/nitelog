package handler

import (
	"backend/internal/database"
	"encoding/json"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/lib/pq"
)

type projectReq struct {
	Name string `json:"name"`
}

func (api *ApiConfig) CreateProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req projectReq

	tx, err := api.SqlDB.BeginTx(r.Context(), nil)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Erro ao iniciar a transação")
	}
	defer tx.Rollback()

	qtx := api.DB.WithTx(tx)

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
		respondWithError(w, http.StatusBadRequest, "O nome do projeto deve ter de 4 a 20 caracteres")
		return
	}

	project, err := qtx.CreateProject(r.Context(), req.Name)
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

	err = qtx.AddProjectMember(r.Context(), database.AddProjectMemberParams{
		ProjectID: project.ID,
		UserID:    userUUID,
		Role:      "admin",
	})
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Erro ao adicionar um admin ao projeto")
		return
	}

	err = tx.Commit()
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Erro ao salvar na DB")
		return
	}

	res := projectReq{
		Name: project.Name,
	}

	w.WriteHeader(http.StatusCreated)

	err = json.NewEncoder(w).Encode(res)
	if err != nil {
		log.Printf("[CreateProject] Erro ao encodar %v", err)
		return
	}
}

func (api *ApiConfig) GetExploreProjects(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

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

	projects, err := api.DB.GetExploreProjects(r.Context(), userUUID)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Erro ao buscar os projetos")
		return
	}

	w.WriteHeader(http.StatusOK)

	err = json.NewEncoder(w).Encode(projects)
	if err != nil {
		log.Printf("[ListProject] Erro ao encodar %v", err)
		return
	}
}

func (api *ApiConfig) GetMyProjects(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

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

	projects, err := api.DB.GetMyProjects(r.Context(), userUUID)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Erro ao buscar os projetos")
		return
	}

	w.WriteHeader(http.StatusOK)

	err = json.NewEncoder(w).Encode(projects)
	if err != nil {
		log.Printf("[ListProject] Erro ao encodar %v", err)
		return
	}
}

func (api *ApiConfig) GetProjectByID(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	projectID := r.PathValue("id")

	projectUUID, err := uuid.Parse(projectID)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Erro ao gerar o projectUUID")
		return
	}

	project, err := api.DB.GetProjectById(r.Context(), projectUUID)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "Erro ao buscar o projeto")
		return
	}

	w.WriteHeader(http.StatusOK)

	err = json.NewEncoder(w).Encode(project)
	if err != nil {
		log.Printf("[ListProject] Erro ao encodar %v", err)
		return
	}
}

// func DeleteProject(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	mu.Lock()
// 	defer mu.Unlock()

// 	projectID := r.PathValue("id")

// 	for i, v := range projectsDB {
// 		if v.ID == projectID {
// 			projectsDB = projectsDB[:i+copy(projectsDB[i:], projectsDB[i+1:])]
// 			w.WriteHeader(http.StatusNoContent)
// 			return
// 		}
// 	}
// 	respondWithError(w, http.StatusNotFound, "[DeleteProject] Projeto não encontrado.")
// }

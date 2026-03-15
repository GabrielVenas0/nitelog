package handler

import (
	"backend/internal/models"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/google/uuid"
)

var projectsDB = []models.Project{}

func CreateProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	userID, ok := r.Context().Value("userID").(string)

	if !ok {
		respondWithError(w, http.StatusInternalServerError, "Erro interno: usuário não identificado no contexto")
		return
	}

	var p models.Project
	
	err := json.NewDecoder(r.Body).Decode(&p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	p.ID = uuid.New().String()
	p.OwnerID = userID
	p.Members = []*models.ProjectMember{}
	p.CreatedAt = time.Now()
	p.UpdatedAt = time.Now()

	projectsDB = append(projectsDB, p)
	
	w.WriteHeader(http.StatusCreated)
	err = json.NewEncoder(w).Encode(p)
	if err != nil {
		log.Printf("[CreateProject] Erro ao encodar %v", err)
		return
	}
}

func ListProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(http.StatusOK)
	err := json.NewEncoder(w).Encode(projectsDB)
	if err != nil {
		log.Printf("[ListProject] Erro ao encodar %v", err)
	}
}

func GetProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	idDesejado := r.PathValue("id")

	for _, v := range projectsDB {
		if v.ID == idDesejado {
			w.WriteHeader(http.StatusOK)
			err := json.NewEncoder(w).Encode(v)
			if err != nil {
				log.Printf("[GetProject] Erro ao encodar %v", err)
			}
			return
		} 
	}
	respondWithError(w, http.StatusNotFound, "[GetProject] Projeto não encontrado")
}

func DeleteProject(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	idDesejado := r.PathValue("id")

	for i, v := range projectsDB {
		if v.ID == idDesejado {
			projectsDB = projectsDB[:i+copy(projectsDB[i:], projectsDB[i+1:])]
			w.WriteHeader(http.StatusNoContent)
			return
		}
	}
	respondWithError(w, http.StatusNotFound, "[DeleteProject] Projeto não encontrado.")
}
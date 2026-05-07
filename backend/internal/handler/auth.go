package handler

import (
	"backend/internal/database"
	"backend/internal/utils"
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

type userReq struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type userRes struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role"`
}

func (api *ApiConfig) SeedUsers() {
	hashedPass, err := bcrypt.GenerateFromPassword([]byte("admin"), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("failed to generate bcrypt from password.")
		return
	}

	params := database.SeedUserParams{
		Username:     "admin",
		Email:        "admin@admin.com",
		PasswordHash: string(hashedPass),
		Role:         "Admin",
	}

	ctx := context.Background()

	err = api.DB.SeedUser(ctx, params)
	if err != nil {
		log.Printf("failed to seed user: %v.", err)
		return
	}
}

func (api *ApiConfig) Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req userReq

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if len(req.Password) < 6 || len(req.Password) > 24 {
		respondWithError(w, http.StatusBadRequest, "A senha deve ter entre 6 e 24 caracteres.")
		return
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Foi aqui")
		return
	}

	params := database.CreateUserParams{
		Username:     req.Username,
		Email:        req.Email,
		PasswordHash: string(hashedPass),
		Role:         "Membro",
	}

	user, err := api.DB.CreateUser(r.Context(), params)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			if pqErr.Code == "23505" {
				respondWithError(w, http.StatusConflict, "Este nome de usuário ou e-mail já está em uso.")
				return
			}
		}
		log.Printf("ERRO REAL DO POSTGRES: %v\n", err)
		respondWithError(w, http.StatusInternalServerError, "Não, Foi aqui")
		return
	}

	token, err := utils.GenerateToken(user.ID.String())
	if err != nil {
		respondWithError(w, http.StatusInternalServerError, "Erro ao gerar autenticação.")
		return
	}

	cookie := utils.GenerateAuthCookie(token)
	http.SetCookie(w, cookie)

	w.WriteHeader(http.StatusCreated)

	res := userRes{
		ID:       user.ID.String(),
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
	}

	json.NewEncoder(w).Encode(res)
}

func (api *ApiConfig) Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req userReq

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := api.DB.GetUserByUsername(r.Context(), req.Username)
	if err != nil {
		respondWithError(w, http.StatusUnauthorized, "Credenciais inválidas.")
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password))
	if err != nil {
		respondWithError(w, http.StatusUnauthorized, "Credenciais inválidas.")
		return
	}

	token, err := utils.GenerateToken(user.ID.String())
	if err != nil {
		log.Println("Erro ao gerar token")
		return
	}

	cookie := utils.GenerateAuthCookie(token)

	http.SetCookie(w, cookie)

	w.WriteHeader(http.StatusOK)
}

func Logout(w http.ResponseWriter, _ *http.Request) {
	cookie := utils.GenerateLogoutCookie()

	http.SetCookie(w, cookie)
	w.WriteHeader(http.StatusOK)
}

func (api *ApiConfig) GetMe(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value("userID").(string)
	if !ok {
		respondWithError(w, http.StatusInternalServerError, "Erro interno: usuário não identificado no contexto")
		return
	}

	userUUID, err := uuid.Parse(userID)
	if err != nil {
		respondWithError(w, http.StatusBadRequest, "ID de usuário inválido")
		return
	}

	user, err := api.DB.GetUserByID(r.Context(), userUUID)
	if err != nil {
		respondWithError(w, http.StatusNotFound, "Usuário não encontrado")
		return
	}

	w.WriteHeader(http.StatusOK)

	res := userRes{
		ID:       user.ID.String(),
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
	}

	json.NewEncoder(w).Encode(res)
}

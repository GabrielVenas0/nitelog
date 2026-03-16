package handler

import (
	"backend/internal/models"
	"backend/internal/utils"
	"encoding/json"
	"log"
	"net/http"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var usersDB = []models.User{}

func SeedAdmin() {
	senhaHash, err := utils.HashPassword("admin")
	if err != nil {
		log.Print("Erro ao gerar hashPassword.")
	}
	admin := models.User{
		ID: "admin-123",
		Username: "admin",
		Password: string(senhaHash),
	}

	usersDB = append(usersDB, admin)
	log.Println("Entrou como Admin!")
}

func Register(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var u models.User

	err := json.NewDecoder(r.Body).Decode(&u)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if len(u.Username) < 6 || len(u.Password) < 6 {
		respondWithError(w, http.StatusBadRequest , "Credencias inválidas")
		return
	}

	for _, v := range usersDB {
		if v.Username == u.Username {
			respondWithError(w, http.StatusConflict, "Este nome de usuário já existe")
			return
		}
	}

	u.ID = uuid.New().String()
	u.Password, err = utils.HashPassword(u.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	token, err := utils.GenerateToken(u.ID)
	if err != nil {
		log.Println("Erro ao gerar o token")
		return
	}

	cookie := utils.GenerateAuthCookie(token)
	http.SetCookie(w, cookie)
	
	usersDB = append(usersDB, u)

	w.WriteHeader(http.StatusCreated)
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var u models.User

	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, v := range usersDB {
		if v.Username == u.Username {
			err := bcrypt.CompareHashAndPassword([]byte(v.Password), []byte(u.Password))
			if err != nil {
				http.Error(w, err.Error(), http.StatusForbidden)
				return
			} 

			token, err := utils.GenerateToken(v.ID)
			if err != nil {
				log.Println("Erro ao gerar token")
			}

			cookie := utils.GenerateAuthCookie(token)

			http.SetCookie(w, cookie)
		
			w.WriteHeader(http.StatusOK)
			return
		}
	}
	respondWithError(w, http.StatusUnauthorized, "Credenciais inválidas")
}

func Logout(w http.ResponseWriter, _ *http.Request) {
	cookie := utils.GenerateLogoutCookie()

	http.SetCookie(w, cookie)
	w.WriteHeader(http.StatusOK)
}

func GetMe(w http.ResponseWriter, r *http.Request) {
	userID, ok := r.Context().Value("userID").(string)
	if !ok {
		respondWithError(w, http.StatusInternalServerError, "Erro interno: usuário não identificado no contexto")
		return
	}

	for _, v := range usersDB {
		if v.ID == userID {
			userData := map[string]string{
				"id": v.ID,
				"username": v.Username,
			}

			w.WriteHeader(http.StatusOK)
			err := json.NewEncoder(w).Encode(userData)
			if err != nil {
				respondWithError(w, http.StatusInternalServerError, "asfdf")
				return
			}
			return
		}
	}
	w.WriteHeader(http.StatusNotFound)
}
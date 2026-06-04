package env

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func Load() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Println(".env não encontrado.")
	}
}

func Get(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

func Require(key string) string {
	value, exists := os.LookupEnv(key)
	if !exists || value == "" {
		log.Fatalf("Variável não encontrada: '%s'", key)
	}
	return value
}

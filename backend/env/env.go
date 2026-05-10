package env

import (
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

type Enviroments struct {
	keys map[string]string
}

func (env *Enviroments) GetKey(key string) string {
	return env.keys[key]
}

var ENV Enviroments

func Load() {
	path, err := os.Getwd()
	if err != nil {
		log.Fatalf("ERROR: Falha ao encontrar o caminho do workspace: %v", err)
	}

	envPath := filepath.Join(path, "..", ".env")

	ENV.keys, err = godotenv.Read(envPath)
	if err != nil {
		log.Fatalf("ERROR: Falha ao carregar as variáveis de ambiente: %v", err)
	}
}

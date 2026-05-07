package env

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Enviroments struct {
	keys map[string]string
}

func (env *Enviroments) GetKey(key string) string {
	return env.keys[key]
}

var ENV Enviroments
var env_path string

func init() {
	if path, err := os.Getwd(); err != nil {
		log.Fatalf("ERROR: Falha ao encontrar o caminho do workspace: %v", err)
	} else {
		env_path = path
	}

	env_path += "\\.env"

	var err error
	if ENV.keys, err = godotenv.Read(env_path); err != nil {
		log.Fatalf("ERROR: Falha ao carregar as variáveis de ambiente: %v", err)
	}
}

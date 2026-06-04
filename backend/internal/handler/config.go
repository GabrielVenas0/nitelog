package handler

import (
	"backend/internal/database"
	"database/sql"
)

type ApiConfig struct {
	DB    *database.Queries
	SqlDB *sql.DB
}

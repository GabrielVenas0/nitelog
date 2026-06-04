package database

import (
	"backend/env"
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func Connect() *sql.DB {
	user := env.Require("DB_USER")
	pass := env.Require("DB_PASS")
	host := env.Require("DB_HOST")
	port := env.Require("DB_PORT")
	name := env.Require("DB_NAME")

	dsn := fmt.Sprintf("postgres://%s:%s@%s:%s/%s?sslmode=disable", user, pass, host, port, name)

	db, err := sql.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Connection error: ", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}

	fmt.Println("Successfully connected")

	return db
}

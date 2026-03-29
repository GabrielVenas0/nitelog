-- name: CreateUser :one
INSERT INTO users (username, email, password_hash, role)
VALUES ($1, $2, $3, $4)
RETURNING *;
-- name: GetUserByID :one
SELECT id, username, email, role
FROM users
WHERE id = $1;
-- name: GetUserByUsername :one
SELECT id, username, email, password_hash, role
FROM users
WHERE username = $1;
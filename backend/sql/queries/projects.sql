-- name: CreateProject :one
INSERT INTO projects (id, name, owner_id)
VALUES ($1, $2, $3)
RETURNING *;
-- name: ListProjects :many
SELECT * 
FROM projects
ORDER BY name;
-- name: GetProjectByName :one
SELECT id, name, owner_id 
FROM projects
WHERE name = $1;
-- name: GetProjectById :one
SELECT id, name, owner_id
FROM projects
WHERE id = $1 LIMIT 1;
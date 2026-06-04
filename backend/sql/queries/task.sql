-- name: CreateTask :one
INSERT INTO tasks (name, project_id, creator_id)
VALUES ($1, $2, $3)
RETURNING *;

-- name: ListProjectTasks :many
SELECT *
FROM tasks
WHERE project_id = $1;
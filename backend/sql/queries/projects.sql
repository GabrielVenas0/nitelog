-- name: CreateProject :one
INSERT INTO projects (name)
VALUES ($1)
RETURNING *;

-- name: AddProjectMember :exec
INSERT INTO projects_members (project_id, user_id, role)
VALUES ($1, $2, $3);

-- name: GetProjectById :one
SELECT id, name, created_at, updated_at
FROM projects
WHERE id = $1 LIMIT 1;

-- name: GetMyProjects :many
SELECT p.id, p.name, p.created_at, p.updated_at
FROM projects p
INNER JOIN projects_members pm ON p.id = pm.project_id
WHERE pm.user_id = $1
ORDER BY p.name ASC;

-- name: GetExploreProjects :many
SELECT id, name, created_at
FROM projects
WHERE id NOT IN (
  SELECT project_id
  FROM projects_members
  WHERE user_id = $1
)
ORDER BY created_at DESC;
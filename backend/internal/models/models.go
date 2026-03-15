package models

import "time"

type Role string
type Status string
type Label string

const (
	RoleManager Role = "Gestor"
	RoleMember Role = "Membro"
	StatusTodo Status = "Não iniciado"
	StatusDoing Status = "Em desenvolvimento"
	StatusDone Status = "Concluído"
	LabelFeature Label = "Feat"
	LabelStyle Label = "Style"
	LabelHotFix Label = "HotFix"
)

type User struct {
	ID string
	Username string
	Email string
	Password string
	Token string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type ProjectMember struct {
	User User
	Role Role
	UpdatedAt time.Time
}

type Project struct {
	ID string
	Name string
	OwnerID string
	Members []*ProjectMember
	CreatedAt time.Time
	UpdatedAt time.Time
}

type Task struct {
	ID string
	Name string
	ProjectID string
	CreatorID string
	Status Status
	Assignees []*User
	Label Label
	CreatedAt time.Time
	UpdatedAt time.Time
}

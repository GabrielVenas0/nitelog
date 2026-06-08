export interface Project {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  name: string
  project_id: string
  creator_id: string | null
  status: string
  label: string | null
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  username: string
  email: string
  role: string
}

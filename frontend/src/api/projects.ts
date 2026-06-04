import { api } from './client'

export async function GetProjects(signal: AbortSignal) {
  const response = await api.get('/projects', { signal })
  return response.data
}

export async function GetProjectById(project_id: string) {
  const response = await api.get(`/projects/${project_id}`)
  return response.data
}

export async function CreateProjectApi(name: FormDataEntryValue | null) {
  const response = await api.post('/projects', { name: name })
  return response.data
}

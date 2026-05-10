import { api } from './client'

export async function GetTasks(projectId: string) {
  const response = await api.get(`/projects/${projectId}/tasks`, {})
  return response.data
}

export async function CreateTaskApi(
  projectId: string,
  name: FormDataEntryValue | null,
) {
  const response = await api.post(`/projects/${projectId}/tasks`, {
    name: name,
  })
  return response.data
}

import type { Task } from '@/types'
import { api } from './client'

export async function GetTasks(projectId: string) {
  const response = await api.get(`/projects/${projectId}/tasks`, {})
  return response.data
}

export async function CreateTaskApi(
  projectId: string,
  name: FormDataEntryValue | null,
): Promise<Task> {
  const response = await api.post<Task>(`/projects/${projectId}/tasks`, {
    name: name,
  })
  return response.data
}

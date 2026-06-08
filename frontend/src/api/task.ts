import type { Task } from '@/types'
import { api } from './client'

export async function GetTasks(
  projectId: string,
  signal?: AbortSignal,
): Promise<Task[]> {
  const response = await api.get(`/projects/${projectId}/tasks`, { signal })
  return response.data
}

export async function CreateTaskApi(
  projectId: string,
  name: string,
): Promise<Task> {
  const response = await api.post<Task>(`/projects/${projectId}/tasks`, {
    name: name,
  })
  return response.data
}

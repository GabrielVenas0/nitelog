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

export async function DeleteTaskApi(
  projectId: string,
  taskID: string,
): Promise<Task> {
  const response = await api.delete<Task>(
    `/projects/${projectId}/tasks/${taskID}`,
    {},
  )
  return response.data
}

export async function GetCompletedTasks(signal?: AbortSignal): Promise<Task> {
  const response = await api.get('/completedtasks', { signal })
  return response.data
}

export async function GetMyTasks(signal?: AbortSignal): Promise<Task> {
  const response = await api.get('/mytasks', { signal })
  return response.data
}

export async function GetFavoriteTasks(signal?: AbortSignal): Promise<Task> {
  const response = await api.post<Task>('/favtasks', { signal })
  return response.data
}

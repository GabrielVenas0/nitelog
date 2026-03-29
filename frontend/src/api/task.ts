import axios from 'axios'
import { API_URL } from './client'

const instance = axios.create({ baseURL: API_URL, withCredentials: true })

export async function GetTasks(projectId: string) {
  const response = await instance.get(`/projects/${projectId}/tasks`, {})
  return response.data
}

export async function CreateTaskApi(
  projectId: string,
  name: FormDataEntryValue | null,
) {
  const response = await instance.post(`/projects/${projectId}/tasks`, {
    name: name,
  })
  return response.data
}

import axios from 'axios'
import { API_URL } from './client'

const instance = axios.create({ baseURL: API_URL, withCredentials: true })

export async function GetProjects(signal: AbortSignal) {
  const response = await instance.get('/projects', { signal })
  return response.data
}

export async function GetProjectById(project_id: string) {
  const response = await instance.get(`/projects/${project_id}`)
  return response.data
}

export async function CreateProjectApi(name: FormDataEntryValue | null) {
  const response = await instance.post('/projects', { name: name })
  return response.data
}

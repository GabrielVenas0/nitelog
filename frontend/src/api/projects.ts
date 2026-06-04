import type { Project } from '@/types'
import { api } from './client'

export async function GetExploreProjects(signal?: AbortSignal): Promise<Project[]> {
  const response = await api.get('/explore', { signal })
  return response.data
}

export async function GetMyProjects(signal?: AbortSignal): Promise<Project[]> {
  const response = await api.get('/myprojects', { signal })
  return response.data
}

export async function GetProjectById(project_id: string): Promise<Project[]> {
  const response = await api.get(`/projects/${project_id}`)
  return response.data
}

export async function CreateProjectApi(name: FormDataEntryValue | null): Promise<Project[]> {
  const response = await api.post('/projects', { name: name })
  return response.data
}

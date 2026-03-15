import { API_URL } from './client'

export async function getProjects() {
  const response = await fetch(`${API_URL}/projects`)

  if (!response.ok) {
    throw new Error('Erro ao buscar os projetos')
  }

  const data = await response.json()
  return data
}

import { api } from './client'

interface RegisterApiProps {
  username: FormDataEntryValue | null
  password: FormDataEntryValue | null
  email: FormDataEntryValue | null
}

interface LoginApiProps {
  username: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export async function GetMeApi() {
  const response = await api.get('/auth/me', {})
  return response.data
}

export async function RegisterApi({
  username: u,
  password: p,
  email: e,
}: RegisterApiProps) {
  const response = await api.post('/auth/register', {
    username: u,
    password: p,
    email: e,
  })
  return response.data
}

export async function LoginApi({ username: u, password: p }: LoginApiProps) {
  const response = await api.post('/auth/login', {
    username: u,
    password: p,
  })
  return response.data
}

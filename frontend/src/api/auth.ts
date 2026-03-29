import { API_URL } from './client'
import axios from 'axios'

const instance = axios.create({ baseURL: API_URL, withCredentials: true })

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
  const response = await instance.get('/auth/me', {})
  return response.data
}

export async function RegisterApi({
  username: u,
  password: p,
  email: e,
}: RegisterApiProps) {
  const response = await instance.post('/auth/register', {
    username: u,
    password: p,
    email: e,
  })
  return response.data
}

export async function LoginApi({ username: u, password: p }: LoginApiProps) {
  const response = await instance.post('/auth/login', {
    username: u,
    password: p,
  })
  return response.data
}

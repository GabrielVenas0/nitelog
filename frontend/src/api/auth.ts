import { API_URL } from './client'
import axios from 'axios'

const instance = axios.create({ baseURL: API_URL, withCredentials: true })

interface LoginApiProps {
  username: FormDataEntryValue | null
  password: FormDataEntryValue | null
}

export async function GetMeApi() {
  return instance.get('auth/me', {}).then((response) => {
    return response.data
  })
}

export async function LoginApi({ username: u, password: p }: LoginApiProps) {
  return instance
    .post('/auth/login', {
      username: u,
      password: p,
    })
    .then((response) => {
      console.log(response.data)
      console.log(response)
    })
}

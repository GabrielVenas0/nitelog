import { createContext } from 'react'
import type { User } from './user'

interface AuthContextType {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  isLoading: boolean | undefined
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

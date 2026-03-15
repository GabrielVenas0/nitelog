import { GetMeApi } from '@/api'
import type { User } from '@/types'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetMeApi()
        setUser(result)
      } catch (err) {
        setUser(null)
      }
    }
    fetchData()
  }, [])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

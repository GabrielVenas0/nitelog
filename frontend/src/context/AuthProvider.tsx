import { GetMeApi } from '@/api'
import { type User, AuthContext } from '@/types'
import React, { useEffect, useState } from 'react'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const result = await GetMeApi()
        setUser(result)
      } catch (err) {
        console.log(err)
        setUser(undefined)
      } finally {
        setIsLoading(false)
      }
    }
    checkUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

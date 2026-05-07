import { useContext } from 'react'
import { ThemeContext } from '@/types'

export const ThemeHook = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
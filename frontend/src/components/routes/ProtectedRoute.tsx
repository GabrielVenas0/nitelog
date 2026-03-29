import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'

export function ProtectedRoute() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Carregando o NiteLog...</div>
  }

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return <Outlet />
}

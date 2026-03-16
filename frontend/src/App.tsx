import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { Projects, ForYou, ProjectView, Auth } from '@/pages'
import { AuthProvider } from './context/AuthProvider'
import { ProtectedRoute } from './components/routes/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/auth' element={<Auth />}></Route>

          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<Layout />}>
              <Route path='/foryou' element={<ForYou />}></Route>
              <Route path='/projects' element={<Projects />}></Route>
              <Route path='/projects/:id' element={<ProjectView />}></Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

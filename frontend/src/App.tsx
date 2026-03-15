import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout'
import { Projects, ForYou, ProjectView, Auth } from '@/pages'
import { AuthProvider } from './utils/AuthProvider'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/auth' element={<Auth />}></Route>

          <Route path='/' element={<Layout />}>
            <Route path='/foryou' element={<ForYou />}></Route>
            <Route path='/projects' element={<Projects />}></Route>
            <Route path='/projects/:id' element={<ProjectView />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

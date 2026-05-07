import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  Projects,
  ForYou,
  ProjectView,
  Login,
  Register,
  NotFound,
  ConfigView
} from '@/pages'
import { Layout, ProtectedRoute, CreateModal } from '@/components'
import { AuthProvider, ThemeProvider, ToastProvider } from '@/context'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <Routes>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>

              <Route element={<ProtectedRoute />}>
                <Route path='/' element={<Layout />}>
                  <Route path='/foryou' element={<ForYou />}></Route>
                  <Route path='/projects' element={<Projects />}></Route>
                  <Route path='/projects/:id' element={<ProjectView />}></Route>
                  <Route path='/create' element={<CreateModal />}></Route>
                  <Route path='/config' element={<ConfigView/>}></Route>
                </Route>
              </Route>

              <Route path='*' element={<NotFound />}></Route>
            </Routes>
            </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

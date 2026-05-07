import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { CreateModal } from '../ui'

export function Layout() {
  return (
    <div className='flex h-screen w-full flex-col overflow-hidden bg-(--bg) text-gray-800 transition-colors'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />

        <main className='flex-1 overflow-x-hidden overflow-y-auto border-t border-gray-300 p-12'>
          <Outlet />
        </main>
      </div>

      <CreateModal></CreateModal>
    </div>
  )
}

import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function Layout() {
  return (
    <div className='flex h-screen w-full flex-col overflow-hidden bg-white text-gray-800'>
      <Header />

      <div className='flex flex-1 overflow-hidden'>
        <Sidebar />

        <main className='flex-1 overflow-x-hidden overflow-y-auto border-t border-gray-300 p-12'></main>
      </div>
    </div>
  )
}

import {
  Gem,
  ArrowLeftToLine,
  Plus,
  Search,
  Settings,
  Bell,
  User,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className='flex h-12 w-full justify-between px-4'>
      {/* LEFT */}
      <div className='flex w-56 items-center justify-between border-r border-gray-300'>
        <div className='flex cursor-pointer items-center gap-2'>
          <Gem className='h-5 w-5' />
          <Link to='/'>Nitelog</Link>
        </div>
        <div className='mr-2 cursor-pointer rounded-md px-2 py-1 hover:bg-gray-100'>
          <ArrowLeftToLine className='w-4' />
        </div>
      </div>

      {/* MIDDLE */}
      <div className='flex items-center gap-2'>
        <div className='flex w-lg items-center gap-2 rounded-md px-2 py-1 ring ring-gray-300'>
          <Search className='w-4' />
          Pesquisar
        </div>
        <Link
          to='/create'
          className='flex items-center rounded-md bg-blue-500 px-3 py-1 text-white'
        >
          <Plus className='w-4' />
          <p className='text-sm font-semibold'>Criar</p>
        </Link>
      </div>

      {/* RIGHT */}
      <div className='flex items-center gap-4'>
        <Bell />
        <Settings />
        <User />
      </div>
    </header>
  )
}

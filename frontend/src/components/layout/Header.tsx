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
import { Button } from '../ui'
import { useModal } from '@/hooks'

export const Header = () => {
  const openModal = useModal((state) => state.openModal)

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
        <Button onClick={openModal}>
          <Plus className='w-4'></Plus>
          Criar
        </Button>
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

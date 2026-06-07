import {
  ArrowLeftToLine,
  Plus,
  Search,
  Settings,
  Bell,
  User,
  LayoutTemplate,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../ui'
import { useDropdown, useModal } from '@/hooks'

interface HeaderProps {
  pName?: string
}

export const Header = ({ pName }: HeaderProps) => {
  const openModal = useModal((state) => state.openModal)
  const openDropdown = useDropdown((state) => state.openDropdown)

  return (
    <header className='flex h-12 w-full justify-between bg-(--bg) px-2 text-(--accent)'>
      {/* LEFT */}
      <div className='flex w-58 items-center border-r border-gray-300'>
        <div className='mr-2 flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-(--accent)'>
          <div className='flex items-center gap-2' onClick={openDropdown}>
            <LayoutTemplate className='w-4' />
            {pName == undefined && <p>Nitelog</p>}
            <p>{pName}</p>
          </div>
          <ArrowLeftToLine className='w-4' />
        </div>
      </div>

      {/* MIDDLE */}
      <div className='flex items-center gap-2'>
        <div className='flex w-lg items-center gap-2 rounded-md px-2 py-1 ring ring-(--accent)'>
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
        <Link to={'/config'}>
          <Settings />
        </Link>
        <User />
      </div>
    </header>
  )
}

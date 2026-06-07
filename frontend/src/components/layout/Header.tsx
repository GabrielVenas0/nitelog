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
    <header className='flex h-12 w-full justify-between bg-(--bg) px-2'>
      {/* LEFT */}
      <div className='flex w-58 items-center border-r border-(--border)'>
        <div className='mr-2 flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-1 hover:bg-(--accentedBg)'>
          <div
            className='flex items-center gap-2 text-(--textPrimary)'
            onClick={openDropdown}
          >
            <LayoutTemplate className='w-4' />
            {pName == undefined && <p>Nitelog</p>}
            <p>{pName}</p>
          </div>
          <ArrowLeftToLine className='w-4 text-(--textSecondary)' />
        </div>
      </div>

      {/* MIDDLE */}
      <div className='flex flex-1 items-center justify-center gap-2 px-8'>
        <div className='flex w-full max-w-md items-center gap-2 rounded-md border border-(--border) bg-(--bg) px-2 py-1 transition-all focus-within:border-(--accent) focus-within:ring-1 focus-within:ring-(--accent)'>
          <Search className='w-4 text-(--textMuted)' />
          <input
            type='text'
            placeholder='Pesquisar'
            className='w-full bg-transparent text-sm text-(--textPrimary) outline-none placeholder:text-(--textMuted)'
          />
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

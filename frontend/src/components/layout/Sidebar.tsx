import { Navlink } from '@/components/ui'
import { Flame, FolderOpen } from 'lucide-react'

export const Sidebar = () => {
  return (
    <div className='flex h-full w-60 flex-col border-r border-gray-300'>
      <nav className='flex flex-col gap-2 p-2'>
        <Navlink to='/foryou'>
          <Flame className='h-5 w-5' />
          Para você
        </Navlink>
        <Navlink to='/projects'>
          <FolderOpen className='h-5 w-5' />
          Projetos
        </Navlink>
      </nav>
    </div>
  )
}

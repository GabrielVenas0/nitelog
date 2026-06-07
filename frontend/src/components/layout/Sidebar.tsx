import { Navlink } from '@/components/ui'
import { Flame } from 'lucide-react'

export const Sidebar = () => {
  return (
    <aside className='flex h-full w-60 flex-col border-r border-(--border) bg-(--bg) transition-colors'>
      <nav className='flex flex-col gap-2 p-2'>
        <Navlink to='/foryou'>
          <Flame className='h-5 w-5' />
          Para você
        </Navlink>
      </nav>
    </aside>
  )
}

import { Flame, Kanban } from 'lucide-react'
import { Navlink } from '../ui'

interface ProjectSidebarProps {
  projectId: string
}

export const ProjectSidebar = ({ projectId }: ProjectSidebarProps) => {
  return (
    <aside className='flex h-full w-60 flex-col border-r border-(--border) bg-(--bg) text-(--accent) transition-colors'>
      <nav className='flex flex-col gap-2 p-2'>
        <Navlink to='/foryou'>
          <Flame className='h-5 w-5' />
          Para você
        </Navlink>
        <Navlink to={`/projects/${projectId}/kanban`}>
          <Kanban className='h-5 w-5' />
          Kanban
        </Navlink>
      </nav>
    </aside>
  )
}

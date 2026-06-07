// interface ProjectSidebarProps {
//   projectId: string
// }

import { Flame } from 'lucide-react'
import { Navlink } from '../ui'

// export const ProjectSidebar = ({ projectId }: ProjectSidebarProps) => {
export const ProjectSidebar = () => {
  return (
    <aside className='flex h-full w-60 flex-col border-r border-(--border) bg-(--bg) text-(--accent) transition-colors'>
      <nav className='flex flex-col gap-2 p-2'>
        <Navlink to='/foryou'>
          <Flame className='h-5 w-5' />
          Para você
        </Navlink>
        {/* Implementar arquivos do projeto: quadro kanban markdown etc*/}
      </nav>
    </aside>
  )
}

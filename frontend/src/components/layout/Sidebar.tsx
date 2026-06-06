import { GetExploreProjects, GetMyProjects } from '@/api'
import { Navlink } from '@/components/ui'
import type { Project } from '@/types'
import { isCancel } from 'axios'
import { Flame, FolderOpen } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Sidebar = () => {
  const [myProjects, setMyProjects] = useState<Project[]>([])
  const [expProjects, setExpProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadMyProjects() {
      try {
        const data = await GetMyProjects(controller.signal)
        setMyProjects(data)
      } catch (error) {
        if (isCancel(error)) return
        console.error('[GetMyProjects] Erro: ', error)
      } finally {
        setIsLoading(false)
      }
    }

    async function loadExploreProjects() {
      try {
        const data = await GetExploreProjects(controller.signal)
        setExpProjects(data)
      } catch (error) {
        if (isCancel(error)) return
        console.error('[GetMyProjects] Erro: ', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMyProjects()
    loadExploreProjects()

    return () => controller.abort()
  }, [])

  return (
    <aside className='flex h-full w-60 flex-col border-r bg-(--bg) text-(--accent) transition-colors'>
      <nav className='flex flex-col gap-2 p-2'>
        <Navlink to='/foryou'>
          <Flame className='h-5 w-5' />
          Para você
        </Navlink>
        <div className='m-2 mt-4 flex flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <FolderOpen className='h-5 w-5' />
            Projetos
          </div>
          <div className='flex flex-col gap-1 pl-4'>
            {isLoading}

            {!isLoading && myProjects.length === 0 && (
              <span>Nenhum projeto</span>
            )}

            {!isLoading &&
              myProjects.map((p) => (
                <Navlink key={p.id} to={`/projects/${p.id}`}>
                  {p.name}
                </Navlink>
              ))}
          </div>

          <div className='flex items-center gap-2'>
            <FolderOpen className='h-5 w-5' />
            Explorar
          </div>
          <div className='flex flex-col gap-1 pl-4'>
            {isLoading}

            {!isLoading && expProjects.length === 0 && (
              <span>Nenhum projeto</span>
            )}

            {!isLoading &&
              expProjects.map((p) => (
                <Navlink key={p.id} to={`/projects/${p.id}`}>
                  {p.name}
                </Navlink>
              ))}
          </div>
        </div>
      </nav>
    </aside>
  )
}

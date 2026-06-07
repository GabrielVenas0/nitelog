import { Outlet, useParams } from 'react-router-dom'
import { Header } from './Header'
import { ProjectSidebar } from './ProjectSidebar'
import { CreateModal, ProjectDropdown } from '../ui'
import { useEffect, useState } from 'react'
import { GetProjectById } from '@/api'
import type { Project } from '@/types'

export function ProjectLayout() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getProject() {
      if (!id) return
      setIsLoading(true)
      try {
        const data = await GetProjectById(id)
        setProject(data)
      } catch (error) {
        console.error('[GetProjectByID] Erro no ProjectLayout: ', error)
      } finally {
        setIsLoading(false)
      }
    }
    getProject()
  }, [id])

  if (!id) return <div>ID do projeto inválido.</div>
  if (!isLoading && !project) return <div>Projeto não encontrado.</div>

  return (
    <div className='flex h-screen w-full flex-col overflow-hidden bg-(--bg) text-gray-800 transition-colors'>
      {!isLoading && project && <Header pName={project.name} />}

      <div className='flex flex-1 overflow-hidden'>
        {/* <ProjectSidebar projectId={id} /> */}
        <ProjectSidebar />

        <main className='flex-1 overflow-x-hidden overflow-y-auto border-t border-gray-300 p-12'>
          <Outlet />
        </main>
      </div>

      <CreateModal />
      <ProjectDropdown />
    </div>
  )
}

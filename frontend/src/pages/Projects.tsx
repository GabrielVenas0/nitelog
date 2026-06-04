import { useEffect, useState } from 'react'
import { GetProjects } from '@/api'
import type { Project } from '@/types'
import { ProjectCard } from '@/components'
import { isCancel } from 'axios'

export function Projects() {
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const controller = new AbortController()
    async function loadProjects() {
      setLoading(true)
      try {
        const projectsData = await GetProjects(controller.signal)
        setProjects(projectsData || [])
      } catch (err) {
        if (isCancel(err)) {
          return
        } else {
          console.log('Erro no fetch dos projetos', err)
        }
      } finally {
        setLoading(false)
      }
    }

    loadProjects()

    return () => {
      controller.abort()
    }
  }, [])

  if (loading) {
    return <p>Buscando projetos...</p>
  }

  return (
    <div>
      {projects.length === 0 ? (
        <p>Nenhum projeto</p>
      ) : (
        <div className='grid grid-cols-6 gap-4'>
          {projects.map((p) => (
            <ProjectCard id={p.id} name={p.name} key={p.id} owner_id={p.owner_id}></ProjectCard>
          ))}
        </div>
      )}
    </div>
  )
}

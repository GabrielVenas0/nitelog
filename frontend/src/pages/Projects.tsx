import { useEffect, useState } from 'react'
import { getProjects } from '@/api'
import type { Project } from '@/types'
import { ProjectCard } from '@/components/ui/ProjectCard'

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects().then((dados) => setProjects(dados))
  }, [])

  return (
    <div>
      {projects.length === 0 ? (
        <p>Nenhum projeto</p>
      ) : (
        <div className='grid grid-cols-6 gap-4'>
          {projects.map((p) => (
            <ProjectCard ID={p.ID} Name={p.Name} key={p.ID}></ProjectCard>
          ))}
        </div>
      )}
    </div>
  )
}

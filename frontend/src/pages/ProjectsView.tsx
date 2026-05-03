import { GetProjectById, GetTasks } from '@/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Task } from '@/types'

export function ProjectView() {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const [projectName, setProjectName] = useState('')
  const { id } = useParams() as { id: string }

  useEffect(() => {
    async function loadTasks() {
      setLoading(true)
      try {
        const projectData = await GetProjectById(id)
        const tasksData = await GetTasks(id)
        setProjectName(projectData.name)
        setTasks(tasksData || [])
      } catch (err) {
        console.log('Erro no fetch dos projetos', err)
      } finally {
        setLoading(false)
      }
    }

    loadTasks()
  }, [id])

  if (loading) {
    return <p>Buscando tarefas...</p>
  }

  return (
    <div>
      <h1>{projectName}</h1>
      {tasks.length === 0 ? (
        <p>Nenhuma tarefa</p>
      ) : (
        <div className='grid grid-cols-6 gap-4'>
          {tasks.map((t) => (
            <div key={t.id} className='rounded-sm border border-gray-300'>
              <h3>{t.name}</h3>
              <span>{t.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

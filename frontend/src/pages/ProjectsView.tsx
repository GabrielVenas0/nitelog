import { GetTasks } from '@/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Task } from '@/types'

export function ProjectView() {
  const [loading, setLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([])
  const { id } = useParams() as { id: string }

  useEffect(() => {
    async function loadTasks() {
      setLoading(true)
      try {
        const tasksData = await GetTasks(id)
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
      <h1>Nome do projeto: Nitelog</h1>
      {tasks.length === 0 ? (
        <p>Nenhum projeto</p>
      ) : (
        <div className='grid grid-cols-6 gap-4'>
          {tasks.map((t) => (
            <div key={t.ID}>
              <p>Nome: {t.Name}</p>
              <p>TaskID: {t.ID}</p>
              <p>ProjectID: {t.ProjectID}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

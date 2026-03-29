import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { CreateProjectApi, CreateTaskApi, GetProjects } from '@/api'
import { Select, Button, Input } from '@/components'
import type { Project } from '@/types'
import { isCancel } from 'axios'

export function CreateModal() {
  const [itemType, setItemType] = useState('task')
  const [projects, setProjects] = useState<Project[]>([])
  const { user } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    const controller = new AbortController()
    async function loadProjects() {
      try {
        const projectData = await GetProjects(controller.signal)
        setProjects(projectData || [])
      } catch (error) {
        if (isCancel(error)) {
          return
        }
        console.error('[GetProjects] Erro no CreateModal: ', error)
      }
    }
    loadProjects()

    return () => {
      controller.abort()
    }
  }, [])

  async function submit(formData: FormData) {
    if (itemType === 'project') {
      const name = formData.get('projectname')

      try {
        await CreateProjectApi(name)
        navigate('/projects')
      } catch (error) {
        console.error('[CreateProject] Erro no CreateModal: ', error)
      }
    } else {
      const projectId = formData.get('project') as string
      const name = formData.get('taskname')
      try {
        await CreateTaskApi(projectId, name)
      } catch (error) {
        console.error('[CreateTask] Erro no CreateModal', error)
      }
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex w-md flex-col gap-2 px-6 py-4'>
        <div className='flex justify-between gap-2'>
          <h1 className='text-2xl'>
            {itemType === 'project' ? 'Criar Projeto' : 'Criar Tarefa'}
          </h1>
          <button className='px-2 text-lg font-semibold hover:bg-gray-300'>
            X
          </button>
        </div>
        <form action={submit} className='flex flex-col gap-2'>
          <Select
            name='itemType'
            label='Tipo do Ticket'
            className='rounded-sm bg-white'
            onChange={(e) => setItemType(e.target.value)}
            required
          >
            <option value='task'>Tarefa</option>
            {user?.role === 'admin' && <option value='project'>Projeto</option>}
          </Select>

          {itemType === 'project' ? (
            <Input name='projectname' label='Nome do Projeto' required />
          ) : (
            <div>
              <Select name='project' label='Projeto' required>
                {projects.length === 0 ? (
                  <option value=''>Sem projetos</option>
                ) : (
                  <optgroup key={'optGroup'}>
                    {projects.map((p) => (
                      <option key={p.ID} value={p.ID}>
                        {p.Name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </Select>
              <Input name='taskname' label='Nome da tarefa' required></Input>
              {/* <Input
                name='taskdesc'
                label='Descrição da tarefa'
                required
              ></Input>
              <Select name='assignee' label='Responsável'>
                <option value='temp1'></option>
                <option value='temp2'>Gabriel Venas</option>
              </Select> */}
            </div>
          )}
          <Button type='submit'>Concluir</Button>
        </form>
      </div>
    </div>
  )
}

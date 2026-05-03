import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { CreateProjectApi, CreateTaskApi, GetProjects } from '@/api'
import { Select, Button, Input, CloseButton } from '@/components'
import type { Project } from '@/types'
import { isCancel } from 'axios'
import { useModal } from '@/hooks'

export function CreateModal() {
  const isOpen = useModal((state) => state.isOpen)
  const closeModal = useModal((state) => state.closeModal)

  const [itemType, setItemType] = useState('task')
  const [projects, setProjects] = useState<Project[]>([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOpen) return

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal()
      }
    }

    document.addEventListener('keydown', handleKeydown)

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
      document.removeEventListener('keydown', handleKeydown);
      controller.abort()
    }
  }, [isOpen, closeModal])


  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

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
        closeModal()
      } catch (error) {
        console.error('[CreateTask] Erro no CreateModal', error)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className='flex h-screen fixed inset-0 z-50 bg-black/50 items-center justify-center' onClick={closeModal}>
      <div className='flex w-md flex-col gap-2 px-6 py-4 bg-white rounded-sm' onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-between gap-2'>
          <h1 className='text-2xl'>
            {itemType === 'project' ? 'Criar Projeto' : 'Criar Tarefa'}
          </h1>
          <CloseButton></CloseButton>
        </div>
        <form onSubmit={submit} className='flex flex-col gap-2'>
          <Select
            name='itemType'
            label='Tipo do Ticket'
            className='rounded-sm bg-white'
            onChange={(e) => setItemType(e.target.value)}
            required
          >
            <option value='task'>Tarefa</option>
            {user?.role === 'Admin' && <option value='project'>Projeto</option>}
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
                      <option key={p.id} value={p.id}>
                        {p.name}
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

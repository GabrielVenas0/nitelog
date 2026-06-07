import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { CreateProjectApi, CreateTaskApi, GetMyProjects } from '@/api'
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
        const projectData = await GetMyProjects(controller.signal)
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
      document.removeEventListener('keydown', handleKeydown)
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
    <div
      // Adicionado backdrop-blur-sm para desfoque do fundo
      className='fixed inset-0 z-50 flex h-screen items-center justify-center bg-black/40 backdrop-blur-sm'
      onClick={closeModal}
    >
      <div
        // Aumentado o padding (p-6), arredondamento (rounded-xl) e sombra (shadow-2xl)
        className='flex w-full max-w-md flex-col gap-4 rounded-xl border border-(--border) bg-(--bg) p-6 shadow-2xl'
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER DO MODAL */}
        <div className='flex items-center justify-between border-b border-(--border) pb-4'>
          <div>
            <h1 className='text-lg font-bold text-(--textPrimary)'>
              {itemType === 'project' ? 'Novo Projeto' : 'Nova Tarefa'}
            </h1>
            <p className='text-sm text-(--textSecondary)'>
              Preencha os detalhes abaixo para continuar.
            </p>
          </div>
          <CloseButton onClick={closeModal} />
        </div>

        <form onSubmit={submit} className='mt-2 flex flex-col gap-5'>
          <Select
            name='itemType'
            label='O que você deseja criar?'
            onChange={(e) => setItemType(e.target.value)}
            required
          >
            <option value='task'>Tarefa</option>
            {user?.role === 'Admin' && <option value='project'>Projeto</option>}
          </Select>

          {itemType === 'project' ? (
            <Input
              name='projectname'
              label='Nome do Projeto'
              placeholder='Ex: Sotero SOS'
              required
            />
          ) : (
            <div className='flex flex-col gap-5'>
              <Select name='project' label='Vincular ao Projeto' required>
                {projects.length === 0 ? (
                  <option value=''>Sem projetos disponíveis</option>
                ) : (
                  <optgroup label='Seus Projetos'>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </Select>
              <Input
                name='taskname'
                label='Título da Tarefa'
                placeholder='Ex: Corrigir bug no formulário'
                required
              />
            </div>
          )}

          <div className='mt-4 flex justify-end gap-3'>
            <Button type='button' onClick={closeModal}>
              Cancelar
            </Button>
            <Button type='submit'>
              {itemType === 'project' ? 'Criar Projeto' : 'Criar Tarefa'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

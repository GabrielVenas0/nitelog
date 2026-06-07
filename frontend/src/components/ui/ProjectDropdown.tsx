import { GetMyProjects } from '@/api'
import { useDropdown } from '@/hooks'
import type { Project } from '@/types'
import { isCancel } from 'axios'
import { useEffect, useState } from 'react'
import { LayoutTemplate } from 'lucide-react'
import { Navlink } from './Navlink'

export const ProjectDropdown = () => {
  const isOpen = useDropdown((state) => state.isOpen)
  const closeDropdown = useDropdown((state) => state.closeDropdown)

  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isOpen) return

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeDropdown()
      }
    }

    document.addEventListener('keydown', handleKeydown)

    const controller = new AbortController()

    async function loadProjects() {
      try {
        const data = await GetMyProjects(controller.signal)
        setProjects(data || [])
      } catch (error) {
        if (isCancel(error)) return
        console.error('[GetMyProjects] Erro no ProjectPropdown: ', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadProjects()

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      controller.abort()
    }
  }, [isOpen, closeDropdown])

  if (!isOpen) return null

  return (
    <div
      className='fixed inset-0 z-50 flex h-screen items-center justify-center'
      onClick={closeDropdown}
    >
      <div
        className='absolute top-12 left-2 flex rounded-xl border border-gray-400 bg-white'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex w-70 flex-col'>
          <div className='border-gray-20 flex flex-col gap-2 rounded-t-xl border-b border-gray-400 bg-white p-3'>
            <div className='flex items-center gap-2'>
              <LayoutTemplate className='h-10 w-10'></LayoutTemplate>
              <div>
                <p className='text-sm font-bold text-gray-500'>
                  Nome do Projeto
                </p>
                <p className='text-sm text-gray-500'>0 membros</p>
              </div>
            </div>

            <div className='flex items-center gap-2 text-xs font-semibold text-gray-500'>
              <button className='rounded-md border border-gray-300 px-2 py-1 hover:bg-white'>
                Configurações
              </button>
              <button className='rounded-md border border-gray-300 px-2 py-1 hover:bg-white'>
                Convidar membros
              </button>
            </div>
          </div>

          <div className='rounded-b-xl bg-gray-100 px-3 py-2'>
            <div>
              {!isLoading && projects.length === 0 && <span>Novo espaço</span>}
              {!isLoading &&
                projects.map((p) => (
                  <Navlink key={p.id} to={`/projects/${p.id}`}>
                    {p.name}
                  </Navlink>
                ))}
            </div>

            <div>
              <p>Novo espaço</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

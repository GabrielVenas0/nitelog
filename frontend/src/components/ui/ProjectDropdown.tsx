import { GetMyProjects } from '@/api'
import { useDropdown } from '@/hooks'
import type { Project } from '@/types'
import { isCancel } from 'axios'
import { useEffect, useState } from 'react'
import { LayoutTemplate, PlusIcon } from 'lucide-react'
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
        className='absolute top-12 left-2 flex rounded-xl border border-(--border) bg-(--bg) shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex w-70 flex-col'>
          <div className='flex flex-col gap-2 rounded-t-xl border-b border-(--border) bg-(--bg) p-3'>
            <div className='flex items-center gap-2'>
              {/* em breve criar uma logo e logo do projeto */}
              <LayoutTemplate className='h-10 w-10 text-(--textSecondary)' />
              <div className='flex flex-col'>
                <span className='text-sm leading-tight font-bold text-(--textPrimary)'>
                  Nome do Projeto
                </span>
                <span className='text-xs font-medium text-(--textMuted)'>
                  0 membros
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2 text-xs font-semibold'>
              <button className='rounded-md border border-(--border) px-2 py-1 text-(--textSecondary) transition-colors hover:bg-(--fg) hover:text-(--textPrimary)'>
                Configurações
              </button>
              <button className='rounded-md border border-(--border) px-2 py-1 text-(--textSecondary) transition-colors hover:bg-(--fg) hover:text-(--textPrimary)'>
                Convidar membros
              </button>
            </div>
          </div>

          <div className='rounded-b-xl bg-(--bg) px-3 py-2'>
            <div className='flex flex-col'>
              {!isLoading &&
                projects.map((p) => (
                  <Navlink key={p.id} to={`/projects/${p.id}`}>
                    <LayoutTemplate className='h-4 w-4'></LayoutTemplate>
                    {p.name}
                  </Navlink>
                ))}
            </div>

            <div>
              <button className='flex w-full items-center gap-2 rounded-md p-1.5 text-sm text-(--accent)/80 transition-colors hover:bg-(--accentedBg) hover:text-(--accent)'>
                <PlusIcon className='h-4 w-4'></PlusIcon>Novo espaço
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

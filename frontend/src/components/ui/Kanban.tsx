import { GetTasks } from '@/api'
import { NotFound } from '@/pages'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export const Kanban = () => {
  const { id } = useParams<{ id: string }>()

  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['project-tasks', id],
    queryFn: ({ signal }) => GetTasks(id!, signal),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  })

  if (!id) return <NotFound></NotFound>

  if (isLoading)
    return (
      <div className='flex h-full items-center justify-center text-(--textMuted)'>
        <span>Carregando quadro...</span>
      </div>
    )

  if (isError)
    return (
      <div className='text-(--error)'>
        Erro ao carregar as tarefas do servidor.
      </div>
    )

  return (
    <div className='flex h-full gap-4 overflow-x-auto'>
      {/* Em breve criar tabela com colunas com ações, status, descrição, label e etc*/}
      {/* Em breve criar botão para criar uma nova tarefa no final da coluna*/}
      <div className='flex h-max w-80 flex-col gap-3 rounded-lg bg-(--fg) p-4'>
        <h2 className='text-sm font-bold text-(--textSecondary) uppercase'>
          Backlog
        </h2>

        {tasks?.length === 0 && (
          <span className='text-sm text-(--textMuted)'>
            Nenhuma tarefa encontrada.
          </span>
        )}

        {tasks?.map((t) => (
          <div
            key={t.id}
            className='flex cursor-pointer flex-col gap-1 rounded-md border border-(--border) bg-(--bg) p-3 shadow-sm transition-colors hover:border-(--accent)'
          >
            <p className='text-sm font-semibold text-(--textPrimary)'>
              {t.name}
            </p>
            <span className='text-xs font-medium text-(--textMuted)'>
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

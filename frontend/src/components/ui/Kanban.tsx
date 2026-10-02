import { GetTasks, DeleteTaskApi } from '@/api'
import { NotFound } from '@/pages'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import EllipsisMenu, { type MenuItem } from './EllipsisMenu'

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
    <div className='flex h-full gap-4 overflow-x-auto p-4'>
      <div className='flex h-max w-80 flex-col gap-3 rounded-lg bg-(--fg) p-4'>
        <h2 className='text-sm font-bold text-(--textSecondary) uppercase'>
          Backlog
        </h2>

        {tasks?.length === 0 && (
          <span className='text-sm text-(--textMuted)'>
            Nenhuma tarefa encontrada.
          </span>
        )}

        {tasks?.map((t) => {
          const taskActions: MenuItem[] = [
            {
              label: 'Editar',
              onClick: () => console.log(`Editar tarefa ${t.id}`),
            },
            {
              label: 'Excluir',
              onClick: () => DeleteTaskApi(id, t.id),
              variant: 'danger',
            },
          ]

          return (
            <div
              key={t.id}
              onClick={() => console.log(`Abrir detalhes da tarefa ${t.id}`)}
              className='flex cursor-pointer items-start justify-between gap-2 rounded-md border border-(--border) bg-(--bg) p-3 shadow-sm transition-colors hover:border-(--accent)'
            >
              <div className='flex min-w-0 flex-col gap-1'>
                <p className='truncate text-sm font-semibold text-(--textPrimary)'>
                  {t.name}
                </p>
                <span className='text-xs font-medium text-(--textMuted)'>
                  {t.status}
                </span>
              </div>

              <EllipsisMenu items={taskActions} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { useAuth } from '@/hooks/auth'

export function ForYou() {
  const { user, isLoading } = useAuth()

  return (
    <div className='flex flex-row'>
      <div className='flex h-full w-3/4 flex-col'>
        <div className='w-full border-b border-(--border) pb-3'>
          <h2 className='text-2xl font-semibold text-(--textPrimary)'>
            Bom dia, {isLoading ? 'Pessoa abençoada' : user?.username}!
          </h2>
          <p className='text-(--textSecondary)'>
            Você concluiu 32 tarefas nessa semana. Continue assim!
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-xl font-semibold text-(--textPrimary)'>
            Espaços recomendados
          </h2>
        </div>

        <div className='flex gap-2 border-t border-(--border) pt-4 text-[15px] text-(--textSecondary)'>
          <button className='rounded-md bg-(--accent)/85 px-2 py-1 text-white hover:bg-(--accent)'>
            Concluído
          </button>
          <button className='rounded-md bg-(--border)/70 px-2 py-1 hover:bg-(--border)'>
            Visualizado
          </button>
          <button className='rounded-md bg-(--border)/70 px-2 py-1 hover:bg-(--border)'>
            Atribuído a mim
          </button>
          <button className='rounded-md bg-(--border)/70 px-2 py-1 hover:bg-(--border)'>
            Marcado com estrela
          </button>
        </div>
      </div>

      {/* ASIDE */}
      <div className='flex h-full flex-1 flex-col text-(--textSecondary)'>
        <p>Avisos</p>
        <p>Calendário</p>
        <p>Ranking</p>
      </div>
    </div>
  )
}

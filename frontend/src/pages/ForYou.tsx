import { useAuth } from '@/hooks/auth'

export function ForYou() {
  const { user, isLoading } = useAuth()

  return (
    <div className='flex flex-row'>
      <div className='flex h-full w-3/4 flex-col'>
        <div className='w-full border-b border-gray-300 pb-3'>
          <h2 className='text-2xl font-bold text-gray-700'>
            Bom dia, {isLoading ? 'Pessoa abençoada' : user?.username}!
          </h2>
          <p className='text-gray-500'>
            Você concluiu 32 tarefas nessa semana. Continue assim!
          </p>
        </div>

        <div className='py-4'>
          <h2 className='text-xl font-bold text-gray-700'>
            Espaços recomendados
          </h2>
        </div>

        <div className='flex gap-2 border-t border-gray-300 pt-4 text-[15px] text-gray-700'>
          <button className='rounded-md bg-blue-400 px-2 py-1 text-white hover:bg-blue-500'>
            Concluído
          </button>
          <button className='rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300'>
            Visualizado
          </button>
          <button className='rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300'>
            Atribuído a mim
          </button>
          <button className='rounded-md bg-gray-200 px-2 py-1 hover:bg-gray-300'>
            Marcado com estrela
          </button>
        </div>
      </div>

      {/* ASIDE */}
      <div className='flex h-full flex-1 flex-col'>
        <p>Avisos</p>
        <p>Calendário</p>
        <p>Ranking</p>
      </div>
    </div>
  )
}

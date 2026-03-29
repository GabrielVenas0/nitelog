import { Link } from 'react-router-dom'

export const NotFound = () => (
  <div className='flex h-screen flex-col items-center justify-center gap-4'>
    <h1 className='text-9xl font-bold text-gray-700'>404</h1>
    <h1 className='text-lg font-semibold text-gray-700'>
      Oops, Página Não Encontrada!
    </h1>
    <Link to='/foryou' className='rounded-sm bg-gray-700 px-3 py-2 text-white'>
      Voltar para a Home
    </Link>
  </div>
)

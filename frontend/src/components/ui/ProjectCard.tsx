import type { Project } from '@/types'
import { Link } from 'react-router-dom'

export const ProjectCard = ({ id, name }: Project) => {
  return (
    <Link
      to={`/projects/${id}`}
      className='cursor-pointer rounded-md bg-gray-100 p-3 hover:bg-gray-200'
    >
      <div className='flex items-center justify-between'>
        <h2>Nome: {name}</h2>
        <button>Visualizar</button>
      </div>
    </Link>
  )
}

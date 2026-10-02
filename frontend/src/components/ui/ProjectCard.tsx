import type { Project } from '@/types'
import { Link } from 'react-router-dom'

export const ProjectCard = ({ id, name }: Project) => {
  return (
    <Link
      to={`/projects/${id}`}
      className='cursor-pointer rounded-md border border-gray-200 bg-white p-3 hover:bg-gray-200'
    >
      <div className='flex items-center justify-between'>
        <h2>{name}</h2>
      </div>
    </Link>
  )
}

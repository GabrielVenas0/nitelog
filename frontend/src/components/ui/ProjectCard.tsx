import type { Project } from '@/types'
import { Link } from 'react-router-dom'

export const ProjectCard = ({ ID, Name }: Project) => {
  return (
    <Link
      to={`/projects/${ID}`}
      className='cursor-pointer rounded-md bg-gray-100 p-3 hover:bg-gray-200'
    >
      <div className='flex items-center justify-between'>
        <h2>{Name}</h2>
      </div>

      <div></div>
    </Link>
  )
}

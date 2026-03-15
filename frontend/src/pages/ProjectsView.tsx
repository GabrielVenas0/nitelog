import { useParams } from 'react-router-dom'

export function ProjectView() {
  const { id } = useParams()

  return (
    <div>
      <h1>{id}</h1>
    </div>
  )
}

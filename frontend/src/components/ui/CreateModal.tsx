import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { CreateProjectApi } from '@/api'
import { Select, Button, Input } from '@/components/ui'

export function CreateModal() {
  const [itemType, setItemType] = useState('task')
  const { user } = useAuth()

  const navigate = useNavigate()

  async function submit(formData: FormData) {
    if (itemType === 'project') {
      const name = formData.get('projectname')

      try {
        await CreateProjectApi(name)
        navigate('/projects')
      } catch (error) {
        console.error('Erro no CreateModal: ', error)
      }
    } else {
      console.log('Tentativa de criar tarefa.')
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex w-md flex-col gap-2 px-6 py-4'>
        <div className='flex justify-between gap-2'>
          <h1 className='text-2xl'>
            {itemType === 'project' ? 'Criar Projeto' : 'Criar Tarefa'}
          </h1>
          <button className='px-2 text-lg font-semibold hover:bg-gray-300'>
            X
          </button>
        </div>
        <form action={submit} className='flex flex-col gap-2'>
          <Select
            name='itemType'
            label='Tipo do Ticket'
            className='rounded-sm bg-white'
            onChange={(e) => setItemType(e.target.value)}
            required
          >
            <option value='task'>Tarefa</option>
            {user?.role === 'admin' && <option value='project'>Projeto</option>}
          </Select>

          {itemType === 'project' ? (
            <Input name='projectname' label='Nome do Projeto' required />
          ) : (
            <h1>Formulário de tarefa em andamento...</h1>
          )}
          <Button type='submit'>Concluir</Button>
        </form>
      </div>
    </div>
  )
}

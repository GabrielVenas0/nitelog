import { GetMeApi, RegisterApi } from '@/api/auth'
import { Button, Input } from '@/components/ui'
import { useAuth } from '@/hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

export function Register() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  async function submit(formData: FormData) {
    const username = formData.get('username')
    const password = formData.get('password')
    const email = formData.get('email')

    try {
      await RegisterApi({ username, password, email })
      const userData = await GetMeApi()
      setUser(userData)
      navigate('/foryou')
    } catch (error) {
      console.error('Erro ao criar conta: ', error)
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col rounded-sm border border-gray-300 p-6'>
        <form action={submit} className='flex flex-col gap-4'>
          <h1 className='text-center text-2xl'>Registre-se</h1>
          <Input type='text' name='username' placeholder='Usuário' required />
          <Input type='password' name='password' placeholder='Senha' required />
          <Input type='email' name='email' placeholder='Email' required />

          <p>
            Já possuí uma conta? <Link to='/login'>Entre</Link>
          </p>

          <Button type='submit'>Entrar</Button>
        </form>
      </div>
    </div>
  )
}

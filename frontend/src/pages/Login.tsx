import { GetMeApi, LoginApi } from '@/api/auth'
import { Button, Input } from '@/components/ui'
import { useAuth } from '@/hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

export function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  async function submit(formData: FormData) {
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      await LoginApi({ username, password })
      const userData = await GetMeApi()
      setUser(userData)
      navigate('/foryou')
    } catch (error) {
      console.error('Erro no login: ', error)
      alert('Credenciais inválidas!')
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex w-xs flex-col rounded-sm border border-(--border) p-6'>
        <form action={submit} className='flex flex-col gap-4'>
          <h1 className='text-center text-2xl font-semibold text-(--textPrimary)'>
            Login
          </h1>
          <Input
            type='text'
            name='username'
            placeholder='Usuário ou Email'
            required
          />
          <Input type='password' name='password' placeholder='Senha' required />

          <p className='text-(--textSecondary)'>
            Não possuí uma conta?{' '}
            <Link to='/register' className='text-blue-500 hover:text-blue-600'>
              Registre-se
            </Link>
          </p>

          <Button type='submit'>Entrar</Button>
        </form>
      </div>
    </div>
  )
}

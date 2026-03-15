import { LoginApi } from '@/api/auth'
import { useNavigate } from 'react-router-dom'

export function Auth() {
  const navigate = useNavigate()

  async function submit(formData: FormData) {
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      await LoginApi({ username, password })
      // navigate('/foryou')
    } catch (error) {
      console.error('Erro no login: ', error)
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col rounded-sm border border-gray-300 p-6'>
        <form action={submit} className='flex flex-col gap-4'>
          <h1 className='text-center text-2xl'>Login</h1>
          <input
            type='text'
            name='username'
            placeholder='Usuário ou Email'
            className='border-sm border-b border-gray-300 px-2 py-1 transition-colors duration-500 outline-none'
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Senha'
            className='border-sm border-b border-gray-300 px-2 py-1 transition-colors duration-500 outline-none'
            required
          />

          <p>
            Não possuí uma conta? <a href='/register'>Registre-se</a>
          </p>

          <button
            type='submit'
            className='cursor-pointer rounded-sm bg-blue-400 py-2 text-white transition-colors duration-500 hover:bg-blue-500'
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}

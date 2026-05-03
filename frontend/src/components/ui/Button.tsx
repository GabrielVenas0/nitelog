import { forwardRef, type ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Futuramente variant?: e isLoading?:
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className='cursor-pointer rounded-sm bg-blue-400 p-1 text-white transition-colors duration-500 hover:bg-blue-500 flex justify-center items-center'
      >
        {children}
      </button>
    )
  },
)

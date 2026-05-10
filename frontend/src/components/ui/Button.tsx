import { forwardRef, type ButtonHTMLAttributes } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className='flex cursor-pointer items-center justify-center rounded-sm bg-blue-400 p-1 text-white transition-colors duration-500 hover:bg-blue-500'
    >
      {children}
    </button>
  )
})

import { forwardRef, useId, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id || generatedId
    return (
      <div className='flex w-full flex-col gap-1'>
        {label && <label htmlFor={inputId}>{label}</label>}
        <input
          ref={ref}
          {...props}
          id={inputId}
          className='border-sm border-b border-gray-300 px-2 py-1 transition-colors duration-500 outline-none'
        ></input>
      </div>
    )
  },
)

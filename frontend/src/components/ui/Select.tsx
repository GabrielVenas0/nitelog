import { forwardRef, useId, type SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, children, id, ...props }, ref) => {
    const generatedId = useId()
    const selectId = id || generatedId
    return (
      <div className='flex w-full flex-col gap-1'>
        <label htmlFor={selectId}>{label}</label>
        <select
          ref={ref}
          {...props}
          id={selectId}
          className='border-sm border-b border-gray-300 px-2 py-1 transition-colors duration-500 outline-none'
        >
          {children}
        </select>
      </div>
    )
  },
)

import { forwardRef, useId, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id || generatedId
    return (
      <div className='flex w-full flex-col gap-1.5'>
        {label && (
          <label
            htmlFor={inputId}
            className='text-sm font-semibold text-(--textSecondary)'
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          id={inputId}
          className='w-full rounded-md border border-(--border) px-3 py-2 text-sm text-(--textPrimary) transition-all outline-none placeholder:text-(--textMuted) focus:border-(--accent) focus:ring-1 focus:ring-(--accent)'
        />
      </div>
    )
  },
)

import { forwardRef, useId, type SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, children, id, className = '', ...props }, ref) => {
    const generatedId = useId()
    const selectId = id || generatedId
    return (
      <div className='flex w-full flex-col gap-1.5'>
        {label && (
          <label
            htmlFor={selectId}
            className='text-sm font-semibold text-(--textSecondary)'
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          {...props}
          id={selectId}
          className={`w-full appearance-none rounded-md border border-(--border) bg-(--bg) px-3 py-2 text-sm text-(--textPrimary) transition-all outline-none focus:border-(--accent) focus:ring-1 focus:ring-(--accent) ${className}`}
        >
          {children}
        </select>
      </div>
    )
  },
)

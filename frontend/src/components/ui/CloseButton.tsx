import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { X } from 'lucide-react'
import { useModal } from '@/hooks'

export const CloseButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...props }, ref) => {
  const closeModal = useModal((state) => state.closeModal)
  return (
    <button
      ref={ref}
      {...props}
      className='cursor-pointer rounded-sm bg-(--border) p-1 text-(--textPrimary) transition-colors duration-500 hover:bg-(--border)/50 hover:text-(--textSecondary)'
      aria-label='Close'
      type='button'
      onClick={closeModal}
    >
      <X />
    </button>
  )
})

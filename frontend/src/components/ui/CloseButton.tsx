import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { X } from 'lucide-react'
import { useModal } from '@/hooks'

interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ ...props }, ref) => {
    const closeModal = useModal((state) => state.closeModal)
    return (
      <button
        ref={ref}
        {...props}
        className='cursor-pointer rounded-sm bg-gray-400 p-1 text-white transition-colors duration-500 hover:bg-gray-500'
        aria-label='Close'
        type='button'
        onClick={closeModal}
      >
        <X />
      </button>
    )
  },
)

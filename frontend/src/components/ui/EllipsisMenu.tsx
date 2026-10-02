import { useState, useEffect, useRef } from 'react'

export interface MenuItem {
  label: string
  onClick: () => void
  variant?: 'default' | 'danger'
}

interface EllipsisMenuProps {
  items: MenuItem[]
}

export default function EllipsisMenu({ items }: EllipsisMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  return (
    <div className='relative inline-block text-left' ref={menuRef}>
      {/* Botão de Três Pontos */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center justify-center rounded-full p-2 transition-colors hover:bg-gray-100 focus:outline-none'
        aria-label='Opções'
      >
        <svg
          className='h-5 w-5 text-gray-600'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className='absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md border border-gray-200 bg-white py-1 shadow-lg'>
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.onClick()
                setIsOpen(false)
              }}
              className={`w-full px-4 py-2 text-left text-sm transition-colors first:rounded-t-md last:rounded-b-md ${
                item.variant === 'danger'
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

import { create } from 'zustand'

interface ModalState {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

interface DropdownState {
  isOpen: boolean
  openDropdown: () => void
  closeDropdown: () => void
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))

export const useDropdown = create<DropdownState>((set) => ({
  isOpen: false,
  openDropdown: () => set({ isOpen: true }),
  closeDropdown: () => set({ isOpen: false }),
}))

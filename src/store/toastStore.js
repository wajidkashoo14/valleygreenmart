import { create } from 'zustand'

let id = 0

export const useToastStore = create((set) => ({
  toasts: [],

  add: (message, type = 'success') => {
    const toastId = ++id
    set(state => ({
      toasts: [...state.toasts, { id: toastId, message, type }],
    }))
    setTimeout(() => {
      set(state => ({ toasts: state.toasts.filter(t => t.id !== toastId) }))
    }, 2800)
  },

  remove: (toastId) => {
    set(state => ({ toasts: state.toasts.filter(t => t.id !== toastId) }))
  },
}))

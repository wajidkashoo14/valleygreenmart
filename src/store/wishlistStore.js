import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: new Set(),

      toggle: (productId) => {
        set(state => {
          const next = new Set(state.items)
          if (next.has(productId)) next.delete(productId)
          else next.add(productId)
          return { items: next }
        })
      },

      has: (productId) => get().items.has(productId),

      clear: () => set({ items: new Set() }),
    }),
    {
      name: 'vgm-wishlist',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name)
          if (!str) return null
          const data = JSON.parse(str)
          return { ...data, state: { ...data.state, items: new Set(data.state.items) } }
        },
        setItem: (name, value) => {
          const data = { ...value, state: { ...value.state, items: [...value.state.items] } }
          localStorage.setItem(name, JSON.stringify(data))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)

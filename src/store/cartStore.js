import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: {},      // { [productId]: quantity }
      coupon: null,

      addItem: (productId, qty = 1) => {
        set(state => ({
          items: {
            ...state.items,
            [productId]: (state.items[productId] || 0) + qty,
          },
        }))
      },

      removeItem: (productId) => {
        set(state => {
          const next = { ...state.items }
          delete next[productId]
          return { items: next }
        })
      },

      updateQty: (productId, qty) => {
        if (qty <= 0) {
          get().removeItem(productId)
          return
        }
        set(state => ({
          items: { ...state.items, [productId]: qty },
        }))
      },

      clearCart: () => set({ items: {}, coupon: null }),

      applyCoupon: (code) => {
        const coupons = { 'FRESH10': 10, 'KASHMIR20': 20, 'ORGANIC15': 15 }
        if (coupons[code.toUpperCase()]) {
          set({ coupon: { code: code.toUpperCase(), discount: coupons[code.toUpperCase()] } })
          return true
        }
        return false
      },

      removeCoupon: () => set({ coupon: null }),

      get totalItems() {
        return Object.values(get().items).reduce((a, b) => a + b, 0)
      },
    }),
    { name: 'vgm-cart' }
  )
)

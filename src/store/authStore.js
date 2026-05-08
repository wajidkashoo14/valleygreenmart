import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      // Simulated login — replace body with real API call
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        await new Promise(r => setTimeout(r, 1000)) // simulate network
        // Mock validation
        if (password.length < 6) {
          set({ isLoading: false, error: 'Invalid email or password.' })
          return false
        }
        const user = {
          id: 'usr_' + Math.random().toString(36).slice(2, 9),
          name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(email)}&backgroundColor=2d7a50&textColor=ffffff`,
          phone: '',
          address: '',
          joinedAt: new Date().toISOString(),
        }
        set({ user, token: 'mock_jwt_' + Date.now(), isLoading: false, error: null })
        return true
      },

      // Simulated register
      register: async (name, email, password) => {
        set({ isLoading: true, error: null })
        await new Promise(r => setTimeout(r, 1200))
        if (password.length < 6) {
          set({ isLoading: false, error: 'Password must be at least 6 characters.' })
          return false
        }
        const user = {
          id: 'usr_' + Math.random().toString(36).slice(2, 9),
          name,
          email,
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=2d7a50&textColor=ffffff`,
          phone: '',
          address: '',
          joinedAt: new Date().toISOString(),
        }
        set({ user, token: 'mock_jwt_' + Date.now(), isLoading: false, error: null })
        return true
      },

      // Google OAuth (simulated)
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        await new Promise(r => setTimeout(r, 800))
        const user = {
          id: 'usr_google_' + Math.random().toString(36).slice(2, 9),
          name: 'Ahmad Mir',
          email: 'ahmad.mir@gmail.com',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
          phone: '+91 98765 43210',
          address: 'Lal Chowk, Srinagar',
          joinedAt: new Date().toISOString(),
        }
        set({ user, token: 'mock_google_jwt_' + Date.now(), isLoading: false })
        return true
      },

      logout: () => set({ user: null, token: null, error: null }),

      updateProfile: (updates) => set(state => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),

      clearError: () => set({ error: null }),

      get isLoggedIn() { return !!get().token },
    }),
    { name: 'vgm-auth' }
  )
)

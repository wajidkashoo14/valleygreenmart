import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useCartStore } from './cartStore'
import { useWishlistStore } from './wishlistStore'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../services/firebase'

const googleProvider = new GoogleAuthProvider()

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user:       null,
      isLoggedIn: false,
      isLoading:  false,
      error:      null,

      // Call once in main.jsx — keeps user logged in on refresh
      init: () => {
        onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            set({
              isLoggedIn: true,
              user: {
                id:     firebaseUser.uid,
                name:   firebaseUser.displayName || 'User',
                email:  firebaseUser.email,
                phone:  '',
                provider: firebaseUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
                avatar: firebaseUser.photoURL ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firebaseUser.displayName || 'User')}&backgroundColor=2d7a50&textColor=ffffff`,
              },
            })
          } else {
            // Firebase says no user — clear everything
            set({ user: null, isLoggedIn: false })
            localStorage.removeItem('vgm-auth')  // ← clear stale persisted state
            useCartStore.getState().clearCart()
            useWishlistStore.getState().clear()
          }
        })
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
          await signInWithEmailAndPassword(auth, email, password)
          set({ isLoading: false })
          return true
        } catch (err) {
          set({ isLoading: false, error: friendlyError(err.code) })
          return false
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true, error: null })
        try {
          const { user: fbUser } = await createUserWithEmailAndPassword(auth, email, password)
          await updateProfile(fbUser, { displayName: name })
          set({ isLoading: false })
          return true
        } catch (err) {
          set({ isLoading: false, error: friendlyError(err.code) })
          return false
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        try {
          await signInWithPopup(auth, googleProvider)
          set({ isLoading: false })
          return true
        } catch (err) {
          set({ isLoading: false, error: friendlyError(err.code) })
          return false
        }
      },

      forgotPassword: async (email) => {
        set({ isLoading: true, error: null })
        try {
          await sendPasswordResetEmail(auth, email)
          set({ isLoading: false })
          return true
        } catch (err) {
          set({ isLoading: false, error: friendlyError(err.code) })
          return false
        }
      },

      updateProfile: async (updates) => {
        try {
          if (updates.name && auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: updates.name })
          }
          set(state => ({ user: { ...state.user, ...updates } }))
          return true
        } catch {
          return false
        }
      },

      changePassword: async (currentPassword, newPassword) => {
        set({ isLoading: true, error: null })
        try {
          const { EmailAuthProvider, reauthenticateWithCredential, updatePassword } = await import('firebase/auth')
          const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
          await reauthenticateWithCredential(auth.currentUser, credential)
          await updatePassword(auth.currentUser, newPassword)
          set({ isLoading: false })
          return true
        } catch (err) {
          set({ isLoading: false, error: friendlyError(err.code) })
          return false
        }
      },

      // ── Logout — clears Firebase session AND persisted Zustand state ──────
      logout: async () => {
        await signOut(auth)                      // Firebase clears the session
        set({ user: null, isLoggedIn: false })   // clear Zustand state
        localStorage.removeItem('vgm-auth')      // ← clear persisted state so it doesn't rehydrate
        useCartStore.getState().clearCart()
        useWishlistStore.getState().clear()
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'vgm-auth',
      partialize: state => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
    }
  )
)

function friendlyError(code) {
  const map = {
    'auth/user-not-found':          'No account found with this email.',
    'auth/wrong-password':          'Incorrect password. Please try again.',
    'auth/invalid-credential':      'Invalid email or password.',
    'auth/email-already-in-use':    'An account with this email already exists.',
    'auth/weak-password':           'Password must be at least 6 characters.',
    'auth/invalid-email':           'Please enter a valid email address.',
    'auth/popup-closed-by-user':    'Google sign-in was cancelled.',
    'auth/too-many-requests':       'Too many attempts. Please wait a moment.',
    'auth/network-request-failed':  'Network error. Check your connection.',
    'auth/wrong-password':          'Current password is incorrect.',
    'auth/requires-recent-login':   'Please sign in again before changing your password.',
  }
  return map[code] || 'Something went wrong. Please try again.'
}
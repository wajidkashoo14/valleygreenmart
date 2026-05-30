import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../services/firebase'

const googleProvider = new GoogleAuthProvider()

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user:      null,
      isLoggedIn: false,
      isLoading:  false,
      error:      null,

      // ── Listen to Firebase auth state (call once in main.jsx) ──────────
      init: () => {
        onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Fetch extra profile data from Firestore
            const snap = await getDoc(doc(db, 'users', firebaseUser.uid))
            const extra = snap.exists() ? snap.data() : {}
            set({
              isLoggedIn: true,
              user: {
                id:     firebaseUser.uid,
                name:   firebaseUser.displayName || extra.name || 'User',
                email:  firebaseUser.email,
                avatar: firebaseUser.photoURL || extra.avatar ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(firebaseUser.displayName || 'User')}&backgroundColor=2d7a50&textColor=ffffff`,
                phone:  extra.phone || '',
              },
            })
          } else {
            set({ user: null, isLoggedIn: false })
          }
        })
      },

      // ── Email / Password login ─────────────────────────────────────────
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

      // ── Register ───────────────────────────────────────────────────────
      register: async (name, email, password) => {
        set({ isLoading: true, error: null })
        try {
          const { user: fbUser } = await createUserWithEmailAndPassword(auth, email, password)
          await updateProfile(fbUser, { displayName: name })
          // Save extra profile to Firestore
          await setDoc(doc(db, 'users', fbUser.uid), {
            name,
            email,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=2d7a50&textColor=ffffff`,
            joinedAt: serverTimestamp(),
          })
          set({ isLoading: false })
          return true
        } catch (err) {
          set({ isLoading: false, error: friendlyError(err.code) })
          return false
        }
      },

      // ── Google OAuth ───────────────────────────────────────────────────
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        try {
          const { user: fbUser } = await signInWithPopup(auth, googleProvider)
          // Save to Firestore if new user
          const ref  = doc(db, 'users', fbUser.uid)
          const snap = await getDoc(ref)
          if (!snap.exists()) {
            await setDoc(ref, {
              name:     fbUser.displayName,
              email:    fbUser.email,
              avatar:   fbUser.photoURL,
              joinedAt: serverTimestamp(),
            })
          }
          set({ isLoading: false })
          return true
        } catch (err) {
          set({ isLoading: false, error: friendlyError(err.code) })
          return false
        }
      },

      // ── Forgot password ────────────────────────────────────────────────
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

      // ── Update profile ─────────────────────────────────────────────────
      updateProfile: async (updates) => {
        const { user } = get()
        if (!user) return false
        try {
          if (updates.name) await updateProfile(auth.currentUser, { displayName: updates.name })
          await setDoc(doc(db, 'users', user.id), updates, { merge: true })
          set(state => ({ user: { ...state.user, ...updates } }))
          return true
        } catch { return false }
      },

      // ── Logout ─────────────────────────────────────────────────────────
      logout: async () => {
        await signOut(auth)
        set({ user: null, isLoggedIn: false })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'vgm-auth',
      partialize: state => ({ user: state.user, isLoggedIn: state.isLoggedIn }),
    }
  )
)

// ── Human-readable error messages ──────────────────────────────────────────────
function friendlyError(code) {
  const map = {
    'auth/user-not-found':      'No account found with this email.',
    'auth/wrong-password':      'Incorrect password. Please try again.',
    'auth/email-already-in-use':'An account with this email already exists.',
    'auth/weak-password':       'Password must be at least 6 characters.',
    'auth/invalid-email':       'Please enter a valid email address.',
    'auth/popup-closed-by-user':'Google sign-in was cancelled.',
    'auth/too-many-requests':   'Too many attempts. Please wait a moment.',
    'auth/network-request-failed': 'Network error. Check your connection.',
  }
  return map[code] || 'Something went wrong. Please try again.'
}
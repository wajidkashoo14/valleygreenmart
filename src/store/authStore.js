import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ─── Mock user database (localStorage-backed) ────────────────────────────────
const DB_KEY = 'vgm_user_db'

function getDB() {
  try { return JSON.parse(localStorage.getItem(DB_KEY) || '{}') } catch { return {} }
}
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}
function hashPassword(pw) {
  // Simple deterministic hash for mock — replace with bcrypt on real backend
  let h = 0
  for (let i = 0; i < pw.length; i++) { h = Math.imul(31, h) + pw.charCodeAt(i) | 0 }
  return String(h >>> 0)
}

function makeAvatar(seed) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=2d7a50,1a4d32&textColor=ffffff&fontSize=36`
}
function makeJwt(userId) {
  return `vgm.${btoa(userId)}.${Date.now()}`
}
function simulate(ms = 900) {
  return new Promise(r => setTimeout(r, ms))
}

// ─── Store ────────────────────────────────────────────────────────────────────
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user:      null,
      token:     null,
      isLoading: false,
      error:     null,

      // ── Sign In ─────────────────────────────────────────────────────────────
      login: async (email, password) => {
        set({ isLoading: true, error: null })
        await simulate(950)

        const db = getDB()
        const record = db[email.toLowerCase()]

        if (!record) {
          set({ isLoading: false, error: 'No account found with this email.' })
          return false
        }
        if (record.passwordHash !== hashPassword(password)) {
          set({ isLoading: false, error: 'Incorrect password. Please try again.' })
          return false
        }

        const { passwordHash, ...user } = record
        const token = makeJwt(user.id)
        set({ user, token, isLoading: false, error: null })
        return true
      },

      // ── Register ────────────────────────────────────────────────────────────
      register: async (name, email, password, phone = '') => {
        set({ isLoading: true, error: null })
        await simulate(1100)

        const db = getDB()
        const key = email.toLowerCase()

        if (db[key]) {
          set({ isLoading: false, error: 'An account with this email already exists.' })
          return false
        }

        const user = {
          id:        'usr_' + Math.random().toString(36).slice(2, 9),
          name:      name.trim(),
          email:     key,
          phone:     phone.trim(),
          avatar:    makeAvatar(name.trim()),
          address:   '',
          city:      '',
          pincode:   '',
          joinedAt:  new Date().toISOString(),
          provider:  'email',
        }

        db[key] = { ...user, passwordHash: hashPassword(password) }
        saveDB(db)

        const token = makeJwt(user.id)
        set({ user, token, isLoading: false, error: null })
        return true
      },

      // ── Google OAuth (simulated) ─────────────────────────────────────────────
      loginWithGoogle: async () => {
        set({ isLoading: true, error: null })
        await simulate(750)

        // Simulate picking from a pool of Google accounts
        const googleUsers = [
          { name: 'Ahmad Mir',     email: 'ahmad.mir@gmail.com',   avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ahmad+Mir&backgroundColor=2d7a50&textColor=ffffff&fontSize=36' },
          { name: 'Priya Sharma',  email: 'priya.s@gmail.com',     avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Priya+Sharma&backgroundColor=c4a054&textColor=ffffff&fontSize=36' },
          { name: 'Ravi Kapoor',   email: 'ravi.kapoor@gmail.com', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Ravi+Kapoor&backgroundColor=1a4d32&textColor=ffffff&fontSize=36' },
        ]
        const pick = googleUsers[Math.floor(Math.random() * googleUsers.length)]

        const db  = getDB()
        const key = pick.email.toLowerCase()
        let user  = db[key]

        if (!user) {
          user = {
            id:       'usr_g_' + Math.random().toString(36).slice(2, 9),
            ...pick,
            email:    key,
            phone:    '',
            address:  '',
            city:     '',
            pincode:  '',
            joinedAt: new Date().toISOString(),
            provider: 'google',
          }
          db[key] = { ...user, passwordHash: '' }
          saveDB(db)
        } else {
          const { passwordHash, ...rest } = user
          user = rest
        }

        const token = makeJwt(user.id)
        set({ user, token, isLoading: false, error: null })
        return true
      },

      // ── Forgot Password (request OTP) ────────────────────────────────────────
      forgotPassword: async (email) => {
        set({ isLoading: true, error: null })
        await simulate(800)

        const db  = getDB()
        const key = email.toLowerCase()

        if (!db[key]) {
          set({ isLoading: false, error: 'No account found with this email address.' })
          return false
        }

        // Store a mock OTP in DB (in production this would be emailed)
        const otp = String(Math.floor(100000 + Math.random() * 900000))
        db[key].__otp = otp
        db[key].__otpExpiry = Date.now() + 10 * 60 * 1000 // 10 min
        saveDB(db)

        // Log OTP to console so we can test it
        console.info(`%c[VGM Auth] OTP for ${email}: ${otp}`, 'color:#2d7a50;font-weight:bold;font-size:14px')

        set({ isLoading: false })
        return { email: key, otp } // return otp for the UI demo banner
      },

      // ── Verify OTP ───────────────────────────────────────────────────────────
      verifyOtp: async (email, otp) => {
        set({ isLoading: true, error: null })
        await simulate(600)

        const db  = getDB()
        const key = email.toLowerCase()
        const rec = db[key]

        if (!rec || rec.__otp !== otp) {
          set({ isLoading: false, error: 'Incorrect OTP. Please try again.' })
          return false
        }
        if (Date.now() > rec.__otpExpiry) {
          set({ isLoading: false, error: 'OTP has expired. Please request a new one.' })
          return false
        }

        set({ isLoading: false })
        return true
      },

      // ── Reset Password ───────────────────────────────────────────────────────
      resetPassword: async (email, otp, newPassword) => {
        set({ isLoading: true, error: null })
        await simulate(800)

        const db  = getDB()
        const key = email.toLowerCase()
        const rec = db[key]

        if (!rec || rec.__otp !== otp) {
          set({ isLoading: false, error: 'Invalid reset session. Please start over.' })
          return false
        }

        rec.passwordHash = hashPassword(newPassword)
        delete rec.__otp
        delete rec.__otpExpiry
        db[key] = rec
        saveDB(db)

        set({ isLoading: false })
        return true
      },

      // ── Update Profile ───────────────────────────────────────────────────────
      updateProfile: async (updates) => {
        set({ isLoading: true, error: null })
        await simulate(700)

        const { user } = get()
        if (!user) { set({ isLoading: false, error: 'Not logged in.' }); return false }

        const db  = getDB()
        const key = user.email

        const updated = { ...user, ...updates }
        db[key] = { ...db[key], ...updates }
        saveDB(db)

        set({ user: updated, isLoading: false })
        return true
      },

      // ── Change Password ──────────────────────────────────────────────────────
      changePassword: async (currentPassword, newPassword) => {
        set({ isLoading: true, error: null })
        await simulate(800)

        const { user } = get()
        if (!user) { set({ isLoading: false }); return false }

        const db  = getDB()
        const rec = db[user.email]

        if (rec.provider === 'google') {
          set({ isLoading: false, error: 'Google accounts cannot change password here.' })
          return false
        }
        if (rec.passwordHash !== hashPassword(currentPassword)) {
          set({ isLoading: false, error: 'Current password is incorrect.' })
          return false
        }

        rec.passwordHash = hashPassword(newPassword)
        db[user.email] = rec
        saveDB(db)

        set({ isLoading: false })
        return true
      },

      // ── Sign Out ─────────────────────────────────────────────────────────────
      logout: () => set({ user: null, token: null, error: null }),

      clearError: () => set({ error: null }),

      get isLoggedIn() { return !!get().token && !!get().user },
    }),
    {
      name:    'vgm-auth',
      partialize: (s) => ({ user: s.user, token: s.token }),
    }
  )
)

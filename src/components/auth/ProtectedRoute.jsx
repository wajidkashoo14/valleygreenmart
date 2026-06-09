import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, isInitialized } = useAuthStore()
  const location = useLocation()

  // Wait for Firebase to confirm auth state before making any redirect decision.
  // Without this, the persisted isLoggedIn:true causes a flash redirect to /login
  // on logout because ProtectedRoute re-renders before Firebase clears the state.
  if (!isInitialized) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return children
}

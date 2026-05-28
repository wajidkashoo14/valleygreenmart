import { Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ui/ScrollToTop'
import { AnimatePresence } from 'framer-motion'
import Navbar           from './components/layout/Navbar'
import Footer           from './components/layout/Footer'
import Toast            from './components/ui/Toast'
import WhatsAppButton   from './components/ui/WhatsAppButton'
import ProtectedRoute   from './components/auth/ProtectedRoute'

// Main pages
import Home          from './pages/Home'
import Products      from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart          from './pages/Cart'
import Wishlist      from './pages/Wishlist'
import Checkout       from './pages/Checkout'
import AboutUs        from './pages/AboutUs'
import ShippingPolicy from './pages/ShippingPolicy'
import ReturnPolicy   from './pages/ReturnPolicy'
import PrivacyPolicy  from './pages/PrivacyPolicy'
import ContactUs      from './pages/ContactUs'

// Auth pages (no Navbar/Footer/WhatsApp on these)
import LoginPage          from './pages/auth/LoginPage'
import RegisterPage       from './pages/auth/RegisterPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ProfilePage        from './pages/auth/ProfilePage'

const AUTH_ROUTES = ['/login', '/register', '/forgot-password']

export default function App() {
  const location  = useLocation()
  const isAuthPage = AUTH_ROUTES.some(r => location.pathname.startsWith(r))

  return (
    <div className="flex flex-col min-h-screen bg-cream font-body">
      <ScrollToTop />
      {!isAuthPage && <Navbar />}

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"             element={<Home />} />
            <Route path="/products"     element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart"         element={<Cart />} />
            <Route path="/wishlist"     element={<Wishlist />} />

            <Route path="/login"           element={<LoginPage />} />
            <Route path="/register"        element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/profile"  element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            <Route path="/about"           element={<AboutUs />} />
            <Route path="/shipping-policy"  element={<ShippingPolicy />} />
            <Route path="/return-policy"    element={<ReturnPolicy />} />
            <Route path="/privacy-policy"   element={<PrivacyPolicy />} />
            <Route path="/contact"          element={<ContactUs />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAuthPage && <Footer />}

      {/* Global floating elements */}
      <Toast />
      {!isAuthPage && <WhatsAppButton />}
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
      <div className="text-7xl">🌿</div>
      <h1 className="font-display text-3xl font-bold text-green-900">Page Not Found</h1>
      <p className="text-green-500 max-w-sm">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="mt-2 bg-green-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors text-sm">
        Go Home
      </a>
    </div>
  )
}

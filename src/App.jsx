import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Toast from './components/ui/Toast'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'

export default function App() {
  const location = useLocation()
  return (
    <div className="flex flex-col min-h-screen bg-cream font-body">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/"              element={<Home />} />
            <Route path="/products"      element={<Products />} />
            <Route path="/products/:id"  element={<ProductDetail />} />
            <Route path="/cart"          element={<Cart />} />
            <Route path="/wishlist"      element={<Wishlist />} />
            <Route path="/checkout"      element={<Checkout />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toast />
    </div>
  )
}

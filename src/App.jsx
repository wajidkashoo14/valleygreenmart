import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Toast from "./components/ui/Toast";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import InstallPrompt from "./components/ui/InstallPrompt";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Checkout = lazy(() => import("./pages/Checkout"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

// Auth pages
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() =>
  import("./pages/auth/ForgotPasswordPage")
);
const ProfilePage = lazy(() => import("./pages/auth/ProfilePage"));
const Orders = lazy(() => import("./pages/Orders"));
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));

const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

function PageLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.some((r) => location.pathname.startsWith(r));

  return (
    <div className="flex flex-col min-h-screen bg-cream font-body">
      <ScrollToTop />
      {!isAuthPage && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
      )}

      <main className={`flex-1 ${!isAuthPage ? 'pt-[64px] sm:pt-[96px]' : ''}`}>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />

              <Route path="/admin" element={<AdminPanel />} />

              <Route path="/about" element={<AboutUs />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<ContactUs />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      {!isAuthPage && <Footer />}

      <Toast />
      {!isAuthPage && <WhatsAppButton />}
      {!isAuthPage && <InstallPrompt />}
    </div>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
      <div className="text-7xl">🌿</div>
      <h1 className="font-display text-3xl font-bold text-green-900">
        Page Not Found
      </h1>
      <p className="text-green-500 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-2 bg-green-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors text-sm"
      >
        Go Home
      </a>
    </div>
  );
}

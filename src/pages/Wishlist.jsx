import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import { useWishlist } from '../hooks'
import PageWrapper from '../components/ui/PageWrapper'
import ProductCard from '../components/ui/ProductCard'

export default function Wishlist() {
  const { wishlistProducts, count } = useWishlist()

  return (
    <PageWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="flex items-center gap-3 mb-8">
          <Heart size={22} className="text-rose-400 fill-rose-400" />
          <h1 className="font-display font-bold text-2xl text-green-900">My Wishlist</h1>
          {count > 0 && <span className="bg-rose-100 text-rose-600 text-sm font-semibold px-3 py-1 rounded-full">{count} item{count > 1 ? 's' : ''}</span>}
        </div>

        {wishlistProducts.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <Heart size={36} className="text-rose-200" />
            </div>
            <h2 className="font-display text-2xl text-green-900 mb-2">Your wishlist is empty</h2>
            <p className="text-green-500 mb-6">Save your favorite products here for later.</p>
            <Link to="/products" className="inline-flex items-center gap-2 bg-green-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">
              <ShoppingCart size={16} /> Explore Products
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {wishlistProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

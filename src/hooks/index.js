import { useQuery } from '@tanstack/react-query'
import { productService } from '../services/productService'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { useToastStore } from '../store/toastStore'
import { PRODUCTS } from '../data/products'

// ─── Products ───────────────────────────────────────
export function useProducts(filters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
    staleTime: 1000 * 60 * 5,
  })
}

export function useProduct(id) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProduct(id),
    enabled: !!id,
  })
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ['products', 'featured'],
    queryFn: productService.getFeatured,
  })
}

export function useRelatedProducts(productId) {
  return useQuery({
    queryKey: ['products', 'related', productId],
    queryFn: () => productService.getRelated(productId),
    enabled: !!productId,
  })
}

// ─── Cart ────────────────────────────────────────────
export function useCart() {
  const { items, addItem, removeItem, updateQty, clearCart, applyCoupon, removeCoupon, coupon } = useCartStore()
  const toast = useToastStore()

  const cartProducts = Object.entries(items).map(([id, qty]) => {
    const product = PRODUCTS.find(p => p.id === Number(id))
    return product ? { ...product, qty } : null
  }).filter(Boolean)

  const subtotal = cartProducts.reduce((sum, p) => sum + p.price * p.qty, 0)
  const delivery = subtotal > 999 ? 0 : 60
  const discountAmt = coupon ? Math.round(subtotal * coupon.discount / 100) : 0
  const total = subtotal - discountAmt + delivery
  const totalItems = Object.values(items).reduce((a, b) => a + b, 0)

  const add = (productId, qty = 1, productName = '') => {
    addItem(productId, qty)
    toast.add(`🛒 ${productName || 'Item'} added to cart!`)
  }

  const remove = (productId, productName = '') => {
    removeItem(productId)
    toast.add(`Removed from cart`, 'info')
  }

  return {
    items,
    cartProducts,
    subtotal,
    delivery,
    discountAmt,
    total,
    totalItems,
    coupon,
    add,
    remove,
    updateQty,
    clearCart,
    applyCoupon,
    removeCoupon,
  }
}

// ─── Wishlist ─────────────────────────────────────────
export function useWishlist() {
  const { items, toggle, has, clear } = useWishlistStore()
  const toast = useToastStore()

  const wishlistProducts = PRODUCTS.filter(p => items.has(p.id))

  const toggleWithToast = (productId, productName = '') => {
    const wasIn = has(productId)
    toggle(productId)
    if (wasIn) toast.add(`💔 Removed from wishlist`, 'info')
    else toast.add(`♥ ${productName || 'Item'} saved to wishlist!`)
  }

  return {
    items,
    wishlistProducts,
    toggle: toggleWithToast,
    has,
    clear,
    count: items.size,
  }
}

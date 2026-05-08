import { PRODUCTS } from '../data/products'

// Simulate network delay for realistic mock
const delay = (ms = 400) => new Promise(r => setTimeout(r, ms))

export const productService = {
  // Fetch all products with optional filters
  async getProducts({ category, subcategory, minPrice, maxPrice, minRating, sort, search } = {}) {
    await delay()
    let data = [...PRODUCTS]

    if (search) {
      const q = search.toLowerCase()
      data = data.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    if (category && category !== 'all' && category !== 'All') {
      data = data.filter(p =>
        p.category === category ||
        p.subcategory === category
      )
    }

    if (subcategory) {
      data = data.filter(p => p.subcategory === subcategory)
    }

    if (minPrice !== undefined) data = data.filter(p => p.price >= minPrice)
    if (maxPrice !== undefined) data = data.filter(p => p.price <= maxPrice)
    if (minRating !== undefined) data = data.filter(p => p.rating >= minRating)

    if (sort === 'price-low')  data.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') data.sort((a, b) => b.price - a.price)
    if (sort === 'rating')     data.sort((a, b) => b.rating - a.rating)
    if (sort === 'newest')     data.sort((a, b) => b.id - a.id)

    return data
  },

  // Fetch single product
  async getProduct(id) {
    await delay(200)
    const product = PRODUCTS.find(p => p.id === Number(id) || p.slug === id)
    if (!product) throw new Error('Product not found')
    return product
  },

  // Fetch featured products
  async getFeatured() {
    await delay()
    return PRODUCTS.filter(p => p.featured)
  },

  // Fetch by category
  async getByCategory(category) {
    await delay()
    return PRODUCTS.filter(p =>
      p.category === category || p.subcategory === category
    )
  },

  // Get related products
  async getRelated(productId, limit = 4) {
    await delay(200)
    const product = PRODUCTS.find(p => p.id === Number(productId))
    if (!product) return []
    return PRODUCTS
      .filter(p => p.id !== product.id && p.subcategory === product.subcategory)
      .slice(0, limit)
  },
}

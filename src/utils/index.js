// Format price in Indian locale
export const formatPrice = (price) =>
  `₹${price.toLocaleString('en-IN')}`

// Get discount percentage
export const getDiscount = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return null
  return Math.round((1 - price / originalPrice) * 100)
}

// Render star rating
export const renderStars = (rating) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return { full, half, empty: 5 - full - (half ? 1 : 0) }
}

// Truncate text
export const truncate = (text, maxLen = 100) =>
  text.length > maxLen ? text.slice(0, maxLen) + '…' : text

// Debounce
export const debounce = (fn, delay = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

// cn — conditional classnames helper
export const cn = (...classes) => classes.filter(Boolean).join(' ')

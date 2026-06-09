import { useEffect } from 'react'

const BASE = 'Valley Green Mart'

/**
 * Sets document title and meta description for each page.
 * Usage: useSEO({ title: 'Products', description: '...' })
 */
export default function useSEO({ title, description, image } = {}) {
  useEffect(() => {
    // Title
    document.title = title ? `${title} | ${BASE}` : `${BASE} — Premium Kashmiri Products`

    // Meta description
    let desc = document.querySelector('meta[name="description"]')
    if (!desc) {
      desc = document.createElement('meta')
      desc.name = 'description'
      document.head.appendChild(desc)
    }
    desc.content = description || 'Shop premium organic Kashmiri products — Saffron, Walnuts, Honey, Dry Fruits and more. Sourced directly from Himalayan farms, delivered fresh across India.'

    // OG tags
    setOG('og:title',       title ? `${title} | ${BASE}` : BASE)
    setOG('og:description', desc.content)
    setOG('og:type',        'website')
    if (image) setOG('og:image', image)
  }, [title, description, image])
}

function setOG(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.content = content
}

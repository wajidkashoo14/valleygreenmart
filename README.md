# 🌿 Valley Green Mart

**Premium organic e-commerce platform — Srinagar, Kashmir**

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📦 Build for Production

```bash
npm run build
npm run preview
```

## 🖼️ Images

All product images are sourced from **Unsplash** — hand-picked for maximum visual appeal per product:

| Product | Photo style |
|---|---|
| Kashmir Saffron | Macro crimson threads on white |
| Kashmiri Walnuts | Overhead cracked walnut halves |
| Wild Honey | Golden honey drip with warm bokeh |
| Microgreens | Vivid lush green tray |
| Mamra Almonds | Elegant close-up with soft shadows |
| Apples | Vivid red apples with perfect lighting |
| Pistachios | Vibrant green against clean background |
| A2 Ghee | Golden pour with warm tones |

## 🏗️ Architecture

```
src/
├── components/
│   ├── layout/     Navbar, Footer
│   ├── auth/       AuthModal, UserMenu
│   └── ui/         ProductCard, Toast, Skeleton
├── pages/          Home, Products, ProductDetail, Cart, Wishlist, Checkout
├── store/          Zustand (cart, wishlist, auth, toast)
├── services/       Axios API setup + productService
├── hooks/          useCart, useWishlist, useProducts
├── data/           Mock products (18 products, 5 categories)
└── utils/          formatPrice, getDiscount, etc.
```

## 🎨 Design

- Color: Greens (`#2d7a50`, `#0d2619`) + Earth tones (`#c4a054`)
- Font: Playfair Display (headings) + DM Sans (body)
- Animations: Framer Motion throughout
- Responsive: Mobile-first, works on all screen sizes

## 🔧 Environment Variables

```env
VITE_API_URL=https://api.valleygreenmart.in/v1
```

## 📡 Backend Integration

Replace mock data in `src/services/productService.js` with real API calls.
Axios instance in `src/services/api.js` is pre-configured with interceptors.

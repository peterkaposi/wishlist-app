'use client'

import Link from 'next/link'
import { useWishlistStore } from '@/store/wishlist'
import { Heart, ShoppingBag, Sparkles } from 'lucide-react'

export default function Navigation() {
  const items = useWishlistStore((state) => state.items)

  return (
    <nav className="bg-white shadow-md border-b border-cyan-100 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-cyan-600 flex items-center gap-2">
          <Sparkles size={28} className="text-cyan-500" />
          <span>Wishlist App</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className="flex items-center gap-2 text-slate-700 hover:text-cyan-600">
            <ShoppingBag size={20} />
            <span>Products</span>
          </Link>
          <Link href="/wishlist" className="flex items-center gap-2 text-slate-700 hover:text-cyan-600 relative pr-3">
            <Heart size={20} />
            <span style={{ marginRight: '5px' }}>Wishlist</span>
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}


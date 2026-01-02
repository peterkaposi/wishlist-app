'use client'

import { Product } from '@/types/product'
import { useWishlistStore } from '@/store/wishlist'
import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem, removeItem, isInWishlist } = useWishlistStore()
  const inWishlist = isInWishlist(product.id)

  const toggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-cyan-100">
      <Link href={`/product/${product.id}`}>
          <div className="relative w-full h-64 mb-4 bg-cyan-50 rounded overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
              className="object-contain p-4 hover:scale-105 transition-transform"
            />
          </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14 text-slate-700 hover:text-cyan-600 transition-colors">
          {product.title}
        </h3>
      </Link>
      <div className="flex justify-between items-center mt-4">
        <span className="text-2xl font-bold text-cyan-600">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={toggleWishlist}
          className={`p-2 rounded-full ${
            inWishlist
              ? 'bg-pink-500 text-white'
              : 'bg-gray-100 text-gray-400 hover:bg-cyan-50 hover:text-cyan-600'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  )
}


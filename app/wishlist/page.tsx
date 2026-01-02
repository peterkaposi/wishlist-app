'use client'

import { useWishlistStore } from '@/store/wishlist'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Trash2 } from 'lucide-react'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Heart size={64} className="text-cyan-600 mb-6" />
          <h1 className="text-4xl font-bold mb-4 text-cyan-600">
            Your Wishlist is Empty
          </h1>
          <p className="text-slate-600 mb-8 text-center">
            Start adding products to your wishlist!
          </p>
          <Link
            href="/"
            className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700"
          >
            <ShoppingBag size={20} />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-cyan-600">
          Your Wishlist
        </h1>
        <p className="text-slate-600">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl p-6 border border-cyan-100"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative w-full h-64 mb-4 bg-cyan-50 rounded">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-4"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14 text-slate-700">
                {product.title}
              </h3>
            </Link>
            <div className="flex justify-between items-center mt-4">
              <span className="text-2xl font-bold text-cyan-600">
                ${product.price.toFixed(2)}
              </span>
              <button
                onClick={() => removeItem(product.id)}
                className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-2 rounded hover:bg-red-200"
              >
                <Trash2 size={16} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


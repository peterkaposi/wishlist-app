'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import { useWishlistStore } from '@/store/wishlist'
import Link from 'next/link'
import Image from 'next/image'
import { use } from 'react'
import { ArrowLeft, Heart, Star, Loader2 } from 'lucide-react'

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addItem, removeItem, isInWishlist } = useWishlistStore()

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${resolvedParams.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching product:', error)
        setLoading(false)
      })
  }, [resolvedParams.id])

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h1 className="text-4xl font-bold mb-4 text-slate-800">Product Not Found</h1>
          <Link
            href="/"
            className="flex items-center gap-2 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)

  const toggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 mb-6 text-cyan-600 hover:text-cyan-700"
      >
        <ArrowLeft size={20} />
        <span>Back to Products</span>
      </Link>
      <div className="bg-white rounded-lg shadow-lg p-8 border border-cyan-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative w-full h-96 bg-cyan-50 rounded">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4 text-slate-800">{product.title}</h1>
            <div className="mb-4">
              <span className="inline-block bg-cyan-100 px-3 py-1 rounded-full text-sm capitalize text-cyan-700">
                {product.category}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <Star size={20} className="text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-semibold mr-2 text-slate-700">
                {product.rating.rate}
              </span>
              <span className="text-slate-600">
                ({product.rating.count} reviews)
              </span>
            </div>
            <p className="text-4xl font-bold text-cyan-600 mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-slate-700 mb-8">
              {product.description}
            </p>
            <button
              onClick={toggleWishlist}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold ${
                inWishlist
                  ? 'bg-pink-500 hover:bg-pink-600 text-white'
                  : 'bg-cyan-600 hover:bg-cyan-700 text-white'
              }`}
            >
              <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
              <span>{inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-12 h-12 text-cyan-600 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-cyan-600">
          Discover Products
        </h1>
        <p className="text-slate-600">Find your items and add them to your wishlist</p>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 4} />
          ))}
        </div>
    </div>
  )
}

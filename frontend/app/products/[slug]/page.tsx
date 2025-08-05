'use client'

import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { Product } from '@/types'
import axios from '@/lib/axios'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AlertCircle, Loader2, ShoppingCart } from 'lucide-react'
import PriceDisplay from '@/utils/PriceDisplay'
import { useCartStore } from '@/store/useCartStore'
import { useAuth } from '@/context/AuthContext'
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

export default function ProductDetailPage() {
  const { user, isAuthenticated } = useAuth();
  const { slug } = useParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const { addToCart } = useCartStore()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products')
        setProducts(res.data)
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const product = useMemo(() => {
    return products.find((p) => slugify(p.title) === slug)
  }, [products, slug])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <Button onClick={() => window.history.back()} variant="outline">
          Go Back
        </Button>
      </div>
    )
  }


  return (
    <div className="bg-slate-50 min-h-screen px-6">
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Home / Products / <span className="text-gray-800">{product.title}</span>
        </div>

        {showLoginAlert && (
          <Alert variant="default" className="mb-4 bg-red-50 border-red-500 text-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Required</AlertTitle>
            <AlertDescription>Please login to add items to your cart.</AlertDescription>
          </Alert>
        )}
        {showAlert && (
          <Alert variant="default" className="mb-4 bg-green-50 border-green-500 text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Item added to cart!</AlertDescription>
          </Alert>
        )}


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 justify-center items-center">
          {/* Left - Product Image */}
          <div className="space-y-6">
            <div className="relative w-full md:h-[400px] h-[300px] rounded-xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-6 transition-transform"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6 pt-5">
            <div>
              <h1 className="md:text-4xl text-2xl font-bold text-gray-900 leading-snug">{product.title}</h1>

            </div>

            <p className="text-gray-700 text-md">{product.description}</p>

            <Separator />

            <div className="md:text-4xl text-2xl font-bold"><PriceDisplay amount={product.price} /></div>


          {/*quantity controlls*/}
              <div className="flex items-center space-x-4 bg-slate-50 p-2 rounded-lg">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity - 1)}
                    className="bg-white text-black px-3 py-1 hover:bg-slate-100"
                  >
                    -
                  </Button>
                  <span className="px-4 py-1 min-w-[40px] text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-white text-black px-3 py-1 hover:bg-slate-100"
                  >
                    +
                  </Button>
                </div>
              </div>



              <div className="flex justify-center sm:justify-start items-center pt-4">
                <Button
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowLoginAlert(true);
                      setTimeout(() => setShowLoginAlert(false), 4000);
                    } else {
                      addToCart(product._id, quantity);
                      setShowAlert(true);
                      setTimeout(() => setShowAlert(false), 4000);
                    }
                  }}
                  className="flex items-center gap-3 bg-[#0066DA] hover:bg-[#2684FC] text-white 
               px-5 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-5 
               text-base sm:text-lg lg:text-xl 
               font-semibold shadow-xl rounded-xl 
               transition duration-300 w-full sm:w-auto text-center"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span>Add to Cart</span>
                </Button>
              </div>

        



          </div>
        </div>
      </div>
    </div >
  )
}

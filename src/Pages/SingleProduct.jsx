import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Loading from '../assets/src_assets_Loading4.webm'
import Breadcrums from '../components/Breadcrums'
import { IoCartOutline } from 'react-icons/io5'
import { useCart } from '../context/CartContext'

const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState(null)
  const { addToCart } = useCart()
  const { id } = useParams()
  const location = useLocation()
  const product = location.state?.product

  useEffect(() => {
    if (product) {
      setSingleProduct(product)
    }
  }, [product])

  // calculate only if product exists
  const originalPrice = singleProduct
    ? Math.round(
      singleProduct.price +
      (singleProduct.price * singleProduct.discount) / 100
    )
    : 0

  return (
    <div>
      {singleProduct ? (
        <div className="px-4 pb-6 md:px-0">
          <Breadcrums title={singleProduct.title} />

          {/* Main grid */}
          <div className="max-w-6xl mx-auto md:p-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

            {/* product image */}
            <div className="w-full flex justify-center">
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className="rounded-2xl w-full max-w-sm md:max-w-full object-contain"
              />
            </div>

            {/* product details */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h1 className="text-xl md:text-3xl font-bold text-gray-800">
                {singleProduct.title}
              </h1>

              <div className="text-sm md:text-base text-gray-700">
                {singleProduct.brand?.toUpperCase()} /{' '}
                {singleProduct.category?.toUpperCase()} / {singleProduct.model}
              </div>

              <p className="text-lg md:text-xl text-red-500 font-bold">
                ${singleProduct.price}{' '}
                <span className="line-through text-gray-700 ml-2 text-sm md:text-base">
                  {originalPrice}
                </span>{' '}
                <span className="bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-md text-xs md:text-sm">
                  {singleProduct.discount}% discount
                </span>
              </p>

              <p className="text-gray-600 font-serif text-sm md:text-base leading-relaxed">
                {singleProduct.description}
              </p>

              {/* Quantity selector */}
              <div className="flex items-center gap-3 md:gap-4">
                <label className="text-sm md:text-base font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  min={1}
                  defaultValue={1}
                  className="w-16 md:w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Add to cart button */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => addToCart(singleProduct)}
                  className="px-5 md:px-6 flex items-center justify-center gap-2 py-2 md:py-3 text-sm md:text-base bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  <IoCartOutline className="w-5 h-5 md:w-6 md:h-6" />
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Loading state
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop className="w-24 md:w-40">
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  )
}

export default SingleProduct

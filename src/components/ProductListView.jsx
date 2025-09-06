import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductListView = ({ product }) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  return (
    <div className="space-y-4 mt-2 rounded-md">
      <div className="bg-gray-100 flex flex-col md:flex-row gap-4 md:gap-7 items-center p-3 md:p-4 rounded-md">
        
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-32 h-32 md:w-60 md:h-60 object-contain rounded-md cursor-pointer"
          onClick={() => navigate(`/products/${product.id}`, { state: { product } })}
        />

        {/* Product Info */}
        <div className="space-y-2 text-center md:text-left">
          <h1 className="font-bold text-base md:text-xl line-clamp-3 hover:text-red-400">
            {product.title}
          </h1>
          
          <p className="font-semibold flex justify-center md:justify-start items-center text-sm md:text-lg">
            $<span className="text-2xl md:text-4xl ml-1">{product.price}</span>
            <span className="ml-2 text-gray-600 text-xs md:text-sm">({product.discount}% off)</span>
          </p>

          <p className="text-xs md:text-sm text-gray-700">
            FREE delivery <span className="font-semibold">Fri, 18 Apr</span> <br />
            Or fastest delivery <span className="font-semibold">Tomorrow, 17 Apr</span>
          </p>

          <button
            onClick={() => addToCart(product)}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm md:text-base"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductListView

import React from 'react'
import { useCart } from '../context/CartContext'
import { FaRegTrashAlt } from 'react-icons/fa'
import { LucideNotebookText } from 'lucide-react'
import { MdDeliveryDining } from 'react-icons/md'
import { GiShoppingBag } from 'react-icons/gi'
import { useUser } from '@clerk/clerk-react'
import emptyCart from '../assets/empty-cart.png'
import { useNavigate } from 'react-router-dom'

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart()
  const { user } = useUser()
  const navigate = useNavigate()

  const totalPrice = Math.floor(cartItem.reduce((total, item) => total + item.price * item.quantity, 0));

  return (
    <div className="mt-6 max-w-7xl mx-auto px-3 sm:px-6 mb-8">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-xl sm:text-2xl">My Cart ({cartItem.length})</h1>

          {/* Cart Items */}
          <div className="mt-6 space-y-4">
            {cartItem.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* Item left */}
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-20 h-20 rounded-md" />
                  <div>
                    <h1 className="sm:w-[300px] line-clamp-2">{item.title}</h1>
                    <p className="text-red-500 font-semibold text-lg">${item.price}</p>
                  </div>
                </div>

                {/* Quantity + Delete */}
                <div className="flex items-center justify-between sm:gap-6 gap-4 w-full sm:w-auto">
                  <div className="bg-red-500 text-white flex items-center justify-between gap-4 px-3 py-1 rounded-md font-bold text-lg">
                    <button onClick={() => updateQuantity( item.id, 'decrease')}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity( item.id, 'increase')}>+</button>
                  </div>
                  <span
                    className="bg-white p-2 rounded-full hover:shadow-md cursor-pointer"
                    onClick={() => deleteItem(item.id)}
                  >
                    <FaRegTrashAlt className="text-red-500 text-xl" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Info + Bill */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-6 space-y-3">
              <h1 className="text-gray-800 font-bold text-lg sm:text-xl">Delivery Info</h1>

              <div className="flex flex-col space-y-1">
                <label>Full Name</label>
                <input
                  type="text"
                  className="p-2 rounded-md w-full"
                  value={user?.fullName}
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label>Address</label>
                <input
                  type="text"
                  className="p-2 rounded-md w-full"
                  value={location?.county}
                  placeholder="Enter your address"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col space-y-1 w-full">
                  <label>State</label>
                  <input
                    type="text"
                    className="p-2 rounded-md w-full"
                    value={location?.state}
                    placeholder="Enter your state"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>PostCode</label>
                  <input
                    type="text"
                    className="p-2 rounded-md w-full"
                    value={location?.postcode}
                    placeholder="Enter your postcode"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col space-y-1 w-full">
                  <label>Country</label>
                  <input
                    type="text"
                    className="p-2 rounded-md w-full"
                    value={location?.country}
                    placeholder="Enter your country"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>Phone No</label>
                  <input
                    type="text"
                    className="p-2 rounded-md w-full"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 w-full sm:w-auto">
                Submit
              </button>

              <div className="flex flex-col gap-2 items-center justify-center text-gray-700 mt-4">
                ---------- OR ----------
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md mt-2"
                  onClick={getLocation}
                >
                  Use My Location
                </button>
              </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white border border-gray-100 shadow-md rounded-md p-6 space-y-4 h-max">
              <h1 className="text-gray-800 font-bold text-lg sm:text-xl">Bill Details</h1>

              <div className="flex justify-between items-center">
                <h1 className="flex items-center gap-2 text-gray-700">
                  <LucideNotebookText /> Items total
                </h1>
                <p>${totalPrice}</p>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="flex items-center gap-2 text-gray-700">
                  <MdDeliveryDining /> Delivery Charges
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="text-gray-600 line-through">
                    ${Math.floor((5 / 100) * totalPrice)}
                  </span>{' '}
                  FREE
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="flex items-center gap-2 text-gray-700">
                  <GiShoppingBag /> Handling charges + GST
                </h1>
                <p className="text-gray-700 font-semibold">
                  ${Math.floor((2 / 100) * totalPrice)}
                </p>
              </div>

              <hr className="text-gray-200" />
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand total</h1>
                <p className="font-semibold text-lg">
                  ${totalPrice + Math.floor((2 / 100) * totalPrice)}
                </p>
              </div>

              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-5">Apply Promo Code</h1>
                <div className="flex gap-3 flex-col sm:flex-row">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="p-2 rounded-md w-full"
                  />
                  <button className="bg-white border border-gray-300 px-4 py-2 rounded-md w-full sm:w-auto">
                    Apply
                  </button>
                </div>
              </div>

              <button className="bg-red-500 text-white mt-6 px-4 py-3 rounded-md w-full">
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty cart */
        <div className="flex flex-col gap-4 justify-center items-center h-[500px] px-4 text-center">
          <h1 className="text-red-500/80 font-bold text-2xl sm:text-4xl">
            Oh no! Your cart is empty
          </h1>
          <img src={emptyCart} alt="" className="w-[200px] sm:w-[300px] md:w-[400px]" />
          <button
            onClick={() => navigate('/products')}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart

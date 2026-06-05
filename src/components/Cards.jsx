import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from "../features/cartSlice"

function StarRating({ rate }) {
  const filled = Math.round(rate)
  return (
    <div className="flex items-center gap-1">
      <div className="flex text-xs">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={i <= filled ? 'text-yellow-400' : 'text-gray-200'}>
            ★
          </span>
        ))}
      </div>
      <span className="text-[10px] text-gray-400">{rate}</span>
    </div>
  )
}

function Cards({ products }) {
  const dispatch = useDispatch()
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === products.id)
  )
  const quantity = cartItem ? cartItem.quantity : 0

  return (
    <div className="h-full flex flex-col p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="mb-3 h-[140px] flex justify-center items-center bg-gray-50 rounded-lg p-3">
        <img
          className="max-w-full max-h-[120px] object-contain"
          src={products.image}
          alt={products.title}
        />
      </div>

      <div className="flex-grow flex flex-col">
        <p className="line-clamp-2 mb-1 text-[12px] font-semibold text-gray-800 leading-snug">
          {products.title}
        </p>

        {products.rating && (
          <div className="mb-2">
            <StarRating rate={products.rating.rate} />
            <p className="text-[10px] text-gray-400">{products.rating.count} reviews</p>
          </div>
        )}

        <p className="line-clamp-2 mb-3 text-[10px] text-gray-500 leading-relaxed">
          {products.description}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <p className="font-bold text-[14px] text-gray-900">${products.price}</p>

          {quantity === 0 ? (
            <button
              onClick={() => dispatch(addToCart(products))}
              className="outline-1 outline-[#c92d2d] rounded-md px-3 py-1 text-[12px] bg-red-50 text-[#c92d2d] hover:bg-[#c92d2d] hover:text-white transition-colors duration-150"
            >
              Add
            </button>
          ) : (
            <div className="flex gap-2 items-center bg-[#c92d2d] rounded-md text-white py-1 px-2">
              <button
                onClick={() => dispatch(removeFromCart(products.id))}
                className="w-4 text-center font-bold leading-none"
              >
                −
              </button>
              <p className="text-[13px] min-w-[14px] text-center">{quantity}</p>
              <button
                onClick={() => dispatch(addToCart(products))}
                className="w-4 text-center font-bold leading-none"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cards

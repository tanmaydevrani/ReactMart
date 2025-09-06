import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addToCart, removeFromCart, clearCart} from "../features/cartSlice"


function Cards({products}) {

    const dispatch = useDispatch()
    const cartItem = useSelector((state)=>state.cart.items.find((item)=>item.id===products.id))

    const quantity = cartItem ? cartItem.quantity:0;
  return (
    <div className="h-full flex flex-col p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className='max-w-100 mb-3 h-[150px] flex justify-center items-center'>
            <img className="max-w-full max-h-[150px]" src={products.image} alt="" />
        </div>
        <div className="flex-grow flex flex-col">
            <a href="#">
                <h5 className="line-clamp-2 mb-1 text-[13px] font-bold tracking-tight text-gray-900 dark:text-white">
                    {products.title}
                </h5>
            </a>
            <p className="line-clamp-3 mb-3 text-[10px] font-normal text-gray-700 dark:text-gray-400">
                {products.description}
            </p>
            <div className="mt-auto flex justify-between items-center">
                <p className=''>{products.price}</p>
                {quantity === 0 ? (
                    <button onClick={()=>dispatch(addToCart(products))} className='outline-1 outline-[#c92d2d] rounded px-3 text-[13px] bg-red-50 text-[#c92d2d]'>
                        add
                    </button>
                )
                :(
                    <div className='flex gap-2 items-center bg-[#c92d2d] rounded text-white py-[1px] px-2'>
                        <button onClick={()=>dispatch(removeFromCart(products.id))}>
                            -
                        </button>
                        <p className='text-[13px]'>{quantity}</p>
                        <button onClick={()=>dispatch(addToCart(products))}>
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

import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, finalBill } from "../features/cartSlice"
import AddAddress from './AddAddress'

function Cart() {
  const { items, totalQuantity, totalPrice } = useSelector((state) => state.cart)

  const roundedTotalPrice = parseFloat(totalPrice).toFixed(2)
  const gst = (parseFloat(totalPrice) * 0.18).toFixed(2)
  const grandTotal = (parseFloat(totalPrice) + parseFloat(gst)).toFixed(2)

  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const handleSideBar = () => setIsOpen(true)
  const hideSideBar = () => setIsOpen(false)

  const [cartListing,setCartListing]=useState(true)

  const handleClickPay=()=>{
    dispatch(finalBill({
      gst:parseFloat(gst),
      grandTotal:parseFloat(grandTotal)
    }))
    setCartListing(false)
  }
  return (
    <>
      {totalQuantity === 0 ? (
        <div className="flex gap-2 bg-[#e8b8b8] px-5 py-[8px] rounded-[7px] text-white items-center">
          <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" dataName="Layer 1" viewBox="0 0 24 24" width="18" fill='white'><path d="M23.32,4.1c-.57-.7-1.42-1.1-2.32-1.1H7.24l-.04-.35c-.18-1.51-1.46-2.65-2.98-2.65h-1.22c-.55,0-1,.45-1,1s.45,1,1,1h1.22c.51,0,.93,.38,.99,.88l1.38,11.7c.3,2.52,2.43,4.42,4.97,4.42h8.44c.55,0,1-.45,1-1s-.45-1-1-1H11.56c-1.29,0-2.41-.82-2.83-2h9.43c2.38,0,4.44-1.69,4.9-4.02l.88-4.39c.18-.88-.05-1.79-.62-2.49Zm-1.34,2.1l-.88,4.39c-.28,1.4-1.52,2.41-2.94,2.41H8.42l-.94-8h13.52c.3,0,.58,.13,.77,.37,.19,.23,.27,.54,.21,.83Zm-10.98,15.8c0,1.1-.9,2-2,2s-2-.9-2-2,.9-2,2-2,2,.9,2,2Zm9,0c0,1.1-.9,2-2,2s-2-.9-2-2,.9-2,2-2,2,.9,2,2ZM0,6c0-.55,.45-1,1-1h1.54c.55,0,1,.45,1,1s-.45,1-1,1H1c-.55,0-1-.45-1-1Zm0,4c0-.55,.45-1,1-1H3c.55,0,1,.45,1,1s-.45,1-1,1H1c-.55,0-1-.45-1-1Zm5,4c0,.55-.45,1-1,1H1c-.55,0-1-.45-1-1s.45-1,1-1h3c.55,0,1,.45,1,1Z"/></svg>
          <p className="text-sm">Cart Empty</p>
        </div>
        ) : (
          <button
            onClick={handleSideBar}
            className="flex gap-2 bg-[#c92d2d] px-5 py-[8px] rounded-[7px] text-white items-center">
            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" dataName="Layer 1" viewBox="0 0 24 24" width="18" fill='white'><path d="M23.32,4.1c-.57-.7-1.42-1.1-2.32-1.1H7.24l-.04-.35c-.18-1.51-1.46-2.65-2.98-2.65h-1.22c-.55,0-1,.45-1,1s.45,1,1,1h1.22c.51,0,.93,.38,.99,.88l1.38,11.7c.3,2.52,2.43,4.42,4.97,4.42h8.44c.55,0,1-.45,1-1s-.45-1-1-1H11.56c-1.29,0-2.41-.82-2.83-2h9.43c2.38,0,4.44-1.69,4.9-4.02l.88-4.39c.18-.88-.05-1.79-.62-2.49Zm-1.34,2.1l-.88,4.39c-.28,1.4-1.52,2.41-2.94,2.41H8.42l-.94-8h13.52c.3,0,.58,.13,.77,.37,.19,.23,.27,.54,.21,.83Zm-10.98,15.8c0,1.1-.9,2-2,2s-2-.9-2-2,.9-2,2-2,2,.9,2,2Zm9,0c0,1.1-.9,2-2,2s-2-.9-2-2,.9-2,2-2,2,.9,2,2ZM0,6c0-.55,.45-1,1-1h1.54c.55,0,1,.45,1,1s-.45,1-1,1H1c-.55,0-1-.45-1-1Zm0,4c0-.55,.45-1,1-1H3c.55,0,1,.45,1,1s-.45,1-1,1H1c-.55,0-1-.45-1-1Zm5,4c0,.55-.45,1-1,1H1c-.55,0-1-.45-1-1s.45-1,1-1h3c.55,0,1,.45,1,1Z"/></svg>
            <p className="text-[12px]">{totalQuantity} Items | ${roundedTotalPrice}</p>
          </button>
        )}

     
        <div
          className={`fixed top-0 right-0 h-full bg-gray-50 shadow-lg z-50 border-l border-gray-300 
          transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0 w-80" : "translate-x-full w-80"}`}
          >
            {cartListing ? 
              <div>
                <div className="flex justify-between py-3 px-4 bg-white border-b border-gray-200">
                  <p className="text-[14px] font-semibold">My Cart</p>
                  <button onClick={hideSideBar}>x</button>
                </div>

                <div className="p-3 relative">
                  <ul className="bg-white rounded-[7px] border border-gray-200 p-4 mb-4 max-h-[400px] overflow-auto">
                    {items.map((e) => (
                      <li
                        key={e.id}
                        className="flex gap-2 mb-4 border-b border-gray-200 pb-3 items-center justify-between"
                      >
                        <div className="w-[60px] h-[60px] bg-gray-50 border border-gray-200 rounded-[10px] p-2 flex items-center justify-center">
                          <img src={e.image} alt={e.title} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 px-2">
                          <p className="text-[11px] line-clamp-3 mb-1">{e.title}</p>
                          <p className="font-bold text-[13px]">${parseFloat(e.price).toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2 items-center bg-[#c92d2d] rounded text-white py-[1px] px-2">
                          <button onClick={() => dispatch(removeFromCart(e.id))}>-</button>
                          <p className="text-[13px]"></p>
                          <button onClick={() => dispatch(addToCart(e))}>+</button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="text-[12px] bg-white rounded-[7px] border border-gray-200 p-4 mb-4">
                    <p className="mb-1 font-bold">Bill details</p>
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td>GST (18%)</td>
                          <td className="text-right">${gst}</td>
                        </tr>
                        <tr>
                          <td>Item Total</td>
                          <td className="text-right">${roundedTotalPrice}</td>
                        </tr>
                        <tr>
                          <td className="font-bold">Grand Total</td>
                          <td className="text-right font-bold">${grandTotal}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className='w-full absoulte bottom-0 bg-[#c92d2d] text-white text-center p-3 rounded-[10px] text-[14px] hover:bg-[#9d2323] transition-all'>
                    <button onClick={handleClickPay}>Click to Pay ${grandTotal}</button>
                  </div>
                </div>
              </div> :
              <AddAddress/> 
            }
        </div>
    </>
  )
}

export default Cart

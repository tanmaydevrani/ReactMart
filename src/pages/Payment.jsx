import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Payment() {
  const [address, setAddress] = useState(null)
  const [paid, setPaid] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('address')
    if (saved) setAddress(JSON.parse(saved))
  }, [])

  const { items, totalQuantity, totalPrice, gst, grandTotal } = useSelector((state) => state.cart)

  const handlePay = (e) => {
    e.preventDefault()
    setPaid(true)
  }

  if (paid) {
    return (
      <div>
        <Header />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Order Placed!</h2>
          <p className="text-sm text-gray-500">Thanks for shopping with ReactMart.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-2 px-6 py-2.5 bg-[#c92d2d] text-white text-sm rounded-lg hover:bg-[#a82525] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <section className="bg-white py-6 antialiased">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Checkout</h2>

            <div className="mt-2 lg:flex lg:items-start lg:gap-10">
              <form
                onSubmit={handlePay}
                className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:max-w-xl"
              >
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Payment Details</h3>
                <div className="mb-5 grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Full name</label>
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#c92d2d] focus:ring-1 focus:ring-[#c92d2d] focus:outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Card number</label>
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#c92d2d] focus:ring-1 focus:ring-[#c92d2d] focus:outline-none"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Expiry date</label>
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#c92d2d] focus:ring-1 focus:ring-[#c92d2d] focus:outline-none"
                      placeholder="MM/YY"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">CVV</label>
                    <input
                      type="number"
                      className="block w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#c92d2d] focus:ring-1 focus:ring-[#c92d2d] focus:outline-none"
                      placeholder="•••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-[#c92d2d] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#a82525] transition-colors focus:outline-none"
                >
                  Pay ${grandTotal || parseFloat(totalPrice + totalPrice * 0.18).toFixed(2)}
                </button>
              </form>

              <div className="mt-6 grow lg:mt-0">
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Order Summary</h3>

                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Delivery to</p>
                    {address ? (
                      <p className="text-xs text-gray-700 font-medium">
                        {address.Name}, {address.floor}, {address.Building}
                        {address.Landmark ? `, ${address.Landmark}` : ''}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">No address saved</p>
                    )}
                  </div>

                  <div className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-2 flex justify-between mb-3">
                    <span className="text-gray-500">Items in cart</span>
                    <span className="font-medium">{totalQuantity}</span>
                  </div>

                  <ul className="bg-white rounded-lg border border-gray-200 p-3 mb-3 max-h-[180px] overflow-auto space-y-3">
                    {items.map((e) => (
                      <li key={e.id} className="flex gap-2 items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <div className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                          <img src={e.image} alt={e.title} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] line-clamp-2 text-gray-700">{e.title}</p>
                          <p className="font-semibold text-xs text-gray-900 mt-0.5">
                            ${parseFloat(e.price).toFixed(2)} × {e.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>${parseFloat(totalPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                      <span>GST (18%)</span>
                      <span>${gst || (totalPrice * 0.18).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2">
                      <span>Grand Total</span>
                      <span>${grandTotal || parseFloat(totalPrice * 1.18).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-center gap-6 opacity-60">
                  <img className="h-6 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="PayPal" />
                  <img className="h-6 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="Visa" />
                  <img className="h-6 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="Mastercard" />
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 text-xs mt-6">
              Payments are securely processed by ReactMart
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Payment

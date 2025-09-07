import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useSelector } from 'react-redux'

function Payment() {

    const [address,setAddress]=useState(null)

    useEffect(()=>{
        const saved=localStorage.getItem('address');
        if(saved){
            setAddress(JSON.parse(saved))
        }
    },[])

    const {items,totalQuantity,totalPrice,gst,grandTotal}=useSelector((state)=>state.cart)
    return (
        <div>
            <Header/>
            <section className="bg-white py-3 antialiased dark:bg-gray-900 md:py-10">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="mx-auto max-w-5xl">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

                        <div className="mt-2 lg:flex lg:items-start lg:gap-12">
                            <form action="#" className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
                                <div className="mb-6 grid grid-cols-2 gap-4">
                                    <div className="col-span-2 sm:col-span-1">
                                    <label for="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name* </label>
                                    <input type="text" id="full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Bonnie Green" required />
                                    </div>

                                    <div className="col-span-2 sm:col-span-1">
                                    <label for="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
                                    <input type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" pattern="^4[0-9]{12}(?:[0-9]{3})?$" required />
                                    </div>

                                    <div>
                                    <label for="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                                        <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                            fill-rule="evenodd"
                                            d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                                            clip-rule="evenodd"
                                            />
                                        </svg>
                                        </div>
                                        <input datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="12/23" required />
                                    </div>
                                    </div>
                                    <div>
                                    <label for="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                                        CVV*
                                        <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                                        </svg>
                                        </button>
                                        <div id="cvv-desc" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                        The last 3 digits on back of card
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                        </div>
                                    </label>
                                    <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
                                    </div>
                                </div>

                                <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Pay now</button>
                            </form>

                            <div className="mt-6 grow sm:mt-8 lg:mt-0">
                                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                    <div>
                                        <p className='m-0'>Delivery Address</p>
                                        {address?(
                                            <p className='text-[12px] text-gray-500'>{address.Name}, {address.floor}, {address.Building}, {address.Landmark}</p>
                                        ):(
                                            <p>no Address</p>
                                        )}
                                    </div>
                                    <div className='text-[12px] bg-white border-1 border-gray-200 rounded p-3 flex justify-between'>
                                        <p>My Cart</p>
                                        <p>{totalQuantity} Items</p>
                                    </div>
                                    <ul className="bg-white rounded-[7px] border border-gray-200 p-4 mb-4 max-h-[200px] overflow-auto">
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
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="space-y-2">
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total</dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">${totalPrice}</dd>
                                        </dl>
                                        <dl className="flex items-center justify-between gap-4">
                                            <dt className="text-base font-normal text-gray-500 dark:text-gray-400">GST (18%)</dt>
                                            <dd className="text-base font-medium text-gray-900 dark:text-white">${gst}</dd>
                                        </dl>
                                    </div>

                                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">Grand Total</dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">${grandTotal}</dd>
                                    </dl>
                                </div>

                                <div className="mt-6 flex items-center justify-center gap-8">
                                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
                                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
                                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-gray-500 text-sm dark:text-gray-400 mt-2 lg:text-left">
                            Payment processed by REACT MART
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Payment

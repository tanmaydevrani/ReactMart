import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from "../features/authSlice"
import Logo from "../components/Logo"
import Cart from '../components/Cart'

function Header() {
    const dispatch=useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
      }
  return (
    <div className='flex justify-between p-4 border-b-1 border-gray-200 sticky top-0 bg-white'>
        <Logo/>

        <div className='flex gap-2 items-center'>
            <button
                onClick={handleLogout}
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-[12px] px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
                Logout
            </button>
            <Cart/>
        </div>
    </div>
  )
}

export default Header

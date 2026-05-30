import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../features/authSlice"
import Logo from "../components/Logo"
import Cart from '../components/Cart'

function Header() {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.auth)

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <div className="flex justify-between items-center px-5 py-3 border-b border-gray-100 sticky top-0 bg-white z-40">
      <Logo />

      <div className="flex gap-3 items-center">
        {currentUser && (
          <span className="hidden sm:block text-xs text-gray-400 max-w-[160px] truncate">
            {currentUser}
          </span>
        )}
        <button
          onClick={handleLogout}
          className="text-xs text-gray-600 border border-gray-200 rounded-lg px-4 py-1.5 hover:bg-gray-50 transition-colors"
        >
          Logout
        </button>
        <Cart />
      </div>
    </div>
  )
}

export default Header

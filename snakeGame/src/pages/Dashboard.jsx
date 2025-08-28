import React from 'react'
import { logout } from "../features/authSlice"
import { useDispatch } from 'react-redux'


function Dashboard() {

    const dispatch=useDispatch()

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
      }
  return (
    <div>
      Dashboard
        <button
            onClick={handleLogout}
            className="mt-3 text-xs text-gray-600 underline"
          >
            Logout
          </button>
    </div>
  )
}

export default Dashboard

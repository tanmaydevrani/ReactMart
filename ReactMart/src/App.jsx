import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Dashboard from './pages/Dashboard'
import Payment from './pages/Payment'
import { useSelector } from 'react-redux'

function App() {
  const { isLoggedIn } = useSelector((state) => state.auth)

  return (
    <div>
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/payment" element={isLoggedIn ? <Payment/> : <Navigate to="/login" />} />

        <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />} />

        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App

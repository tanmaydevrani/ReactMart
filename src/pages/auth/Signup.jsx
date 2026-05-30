import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from "../../features/authSlice"
import Logo from '../../components/Logo'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useSelector((state) => state.auth)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    dispatch(signup(data))
    if (!error) {
      setSuccess(true)
      setTimeout(() => navigate('/login'), 1200)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="m-auto w-full max-w-sm px-6 py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
        <Logo />

        <div className="mt-5">
          <h2 className="text-2xl font-semibold text-gray-800">Create an account</h2>
          <p className="text-xs text-gray-400 mt-1">
            Already have an account?{' '}
            <Link className="text-[#c92d2d] hover:underline font-medium" to="/login">
              Sign in
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:border-[#c92d2d] focus:ring-1 focus:ring-[#c92d2d]"
            />
            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:border-[#c92d2d] focus:ring-1 focus:ring-[#c92d2d]"
            />
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            className="duration-150 transition-all text-white bg-[#c92d2d] hover:bg-[#a82525] text-sm w-full rounded-lg p-2.5 font-medium"
          >
            Create account
          </button>
        </form>

        {success && (
          <p className="text-green-600 mt-3 text-xs text-center">Account created! Redirecting...</p>
        )}
        {error && <p className="text-red-500 mt-3 text-xs text-center">{error}</p>}
      </div>
    </div>
  )
}

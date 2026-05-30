import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../../features/authSlice"
import Logo from '../../components/Logo'
import { Link } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function Login() {
  const dispatch = useDispatch()
  const { error } = useSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => {
    dispatch(login(data))
  }

  const fillDemo = () => {
    setValue('email', 'demo@reactmart.com')
    setValue('password', 'demo123')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="m-auto w-full max-w-sm px-6 py-10 bg-white rounded-2xl shadow-sm border border-gray-100">
        <Logo />

        <div className="mt-5">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome back</h2>
          <p className="text-xs text-gray-400 mt-1">
            Don't have an account?{' '}
            <Link className="text-[#c92d2d] hover:underline font-medium" to="/signup">
              Sign up
            </Link>
          </p>
        </div>

        <div
          onClick={fillDemo}
          className="mt-5 bg-red-50 border border-red-100 rounded-lg px-4 py-3 cursor-pointer hover:bg-red-100 transition-colors"
        >
          <p className="text-[11px] font-semibold text-[#c92d2d] mb-0.5">Try with demo account</p>
          <p className="text-[11px] text-gray-500">demo@reactmart.com &nbsp;/&nbsp; demo123</p>
          <p className="text-[10px] text-gray-400 mt-1">Click to autofill →</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
          <div>
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:border-[#c92d2d] focus:ring-1 focus:ring-[#c92d2d]"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="border border-gray-200 rounded-lg p-2.5 text-sm w-full focus:outline-none focus:border-[#c92d2d] focus:ring-1 focus:ring-[#c92d2d]"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="duration-150 transition-all text-white bg-[#c92d2d] hover:bg-[#a82525] text-sm w-full rounded-lg p-2.5 font-medium"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-xs text-center">{error}</p>}
      </div>
    </div>
  )
}

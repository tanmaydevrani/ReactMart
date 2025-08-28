import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {signup} from "../../features/authSlice"
import Logo from '../../components/Logo'
import { Link } from 'react-router-dom'

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })

export default function AuthLayout() {

    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm({
        resolver: zodResolver(schema)
    })

    const dispatch = useDispatch()
    const {error}=useSelector((state)=>state.auth)

    const onSubmit=(data)=>{
        dispatch(signup(data))
    }

    return (
        <div className='flex items-center align-items-center min-h-[100vh]'>
             <div className='p-8 max-w-[28rem] m-auto w-full h-full'>
                <Logo />
                <div className='mt-1 flex justify-center h-full flex-col'>
                    <h2 className='text-3xl font-semibold'>Create an account</h2>
                    <div className='text-[12px] gap-1 flex'>
                        <span className='text-gray-600'>Already have an Account?</span>
                        <Link className='text-gray-800 underline' to="/login">
                            Sign in
                        </Link>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                        <div className='mb-4'>
                            <input
                                type='text'
                                placeholder='Email'
                                {...register("email")}
                                className='outline-gray-200 rounded outline-1 p-2 text-sm w-full'
                            />
                            <p className='text-red-500 text-xs mt-1'>{errors.email?.message}</p>
                        </div>
                        <div className='mb-4'>
                            <input
                                type='text'
                                placeholder='Password'
                                {...register("password")}
                                className='outline-gray-200 rounded outline-1 p-2 text-sm w-full'
                            />
                            <p className='text-red-500 text-xs mt-1'>{errors.password?.message}</p>
                        </div>
                        <button type='submit' className='duration-100 transition-all text-white bg-[#c92d2d] hover:bg-[#a82525] text-sm w-full rounded p-2'>Create an account</button>
                    </form>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
  )
}



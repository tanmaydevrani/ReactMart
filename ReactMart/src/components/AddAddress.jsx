import React from 'react'
import { useNavigate } from 'react-router-dom'

function AddAddress() {

    const navigate = useNavigate()

    const handleAdressForm=(e)=>{
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        localStorage.setItem('address', JSON.stringify(data))

        navigate('/payment')
    }
  return (
    <div className='p-4'>
        <h1 className='mb-2'>Add Address</h1>
        <form onSubmit={handleAdressForm} className='text-[12px] bg-white p-4 rounded-[8px] border-gray-200 border-1'>
            <div className='flex flex-col mb-4'>
                <label className='mb-1'>Name</label>
                <input 
                    className='border-1 border-gray-400 rounded p-1 focus-visible:outline-0' 
                    type='text'
                    name='Name'
                    placeholder='Enter name'    
                    required
                />
            </div>
            <div className='flex flex-col mb-4'>
                <label className='mb-1'>Flat no/ floor</label>
                <input 
                    className='border-1 border-gray-400 rounded p-1 focus-visible:outline-0' 
                    type='text'
                    name='floor'
                    placeholder='Enter Float no/floor' 
                    required   
                />
            </div>
            <div className='flex flex-col mb-4'>
                <label className='mb-1'>Building & block</label>
                <input
                    className='border-1 border-gray-400 rounded p-1 focus-visible:outline-0' 
                    type='text'
                    name='Building'
                    placeholder='Building & block'  
                    required    
                />
            </div>
            <div className='flex flex-col mb-4'>
                <label className='mb-1'>Landmark (optional)</label>
                <input 
                    className='border-1 border-gray-400 rounded p-1 focus-visible:outline-0' 
                    type='text'
                    name='Landmark'
                    placeholder='Building & block'
                />
            </div>
            <div className='w-full absoulte bottom-0 bg-[#c92d2d] text-white text-center p-3 rounded-[10px] text-[14px] hover:bg-[#9d2323] transition-all'>
                <button type='submit'>Continue</button>
            </div>
        </form>
    </div>
  )
}

export default AddAddress

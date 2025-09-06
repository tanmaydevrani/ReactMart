import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'

function ProductsList() {

    const [item, setItem]=useState([])
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)

    useEffect(()=>{
        fetch("https://fakestoreapi.com/products")
        .then((resp)=>{
            return resp.json()
        })
        .then((data)=>{
            setItem(data);
            setLoading(false)
        })
        .catch((err)=>{
            setError(err.message);
            setLoading(false)
        })
    },[])

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
  return (
    <div className='grid grid-cols-6 gap-5 p-5 max-w-6xl m-auto'>
        {item.map((res)=>(
            <Cards key={res.id} products={res} />
        ))}
    </div>
  )
}

export default ProductsList

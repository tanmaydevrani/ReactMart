import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'

function ProductsList() {
  const [item, setItem] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((resp) => resp.json())
      .then((data) => {
        setItem(data)
        setFilteredProducts(data) 
        setLoading(false)

        const uniqueCat = ['all', ...new Set(data.map((item) => item.category))]
        setCategory(uniqueCat)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleFilter = (category) => {
    setActiveCategory(category)
    if (category === "all") {
      setFilteredProducts(item) 
    } else {
      setFilteredProducts(item.filter((p) => p.category === category))
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="max-w-6xl m-auto p-5">
      <div className="flex gap-3 mb-6 flex-wrap">
        {category.map((cat) => (
          <button
            key={cat}
            onClick={() => handleFilter(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeCategory === cat
                ? "bg-red-50 text-[#c92d2d] outline-1 outline-red-500"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-5">
        {filteredProducts.map((res) => (
          <Cards key={res.id} products={res} />
        ))}
      </div>
    </div>
  )
}

export default ProductsList

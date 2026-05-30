import React, { useEffect, useState, useMemo } from 'react'
import Cards from '../components/Cards'

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="w-8 h-8 border-3 border-gray-200 border-t-[#c92d2d] rounded-full animate-spin"></div>
      <p className="text-sm text-gray-400">Loading products...</p>
    </div>
  )
}

function ProductsList() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((resp) => resp.json())
      .then((data) => {
        setItems(data)
        setCategories(['all', ...new Set(data.map((item) => item.category))])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const filtered = useMemo(() => {
    let result = activeCategory === 'all'
      ? items
      : items.filter((p) => p.category === activeCategory)

    if (search.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating?.rate - a.rating?.rate)

    return result
  }, [items, activeCategory, search, sort])

  if (loading) return <Spinner />
  if (error) return (
    <div className="flex flex-col items-center justify-center py-24 gap-2">
      <p className="text-gray-500 text-sm">Something went wrong</p>
      <p className="text-xs text-gray-400">{error}</p>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#c92d2d] focus:ring-1 focus:ring-[#c92d2d]"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:border-[#c92d2d]"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
              activeCategory === cat
                ? "bg-[#c92d2d] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-2">
          <p className="text-gray-500 text-sm">No products found</p>
          <button
            onClick={() => { setSearch(''); setActiveCategory('all') }}
            className="text-xs text-[#c92d2d] underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((product) => (
            <Cards key={product.id} products={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsList

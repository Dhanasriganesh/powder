import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { Filter, Grid, List, Star, ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
// import { productsData } from '../../data/products'
import { fetchProducts } from '../../services/products'

function useQuery() {
  const { search } = useLocation()
  return React.useMemo(() => new URLSearchParams(search), [search])
}

function Products() {
  const location = useLocation()
  const navigate = useNavigate()
  const query = useQuery()
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSize, setSelectedSize] = useState('all')
  const [selectedProductSizes, setSelectedProductSizes] = useState({})
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites') || '[]')
    } catch {
      return []
    }
  })

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'skin-care', label: 'Skin Care Products' },
    { value: 'hair-care', label: 'Hair Care Products' },
    { value: 'oral-care', label: 'Oral Care Products' }
  ]

  const sizes = [
    { value: 'all', label: 'All Sizes' },
    { value: '100g', label: '100g' },
    { value: '200g', label: '200g' },
    { value: '250g', label: '250g' },
    { value: '500g', label: '500g' }
  ]

  useEffect(() => {
    let cancelled = false
    async function load() {
      const list = await fetchProducts({})
      if (!cancelled) {
        setProducts(list)
        setFilteredProducts(list)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  // Seed search from ?q=
  useEffect(() => {
    const q = query.get('q') || ''
    if (q) setSearchQuery(q)
  }, [query])

  useEffect(() => {
    let filtered = [...products]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (selectedSize !== 'all') {
      filtered = filtered.filter(product => product.sizes.some(size => size.size === selectedSize))
    }

    if (searchQuery) {
      const key = searchQuery.toLowerCase()
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(key) ||
        product.description.toLowerCase().includes(key) ||
        product.ingredients.toLowerCase().includes(key) ||
        product.category.replace('-', ' ').toLowerCase().includes(key)
      )
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.sizes[0].price - b.sizes[0].price
        case 'price-high':
          return b.sizes[0].price - a.sizes[0].price
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.reviews - a.reviews
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }, [selectedCategory, selectedSize, sortBy, searchQuery, products])

  const getCategoryFromPath = () => {
    const path = location.pathname
    if (path.includes('skin-care')) return 'skin-care'
    if (path.includes('hair-care')) return 'hair-care'
    if (path.includes('oral-care')) return 'oral-care'
    return 'all'
  }

  useEffect(() => {
    const categoryFromPath = getCategoryFromPath()
    if (categoryFromPath !== 'all') setSelectedCategory(categoryFromPath)
  }, [location.pathname])

  const handleAddToCart = (product) => {
    const selectedSize = selectedProductSizes[product.id] || product.sizes[0].size
    const sizeObj = product.sizes.find(size => size.size === selectedSize)
    if (sizeObj) addToCart(product, sizeObj, 1)
  }

  const handleSizeSelect = (productId, size) => {
    setSelectedProductSizes(prev => ({ ...prev, [productId]: size }))
  }

  const addToFavorites = (productId) => {
    setFavorites(prev => {
      const exists = prev.includes(productId)
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId]
      localStorage.setItem('favorites', JSON.stringify(next))
      return next
    })
  }

  const handleBuyNow = (product) => {
    const selectedSize = selectedProductSizes[product.id] || product.sizes[0].size
    const sizeObj = product.sizes.find(size => size.size === selectedSize)
    if (sizeObj) {
      addToCart(product, sizeObj, 1)
      navigate('/cart')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {selectedCategory === 'all' ? 'All Products' : categories.find(cat => cat.value === selectedCategory)?.label}
          </h1>
          <p className="text-lg text-slate-600">Discover our range of natural, traditional care products</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-md ring-1 ring-emerald-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
            </div>
            <div>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {categories.map(category => (<option key={category.value} value={category.value}>{category.label}</option>))}
              </select>
            </div>
            <div>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                {sizes.map(size => (<option key={size.value} value={size.value}>{size.label}</option>))}
              </select>
            </div>
            <div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-slate-600">Showing {filteredProducts.length} products</div>
            <div className="flex space-x-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}><Grid size={16} /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}><List size={16} /></button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-6'}>
          {filteredProducts.map((product) => {
            const selectedSize = selectedProductSizes[product.id] || product.sizes[0].size
            const sizeObj = product.sizes.find(size => size.size === selectedSize)
            const discount = Math.round(((sizeObj.originalPrice - sizeObj.price) / sizeObj.originalPrice) * 100)

            return (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                {/* Image - Clickable */}
                <Link to={`/shop/product/${product.id}`} className="block relative overflow-hidden bg-gradient-to-br from-emerald-50 to-gray-50 aspect-square">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      {/* Discount Badge */}
                      {discount > 0 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                          -{discount}%
                        </div>
                      )}
                      {/* Favorite Button */}
                      <button 
                        onClick={(e) => {
                          e.preventDefault()
                          addToFavorites(product.id)
                        }}
                        className={`absolute top-3 left-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 ${favorites.includes(product.id) ? 'text-red-500' : 'text-gray-600'}`}
                      >
                        <Heart size={18} className={`${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <div className="text-sm font-medium">{product.name}</div>
                        <div className="text-xs">{product.category.replace('-', ' ')}</div>
                      </div>
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Title and Rating */}
                  <div>
                    <Link to={`/shop/product/${product.id}`}>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-emerald-700 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({product.reviews})</span>
                    </div>
                    {/* Subtitle */}
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-emerald-700">
                      ₹{sizeObj.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ₹{sizeObj.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Size Selector - Simplified */}
                  <div>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size, index) => (
                        <button 
                          key={index} 
                          onClick={() => handleSizeSelect(product.id, size.size)} 
                          className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                            selectedSize === size.size 
                              ? 'bg-emerald-700 text-white shadow-md' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {size.size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons - Modern */}
                  <div className="flex items-center gap-3 pt-2">
                    <button 
                      onClick={() => handleBuyNow(product)} 
                      className="flex-1 h-12 border-2 border-gray-300 hover:border-emerald-600 text-gray-900 hover:text-emerald-700 font-semibold px-4 rounded-full transition-all hover:shadow-sm flex items-center justify-center gap-2"
                    >
                      Buy now
                    </button>
                    <button 
                      onClick={() => handleAddToCart(product)} 
                      className="flex-1 h-12 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-4 rounded-full flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95 border-2 border-transparent"
                    >
                      <ShoppingCart size={18} />
                      <span>Add to cart</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-500 text-lg">No products found matching your criteria.</div>
            <button onClick={() => { setSelectedCategory('all'); setSelectedSize('all'); setSearchQuery('') }} className="mt-4 text-emerald-800 hover:text-emerald-600 font-medium">Clear all filters</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products

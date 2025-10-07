import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Leaf, Shield, Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { fetchProducts } from '../../services/products'
import { productsData } from '../../data/products'

function Home() {
  const { addToCart } = useCart()
  const [selectedSizes, setSelectedSizes] = useState({})
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites') || '[]') } catch { return [] }
  })
  
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    let cancelled = false
    async function load() {
      const list = await fetchProducts({})
      // simple pick: top 4 by rating
      const top = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 4)
      if (!cancelled) setFeaturedProducts(top)
    }
    load()
    return () => { cancelled = true }
  }, [])

  const handleAddToCart = (product) => {
    const selectedSize = selectedSizes[product.id] || product.sizes[0].size
    const sizeObj = product.sizes.find(size => size.size === selectedSize)
    addToCart(product, sizeObj, 1)
  }

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }))
  }

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const exists = prev.includes(productId)
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId]
      localStorage.setItem('favorites', JSON.stringify(next))
      return next
    })
  }

  const testimonials = [
    { name: "Priya Sharma", location: "Mumbai", rating: 5, comment: "Amazing natural products! My skin has never felt better. The Sassy Sunnipindi is my go-to for glowing skin." },
    { name: "Rajesh Kumar", location: "Delhi", rating: 5, comment: "The Anti Hairfall powder worked wonders for my hair. Natural, effective, and affordable - exactly what I was looking for." },
    { name: "Sunita Reddy", location: "Bangalore", rating: 5, comment: "Love the authenticity and quality. The products are gentle on skin and deliver amazing results. Highly recommended!" }
  ]

  const features = [
    { icon: <Leaf className="w-8 h-8" />, title: "100% Natural", description: "Pure, chemical-free ingredients sourced from nature" },
    { icon: <Shield className="w-8 h-8" />, title: "Family Safe", description: "Safe for all ages, gentle on sensitive skin" },
    { icon: <Heart className="w-8 h-8" />, title: "Traditional Wisdom", description: "Age-old recipes passed down through generations" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50 to-white">
      {/* Hero Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-800 via-emerald-600 to-emerald-500" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-400/30 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-white">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              The Powder Legacy
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-emerald-100">
              Timeless Wisdom of Traditional Self-Care, Reimagined
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/shop" 
                className="btn-primary px-8 py-3 inline-flex items-center justify-center"
              >
                Shop Now <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link 
                to="/about" 
                className="btn-outline px-8 py-3 inline-flex items-center justify-center"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              About The Powder Legacy
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-700 mb-6">
                At <strong>The Powder Legacy</strong>, we carry forward the timeless wisdom of traditional self-care, reimagined for today's world. Our products are crafted with natural, chemical-free ingredients, offering safe and effective alternatives to everyday personal care and wellness needs.
              </p>
              <p className="text-slate-700 mb-6">
                From bath powders and hair care to nutritional supplements and tooth powders, each product is rooted in heritage and refined with care to suit modern lifestyles. We are committed to purity, sustainability, and trust – ensuring that every product is thoughtfully sourced, affordable, and family-friendly.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center text-emerald-800 font-semibold hover:text-emerald-600 transition-colors"
              >
                Read More About Us <ArrowRight className="ml-2" size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-white shadow-md ring-1 ring-emerald-100">
                  <div className="text-emerald-800 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Products</h2>
            <p className="text-lg text-slate-600">Discover our bestsellers crafted with traditional wisdom</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => {
              const selectedSize = selectedSizes[product.id] || product.sizes[0].size
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
                          onClick={(e) => { e.preventDefault(); toggleFavorite(product.id) }}
                          className={`absolute top-3 left-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110 ${favorites.includes(product.id) ? 'text-red-500' : 'text-gray-600'}`}
                        >
                          <Heart size={18} className={`${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <div className="text-center">
                          <div className="text-sm font-medium">{product.name}</div>
                        </div>
                      </div>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-5 space-y-3">
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

                    {/* Action Button */}
                    <div className="pt-2">
                      <button 
                        onClick={() => handleAddToCart(product)} 
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95"
                      >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop" className="btn-primary px-8 py-3 inline-flex items-center">
              View All Products <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Product Categories</h2>
            <p className="text-lg text-slate-600">Natural care solutions for every need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/shop/skin-care" className="group bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-xl hover:shadow-xl transition-all ring-1 ring-emerald-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-800">Skin Care Products</h3>
              <p className="text-slate-700 mb-6">Nourish your skin with our range of traditional bath powders and skincare solutions.</p>
              <div className="text-emerald-800 font-semibold group-hover:text-emerald-600">Explore Skin Care →</div>
            </Link>

            <Link to="/shop/hair-care" className="group bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-xl hover:shadow-xl transition-all ring-1 ring-emerald-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-800">Hair Care Products</h3>
              <p className="text-slate-700 mb-6">Strengthen and nourish your hair with our natural hair care powders.</p>
              <div className="text-emerald-800 font-semibold group-hover:text-emerald-600">Explore Hair Care →</div>
            </Link>

            <Link to="/shop/oral-care" className="group bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-xl hover:shadow-xl transition-all ring-1 ring-emerald-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-800">Oral Care Products</h3>
              <p className="text-slate-700 mb-6">Maintain oral hygiene naturally with our traditional tooth powders.</p>
              <div className="text-emerald-800 font-semibold group-hover:text-emerald-600">Explore Oral Care →</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-slate-600">Real experiences from our satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md ring-1 ring-emerald-100">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'} />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">"{testimonial.comment}"</p>
                <div className="text-sm">
                  <div className="font-semibold text-slate-900">{testimonial.name}</div>
                  <div className="text-slate-600">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-tr from-emerald-800 via-emerald-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Natural Care Today</h2>
          <p className="text-xl mb-8 text-emerald-100">Join thousands of satisfied customers who have embraced natural living</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="btn-primary px-8 py-3">Start Shopping</Link>
            <Link to="/contact" className="btn-outline px-8 py-3">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

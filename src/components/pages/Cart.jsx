import React from 'react'
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'

function Cart() {
  const { items: cartItems, updateQuantity, removeFromCart, getCartTotal, getCartSavings } = useCart()

  const handleUpdateQuantity = (id, size, newQuantity) => {
    updateQuantity(id, size, newQuantity)
  }

  const handleRemoveItem = (id, size) => {
    removeFromCart(id, size)
  }

  // Safety check
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-lg text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/shop"
              className="bg-green-800 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Link
              to="/shop"
              className="flex items-center text-gray-600 hover:text-green-800 transition-colors mr-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          <div className="text-sm text-gray-600">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in cart
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart Items</h2>
                
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-gray-400 text-xs text-center">
                            <div className="font-medium">{item.name}</div>
                            <div>{item.category}</div>
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category} • {item.size}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-bold text-green-800">₹{item.price}</span>
                          <span className="text-sm text-gray-500 line-through">₹{item.originalPrice}</span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{item.price * item.quantity}
                        </div>
                        <div className="text-sm text-gray-500">
                          Save ₹{(item.originalPrice - item.price) * item.quantity}
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.size)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md sticky top-4">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">₹{getCartTotal()}</span>
                  </div>
                  
                  <div className="flex justify-between text-green-600">
                    <span>You Save:</span>
                    <span className="font-medium">₹{getCartSavings()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/checkout/address"
                  className="w-full bg-green-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-6 flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-4 text-center">
                  <Link
                    to="/shop"
                    className="text-green-800 hover:text-green-600 transition-colors text-sm"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm font-medium">Secure Checkout</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">
                    Your payment information is safe and encrypted.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for recommended products */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <div className="text-sm">Recommended</div>
                    <div className="text-xs">Product {item}</div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Recommended Product {item}</h3>
                  <p className="text-sm text-gray-600 mb-3">Category</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-green-800">₹299</span>
                      <span className="text-sm text-gray-500 line-through">₹399</span>
                    </div>
                    <button className="bg-green-800 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

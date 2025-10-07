import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Package, Mail, Phone } from 'lucide-react'

function OrderSuccess() {
  const location = useLocation()
  const { paymentId, orderId } = location.state || {}

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Placed Successfully!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. We've received your payment and will start processing your order shortly.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
            {paymentId && (
              <div className="text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-medium">{paymentId}</span>
                </div>
                {orderId && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{orderId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center justify-center">
              <Package className="w-5 h-5 mr-2" />
              What's Next?
            </h3>
            <ul className="text-left text-blue-800 space-y-2">
              <li>• You will receive an order confirmation email shortly</li>
              <li>• We'll start processing your order within 24 hours</li>
              <li>• You'll receive SMS updates about your order status</li>
              <li>• Your order will be shipped within 2-3 business days</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Need Help?</h3>
            <div className="space-y-2 text-green-800">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@thepowderlegacy.in</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91-7337334653</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-green-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="border border-green-800 text-green-800 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSuccess

import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveOrder } from '../../services/db'
import { useCart } from '../../contexts/CartContext'

function PaymentCallback() {
  const navigate = useNavigate()
  const { items: cartItems, getCartTotal, getCartSavings, clearCart } = useCart()
  const [status, setStatus] = useState('Processing payment...')

  useEffect(() => {
    async function finalize() {
      try {
        const params = new URLSearchParams(window.location.search)
        const paymentId = params.get('razorpay_payment_id') || params.get('payment_id') || null
        const orderId = params.get('razorpay_order_id') || params.get('order_id') || `order_${Date.now()}`
        const deliveryInfo = JSON.parse(localStorage.getItem('deliveryInfo') || 'null')
        const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress') || 'null')
        const deliv = deliveryInfo?.deliveryPrice || 0

        await saveOrder({
          orderId,
          paymentId,
          items: cartItems,
          totals: {
            subtotal: getCartTotal(),
            savings: getCartSavings(),
            delivery: deliv,
            total: getCartTotal() + deliv,
          },
          deliveryInfo: deliveryInfo || null,
          shippingAddress: shippingAddress || null,
          paymentMethod: 'payment_link',
        })
        clearCart()
        localStorage.removeItem('shippingAddress')
        localStorage.removeItem('deliveryInfo')
        setStatus('Payment confirmed. Redirecting...')
        setTimeout(() => navigate('/order-success', { state: { paymentId } }), 800)
      } catch (e) {
        setStatus('Failed to record payment. You can contact support if funds were captured.')
      }
    }
    finalize()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{status}</h1>
        <p className="text-gray-600">Please wait...</p>
      </div>
    </div>
  )
}

export default PaymentCallback



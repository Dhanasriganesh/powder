import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Shield, AlertCircle, ExternalLink } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'
import { saveOrder } from '../../services/db'

function CheckoutPayment() {
  const navigate = useNavigate()
  const { items: cartItems, getCartTotal, getCartSavings, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState(null)
  const [shippingAddress, setShippingAddress] = useState(null)

  const RZP_KEY_ID = import.meta.env.VITE_RZP_KEY_ID || 'rzp_test_RQExe4U0EyrYxr'
  const PAYMENT_PAGE_URL = import.meta.env.VITE_RZP_PAYMENT_PAGE_URL || ''

  useEffect(() => {
    const savedDeliveryInfo = localStorage.getItem('deliveryInfo')
    if (savedDeliveryInfo) setDeliveryInfo(JSON.parse(savedDeliveryInfo))
    const savedAddress = localStorage.getItem('shippingAddress')
    if (savedAddress) setShippingAddress(JSON.parse(savedAddress))
  }, [])

  const amountPaise = () => {
    const total = getCartTotal() + (deliveryInfo?.deliveryPrice || 0)
    return Math.round(total * 100)
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const generateInvoiceDownload = (orderId, paymentId) => {
    const rows = cartItems.map(it => `<tr><td>${it.name} (${it.size})</td><td>${it.quantity}</td><td>₹${it.price}</td><td>₹${it.price * it.quantity}</td></tr>`).join('')
    const deliv = deliveryInfo?.deliveryPrice || 0
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Invoice ${orderId}</title>
      <style>body{font-family:Arial,sans-serif;padding:24px;color:#111}h1{font-size:20px;margin:0 0 8px}
      table{width:100%;border-collapse:collapse;margin-top:12px}th,td{border:1px solid #ddd;padding:8px;font-size:12px;text-align:left}
      .totals{margin-top:12px;font-size:14px}
      </style></head><body>
      <h1>The Powder Legacy - Invoice</h1>
      <div>Order ID: <strong>${orderId}</strong></div>
      <div>Payment ID: <strong>${paymentId || '-'}</strong></div>
      <table><thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead><tbody>${rows}</tbody></table>
      <div class="totals">
        <div>Subtotal: ₹${getCartTotal()}</div>
        <div>Savings: ₹${getCartSavings()}</div>
        <div>Delivery: ₹${deliv}</div>
        <div><strong>Grand Total: ₹${getCartTotal() + deliv}</strong></div>
      </div>
      </body></html>`
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice_${orderId}.html`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const handlePayment = async () => {
    const amt = amountPaise()
    if (!deliveryInfo) {
      alert('Please complete delivery information first')
      navigate('/checkout/delivery')
      return
    }
    if (!amt || amt < 100) {
      alert('Order amount must be at least ₹1.00')
      return
    }

    setIsProcessing(true)

    try {
      const ok = await loadRazorpayScript()
      if (!ok) throw new Error('Razorpay SDK failed to load')

      const options = {
        key: RZP_KEY_ID,
        amount: amt,
        currency: 'INR',
        name: 'The Powder Legacy',
        description: 'Order Payment',
        prefill: shippingAddress ? {
          name: `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim() || undefined,
          email: shippingAddress.email || undefined,
          contact: shippingAddress.phone || undefined,
        } : undefined,
        notes: shippingAddress ? { address: shippingAddress.address } : undefined,
        retry: { enabled: true, max_count: 1 },
        theme: { color: '#15803d' },
        modal: { ondismiss: function() { setIsProcessing(false) } },
        handler: function (response) {
          handlePaymentSuccess(response)
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (resp) {
        const desc = resp?.error?.description || ''
        if (desc.toLowerCase().includes('international cards are not supported')) {
          alert('International cards are disabled on this account. Please use the domestic test card 4111 1111 1111 1111 (CVV 123, any future expiry) or enable international cards in Razorpay dashboard.')
        } else {
          const msg = desc || resp?.error?.reason || 'Payment failed. Please try again.'
          alert(msg)
        }
        setIsProcessing(false)
      })
      rzp.open()
    } catch (e) {
      alert(e?.message || 'Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const openPaymentPage = () => {
    const amt = amountPaise()
    if (!amt || amt < 100) {
      alert('Order amount must be at least ₹1.00')
      return
    }
    if (!PAYMENT_PAGE_URL) {
      alert('Payment Page URL not configured. Set VITE_RZP_PAYMENT_PAGE_URL')
      return
    }
    const params = new URLSearchParams()
    if (shippingAddress?.email) params.set('prefill[email]', shippingAddress.email)
    if (shippingAddress?.phone) params.set('prefill[contact]', shippingAddress.phone)
    if (shippingAddress?.firstName || shippingAddress?.lastName) params.set('prefill[name]', `${shippingAddress.firstName || ''} ${shippingAddress.lastName || ''}`.trim())
    params.set('amount', String(Math.max(1, Math.round(amt / 100))))
    const url = PAYMENT_PAGE_URL.includes('?') ? `${PAYMENT_PAGE_URL}&${params.toString()}` : `${PAYMENT_PAGE_URL}?${params.toString()}`
    window.open(url, '_blank')
  }

  const handlePaymentSuccess = async (response) => {
    try {
      const deliv = deliveryInfo?.deliveryPrice || 0
      const orderId = response.razorpay_order_id || `order_${Date.now()}`

      await saveOrder({
        orderId,
        paymentId: response.razorpay_payment_id,
        items: cartItems,
        totals: {
          subtotal: getCartTotal(),
          savings: getCartSavings(),
          delivery: deliv,
          total: getCartTotal() + deliv,
        },
        deliveryInfo: deliveryInfo || null,
        shippingAddress: shippingAddress || null,
        paymentMethod: 'razorpay',
      })

      generateInvoiceDownload(orderId, response.razorpay_payment_id)
    } catch {}

    clearCart()
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('deliveryInfo')
    alert('Payment successful! Invoice downloaded.')
    navigate('/order-success', { state: { paymentId: response.razorpay_payment_id } })
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Please add items to your cart before checkout.</p>
          <Link to="/shop" className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  const delivPrice = deliveryInfo?.deliveryPrice || 0
  const finalTotal = getCartTotal() + delivPrice

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link to="/checkout/delivery" className="flex items-center text-gray-600 hover:text-green-800 transition-colors mr-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Delivery
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-green-800" />
                Razorpay Checkout
              </h2>

              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-green-800 mt-1" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-2">Secure Payment</h3>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Encrypted payment via Razorpay</li>
                      <li>• We never store your payment details</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handlePayment} disabled={isProcessing} className="flex-1 bg-green-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                  {isProcessing ? 'Processing…' : 'Pay Now (Test)'}
                </button>
                <button onClick={openPaymentPage} disabled={isProcessing} className="flex-1 border border-green-800 text-green-800 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                  <ExternalLink size={16} className="mr-2" />
                  Pay via Link
                </button>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mt-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Having issues?</h3>
                    <p className="text-sm text-gray-600">If you see "International cards are not supported", use the domestic test card 4111 1111 1111 1111 (CVV 123, any future expiry) or enable international cards in your Razorpay dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md sticky top-4">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-gray-400 text-xs text-center">
                          <div className="font-medium">{item.name}</div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.size}</p>
                        <p className="text-sm font-semibold text-green-800">₹{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
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
                    <span className="text-gray-600">Delivery:</span>
                    <span className="font-medium">{delivPrice === 0 ? (<span className="text-green-600">FREE</span>) : (`₹${delivPrice}`)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPayment

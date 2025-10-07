import React from 'react'
import Home from '../pages/Home'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import Contact from '../pages/Contact'
import Cart from '../pages/Cart'
import About from '../pages/About'
import CheckoutAddress from '../pages/CheckoutAddress'
import CheckoutDelivery from '../pages/CheckoutDelivery'
import OrderSuccess from '../pages/OrderSuccess'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Privacy from '../footer/Privacy'
import Favorites from '../pages/Favorites'
import Terms from '../footer/Terms'
import Shipping from '../footer/Shipping'
import { Routes, Route } from 'react-router-dom'
import Account from '../pages/Account'
import Admin from '../pages/Admin'
import PaymentCallback from '../pages/PaymentCallback'

function Routers() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/about/our-story' element={<About />} />
            <Route path='/about/manufacturing' element={<About />} />
            <Route path='/about/sustainability' element={<About />} />
            <Route path='/about/ingredients' element={<About />} />
            <Route path='/shop' element={<Products />} />
            <Route path='/shop/skin-care' element={<Products />} />
            <Route path='/shop/hair-care' element={<Products />} />
            <Route path='/shop/oral-care' element={<Products />} />
            <Route path='/shop/product/:id' element={<ProductDetail />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout/address' element={<CheckoutAddress />} />
            <Route path='/checkout/delivery' element={<CheckoutDelivery />} />
            {/* Payment page removed; using payment link flow only */}
            <Route path='/payment/callback' element={<PaymentCallback />} />
            <Route path='/order-success' element={<OrderSuccess />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/account' element={<Account />} />
            <Route path='/favorites' element={<Favorites />} />
            {/* Admin page (includes seed button guarded by key) */}
            <Route path='/admin' element={<Admin />} />
            {/* dev seed route removed */}
        </Routes>
    </div>
  )
}

export default Routers

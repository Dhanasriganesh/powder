import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import CartNotification from '../CartNotification'
import { CartProvider } from '../../contexts/CartContext'
import { AuthProvider } from '../../contexts/AuthContext'

function Layout({ children }) {
    return (
        <AuthProvider>
            <CartProvider>
                <Header />
                <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-emerald-50 to-white">
                    {children}
                </main>
                <Footer />
                <CartNotification />
            </CartProvider>
        </AuthProvider>
    )
}

export default Layout

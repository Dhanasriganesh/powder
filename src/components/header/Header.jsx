import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Search, User, ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../../contexts/CartContext'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const { getCartItemsCount } = useCart()
  const [profileName, setProfileName] = useState('')

  useEffect(() => {
    const load = () => {
      try {
        const p = JSON.parse(localStorage.getItem('profile') || '{}')
        setProfileName(p?.name || '')
      } catch { setProfileName('') }
    }
    load()
    window.addEventListener('profileUpdated', load)
    return () => window.removeEventListener('profileUpdated', load)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Shop', href: '/shop', submenu: [
        { name: 'Skin Care Products', href: '/shop/skin-care' },
        { name: 'Hair Care Products', href: '/shop/hair-care' },
        { name: 'Oral Care Products', href: '/shop/oral-care' },
        { name: 'All Products', href: '/shop' }
      ] },
    { name: 'Contact Us', href: '/contact' }
  ]

  const submitSearch = () => {
    const q = searchText.trim()
    if (!q) return
    navigate(`/shop?q=${encodeURIComponent(q)}`)
    setIsSearchOpen(false)
  }

  return (
    <header className="bg-white/90 backdrop-blur border-b border-emerald-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="The Powder Legacy" className="h-10 w-10 object-contain" />
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-800 tracking-tight">
                THE POWDER LEGACY
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link to={item.href} className={`px-2 py-2 text-sm font-medium transition-colors duration-200 ${location.pathname === item.href ? 'text-emerald-800 border-b-2 border-emerald-700' : 'text-slate-700 hover:text-emerald-800'}`}>{item.name}</Link>
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-xl ring-1 ring-slate-900/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.name} to={subItem.href} className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-800">{subItem.name}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              {/* Expanding search input that doesn't overlap */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') submitSearch() }}
                onBlur={() => setTimeout(() => setIsSearchOpen(false), 150)}
                className={`min-w-0 border border-slate-300 rounded-md bg-white shadow-sm px-3 py-1.5 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 ${isSearchOpen ? 'w-64 mr-2 opacity-100' : 'w-0 mr-0 opacity-0 pointer-events-none'}`}
              />
              <button onClick={() => { setIsSearchOpen((v) => !v); }} className="p-2 text-slate-700 hover:text-emerald-800 transition-colors">
                <Search size={20} />
              </button>
            </div>
            <Link to="/account" className="relative p-2 text-slate-700 hover:text-emerald-800 transition-colors">
              <User size={20} />
              {profileName && (
                <span className="absolute -bottom-1 -right-1 bg-emerald-700 text-white text-[10px] leading-none rounded-full px-1.5 py-0.5">
                  {profileName.split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase()}
                </span>
              )}
            </Link>
            <Link to="/favorites" className="p-2 text-slate-700 hover:text-emerald-800 transition-colors"><Heart size={20} /></Link>
            <Link to="/cart" className="p-2 text-slate-700 hover:text-emerald-800 transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{getCartItemsCount()}</span>
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-700 hover:text-emerald-800">{isMenuOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>

        {/* Removed full-width search bar below; input now expands beside the icon */}

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link to={item.href} className={`block px-3 py-2 text-base font-medium ${location.pathname === item.href ? 'text-emerald-800 bg-emerald-50' : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50'}`} onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
                  {item.submenu && (
                    <div className="pl-6 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.name} to={subItem.href} className="block px-3 py-2 text-sm text-slate-600 hover:text-emerald-800" onClick={() => setIsMenuOpen(false)}>{subItem.name}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
    </header>
  )
}

export default Header

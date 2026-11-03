import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ShieldCheck,
  Package,
  LogOut,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cart,
    wishlist,
    openCart,
    currentUser,
    logout,
    isDarkMode,
    toggleTheme,
    products
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const searchResults = searchQuery.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Shop All', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Collections', path: '/collections' },
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Best Sellers', path: '/best-sellers' },
    { name: 'Our Atelier', path: '/about' }
  ];

  return (
    <>
      {/* Slim Promotional Announcement Banner (dismissible) */}
      {showPromo && (
        <div className="bg-[#18191E] text-stone-200 text-xs px-4 py-2 border-b border-stone-800 flex items-center justify-between tracking-wide font-sans">
          <div className="flex-1 text-center font-medium">
            Complimentary international express shipping on orders over $300 · Use code{' '}
            <span className="font-semibold text-amber-400 underline decoration-amber-400/40">LUXE10</span> for 10% off
          </div>
          <button
            onClick={() => setShowPromo(false)}
            className="text-stone-400 hover:text-white transition-colors ml-4 p-0.5"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Primary Navigation - Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#0E1015]/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-20">
            {/* Zone 1: Single text element wordmark */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link
                to="/"
                className="text-2xl sm:text-3xl font-serif tracking-[0.22em] uppercase font-semibold text-stone-900 dark:text-stone-50 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
              >
                VÉLANE
              </Link>
            </div>

            {/* Zone 2: 4-5 clean single-line text navigation links */}
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium tracking-wider uppercase text-stone-600 dark:text-stone-300">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`whitespace-nowrap shrink-0 transition-colors hover:text-stone-950 dark:hover:text-white relative py-1 ${
                      isActive
                        ? 'text-stone-950 dark:text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-amber-600 dark:after:bg-amber-400'
                        : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Interactive Affordances (Search, Wishlist, User, Cart, Theme) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Quick Search Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                aria-label="Search collection"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Saved Wishlist */}
              <Link
                to="/wishlist"
                className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[10px] font-mono tabular-nums flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={openCart}
                className="p-2 text-stone-900 dark:text-white hover:opacity-80 transition-opacity relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 rounded-full text-[10px] font-mono tabular-nums flex items-center justify-center font-bold">
                    {totalCartCount}
                  </span>
                )}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(prev => !prev)}
                  className="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  aria-label="User Account"
                >
                  <div className="w-7 h-7 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-200 text-xs font-semibold">
                    {currentUser ? currentUser.name[0].toUpperCase() : <User className="w-4 h-4" />}
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg shadow-xl py-2 z-50 text-xs text-stone-700 dark:text-stone-300 animate-in fade-in-50 duration-150">
                    {currentUser ? (
                      <>
                        <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
                          <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">{currentUser.name}</p>
                          <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                          <span className="inline-block mt-1 text-[10px] text-amber-600 dark:text-amber-400 font-semibold tracking-wide">
                            {currentUser.tier}
                          </span>
                        </div>
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          <User className="w-3.5 h-3.5" /> My Profile
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          <Package className="w-3.5 h-3.5" /> My Orders
                        </Link>
                        <Link
                          to="/track-order"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-800"
                        >
                          <Package className="w-3.5 h-3.5" /> Track Order
                        </Link>
                        {currentUser.role === 'admin' && (
                          <Link
                            to="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-amber-600 dark:text-amber-400 font-medium hover:bg-amber-50 dark:hover:bg-stone-800/80"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" /> Admin Studio
                          </Link>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border-t border-stone-100 dark:border-stone-800 mt-1"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 font-medium text-stone-900 dark:text-white"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400"
                        >
                          Create Account
                        </Link>
                        <Link
                          to="/track-order"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="block px-4 py-2 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 border-t border-stone-100 dark:border-stone-800"
                        >
                          Track Guest Order
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Live Search Modal Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex flex-col justify-start pt-16 sm:pt-24 px-4 animate-in fade-in duration-200">
          <div className="max-w-2xl w-full mx-auto bg-white dark:bg-stone-900 rounded-xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
            <form onSubmit={handleSearchSubmit} className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-stone-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search tote, crossbody, weekender, full-grain leather..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder-stone-400 outline-none font-sans"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Quick Suggestions or Results */}
            <div className="p-4 max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-stone-400">Products</p>
                  {searchResults.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        navigate(`/product/${product.id}`);
                      }}
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/60 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded border border-stone-200 dark:border-stone-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 truncate">{product.name}</p>
                        <p className="text-xs text-stone-500 truncate">{product.tagline}</p>
                      </div>
                      <span className="text-xs font-mono tabular-nums font-medium text-amber-700 dark:text-amber-400">
                        ${product.price}
                      </span>
                    </div>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full py-2.5 text-xs text-center font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border-t border-stone-100 dark:border-stone-800 mt-2 block"
                  >
                    View all matching results →
                  </button>
                </div>
              ) : searchQuery ? (
                <div className="text-center py-8 text-stone-500 text-xs">
                  No handcrafted pieces matching "{searchQuery}".
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold tracking-wider uppercase text-stone-400">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Grand Élysée Tote', 'Saddle Bag', 'Suede Duffel', 'Cardholder', 'Florence Leather'].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                        }}
                        className="text-xs px-3 py-1.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm lg:hidden flex">
          <div className="w-4/5 max-w-sm bg-white dark:bg-stone-900 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800">
                <span className="text-xl font-serif tracking-[0.2em] font-semibold">VÉLANE</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                {navLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between text-sm uppercase tracking-wider font-medium text-stone-800 dark:text-stone-200 hover:text-amber-600 transition-colors py-1"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
                <Link
                  to="/track-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs text-stone-600 dark:text-stone-400"
                >
                  Track Existing Order
                </Link>
                <Link
                  to="/faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs text-stone-600 dark:text-stone-400"
                >
                  Client Services & Care
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-xs text-stone-600 dark:text-stone-400"
                >
                  Atelier Concierge
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <span className="text-xs text-stone-500">Language: EN · Currency: USD</span>
              <button
                onClick={toggleTheme}
                className="text-xs flex items-center gap-1.5 text-stone-700 dark:text-stone-300"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

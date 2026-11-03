import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  User as UserIcon,
  Package,
  Heart,
  ShieldCheck,
  Save,
  LogOut,
  MapPin,
  Clock
} from 'lucide-react';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateProfile, logout, orders, wishlist } = useStore();

  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [street, setStreet] = useState(currentUser?.shippingAddress?.street || '');
  const [city, setCity] = useState(currentUser?.shippingAddress?.city || '');
  const [state, setState] = useState(currentUser?.shippingAddress?.state || '');
  const [postalCode, setPostalCode] = useState(currentUser?.shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(currentUser?.shippingAddress?.country || 'United States');

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Sign In Required</h2>
        <p className="text-xs text-stone-500">Please authenticate to inspect your atelier profile and order archive.</p>
        <Link
          to="/login"
          className="inline-block px-6 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-semibold rounded-lg"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      shippingAddress: {
        fullName: name,
        email: currentUser.email,
        phone,
        street,
        city,
        state,
        postalCode,
        country
      }
    });
  };

  const userOrders = orders.filter(
    o => o.customer.email.toLowerCase() === currentUser.email.toLowerCase()
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header Profile Hero */}
      <div className="p-6 sm:p-8 bg-stone-50 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center text-xl font-bold font-serif shrink-0">
            {currentUser.name[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                {currentUser.name}
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300">
                {currentUser.tier}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5 font-mono">{currentUser.email}</p>
            <p className="text-[11px] text-stone-400 mt-1">
              Atelier Patron since {currentUser.createdAt}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {currentUser.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2 bg-amber-600 text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-amber-700 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Studio</span>
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/orders"
          className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 hover:border-amber-500 transition-colors flex items-center gap-4"
        >
          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-stone-400">My Orders</p>
            <p className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
              {userOrders.length} Commissions
            </p>
          </div>
        </Link>

        <Link
          to="/wishlist"
          className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 hover:border-amber-500 transition-colors flex items-center gap-4"
        >
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-stone-400">Saved Wishlist</p>
            <p className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
              {wishlist.length} Silhouettes
            </p>
          </div>
        </Link>

        <Link
          to="/track-order"
          className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/40 hover:border-amber-500 transition-colors flex items-center gap-4"
        >
          <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs uppercase font-semibold tracking-wider text-stone-400">Tracking</p>
            <p className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
              Live Courier Progress
            </p>
          </div>
        </Link>
      </div>

      {/* Account Profile & Address Settings Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-6">
        <h2 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-600" />
          <span>Profile & Saved Delivery Coordinates</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Patron Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
            />
          </div>

          <div className="space-y-1 sm:col-span-2">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Default Shipping Address</label>
            <input
              type="text"
              placeholder="Street and unit number"
              value={street}
              onChange={e => setStreet(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">City</label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">State / Region</label>
            <input
              type="text"
              value={state}
              onChange={e => setState(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Postal / Zip Code</label>
            <input
              type="text"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Country</label>
            <input
              type="text"
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-bold rounded-lg flex items-center gap-2 hover:opacity-90"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};

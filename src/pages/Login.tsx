import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Lock, User, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/profile');
    }
  };

  const handleDemoCustomer = () => {
    loginAsDemo('customer');
    navigate('/profile');
  };

  const handleDemoAdmin = () => {
    loginAsDemo('admin');
    navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-semibold">
          Client Portal
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Sign In to Your Atelier Account
        </h1>
        <p className="text-xs text-stone-500 font-body">
          Access your commissioned orders, saved pieces, and private salon releases.
        </p>
      </div>

      {/* One-click Internship Review / Demo Buttons */}
      <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 rounded-xl border border-amber-200/80 dark:border-amber-800/80 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-900 dark:text-amber-200">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>One-Click Demo Credentials for Review</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDemoCustomer}
            className="py-2 px-3 bg-white dark:bg-stone-800 border border-amber-300 dark:border-amber-700 text-stone-800 dark:text-stone-200 text-xs font-medium rounded-lg hover:bg-amber-100/50 dark:hover:bg-amber-900/40 transition-colors text-left"
          >
            <span className="block font-semibold">VIP Patron Demo</span>
            <span className="text-[11px] text-stone-500">Eleanor Vance</span>
          </button>
          <button
            type="button"
            onClick={handleDemoAdmin}
            className="py-2 px-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium rounded-lg hover:opacity-90 transition-opacity text-left"
          >
            <span className="block font-semibold">Atelier Admin Demo</span>
            <span className="text-[11px] opacity-80">Director Portal</span>
          </button>
        </div>
      </div>

      {/* Standard Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
        <div className="space-y-1">
          <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Email Address</label>
          <input
            type="email"
            required
            placeholder="e.g. patron@atelier.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2.5 text-xs rounded-lg outline-none"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs">
            <label className="font-medium text-stone-700 dark:text-stone-300">Password</label>
            <span className="text-[11px] text-stone-400">Any password in demo mode</span>
          </div>
          <input
            type="password"
            required
            placeholder="••••••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2.5 text-xs rounded-lg outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 text-xs uppercase tracking-wider font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 pt-3"
        >
          <span>Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-xs text-stone-500 pt-2">
          New to VÉLANE?{' '}
          <Link to="/register" className="text-amber-700 dark:text-amber-400 font-semibold underline">
            Create an Account
          </Link>
        </p>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      const ok = register(name, email);
      if (ok) {
        navigate('/profile');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24 space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-semibold">
          Membership
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Join VÉLANE Atelier
        </h1>
        <p className="text-xs text-stone-500 font-body">
          Receive private drop announcements, complimentary bespoke monogramming on future pieces, and order tracking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm">
        <div className="space-y-1">
          <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Full Name</label>
          <input
            type="text"
            required
            placeholder="e.g. Charlotte Dubois"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2.5 text-xs rounded-lg outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Email Address</label>
          <input
            type="email"
            required
            placeholder="patron@domain.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2.5 text-xs rounded-lg outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Choose Password</label>
          <input
            type="password"
            required
            placeholder="At least 6 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2.5 text-xs rounded-lg outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 text-xs uppercase tracking-wider font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 pt-3"
        >
          <span>Create Atelier Account</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-center text-xs text-stone-500 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-amber-700 dark:text-amber-400 font-semibold underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

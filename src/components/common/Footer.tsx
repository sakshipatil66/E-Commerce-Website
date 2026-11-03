import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      showToast('Welcome to the VÉLANE Gazette. Enjoy 10% off with code LUXE10.');
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 transition-colors">
      {/* Editorial Value Pillars */}
      <div className="border-b border-stone-800/80 py-10 bg-stone-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-3.5">
              <Award className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-100">Full-Grain Italian Calfskin</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">Vegetable-tanned in traditional Florentine tanneries without toxic heavy metals.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Truck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-100">Express Worldwide Courier</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">Complimentary climate-neutral air courier on all luxury orders exceeding $300.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-100">Lifetime Craft Guarantee</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">Every stitch, zipper, and brass rivet is backed by our lifetime atelier repair service.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <RefreshCw className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-100">30-Day Effortless Returns</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">Experience your piece at home. Prepaid returns and seamless exchanges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="text-2xl font-serif tracking-[0.25em] text-white uppercase font-bold block">
              VÉLANE
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Architectural leather goods and travel essentials created in limited seasonal editions. Designed between Paris and Scandicci for those who value permanent quality over fleeting seasonal trends.
            </p>
            <div className="pt-2 text-xs text-stone-400">
              <p>Atelier: Via de' Tornabuoni, 14, 50123 Firenze, Italy</p>
              <p className="mt-1">Inquiries: concierge@velane-atelier.com</p>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-stone-200">Collections</p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/shop" className="hover:text-stone-100 transition-colors">The Catalog</Link></li>
              <li><Link to="/categories" className="hover:text-stone-100 transition-colors">Categories</Link></li>
              <li><Link to="/collections" className="hover:text-stone-100 transition-colors">Curated Drops</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-stone-100 transition-colors">New Releases</Link></li>
              <li><Link to="/best-sellers" className="hover:text-stone-100 transition-colors">Best Sellers</Link></li>
            </ul>
          </div>

          {/* Client Experience */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold tracking-wider uppercase text-stone-200">Client Services</p>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><Link to="/track-order" className="hover:text-stone-100 transition-colors">Order Tracking</Link></li>
              <li><Link to="/orders" className="hover:text-stone-100 transition-colors">Order History</Link></li>
              <li><Link to="/faq" className="hover:text-stone-100 transition-colors">Care & FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-stone-100 transition-colors">Atelier Concierge</Link></li>
              <li><Link to="/admin" className="text-amber-400 hover:text-amber-300 transition-colors">Admin Studio Portal</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-4">
            <p className="text-xs font-semibold tracking-wider uppercase text-stone-200">The Atelier Journal</p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Subscribe for private drop previews, artisan stories from Tuscany, and receive 10% off your inaugural commission.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-800/80 border border-stone-700 rounded-lg flex items-center gap-2 text-xs text-amber-300">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>You are subscribed. Use code <strong>LUXE10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center rounded-lg border border-stone-700 bg-stone-800/80 overflow-hidden focus-within:border-amber-500 transition-colors">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-stone-400 outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-stone-100 hover:bg-white text-stone-900 text-xs font-medium uppercase tracking-wider shrink-0 transition-colors flex items-center gap-1.5"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-stone-500">We respect your privacy. Unsubscribe at any time.</p>
              </form>
            )}
          </div>
        </div>

        {/* Legal & Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 VÉLANE Atelier S.r.l. All rights reserved. Crafted with intention.</p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
            <Link to="/faq" className="hover:text-stone-300 transition-colors">Shipping & Returns</Link>
            <span className="text-stone-600">USD ($)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

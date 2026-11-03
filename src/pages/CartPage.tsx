import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    tax,
    total,
    freeShippingThreshold,
    freeShippingProgress,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res.message);
    if (res.success) {
      setCouponCode('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto font-body">
          Your curated selection is awaiting its first Italian leather commission.
        </p>
        <Link
          to="/shop"
          className="inline-block mt-2 px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-widest font-bold rounded-lg shadow"
        >
          Explore Handcrafted Pieces
        </Link>
      </div>
    );
  }

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6 flex items-end justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
            Order Review
          </span>
          <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Shopping Bag
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-stone-400 hover:text-rose-600 transition-colors underline"
        >
          Clear entire bag
        </button>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800">
        {subtotal >= freeShippingThreshold ? (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Complimentary international express shipping threshold reached!</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-stone-700 dark:text-stone-300">
              <span>Add <strong className="font-mono text-amber-700 dark:text-amber-400">${remainingForFreeShipping.toFixed(0)}</strong> more to receive complimentary courier delivery</span>
              <span className="font-mono tabular-nums">{freeShippingProgress.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-600 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Cart Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-stone-200 dark:divide-stone-800 border-y border-stone-200 dark:border-stone-800">
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedVariant.id}-${idx}`}
                className="py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">
                      {item.product.category} · {item.product.madeIn}
                    </span>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="block text-sm sm:text-base font-serif font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Leather tone: <strong className="text-stone-800 dark:text-stone-200">{item.selectedVariant.name}</strong>
                    </p>
                    <span className="text-xs font-mono tabular-nums text-stone-600 dark:text-stone-300 mt-1 block">
                      ${item.product.price} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Stepper */}
                  <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg p-1 bg-stone-50 dark:bg-stone-800">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.selectedVariant.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-mono font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.selectedVariant.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <span className="text-sm sm:text-base font-serif font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100 min-w-16 text-right">
                    ${item.product.price * item.quantity}
                  </span>

                  {/* Trash */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedVariant.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between items-center text-xs">
            <Link
              to="/shop"
              className="text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white underline"
            >
              ← Continue Shopping Catalog
            </Link>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-stone-50 dark:bg-stone-900/70 p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-6">
          <h2 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            Order Summary
          </h2>

          {/* Coupon Code Input */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
              Promotional Certificate
            </label>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-600" />
                  <span>Code <strong>{appliedCoupon.code}</strong> applied</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-stone-400 hover:text-rose-600 text-[11px] underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. LUXE10 or SUPERVISOR20"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  className="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none uppercase font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Apply
                </button>
              </form>
            )}
            {couponFeedback && (
              <p className="text-[11px] text-stone-500">{couponFeedback}</p>
            )}
            <div className="text-[11px] text-stone-400 space-y-0.5 pt-1">
              <p>Try test codes: <strong className="text-amber-700 dark:text-amber-400 font-mono">LUXE10</strong> (10% off) or <strong className="text-amber-700 dark:text-amber-400 font-mono">SUPERVISOR20</strong> (20% off)</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="space-y-2.5 text-xs text-stone-600 dark:text-stone-400 pt-4 border-t border-stone-200 dark:border-stone-700">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-mono tabular-nums text-stone-900 dark:text-stone-100">${subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-amber-600 dark:text-amber-400">
                <span>Promotional Discount</span>
                <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>International Courier Delivery</span>
              <span className="font-mono tabular-nums">
                {shippingFee === 0 ? <strong className="text-emerald-600">COMPLIMENTARY</strong> : `$${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-mono tabular-nums text-stone-900 dark:text-stone-100">${tax}</span>
            </div>
            <div className="pt-3 border-t border-stone-200 dark:border-stone-700 flex justify-between text-base font-serif font-bold text-stone-900 dark:text-stone-100">
              <span>Estimated Total</span>
              <span className="font-mono tabular-nums text-lg">${total}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-stone-950 dark:bg-white text-white dark:text-stone-950 text-xs uppercase tracking-widest font-bold rounded-lg shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-2 pt-2 text-[11px] text-stone-500">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Complimentary insured shipping on orders over $300</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>30-Day effortless returns with prepaid courier pickup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

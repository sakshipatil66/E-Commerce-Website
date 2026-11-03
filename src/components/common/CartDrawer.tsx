import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    isCartOpen,
    closeCart,
    updateCartQuantity,
    removeFromCart,
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

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res.message);
    if (res.success) {
      setCouponCode('');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleGoToCartPage = () => {
    closeCart();
    navigate('/cart');
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-stone-900 shadow-2xl flex flex-col justify-between border-l border-stone-200 dark:border-stone-800 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-stone-900 dark:text-stone-100" />
              <h2 className="text-base font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-mono text-stone-500 tabular-nums">
                ({cart.reduce((s, i) => s + i.quantity, 0)})
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-md transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3.5 bg-stone-50 dark:bg-stone-800/40 border-b border-stone-200/80 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300">
            {subtotal >= freeShippingThreshold ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>You’ve unlocked complimentary international express courier delivery!</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between font-medium">
                  <span>Add <strong className="font-mono text-amber-700 dark:text-amber-400">${remainingForFreeShipping.toFixed(0)}</strong> more for free express shipping</span>
                  <span className="font-mono tabular-nums">{freeShippingProgress.toFixed(0)}%</span>
                </div>
                <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 transition-all duration-500 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-stone-100 dark:divide-stone-800">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto" />
                <h3 className="text-base font-serif text-stone-700 dark:text-stone-300">Your shopping bag is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Explore our handcrafted Italian leather totes, weekend duffels, and architectural accessories.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    navigate('/shop');
                  }}
                  className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-semibold uppercase tracking-wider rounded transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedVariant.id}-${idx}`} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg border border-stone-200 dark:border-stone-800 shrink-0 bg-stone-100 dark:bg-stone-800"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant.id)}
                          className="text-stone-400 hover:text-rose-500 transition-colors p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Tone: <span className="text-stone-700 dark:text-stone-300 font-medium">{item.selectedVariant.name}</span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Stepper */}
                      <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800 text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedVariant.id, item.quantity - 1)}
                          className="p-1 hover:text-stone-950 dark:hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-mono tabular-nums font-semibold text-stone-800 dark:text-stone-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedVariant.id, item.quantity + 1)}
                          className="p-1 hover:text-stone-950 dark:hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold font-mono tabular-nums text-stone-900 dark:text-stone-100">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/90 space-y-3.5">
              {/* Promo code accordion */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 rounded bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
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
                      placeholder="Promo code (e.g. LUXE10)"
                      value={couponCode}
                      onChange={e => setCouponCode(e.target.value)}
                      className="flex-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1.5 text-xs rounded outline-none uppercase font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-800 dark:bg-stone-700 text-white text-xs font-medium rounded hover:bg-stone-900 transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && (
                  <p className="text-[11px] text-stone-500 mt-1">{couponFeedback}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900 dark:text-stone-100">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-600 dark:text-amber-400">
                    <span>Promotion Discount</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Courier</span>
                  <span className="font-mono tabular-nums">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-medium">COMPLIMENTARY</span> : `$${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-mono tabular-nums text-stone-900 dark:text-stone-100">${tax}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between text-sm font-semibold text-stone-900 dark:text-stone-100">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums text-base">${total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 bg-stone-950 dark:bg-white text-white dark:text-stone-950 hover:opacity-95 text-xs uppercase tracking-widest font-bold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleGoToCartPage}
                  className="w-full py-2 bg-transparent text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white text-xs font-medium text-center transition-colors"
                >
                  View Full Cart Page
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>SSL Encrypted · 30-Day Guarantee</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShippingAddress, Order } from '../types';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    subtotal,
    discountAmount,
    shippingFee,
    tax,
    total,
    currentUser,
    placeOrder,
    showToast
  } = useStore();

  const [address, setAddress] = useState<ShippingAddress>(() => {
    if (currentUser?.shippingAddress) {
      return currentUser.shippingAddress;
    }
    return {
      fullName: currentUser?.name || 'Eleanor Vance',
      email: currentUser?.email || 'eleanor.vance@velane-atelier.com',
      phone: currentUser?.phone || '+1 (555) 234-8971',
      street: '742 Evergreen Promenade',
      apartment: 'Suite 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10012',
      country: 'United States'
    };
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'white_glove'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('credit_card');

  // Test card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState(address.fullName);
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Your shopping bag is empty</h2>
        <p className="text-xs text-stone-500">Please select an atelier piece before navigating to checkout.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-semibold rounded-lg"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const whiteGloveExtra = shippingMethod === 'white_glove' ? 45 : 0;
  const finalTotal = Number((total + whiteGloveExtra).toFixed(2));

  const handleFillTestCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExpiry('11/29');
    setCardCvc('789');
    setCardName(address.fullName || 'Eleanor Vance');
    showToast('Test Card credentials filled automatically.');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.email || !address.street || !address.city || !address.postalCode) {
      showToast('Please complete all required shipping fields.', 'error');
      return;
    }

    setIsProcessing(true);

    // Simulate payment gateway validation
    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = placeOrder(address, paymentMethod);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully
      }

      showToast(`Order #${newOrder.id} confirmed!`);
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-4 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
            Secure Payment Gateway
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Atelier Checkout
          </h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Customer Info, Shipping Address, Shipping Method & Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Contact Information */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs flex items-center justify-center font-sans font-bold">1</span>
                <span>Contact Details</span>
              </h2>
              {currentUser && (
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  Logged in as {currentUser.name}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Email Address (for order tracking & receipt)</label>
                <input
                  type="email"
                  required
                  value={address.email}
                  onChange={e => setAddress({ ...address, email: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Recipient Full Name</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={e => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Contact Telephone (for delivery alerts)</label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={e => setAddress({ ...address, phone: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Destination */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-4">
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs flex items-center justify-center font-sans font-bold">2</span>
              <span>Delivery Address</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 742 Evergreen Promenade"
                  value={address.street}
                  onChange={e => setAddress({ ...address, street: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Apartment, Suite, Unit (Optional)</label>
                <input
                  type="text"
                  value={address.apartment || ''}
                  onChange={e => setAddress({ ...address, apartment: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">City</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={e => setAddress({ ...address, city: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">State / Province</label>
                <input
                  type="text"
                  required
                  value={address.state}
                  onChange={e => setAddress({ ...address, state: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Postal / Zip Code</label>
                <input
                  type="text"
                  required
                  value={address.postalCode}
                  onChange={e => setAddress({ ...address, postalCode: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Country</label>
                <select
                  value={address.country}
                  onChange={e => setAddress({ ...address, country: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Italy">Italy</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Canada">Canada</option>
                  <option value="Japan">Japan</option>
                  <option value="Australia">Australia</option>
                  <option value="Switzerland">Switzerland</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 3: Courier Selection */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-4">
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs flex items-center justify-center font-sans font-bold">3</span>
              <span>Courier Delivery Speed</span>
            </h2>

            <div className="space-y-3">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                  shippingMethod === 'standard'
                    ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingSpeed"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="accent-amber-600"
                  />
                  <div>
                    <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">DHL Express Courier (2–4 Business Days)</p>
                    <p className="text-[11px] text-stone-500">Fully insured air freight with live GPS waybill tracking.</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-600">
                  {shippingFee === 0 ? 'COMPLIMENTARY' : `$${shippingFee}`}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod('white_glove')}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${
                  shippingMethod === 'white_glove'
                    ? 'border-amber-600 bg-amber-50/50 dark:bg-amber-950/20'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingSpeed"
                    checked={shippingMethod === 'white_glove'}
                    onChange={() => setShippingMethod('white_glove')}
                    className="accent-amber-600"
                  />
                  <div>
                    <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">Next-Day White Glove Atelier Delivery (1 Business Day)</p>
                    <p className="text-[11px] text-stone-500">Scheduled personal handover by uniformed courier in silk ribbon gift wrapping.</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-semibold text-stone-900 dark:text-stone-100">
                  +$45.00
                </span>
              </label>
            </div>
          </div>

          {/* Step 4: Payment Simulation */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs flex items-center justify-center font-sans font-bold">4</span>
                <span>Payment Method (Test Mode)</span>
              </h2>

              <button
                type="button"
                onClick={handleFillTestCard}
                className="text-[11px] text-amber-700 dark:text-amber-400 font-medium hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fill Test Card Credentials</span>
              </button>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'credit_card', label: 'Credit Card', icon: CreditCard },
                { id: 'apple_pay', label: 'Apple / Google', icon: ShieldCheck },
                { id: 'cod', label: 'Cash On Delivery', icon: Truck },
                { id: 'bank_transfer', label: 'Wire Transfer', icon: Lock }
              ].map(method => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                    paymentMethod === method.id
                      ? 'border-amber-600 bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-semibold shadow-sm'
                      : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <method.icon className="w-4 h-4" />
                  <span className="truncate">{method.label}</span>
                </button>
              ))}
            </div>

            {/* Payment Details based on selection */}
            {paymentMethod === 'credit_card' && (
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Name on Card</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Card Number (Test Sandbox)</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs font-mono rounded-lg outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs font-mono rounded-lg outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300">CVC / CVV</label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={e => setCardCvc(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs font-mono rounded-lg outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'apple_pay' && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 space-y-2">
                <p className="font-semibold text-stone-900 dark:text-stone-100">Simulated Apple Pay / Google Pay</p>
                <p>One-touch biometric authorization is pre-authenticated for this review session. Ready to authorize on submission.</p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 space-y-2">
                <p className="font-semibold text-stone-900 dark:text-stone-100">Cash on Handover Verification</p>
                <p>Our courier representative will collect cash or credit card at your doorstep during delivery. An SMS code will be sent to {address.phone} to confirm dispatch.</p>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 space-y-2 font-mono">
                <p className="font-sans font-semibold text-stone-900 dark:text-stone-100">Atelier IBAN Details</p>
                <p>IBAN: IT60 X054 2811 1010 0000 0123 456</p>
                <p>BIC/SWIFT: VELITMMXXX · Bank: Banca Toscana di Firenze</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary sticky column */}
        <div className="lg:col-span-5 bg-stone-50 dark:bg-stone-900/80 p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-6 lg:sticky lg:top-28">
          <h2 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} items)
          </h2>

          <div className="divide-y divide-stone-200 dark:divide-stone-800 max-h-72 overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="py-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 rounded object-cover border border-stone-200 dark:border-stone-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-stone-500">Qty: {item.quantity} · {item.selectedVariant.name}</p>
                  </div>
                </div>
                <span className="font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-100 shrink-0">
                  ${item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing calculations */}
          <div className="space-y-2 pt-4 border-t border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-stone-900 dark:text-stone-100">${subtotal}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-amber-600 dark:text-amber-400">
                <span>Promotional Certificate</span>
                <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Courier Delivery</span>
              <span className="font-mono tabular-nums">
                {shippingFee === 0 ? <strong className="text-emerald-600 font-medium">COMPLIMENTARY</strong> : `$${shippingFee}`}
              </span>
            </div>
            {whiteGloveExtra > 0 && (
              <div className="flex justify-between">
                <span>Next-Day White Glove Upgrade</span>
                <span className="font-mono tabular-nums text-stone-900 dark:text-stone-100">+$45.00</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Sales Tax</span>
              <span className="font-mono tabular-nums text-stone-900 dark:text-stone-100">${tax}</span>
            </div>
            <div className="pt-3 border-t border-stone-200 dark:border-stone-700 flex justify-between text-base font-serif font-bold text-stone-900 dark:text-stone-100">
              <span>Total Payable</span>
              <span className="font-mono tabular-nums text-xl">${finalTotal}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-stone-950 dark:bg-white text-white dark:text-stone-950 text-xs uppercase tracking-widest font-bold rounded-lg shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <span>Authorizing Transaction...</span>
            ) : (
              <>
                <span>Complete Purchase · ${finalTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="space-y-1.5 text-center text-[11px] text-stone-500">
            <p className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>30-Day Money-Back Guarantee & Free Exchanges</span>
            </p>
            <p>Your piece will be dispatched in a signature debossed VÉLANE box.</p>
          </div>
        </div>
      </form>
    </div>
  );
};

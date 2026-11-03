import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  Copy,
  Package,
  Truck,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin
} from 'lucide-react';

export const OrderConfirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById, showToast } = useStore();

  const order = getOrderById(id || '');

  const copyTracking = () => {
    if (order?.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      showToast('Tracking number copied to clipboard.');
    }
  };

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Order Not Located</h2>
        <p className="text-xs text-stone-500">We could not find this order reference in your active atelier session.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-semibold rounded-lg"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Success Badge & Header */}
      <div className="text-center space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <p className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-semibold">
          Payment Authorized & Confirmed
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Thank You For Your Commission
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto font-body">
          Order reference <strong className="font-mono text-stone-900 dark:text-stone-100">{order.id}</strong> has been transmitted to our Scandicci workshop for hand inspection and silk ribbon packaging.
        </p>
      </div>

      {/* Key Order Meta Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-stone-50 dark:bg-stone-900/60 rounded-xl border border-stone-200 dark:border-stone-800 text-xs">
        <div>
          <span className="text-stone-400 uppercase tracking-wider font-medium">Tracking Number</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-sm">
              {order.trackingNumber}
            </span>
            <button
              onClick={copyTracking}
              className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              title="Copy tracking code"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div>
          <span className="text-stone-400 uppercase tracking-wider font-medium">Estimated Handover</span>
          <p className="font-medium text-stone-900 dark:text-stone-100 text-sm mt-1 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>{order.estimatedDeliveryDate}</span>
          </p>
        </div>

        <div>
          <span className="text-stone-400 uppercase tracking-wider font-medium">Destination</span>
          <p className="font-medium text-stone-900 dark:text-stone-100 text-sm mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-600" />
            <span>{order.customer.city}, {order.customer.country}</span>
          </p>
        </div>
      </div>

      {/* Live Order Stage Tracker */}
      <div className="p-6 sm:p-8 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
            Fulfillment Journey
          </h2>
          <span className="text-xs px-2.5 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold rounded">
            {order.status}
          </span>
        </div>

        <div className="space-y-4">
          {order.trackingEvents.map((evt, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  evt.completed
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
                }`}>
                  {evt.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                {idx < order.trackingEvents.length - 1 && (
                  <div className={`w-0.5 h-8 my-1 ${
                    evt.completed ? 'bg-amber-600' : 'bg-stone-200 dark:bg-stone-800'
                  }`} />
                )}
              </div>
              <div className="pt-0.5">
                <p className={`text-xs font-semibold ${evt.completed ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400'}`}>
                  {evt.status}
                </p>
                <p className="text-[11px] text-stone-500">
                  {evt.location} · {evt.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Itemized Order Receipt */}
      <div className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-4">
        <h2 className="text-sm font-serif font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
          Commission Details
        </h2>

        <div className="divide-y divide-stone-200 dark:divide-stone-800">
          {order.items.map((item, idx) => (
            <div key={idx} className="py-4 first:pt-0 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-16 h-16 rounded-lg object-cover border border-stone-200 dark:border-stone-800 bg-stone-100"
                />
                <div>
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">{item.productName}</h4>
                  <p className="text-stone-500 text-[11px]">Tone: {item.variantName} · Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-100">
                ${item.price * item.quantity}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2 text-xs text-stone-600 dark:text-stone-400">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-mono tabular-nums">${order.subtotal}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-amber-600">
              <span>Discount</span>
              <span className="font-mono tabular-nums">-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Courier Freight</span>
            <span className="font-mono tabular-nums">
              {order.shippingFee === 0 ? 'COMPLIMENTARY' : `$${order.shippingFee}`}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Sales Tax</span>
            <span className="font-mono tabular-nums">${order.tax}</span>
          </div>
          <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between text-sm font-bold text-stone-900 dark:text-stone-100">
            <span>Total Paid</span>
            <span className="font-mono tabular-nums">${order.total}</span>
          </div>
        </div>
      </div>

      {/* Next Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to={`/track-order?tracking=${order.trackingNumber}`}
          className="w-full sm:w-auto px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-bold rounded-lg text-center flex items-center justify-center gap-2 hover:opacity-90"
        >
          <Package className="w-4 h-4" />
          <span>Track Live Progress</span>
        </Link>
        <Link
          to="/shop"
          className="w-full sm:w-auto px-6 py-3 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-wider font-semibold rounded-lg text-center hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
        >
          Continue Exploring The Atelier
        </Link>
      </div>
    </div>
  );
};

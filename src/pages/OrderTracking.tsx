import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import {
  Truck,
  Search,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const trackingFromUrl = searchParams.get('tracking') || '';
  const { orders, getOrderByTracking } = useStore();

  const [inputCode, setInputCode] = useState(trackingFromUrl || 'VEL-78942-US');
  const [searchedCode, setSearchedCode] = useState(trackingFromUrl || 'VEL-78942-US');

  useEffect(() => {
    if (trackingFromUrl) {
      setInputCode(trackingFromUrl);
      setSearchedCode(trackingFromUrl);
    }
  }, [trackingFromUrl]);

  // Find order by tracking or order id
  const matchedOrder = orders.find(
    o =>
      o.trackingNumber.toUpperCase() === searchedCode.trim().toUpperCase() ||
      o.id.toUpperCase() === searchedCode.trim().toUpperCase()
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedCode(inputCode.trim());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-semibold">
          Logistics Telemetry
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Track Your Commission
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-body">
          Enter your DHL Express waybill tracking code or Order reference (e.g. <strong className="font-mono text-stone-800 dark:text-stone-200">VEL-78942-US</strong>).
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            required
            placeholder="Enter tracking number (e.g. VEL-78942-US)"
            value={inputCode}
            onChange={e => setInputCode(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-xs font-mono uppercase outline-none focus:border-amber-600 transition-colors shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-bold rounded-lg hover:opacity-90 transition-opacity"
        >
          Track
        </button>
      </form>

      {/* Results View */}
      {matchedOrder ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Status Banner */}
          <div className="p-6 bg-stone-50 dark:bg-stone-900/80 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Current Logistics State</span>
              <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 mt-0.5">
                <Truck className="w-5 h-5 text-amber-600" />
                <span>{matchedOrder.status}</span>
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Carrier: <strong>DHL Express Worldwide</strong> · Flight Status: <strong>On Schedule</strong>
              </p>
            </div>

            <div className="sm:text-right text-xs">
              <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Estimated Delivery</span>
              <span className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                {matchedOrder.estimatedDeliveryDate}
              </span>
              <span className="text-[11px] text-emerald-600 block mt-0.5">Direct Signature Required</span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-6 sm:p-8 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-6">
            <h3 className="text-xs uppercase font-bold tracking-wider text-stone-900 dark:text-stone-100 pb-3 border-b border-stone-100 dark:border-stone-800">
              Checkpoint Timeline & Coordinates
            </h3>

            <div className="space-y-6">
              {matchedOrder.trackingEvents.map((evt, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        evt.completed
                          ? 'bg-amber-600 text-white shadow-md'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-400 border border-stone-300 dark:border-stone-700'
                      }`}
                    >
                      {evt.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    {idx < matchedOrder.trackingEvents.length - 1 && (
                      <div
                        className={`w-0.5 h-10 my-1 ${
                          evt.completed ? 'bg-amber-600' : 'bg-stone-200 dark:bg-stone-800'
                        }`}
                      />
                    )}
                  </div>

                  <div className="pt-1 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <p className={`text-xs font-bold ${evt.completed ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400'}`}>
                        {evt.status}
                      </p>
                      <span className="text-[11px] font-mono text-stone-400">{evt.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{evt.location}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Package Overview */}
          <div className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">Delivery Destination</h4>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                {matchedOrder.customer.fullName}<br />
                {matchedOrder.customer.street} {matchedOrder.customer.apartment || ''}<br />
                {matchedOrder.customer.city}, {matchedOrder.customer.state} {matchedOrder.customer.postalCode}<br />
                {matchedOrder.customer.country}
              </p>
            </div>

            <div>
              <h4 className="font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">Package Contents</h4>
              <div className="space-y-1 text-stone-600 dark:text-stone-400">
                {matchedOrder.items.map((it, idx) => (
                  <p key={idx}>
                    {it.quantity}x {it.productName} ({it.variantName})
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-stone-50 dark:bg-stone-800/30 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4 max-w-lg mx-auto">
          <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
          <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
            No active record found for "{searchedCode}"
          </h3>
          <p className="text-xs text-stone-500">
            Please verify the code on your order confirmation receipt or try our default active tracking reference:
          </p>
          <button
            onClick={() => {
              setInputCode('VEL-78942-US');
              setSearchedCode('VEL-78942-US');
            }}
            className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase font-mono font-bold rounded-lg"
          >
            Load Sample Tracking: VEL-78942-US
          </button>
        </div>
      )}
    </div>
  );
};

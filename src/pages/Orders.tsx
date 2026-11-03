import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Package, Truck, ArrowRight, Calendar, MapPin } from 'lucide-react';

export const Orders: React.FC = () => {
  const { orders, currentUser } = useStore();

  // If user is logged in, show their orders (or all if admin/demo)
  const userOrders = currentUser
    ? orders.filter(
        o =>
          currentUser.role === 'admin' ||
          o.customer.email.toLowerCase() === currentUser.email.toLowerCase()
      )
    : orders;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
            Atelier Archive
          </span>
          <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Commission History
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Review past orders, download certificates, and monitor active courier handovers.
          </p>
        </div>

        <Link
          to="/track-order"
          className="text-xs uppercase tracking-wider font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1.5"
        >
          <Truck className="w-4 h-4" />
          <span>Track by Reference Number</span>
        </Link>
      </div>

      {userOrders.length > 0 ? (
        <div className="space-y-6">
          {userOrders.map(order => (
            <div
              key={order.id}
              className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-6 shadow-sm"
            >
              {/* Order header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Order Reference</span>
                    <span className="font-mono font-bold text-stone-900 dark:text-stone-100 text-sm">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Commission Date</span>
                    <span className="text-stone-700 dark:text-stone-300 font-mono">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 uppercase text-[10px] tracking-wider block">Waybill Tracking</span>
                    <span className="text-stone-700 dark:text-stone-300 font-mono font-medium">{order.trackingNumber}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === 'Delivered'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                      : order.status === 'Shipped' || order.status === 'Out for Delivery'
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}>
                    {order.status}
                  </span>
                  <Link
                    to={`/order-confirmation/${order.id}`}
                    className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
                  >
                    View Receipt
                  </Link>
                </div>
              </div>

              {/* Items row */}
              <div className="divide-y divide-stone-100 dark:divide-stone-800">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 first:pt-0 flex items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-16 h-16 rounded-xl object-cover border border-stone-200 dark:border-stone-800 bg-stone-100 shrink-0"
                      />
                      <div>
                        <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                          {item.productName}
                        </h3>
                        <p className="text-stone-500 text-[11px] mt-0.5">
                          Selected Color: {item.variantName} · Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-100">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Summary and Tracking Link */}
              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Dispatched to {order.customer.street}, {order.customer.city}</span>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-stone-400">Total Paid: </span>
                    <span className="font-mono tabular-nums font-bold text-stone-900 dark:text-stone-100 text-sm">
                      ${order.total}
                    </span>
                  </div>
                  <Link
                    to={`/track-order?tracking=${order.trackingNumber}`}
                    className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90"
                  >
                    <span>Track Live</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-stone-800/30 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
          <Package className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto" />
          <h2 className="text-lg font-serif text-stone-800 dark:text-stone-200">No commissions recorded yet</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Your authenticated commissions will appear here upon checkout completion.
          </p>
          <Link
            to="/shop"
            className="inline-block px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-semibold rounded-lg"
          >
            Explore The Catalog
          </Link>
        </div>
      )}
    </div>
  );
};

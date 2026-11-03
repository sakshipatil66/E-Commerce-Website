import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Order, User } from '../types';
import {
  ShieldCheck,
  Package,
  DollarSign,
  Users,
  AlertTriangle,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Truck,
  Search,
  ExternalLink
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
    orders,
    updateOrderStatus,
    registeredUsers,
    currentUser,
    loginAsDemo,
    showToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'inventory' | 'orders' | 'customers'>('overview');

  // Add Product Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdTagline, setNewProdTagline] = useState('');
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdCat, setNewProdCat] = useState<Product['category']>('handbags');
  const [newProdCol, setNewProdCol] = useState<Product['collection']>('permanent');
  const [newProdPrice, setNewProdPrice] = useState(550);
  const [newProdStock, setNewProdStock] = useState(15);
  const [newProdMaterial, setNewProdMaterial] = useState('Full-Grain Tuscan Calfskin');
  const [newProdDimensions, setNewProdDimensions] = useState('32 x 22 x 10 cm');

  // Edit Product Modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Search in tables
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');

  // Calculations for KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProductsCount = products.length;
  const totalPatrons = registeredUsers.length;
  const lowStockItems = products.filter(p => p.stock < 15);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.trackingNumber.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    addProduct({
      name: newProdName,
      tagline: newProdTagline || 'Handcrafted Tuscan leather silhouette.',
      description: newProdDesc || 'Artisanal piece crafted from full-grain vegetable-tanned leather.',
      category: newProdCat,
      collection: newProdCol,
      price: Number(newProdPrice),
      featured: false,
      isNewArrival: true,
      isBestSeller: false,
      images: [
        '/src/assets/images/product_cognac_tote_1793685125366.jpg',
        '/src/assets/images/artisan_craftsmanship_1793685127113.jpg'
      ],
      variants: [
        { id: `v-${Date.now()}-1`, name: 'Classic Cognac', colorName: 'Classic Cognac', colorHex: '#9E5B2D', inStock: true, stockCount: Math.ceil(newProdStock / 2) },
        { id: `v-${Date.now()}-2`, name: 'Obsidian Noir', colorName: 'Obsidian Noir', colorHex: '#18181B', inStock: true, stockCount: Math.floor(newProdStock / 2) }
      ],
      material: newProdMaterial,
      hardware: 'Hand-Polished Champagne Brass',
      dimensions: newProdDimensions,
      weight: '0.85 kg',
      strapDrop: '45 cm',
      madeIn: 'Scandicci, Italy',
      stock: Number(newProdStock),
      tags: ['New Release', newProdCat]
    });

    setIsAddModalOpen(false);
    setNewProdName('');
    setNewProdTagline('');
    setNewProdDesc('');
  };

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      price: Number(editingProduct.price),
      stock: Number(editingProduct.stock),
      category: editingProduct.category,
      collection: editingProduct.collection
    });
    setEditingProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Admin Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Executive Studio Command</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            Atelier Administration
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time control over catalog inventory, client order fulfillment stages, and patron accounts.
          </p>
        </div>

        {currentUser?.role !== 'admin' && (
          <button
            onClick={() => loginAsDemo('admin')}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-amber-700 transition-colors self-start sm:self-auto"
          >
            Switch to Admin Session
          </button>
        )}
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400 uppercase font-semibold">
            <span>Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-[11px] text-stone-500">Across {totalOrders} client commissions</p>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400 uppercase font-semibold">
            <span>Total Commissions</span>
            <Package className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            {totalOrders}
          </p>
          <p className="text-[11px] text-stone-500">100% fulfillment telemetry tracked</p>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400 uppercase font-semibold">
            <span>Active Silhouettes</span>
            <Package className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            {totalProductsCount}
          </p>
          <p className="text-[11px] text-stone-500">Handcrafted in Tuscany</p>
        </div>

        <div className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-stone-400 uppercase font-semibold">
            <span>Registered Patrons</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
            {totalPatrons}
          </p>
          <p className="text-[11px] text-stone-500">Members & VIP Connoisseurs</p>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-6 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Studio Overview' },
          { id: 'products', label: `Products Catalog (${products.length})` },
          { id: 'inventory', label: `Inventory & Stock (${lowStockItems.length} Low)` },
          { id: 'orders', label: `Order Management (${orders.length})` },
          { id: 'customers', label: `Patron Directory (${registeredUsers.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 text-xs uppercase tracking-wider font-semibold transition-colors whitespace-nowrap relative ${
              activeTab === tab.id
                ? 'text-stone-900 dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-600'
                : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Studio Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Low Stock Alert if any */}
          {lowStockItems.length > 0 && (
            <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-start gap-3.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-xs font-semibold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                  Dye Lot Allocation Warning ({lowStockItems.length} models)
                </h3>
                <p className="text-xs text-amber-800 dark:text-amber-300/80 mt-1 leading-relaxed">
                  The following silhouettes have less than 15 units remaining in current Florentine production batches:{' '}
                  <strong>{lowStockItems.map(p => p.name).join(', ')}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Recent Orders quick table */}
          <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                Recent Commissions
              </h3>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-amber-700 dark:text-amber-400 font-semibold hover:underline"
              >
                View all orders →
              </button>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-stone-800 text-xs">
              {orders.slice(0, 3).map(order => (
                <div key={order.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="font-mono font-bold text-stone-900 dark:text-stone-100">{order.id}</span>
                    <span className="text-stone-500 ml-2">· {order.customer.fullName}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-semibold">${order.total}</span>
                    <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[11px] font-medium">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Products Management */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={e => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg outline-none"
              />
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Silhouette</span>
            </button>
          </div>

          {/* Product Table */}
          <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase tracking-wider font-medium">
                <tr>
                  <th className="p-4">Piece</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Total Stock</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {filteredProducts.map(prod => (
                  <tr key={prod.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-12 rounded object-cover border border-stone-200 dark:border-stone-800 bg-stone-100"
                      />
                      <div>
                        <p className="font-semibold text-stone-900 dark:text-stone-100">{prod.name}</p>
                        <p className="text-[11px] text-stone-400">{prod.id} · {prod.collection}</p>
                      </div>
                    </td>
                    <td className="p-4 capitalize text-stone-700 dark:text-stone-300">{prod.category}</td>
                    <td className="p-4 font-mono font-semibold">${prod.price}</td>
                    <td className="p-4 font-mono font-semibold">
                      <span className={prod.stock < 15 ? 'text-amber-600' : 'text-emerald-600'}>
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingProduct(prod)}
                          className="p-1.5 rounded hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
                          title="Edit piece"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-950/40 text-stone-400 hover:text-rose-600"
                          title="Delete piece"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Inventory Management */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-400">
            Click <strong>+5</strong> to record fresh batches from the tannery or <strong>-1</strong> to deduct for in-studio private showcases.
          </div>

          <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase tracking-wider font-medium">
                <tr>
                  <th className="p-4">Silhouette & Colorway</th>
                  <th className="p-4">Available Units</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Instant Adjustment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {products.map(prod =>
                  prod.variants.map(variant => (
                    <tr key={`${prod.id}-${variant.id}`} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full border border-stone-300"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                          <div>
                            <span className="font-semibold text-stone-900 dark:text-stone-100">{prod.name}</span>
                            <span className="text-stone-400 ml-1.5 font-mono">({variant.colorName})</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold">{variant.stockCount}</td>
                      <td className="p-4">
                        {variant.stockCount > 10 ? (
                          <span className="text-emerald-600 font-semibold">Healthy Supply</span>
                        ) : variant.stockCount > 0 ? (
                          <span className="text-amber-600 font-semibold">Low Allocation</span>
                        ) : (
                          <span className="text-rose-600 font-semibold">Exhausted</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateProductStock(prod.id, variant.id, 5)}
                            className="px-2 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded text-stone-800 dark:text-stone-200 font-mono font-bold"
                          >
                            +5
                          </button>
                          <button
                            onClick={() => updateProductStock(prod.id, variant.id, -1)}
                            className="px-2 py-1 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded text-stone-800 dark:text-stone-200 font-mono font-bold"
                          >
                            -1
                          </button>
                          <button
                            onClick={() => updateProductStock(prod.id, variant.id, 20)}
                            className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded font-semibold text-[11px]"
                          >
                            Restock 20
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Orders Management */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by order ID, name, tracking..."
              value={orderSearch}
              onChange={e => setOrderSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg outline-none"
            />
          </div>

          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div
                key={order.id}
                className="p-6 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100">{order.id}</span>
                    <span className="text-stone-500 font-mono">Waybill: {order.trackingNumber}</span>
                    <span className="text-stone-500">Patron: {order.customer.fullName} ({order.customer.email})</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-stone-500">Status:</span>
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                      className="bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1 text-xs font-semibold outline-none cursor-pointer"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Crafting & Processing">Crafting & Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-medium text-stone-800 dark:text-stone-200">
                      Items: {order.items.map(it => `${it.quantity}x ${it.productName} (${it.variantName})`).join(', ')}
                    </p>
                    <p className="text-stone-500 text-[11px]">
                      Destination: {order.customer.street}, {order.customer.city}, {order.customer.country}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono tabular-nums font-bold text-sm text-stone-900 dark:text-stone-100">
                      ${order.total}
                    </span>
                    <span className="text-[11px] text-emerald-600 font-semibold uppercase">
                      Payment {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Patron Directory */}
      {activeTab === 'customers' && (
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 text-stone-500 uppercase tracking-wider font-medium">
              <tr>
                <th className="p-4">Client Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Privilege Tier</th>
                <th className="p-4">Commissions Placed</th>
                <th className="p-4">Member Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
              {registeredUsers.map(u => {
                const userOrderCount = orders.filter(
                  o => o.customer.email.toLowerCase() === u.email.toLowerCase()
                ).length;

                return (
                  <tr key={u.id} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                    <td className="p-4 font-semibold text-stone-900 dark:text-stone-100">{u.name}</td>
                    <td className="p-4 font-mono text-stone-600 dark:text-stone-400">{u.email}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300">
                        {u.tier}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-semibold">{userOrderCount} orders</td>
                    <td className="p-4 font-mono text-stone-400">{u.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-4 border border-stone-200 dark:border-stone-800 shadow-2xl">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                Register New Silhouette in Atelier Catalog
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-medium text-stone-700 dark:text-stone-300">Piece Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Borghese Structured Saddle"
                  value={newProdName}
                  onChange={e => setNewProdName(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-medium text-stone-700 dark:text-stone-300">Category</label>
                  <select
                    value={newProdCat}
                    onChange={e => setNewProdCat(e.target.value as any)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 rounded-lg outline-none"
                  >
                    <option value="handbags">Totes & Handbags</option>
                    <option value="crossbody">Crossbody Bags</option>
                    <option value="travel">Travel & Weekenders</option>
                    <option value="accessories">Small Leather Goods</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-stone-700 dark:text-stone-300">Collection</label>
                  <select
                    value={newProdCol}
                    onChange={e => setNewProdCol(e.target.value as any)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 rounded-lg outline-none"
                  >
                    <option value="permanent">Permanent Collection</option>
                    <option value="autumn-suede">Autumnal Suede Edition</option>
                    <option value="architectural">Architectural Box Series</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-medium text-stone-700 dark:text-stone-300">Price ($ USD)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(Number(e.target.value))}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 rounded-lg outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-stone-700 dark:text-stone-300">Initial Batch Units</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={e => setNewProdStock(Number(e.target.value))}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 rounded-lg outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-stone-700 dark:text-stone-300">Editorial Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Sculpted curves and Tuscan bridle leather trim."
                  value={newProdTagline}
                  onChange={e => setNewProdTagline(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 rounded-lg outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-700 rounded-lg text-stone-600 dark:text-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold rounded-lg"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-stone-900 rounded-2xl max-w-md w-full p-6 space-y-4 border border-stone-200 dark:border-stone-800 shadow-2xl text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                Edit Silhouette: {editingProduct.name}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-stone-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProductEdit} className="space-y-3">
              <div className="space-y-1">
                <label className="font-medium text-stone-700 dark:text-stone-300">Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1.5 rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-stone-700 dark:text-stone-300">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1.5 rounded-lg outline-none font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-medium text-stone-700 dark:text-stone-300">Total Stock</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock}
                    onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-1.5 rounded-lg outline-none font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-3 py-1.5 border border-stone-300 dark:border-stone-700 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

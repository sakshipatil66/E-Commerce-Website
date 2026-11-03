import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, Coupon, Order, User, Review, ShippingAddress } from '../types';
import { INITIAL_PRODUCTS, VALID_COUPONS, INITIAL_REVIEWS } from '../data/products';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateProductStock: (id: string, variantId: string, delta: number) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => void;
  updateCartQuantity: (productId: string, variantId: string, quantity: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Coupon & Totals
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Auth / Users
  currentUser: User | null;
  registeredUsers: User[];
  login: (email: string) => boolean;
  register: (name: string, email: string) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  loginAsDemo: (role: 'customer' | 'admin') => void;

  // Orders
  orders: Order[];
  placeOrder: (customer: ShippingAddress, paymentMethod: Order['paymentMethod']) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrderByTracking: (trackingNumber: string) => Order | undefined;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  getProductReviews: (productId: string) => Review[];

  // Quick View Modal
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEMO_CUSTOMER: User = {
  id: 'usr-customer-1',
  name: 'Eleanor Vance',
  email: 'eleanor.vance@velane-atelier.com',
  role: 'customer',
  phone: '+1 (555) 234-8971',
  tier: 'Atelier Gold',
  createdAt: '2026-02-15',
  shippingAddress: {
    fullName: 'Eleanor Vance',
    email: 'eleanor.vance@velane-atelier.com',
    phone: '+1 (555) 234-8971',
    street: '742 Evergreen Promenade',
    apartment: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10012',
    country: 'United States'
  }
};

const DEMO_ADMIN: User = {
  id: 'usr-admin-1',
  name: 'Henri Marchand (Directeur)',
  email: 'admin@velane-atelier.com',
  role: 'admin',
  tier: 'Atelier Connoisseur',
  createdAt: '2025-01-10'
};

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8492',
    trackingNumber: 'VEL-78942-US',
    createdAt: '2026-10-28T14:30:00Z',
    customer: {
      fullName: 'Eleanor Vance',
      email: 'eleanor.vance@velane-atelier.com',
      phone: '+1 (555) 234-8971',
      street: '742 Evergreen Promenade',
      apartment: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10012',
      country: 'United States'
    },
    items: [
      {
        productId: 'vel-01',
        productName: 'The Grand Élysée Structured Tote',
        productImage: '/src/assets/images/product_cognac_tote_1793685125366.jpg',
        variantName: 'Caramel Cognac',
        price: 680,
        quantity: 1
      }
    ],
    subtotal: 680,
    discount: 68,
    shippingFee: 0,
    tax: 48.96,
    total: 660.96,
    status: 'Shipped',
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    estimatedDeliveryDate: 'November 6, 2026',
    trackingEvents: [
      { status: 'Order Placed & Verified', location: 'Atelier Digital Gateway', timestamp: 'Oct 28, 2026 14:30', completed: true },
      { status: 'Handcrafted & Quality Inspected', location: 'Florence Workshop, Italy', timestamp: 'Oct 29, 2026 11:15', completed: true },
      { status: 'Dispatched via DHL Express Air', location: 'Milan International Hub', timestamp: 'Oct 30, 2026 08:45', completed: true },
      { status: 'Arrived at Regional Distribution Sort', location: 'JFK Airport Sort Facility, NY', timestamp: 'Nov 02, 2026 16:20', completed: true },
      { status: 'Out for White Glove Delivery', location: 'Manhattan Courier Center', timestamp: 'Pending', completed: false },
      { status: 'Delivered', location: 'Recipient Address', timestamp: 'Estimated Nov 6', completed: false }
    ]
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('velane_products');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('velane_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('velane_wishlist');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return ['vel-02'];
  });

  // User Auth
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('velane_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEMO_CUSTOMER; // default active session for easy preview
  });

  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('velane_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [DEMO_CUSTOMER, DEMO_ADMIN];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('velane_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_ORDERS;
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('velane_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_REVIEWS;
  });

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('velane_coupon');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('velane_theme') === 'dark';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('velane_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('velane_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('velane_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('velane_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('velane_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('velane_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('velane_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('velane_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('velane_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('velane_coupon');
    }
  }, [appliedCoupon]);

  // Handle Theme
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('velane_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('velane_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 300;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = (subtotal * appliedCoupon.discountPercent) / 100;
    } else if (appliedCoupon.discountAmount) {
      discountAmount = Math.min(subtotal, appliedCoupon.discountAmount);
    }
  }

  const shippingFee = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 25;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = Number((taxableAmount * 0.08).toFixed(2));
  const total = Number((taxableAmount + shippingFee + tax).toFixed(2));

  const addToCart = (product: Product, variant: ProductVariant, quantity = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedVariant.id === variant.id
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedVariant: variant, quantity }];
    });
    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const updateCartQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedVariant.id === variantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string, variantId: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && item.selectedVariant.id === variantId)
      )
    );
    showToast('Item removed from shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = VALID_COUPONS.find(c => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promotional code. Please try LUXE10 or SUPERVISOR20.' };
    }
    if (subtotal < found.minSpend) {
      return {
        success: false,
        message: `Order must be at least $${found.minSpend} to apply ${found.code}. Current subtotal: $${subtotal}`
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`);
    return { success: true, message: `Coupon applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promotion code removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from saved wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist.');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Auth
  const login = (email: string) => {
    const found = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      showToast(`Welcome back, ${found.name}!`);
      return true;
    }
    // Auto-login new user if not found
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email: email.toLowerCase(),
      role: 'customer',
      tier: 'Member',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRegisteredUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Welcome to VÉLANE Atelier, ${newUser.name}!`);
    return true;
  };

  const register = (name: string, email: string) => {
    const existing = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      showToast('An account with this email already exists.', 'error');
      return false;
    }
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      role: 'customer',
      tier: 'Member',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRegisteredUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    showToast(`Account created. Welcome to VÉLANE Atelier, ${name}!`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed out successfully.', 'info');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setRegisteredUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    showToast('Profile updated successfully.');
  };

  const loginAsDemo = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser(DEMO_ADMIN);
      showToast('Logged in as Atelier Administrator.');
    } else {
      setCurrentUser(DEMO_CUSTOMER);
      showToast('Logged in as VIP Customer Eleanor Vance.');
    }
  };

  // Orders
  const placeOrder = (customer: ShippingAddress, paymentMethod: Order['paymentMethod']): Order => {
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const trackingSuffix = Math.floor(10000 + Math.random() * 90000);
    const estDelivery = new Date();
    estDelivery.setDate(estDelivery.getDate() + 5);

    const newOrder: Order = {
      id: `ORD-${orderNumber}`,
      trackingNumber: `VEL-${trackingSuffix}-INTL`,
      createdAt: new Date().toISOString(),
      customer,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        variantName: item.selectedVariant.name,
        price: item.product.price,
        quantity: item.quantity
      })),
      subtotal,
      discount: discountAmount,
      shippingFee,
      tax,
      total,
      status: 'Order Placed',
      paymentMethod,
      paymentStatus: 'paid',
      estimatedDeliveryDate: estDelivery.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      trackingEvents: [
        {
          status: 'Order Placed & Payment Authorized',
          location: 'Atelier Secure Gateway',
          timestamp: 'Just now',
          completed: true
        },
        {
          status: 'Atelier Artisan Preparation',
          location: 'Florence Workshop, Italy',
          timestamp: 'Next Business Day',
          completed: false
        },
        {
          status: 'Quality Inspection & Silk Wrap Packaging',
          location: 'Scandicci Fulfillment Atelier',
          timestamp: 'Pending',
          completed: false
        },
        {
          status: 'Dispatched with Courier',
          location: 'Express Logistics Center',
          timestamp: 'Pending',
          completed: false
        },
        {
          status: 'Delivered',
          location: `${customer.city}, ${customer.country}`,
          timestamp: 'Pending',
          completed: false
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);

    // Deduct stock
    cart.forEach(item => {
      updateProductStock(item.product.id, item.selectedVariant.id, -item.quantity);
    });

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;
        const events = [...order.trackingEvents];
        const statusIdx = events.findIndex(e => e.status.toLowerCase().includes(status.toLowerCase()));
        if (statusIdx > -1) {
          for (let i = 0; i <= statusIdx; i++) {
            events[i].completed = true;
          }
        }
        return { ...order, status, trackingEvents: events };
      })
    );
    showToast(`Order ${orderId} status updated to: ${status}`);
  };

  const getOrderById = (orderId: string) => orders.find(o => o.id === orderId);
  const getOrderByTracking = (trackingNumber: string) =>
    orders.find(o => o.trackingNumber.toUpperCase() === trackingNumber.trim().toUpperCase());

  // Products CRUD for Admin
  const addProduct = (newProd: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewCount'>) => {
    const id = `vel-${Date.now().toString().slice(-4)}`;
    const slug = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const product: Product = {
      ...newProd,
      id,
      slug,
      rating: 5.0,
      reviewCount: 0
    };
    setProducts(prev => [product, ...prev]);
    showToast(`Product "${product.name}" created successfully.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Product updated.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted from inventory.', 'info');
  };

  const updateProductStock = (id: string, variantId: string, delta: number) => {
    setProducts(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const updatedVariants = p.variants.map(v => {
          if (v.id === variantId) {
            const nextCount = Math.max(0, v.stockCount + delta);
            return { ...v, stockCount: nextCount, inStock: nextCount > 0 };
          }
          return v;
        });
        const totalStock = updatedVariants.reduce((sum, v) => sum + v.stockCount, 0);
        return { ...p, variants: updatedVariants, stock: totalStock };
      })
    );
  };

  const getProductBySlug = (slug: string) => products.find(p => p.slug === slug || p.id === slug);
  const getProductById = (id: string) => products.find(p => p.id === id);

  // Reviews
  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setReviews(prev => [newRev, ...prev]);

    // Recalculate product rating
    const prodReviews = [...reviews.filter(r => r.productId === review.productId), newRev];
    const avg = Number((prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length).toFixed(1));
    updateProduct(review.productId, { rating: avg, reviewCount: prodReviews.length });

    showToast('Thank you! Your verified review has been published.');
  };

  const getProductReviews = (productId: string) => reviews.filter(r => r.productId === productId);

  // Quick View
  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateProductStock,
        getProductBySlug,
        getProductById,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        tax,
        total,
        freeShippingThreshold,
        freeShippingProgress,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentUser,
        registeredUsers,
        login,
        register,
        logout,
        updateProfile,
        loginAsDemo,
        orders,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        getOrderByTracking,
        reviews,
        addReview,
        getProductReviews,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isDarkMode,
        toggleTheme,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

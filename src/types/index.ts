export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  inStock: boolean;
  stockCount: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: 'handbags' | 'crossbody' | 'travel' | 'accessories';
  collection: 'permanent' | 'autumn-suede' | 'architectural' | 'limited-edition';
  price: number;
  originalPrice?: number;
  featured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  variants: ProductVariant[];
  material: string;
  hardware: string;
  dimensions: string;
  weight: string;
  strapDrop: string;
  madeIn: string;
  stock: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend: number;
  description: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  variantName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  trackingNumber: string;
  createdAt: string;
  customer: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: 'Order Placed' | 'Crafting & Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  paymentMethod: 'credit_card' | 'apple_pay' | 'cod' | 'bank_transfer';
  paymentStatus: 'paid' | 'pending';
  estimatedDeliveryDate: string;
  trackingEvents: {
    status: string;
    location: string;
    timestamp: string;
    completed: boolean;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  avatar?: string;
  tier: 'Member' | 'Atelier Gold' | 'Atelier Connoisseur';
  createdAt: string;
  shippingAddress?: ShippingAddress;
}

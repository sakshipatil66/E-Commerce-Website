import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { wishlist, products, addToCart, openCart } = useStore();

  const savedProducts = products.filter(p => wishlist.includes(p.id));

  const handleAddAllToCart = () => {
    savedProducts.forEach(product => {
      addToCart(product, product.variants[0], 1);
    });
    openCart();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
            <Heart className="w-4 h-4 fill-current text-rose-500" />
            <span>Saved Silhouettes</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            My Curated Wishlist
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Items saved for future atelier commissions. Availability is preserved while dye lots last.
          </p>
        </div>

        {savedProducts.length > 0 && (
          <button
            onClick={handleAddAllToCart}
            className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-semibold rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity self-start sm:self-auto"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Move All to Shopping Bag</span>
          </button>
        )}
      </div>

      {savedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {savedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-stone-800/30 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
          <Heart className="w-12 h-12 text-stone-300 dark:text-stone-700 mx-auto" />
          <h2 className="text-lg font-serif text-stone-800 dark:text-stone-200">Your wishlist is empty</h2>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Explore our collections and tap the heart icon on any piece to save it for your private review.
          </p>
          <Link
            to="/shop"
            className="inline-block px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-semibold rounded-lg"
          >
            Discover Handcrafted Leather Goods
          </Link>
        </div>
      )}
    </div>
  );
};

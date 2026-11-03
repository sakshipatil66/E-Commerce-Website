import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Search } from 'lucide-react';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { products } = useStore();

  const matchingProducts = products.filter(p => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium">
          <Search className="w-4 h-4 text-amber-600" />
          <span>Atelier Search Index</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-2">
          Results for "{query}"
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Showing <span className="font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-100">{matchingProducts.length}</span> matching silhouettes in current production.
        </p>
      </div>

      {matchingProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {matchingProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-stone-800/30 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
          <p className="text-base font-serif text-stone-800 dark:text-stone-200">
            No matching silhouettes found.
          </p>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try searching for broader keywords like "tote", "duffel", "crossbody", or "leather".
          </p>
          <Link
            to="/shop"
            className="inline-block px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-semibold rounded-lg"
          >
            Explore Complete Catalog
          </Link>
        </div>
      )}
    </div>
  );
};

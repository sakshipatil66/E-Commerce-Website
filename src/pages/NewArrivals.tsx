import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Sparkles } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const { products } = useStore();
  const newArrivals = products.filter(p => p.isNewArrival);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-8 text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fresh From The Workshop</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
          New Releases
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-body">
          The latest sculptural iterations and seasonal colorways to leave our Tuscan atelier benches. Produced in numbered micro-batches.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {newArrivals.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

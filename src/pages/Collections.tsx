import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Collections: React.FC = () => {
  const { products } = useStore();

  const collections = [
    {
      id: 'permanent',
      title: 'The Permanent Collection',
      subtitle: 'The foundational architectural archetypes of VÉLANE.',
      description: 'Pieces designed never to be altered or discounted. Built from heavy vegetable-tanned Tuscan calfskin, double saddle-stitched, and finished with solid brass hardware.',
      badge: 'Continuous Edition',
      items: products.filter(p => p.collection === 'permanent')
    },
    {
      id: 'autumn-suede',
      title: 'Autumnal Suede Edition',
      subtitle: 'Tactile suede paired with robust bridle saddle trims.',
      description: 'Evoking the misty olive groves of Chianti in late November. Silky, hydrophobic Italian suede treated to shed rain droplets effortlessly.',
      badge: 'Seasonal Capsule',
      items: products.filter(p => p.collection === 'autumn-suede')
    },
    {
      id: 'architectural',
      title: 'Architectural Box Series',
      subtitle: 'Rigid geometry, precision beveling, and push-lock clasps.',
      description: 'Taking inspiration from modern brutalist gallery facades and minimalist mid-century proportion. Hard-sided construction with soft interior suede cushioning.',
      badge: 'Limited Series',
      items: products.filter(p => p.collection === 'architectural')
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-8 text-center max-w-2xl mx-auto space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-semibold">
          Curated Series & Capsules
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Curated Collections
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-body">
          Each collection embodies an aesthetic dialogue between material purity, structural geometry, and daily utility.
        </p>
      </div>

      <div className="space-y-16">
        {collections.map(col => (
          <div key={col.id} className="space-y-6 pt-6 border-t first:border-t-0 border-stone-200 dark:border-stone-800">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{col.badge}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                  {col.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1 max-w-2xl">
                  {col.description}
                </p>
              </div>

              <Link
                to={`/shop?collection=${col.id}`}
                className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100 hover:text-amber-600 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Shop Series ({col.items.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {col.items.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

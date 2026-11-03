import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const Categories: React.FC = () => {
  const { products } = useStore();

  const categories = [
    {
      id: 'handbags',
      name: 'Structured Totes & Handbags',
      tagline: 'Refined daily proportions built for laptops, documents, and lifelong carry.',
      image: '/src/assets/images/product_cognac_tote_1793685125366.jpg',
      material: 'Vegetable-tanned full-grain box & pebble calfskin',
      count: products.filter(p => p.category === 'handbags').length
    },
    {
      id: 'crossbody',
      name: 'Sculptural Crossbody Bags',
      tagline: 'Balanced architectural shapes with turn-lock closures and adjustable straps.',
      image: '/src/assets/images/product_obsidian_crossbody_1793685126315.jpg',
      material: 'Smooth box calfskin with champagne gold clasps',
      count: products.filter(p => p.category === 'crossbody').length
    },
    {
      id: 'travel',
      name: 'Travel Bags & Weekenders',
      tagline: 'Cabin-compliant weekenders combining velvety Italian suede and bridle leather.',
      image: '/src/assets/images/product_weekend_duffel_1793685127397.jpg',
      material: 'Waterproof suede & reinforced vegetable-tanned bridle leather',
      count: products.filter(p => p.category === 'travel').length
    },
    {
      id: 'accessories',
      name: 'Small Leather Goods & Folios',
      tagline: 'Zip accordion wallets, RFID travel folios, and cardholders stitched with wax linen.',
      image: '/src/assets/images/artisan_craftsmanship_1793685127113.jpg',
      material: 'French calfskin & burnished saddle stitch edge paint',
      count: products.filter(p => p.category === 'accessories').length
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-8 text-center max-w-2xl mx-auto space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-semibold">
          Departments & Disciplines
        </p>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
          The Atelier Categories
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
          From full-dimension travel carryalls to structured crossbody boxes, explore each discipline shaped in our Florentine workshops.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {categories.map(category => (
          <div
            key={category.id}
            className="group relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-stone-800">
              <img
                src={category.image}
                alt={category.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6">
                <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                  {category.count} Models in Production
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                  {category.name}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-body">
                  {category.tagline}
                </p>
                <p className="text-xs text-stone-400 pt-1">
                  <strong>Signature Medium:</strong> {category.material}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
                <Link
                  to={`/shop?category=${category.id}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-stone-900 dark:text-stone-100 hover:text-amber-600 transition-colors"
                >
                  <span>Explore {category.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

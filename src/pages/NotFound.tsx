import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto text-amber-600">
        <Compass className="w-8 h-8" />
      </div>

      <span className="text-xs uppercase tracking-[0.3em] text-amber-700 dark:text-amber-400 font-semibold block">
        Error 404 · Silhouette Uncharted
      </span>

      <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50">
        The Piece Has Shifted
      </h1>

      <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto font-body leading-relaxed">
        The atelier coordinate you requested does not correspond to an active exhibition. Return to our Florentine catalog to explore current editions.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="px-6 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-bold rounded-lg shadow hover:opacity-90 transition-opacity"
        >
          Return to Atelier Entry
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center gap-1.5"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

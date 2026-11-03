import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { SlidersHorizontal, X, Search, RotateCcw } from 'lucide-react';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useStore();

  const categoryParam = searchParams.get('category') || 'all';
  const collectionParam = searchParams.get('collection') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [selectedCollection, setSelectedCollection] = useState<string>(collectionParam);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Sync category param if url changes
  React.useEffect(() => {
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category')!);
    }
    if (searchParams.get('collection')) {
      setSelectedCollection(searchParams.get('collection')!);
    }
  }, [searchParams]);

  const categories = [
    { id: 'all', label: 'All Silhouettes' },
    { id: 'handbags', label: 'Totes & Handbags' },
    { id: 'crossbody', label: 'Crossbody Bags' },
    { id: 'travel', label: 'Travel & Weekenders' },
    { id: 'accessories', label: 'Small Leather Goods' }
  ];

  const collections = [
    { id: 'all', label: 'All Drops' },
    { id: 'permanent', label: 'Permanent Collection' },
    { id: 'architectural', label: 'Architectural Series' },
    { id: 'autumn-suede', label: 'Autumnal Suede Edition' }
  ];

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      // Collection
      if (selectedCollection !== 'all' && p.collection !== selectedCollection) return false;
      // Price
      if (p.price > maxPrice) return false;
      // Stock
      if (inStockOnly && p.stock <= 0) return false;
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesTag = p.tags.some(t => t.toLowerCase().includes(query));
        const matchesMaterial = p.material.toLowerCase().includes(query);
        if (!matchesName && !matchesTag && !matchesMaterial) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedCollection, maxPrice, inStockOnly, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setMaxPrice(1000);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedCollection !== 'all' ||
    maxPrice < 1000 ||
    inStockOnly ||
    searchQuery.trim().length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-stone-200 dark:border-stone-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
            Catalog & Editions
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
            The Complete Atelier Collection
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1.5 max-w-xl">
            Each piece is numbered, handcrafted in limited production batches in Tuscany, and accompanied by an authenticated certificate of origin.
          </p>
        </div>

        {/* Search input in header */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search silhouettes, materials..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg outline-none focus:border-amber-600 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Categories segment + Sort + Mobile Filter Trigger */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Interactive Filter Tabs / Segmented Controls (per constitution §1.A) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                if (cat.id === 'all') {
                  searchParams.delete('category');
                  setSearchParams(searchParams);
                } else {
                  setSearchParams({ ...Object.fromEntries(searchParams), category: cat.id });
                }
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Secondary controls: Sort + Filter trigger */}
        <div className="flex items-center gap-3 justify-between sm:justify-end">
          <button
            onClick={() => setIsFilterDrawerOpen(prev => !prev)}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              hasActiveFilters
                ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-300'
                : 'border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Refine Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-amber-600" />
            )}
          </button>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-400 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 py-1.5 px-3 rounded-lg text-xs outline-none cursor-pointer"
            >
              <option value="featured">Curated Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Collapsible Refine Drawer / Panel */}
      {isFilterDrawerOpen && (
        <div className="p-6 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 rounded-xl space-y-6 animate-in slide-in-from-top-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
              Filter By Specifications
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-amber-400 hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Curated Collection Filter */}
            <div>
              <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                Curated Series
              </label>
              <div className="space-y-1.5">
                {collections.map(col => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollection(col.id)}
                    className={`block w-full text-left px-2.5 py-1 text-xs rounded transition-colors ${
                      selectedCollection === col.id
                        ? 'bg-amber-100 dark:bg-amber-950/60 font-semibold text-amber-900 dark:text-amber-200'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {col.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Ceiling Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">
                  Maximum Price:
                </label>
                <span className="text-xs font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-100">
                  ${maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="150"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-1">
                <span>$150</span>
                <span>$1,000</span>
              </div>
            </div>

            {/* In-Stock Toggle */}
            <div className="flex flex-col justify-center">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 accent-amber-600"
                />
                <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                  Ready to Dispatch Immediately (In Stock)
                </span>
              </label>
              <p className="text-[11px] text-stone-500 mt-1 pl-7">
                Hide items currently allocated to custom pre-orders.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
        <div>
          Showing <span className="font-mono tabular-nums font-semibold text-stone-900 dark:text-stone-100">{filteredProducts.length}</span> handcrafted silhouettes
          {selectedCategory !== 'all' && (
            <span> in <strong className="capitalize text-stone-900 dark:text-stone-100">{selectedCategory}</strong></span>
          )}
        </div>
      </div>

      {/* Product Grid (Desktop 3 or 4 columns) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-stone-50 dark:bg-stone-900/40 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
          <p className="text-sm font-serif text-stone-700 dark:text-stone-300">
            No silhouettes match your current criteria.
          </p>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your maximum price slider, category selection, or search query.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

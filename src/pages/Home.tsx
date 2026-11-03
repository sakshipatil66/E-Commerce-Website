import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { ArrowRight, ShieldCheck, Sparkles, Feather, Compass, Award } from 'lucide-react';

export const Home: React.FC = () => {
  const { products } = useStore();

  const featuredProducts = products.filter(p => p.featured).slice(0, 3);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      {/* Editorial Campaign Hero Section */}
      <section className="relative overflow-hidden bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Editorial Headline & Story */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autumn Edition 2026 · Florence, Italy</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-[1.12] tracking-tight text-balance">
                Architectural Form. Handcrafted Permanence.
              </h1>

              <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl font-body">
                Objects of intentional restraint and tactile luxury. Sculpted by master artisans in Scandicci from full-grain Tuscan vegetable-tanned leather and hand-polished champagne brass.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/shop"
                  className="px-7 py-3.5 bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 text-xs uppercase tracking-widest font-bold rounded-lg hover:opacity-90 transition-all flex items-center gap-2.5 shadow-lg shadow-stone-950/10"
                >
                  <span>Explore The Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about"
                  className="px-7 py-3.5 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs uppercase tracking-widest font-semibold rounded-lg border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700/60 transition-colors"
                >
                  Our Tuscan Atelier
                </Link>
              </div>

              {/* Sub-hero trust metrics */}
              <div className="pt-6 border-t border-stone-200/80 dark:border-stone-800 grid grid-cols-3 gap-6 text-xs text-stone-600 dark:text-stone-400">
                <div>
                  <p className="font-serif text-lg sm:text-xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">100%</p>
                  <p className="text-[11px] mt-0.5">Vegetable-Tanned</p>
                </div>
                <div>
                  <p className="font-serif text-lg sm:text-xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">Scandicci</p>
                  <p className="text-[11px] mt-0.5">Artisanal Guild</p>
                </div>
                <div>
                  <p className="font-serif text-lg sm:text-xl font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">Lifetime</p>
                  <p className="text-[11px] mt-0.5">Repair Guarantee</p>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Hero Visual Anchor */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-stone-300/60 dark:border-stone-800 bg-stone-200">
                <img
                  src="/src/assets/images/hero_velane_atelier_1793685125060.jpg"
                  alt="VÉLANE Atelier Autumn Campaign"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-6 sm:p-8">
                  <div className="text-white space-y-1">
                    <p className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold">Featured Campaign</p>
                    <h3 className="text-lg sm:text-xl font-serif font-bold">The Grand Élysée in Caramel Cognac</h3>
                    <p className="text-xs text-stone-300">Limited Production Run of 150 pieces</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection Grid (Strict 3-Column Desktop Discipline) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <Award className="w-4 h-4" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
              The Flagship Editions
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
              Hand-finished silhouettes engineered for durability, grace, and everyday presence.
            </p>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>View All Models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Craftsmanship Narrative & Story Section (Riversmile Inspired Storytelling) */}
      <section className="bg-stone-900 text-stone-100 py-16 sm:py-24 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Craft Image */}
            <div className="lg:col-span-6 relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-stone-800">
                <img
                  src="/src/assets/images/artisan_craftsmanship_1793685127113.jpg"
                  alt="Leather Artisan Craftsmanship"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block bg-stone-800/90 backdrop-blur-md p-4 rounded-xl border border-stone-700 shadow-xl max-w-xs">
                <p className="text-xs font-serif italic text-amber-200">
                  "Leather is alive. We do not paint over its history — we reveal its soul through organic tannins and slow hand-buffing."
                </p>
                <p className="text-[10px] text-stone-400 mt-2 uppercase tracking-wider font-semibold">
                  Matteo Renzi · Master Leather Tanner, Florence
                </p>
              </div>
            </div>

            {/* Narrative Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                <Feather className="w-4 h-4" />
                <span>The Atelier Method</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                Slow Craft in a Fast World
              </h2>

              <p className="text-sm text-stone-300 leading-relaxed font-body">
                Unlike mass-market fashion that utilizes chrome-treated splits coated in plastic polymers, every piece bearing the VÉLANE hallmark is tanned with natural vegetable extracts extracted from chestnut and mimosa barks.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Full-Grain Tuscan Raw Hides</h4>
                    <p className="text-xs text-stone-400 mt-0.5">Selected from ethical Italian farms. Never buffed, sanded, or stamped with artificial print.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Hand-Stitched Saddle Seams</h4>
                    <p className="text-xs text-stone-400 mt-0.5">Two needles interlock along waxed linen thread, ensuring that even if one loop abrades, the seam will never unravel.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Solid Turn-Lock Hardware</h4>
                    <p className="text-xs text-stone-400 mt-0.5">Milled from solid brass bars and finished with electroplated champagne gold that never chips or tarnishes.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <span>Read The Full Craft Manifesto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <p className="text-xs uppercase tracking-widest font-semibold text-amber-700 dark:text-amber-400">
            Explore By Department
          </p>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
            Architectural Categories
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Designed for purpose, proportioned for harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Structured Totes',
              count: '3 Models',
              image: '/src/assets/images/product_cognac_tote_1793685125366.jpg',
              link: '/shop?category=handbags'
            },
            {
              title: 'Crossbody Bags',
              count: '3 Models',
              image: '/src/assets/images/product_obsidian_crossbody_1793685126315.jpg',
              link: '/shop?category=crossbody'
            },
            {
              title: 'Travel & Weekenders',
              count: '2 Models',
              image: '/src/assets/images/product_weekend_duffel_1793685127397.jpg',
              link: '/shop?category=travel'
            },
            {
              title: 'Leather Accessories',
              count: '4 Models',
              image: '/src/assets/images/artisan_craftsmanship_1793685127113.jpg',
              link: '/shop?category=accessories'
            }
          ].map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent p-5 flex flex-col justify-end text-white">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-medium">{cat.count}</span>
                <h3 className="text-lg font-serif font-bold group-hover:text-amber-200 transition-colors">{cat.title}</h3>
                <span className="text-xs text-stone-300 flex items-center gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                  Shop category →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <Compass className="w-4 h-4" />
              <span>Patron Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
              Most Coveted Silhouettes
            </h2>
          </div>
          <Link
            to="/best-sellers"
            className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100 hover:text-amber-600 transition-colors flex items-center gap-1.5"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Press & Editorial Reviews Quotes */}
      <section className="bg-stone-100 dark:bg-stone-900/40 py-16 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold text-stone-500">
            Selected Critical Acclaim
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-white dark:bg-stone-800/60 rounded-xl border border-stone-200/80 dark:border-stone-800 space-y-3">
              <p className="text-sm font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed">
                "VÉLANE delivers the quiet architectural gravity that modern luxury has forgotten. An absolute masterclass in Italian leather craftsmanship."
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-700 flex justify-between items-center text-xs text-stone-500">
                <span className="font-semibold text-stone-900 dark:text-stone-100">Vogue Living</span>
                <span>Fall Edition</span>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-stone-800/60 rounded-xl border border-stone-200/80 dark:border-stone-800 space-y-3">
              <p className="text-sm font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed">
                "The Grand Élysée tote is the single best carryall we reviewed this year. Solid brass, natural vegetable tannin, and timeless restraint."
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-700 flex justify-between items-center text-xs text-stone-500">
                <span className="font-semibold text-stone-900 dark:text-stone-100">Robb Report</span>
                <span>Best of the Best</span>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-stone-800/60 rounded-xl border border-stone-200/80 dark:border-stone-800 space-y-3">
              <p className="text-sm font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed">
                "In an era of disposable fashion, VÉLANE creates pieces designed to outlast their owners and develop a richer patina with every voyage."
              </p>
              <div className="pt-2 border-t border-stone-100 dark:border-stone-700 flex justify-between items-center text-xs text-stone-500">
                <span className="font-semibold text-stone-900 dark:text-stone-100">Monocle Magazine</span>
                <span>Design Directory</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

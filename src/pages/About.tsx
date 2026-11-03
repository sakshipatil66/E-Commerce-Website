import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Feather, ShieldCheck, HeartHandshake, Compass, ArrowRight } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Editorial Header */}
      <section className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-700 dark:text-amber-400 font-semibold">
            The Atelier Story & Manifesto
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-900 dark:text-stone-50 leading-tight">
            Permanence Over Trend
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed font-body max-w-2xl mx-auto">
            Founded in Florence, VÉLANE was born from a singular conviction: that modern objects of carry should possess architectural rigor, tactile honesty, and the capacity to outlive their first owners.
          </p>
        </div>
      </section>

      {/* Narrative Section 1: The Tuscan Guild */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
              01. Tuscan Heritage
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-snug">
              Centuries of Vegetable Tanning
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-body">
              Along the banks of the Arno river in Scandicci, master artisans have practiced the alchemy of vegetable tanning since the Renaissance. We partner exclusively with certified Italian tanneries that forgo harsh chromium salts and synthetic plastic resins.
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-body">
              Instead, our full-grain hides steep in oak vats saturated with natural bark extracts: chestnut, mimosa, and quebracho. This gentle process requires up to six weeks, yielding leather that breathes, ages gracefully, and develops an irreplaceable patina.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800">
              <img
                src="/src/assets/images/artisan_craftsmanship_1793685127113.jpg"
                alt="Master Artisan at Work"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section 2: Architectural Restraint */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800">
              <img
                src="/src/assets/images/product_obsidian_crossbody_1793685126315.jpg"
                alt="Architectural Crossbody"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
              02. Design Language
            </span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-snug">
              Architectural Restraint
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-body">
              We reject ostentatious logos and disposable hardware. Every curve in a VÉLANE silhouette is derived from structural utility: reinforced corners that prevent wear, balanced handle arches that distribute mass evenly across the collarbone, and push-lock closures milled from solid brass blocks.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100">Zero Plastic Finishes</h4>
                <p className="text-stone-500 mt-1">Our leather retains its natural pores, self-healing minor scuffs with natural beeswax.</p>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100">Solid Milled Brass</h4>
                <p className="text-stone-500 mt-1">Champagne electroplated hardware that will never chip, crack, or peel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Principles Grid */}
      <section className="bg-stone-900 text-stone-100 py-16 sm:py-24 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
              Guiding Directives
            </span>
            <h2 className="text-3xl font-serif font-bold text-white">
              The Four Atelier Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-xl bg-stone-800/60 border border-stone-700/80 space-y-3">
              <Feather className="w-6 h-6 text-amber-400" />
              <h3 className="text-base font-serif font-bold text-white">1. Honest Provenance</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Full traceability for every hide, zipper, and thread spool. We partner strictly with audited Italian workshops.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-stone-800/60 border border-stone-700/80 space-y-3">
              <Award className="w-6 h-6 text-amber-400" />
              <h3 className="text-base font-serif font-bold text-white">2. Dual-Needle Saddle Stitch</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Stitched by hand using traditional saddle awls and waxed linen thread to guarantee unbreakable structural seams.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-stone-800/60 border border-stone-700/80 space-y-3">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
              <h3 className="text-base font-serif font-bold text-white">3. Lifetime Repair Promise</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                If a stitch loosens or a rivet yields during normal use, return it to our Scandicci workshop for complimentary restoration.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-stone-800/60 border border-stone-700/80 space-y-3">
              <Compass className="w-6 h-6 text-amber-400" />
              <h3 className="text-base font-serif font-bold text-white">4. Micro-Batch Releases</h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                We produce in numbered editions of 50 to 200 units to eliminate overproduction waste and preserve exclusivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Experience the Tactile Difference
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
          Explore our current seasonal drops or request a private bespoke consultation with our Florentine leather masters.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/shop"
            className="px-7 py-3.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-bold rounded-lg shadow hover:opacity-90 transition-opacity"
          >
            Explore The Catalog
          </Link>
          <Link
            to="/contact"
            className="px-7 py-3.5 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs uppercase tracking-wider font-semibold rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Contact Atelier Concierge
          </Link>
        </div>
      </section>
    </div>
  );
};

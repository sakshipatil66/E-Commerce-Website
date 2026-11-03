import React, { useState } from 'react';

export const Legal: React.FC<{ initialTab?: 'privacy' | 'terms' }> = ({ initialTab = 'privacy' }) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-6 text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-semibold">
          Governance & Compliance
        </span>
        <h1 className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Legal Charters & Policies
        </h1>
        <p className="text-xs text-stone-500 font-body">
          Last revised: October 2026 · Compliant with GDPR and international consumer protection standards.
        </p>
      </div>

      <div className="flex border-b border-stone-200 dark:border-stone-800 gap-8 justify-center">
        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-3 text-xs uppercase tracking-wider font-semibold transition-colors relative ${
            activeTab === 'privacy'
              ? 'text-stone-900 dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-600'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Privacy Policy
        </button>

        <button
          onClick={() => setActiveTab('terms')}
          className={`pb-3 text-xs uppercase tracking-wider font-semibold transition-colors relative ${
            activeTab === 'terms'
              ? 'text-stone-900 dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-600'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          Terms and Conditions
        </button>
      </div>

      {activeTab === 'privacy' ? (
        <div className="space-y-6 text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-body">
          <section className="space-y-2">
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
              1. Information Collection & Client Data
            </h2>
            <p>
              VÉLANE Atelier S.r.l. ("VÉLANE", "we", "our") collects personal details strictly necessary for order fulfillment, courier delivery, and authenticated client services. This includes your name, shipping destination, email address, telephone contact, and transaction logs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
              2. Data Protection & Payment Security
            </h2>
            <p>
              Payment credentials submitted via our portal are encrypted using 256-bit Secure Socket Layer (SSL) transmission. We never store raw credit card numbers or CVV codes on our servers; payments are tokenized directly with accredited payment gateways.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
              3. Courier Logistics Sharing
            </h2>
            <p>
              Your delivery coordinates and telephone number are shared solely with our integrated courier partners (DHL Express, FedEx Priority) to facilitate customs documentation and SMS delivery windows. We never sell, monetize, or rent client directories to third-party data brokers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
              4. Client Rights (GDPR & CCPA)
            </h2>
            <p>
              Under applicable European and international privacy statutes, you reserve the right to inspect, export, amend, or delete your client records. Inquiries can be lodged directly with our Data Protection Officer at privacy@velane-atelier.com.
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-6 text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-body">
          <section className="space-y-2">
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
              1. Commission Acceptance & Contract Formation
            </h2>
            <p>
              All orders placed on velane-atelier.com constitute a purchase commission. The contract is executed once our Scandicci workshop authorizes the payment transaction and transmits your unique waybill tracking reference.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
              2. Handcrafted Variations & Vegetable Tanning Characteristics
            </h2>
            <p>
              Because VÉLANE utilizes 100% full-grain vegetable-tanned Italian calfskin without artificial polymer stampings, natural grain variations, fat wrinkles, and subtle shade variances across dye lots are intrinsic hallmarks of authenticity, not defects.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
              3. 30-Day Examination & Return Conditions
            </h2>
            <p>
              Patrons may initiate a return within 30 calendar days of delivery provided the silhouette remains unblemished, unworn outside the home, and returned in the original debossed gift box with all silk dust covers intact. Bespoke monogrammed items are non-returnable unless defective in stitching.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
              4. Lifetime Craft Warranty
            </h2>
            <p>
              VÉLANE warrants all structural saddle stitching and solid brass hardware mechanisms against failure for the lifespan of the original purchaser. This warranty excludes normal surface patina, cosmetic scuffs, or chemical spills.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};

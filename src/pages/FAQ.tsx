import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs: FAQItem[] = [
    {
      category: 'care',
      question: 'How should I care for vegetable-tanned Tuscan leather?',
      answer: 'Our full-grain leather is finished with natural botanical oils rather than artificial synthetic varnishes. We recommend buffing the surface lightly every two to three months with a dry microfiber cloth and applying an organic beeswax-based leather cream. Avoid direct prolonged exposure to extreme heat radiators or alcohol-based solvents.'
    },
    {
      category: 'care',
      question: 'Will water droplets stain or damage my bag?',
      answer: 'Because the grain is porous and unsealed with plastic, rain droplets will temporarily darken the surface. Simply dab gently with a clean dry cotton cloth and allow the leather to dry naturally at room temperature. As the leather dries, the tannins redistribute and the mark becomes part of the piece’s unique living patina.'
    },
    {
      category: 'shipping',
      question: 'How does international shipping work and are duties covered?',
      answer: 'We dispatch all international shipments via DHL Express or FedEx Priority Air. For deliveries to the United States, United Kingdom, European Union, and Canada, all import duties and customs clearances are prepaid and inclusive in the final checkout total — no unexpected surprise fees upon courier arrival.'
    },
    {
      category: 'shipping',
      question: 'What is the complimentary shipping threshold?',
      answer: 'All orders with an item subtotal of $300 or greater qualify for complimentary priority international courier delivery. For orders under $300, a flat $25 express shipping fee applies.'
    },
    {
      category: 'returns',
      question: 'What is your 30-day home examination policy?',
      answer: 'We believe you must experience the tactile balance and weight of our silhouettes in person. You may examine your piece in your home for 30 calendar days from delivery. If it does not fulfill your expectations, contact our concierge to receive a complimentary prepaid return shipping label.'
    },
    {
      category: 'repairs',
      question: 'What is covered under the VÉLANE Lifetime Craft Guarantee?',
      answer: 'Every seam stitched with our double-waxed linen thread, every turn-lock closure, and all solid brass rivets are covered against manufacturing defects for the life of the product. If hardware loosens or stitching requires refreshing, our Scandicci artisans will restore it free of charge.'
    },
    {
      category: 'bespoke',
      question: 'Can I request bespoke hot-stamp monogramming?',
      answer: 'Yes. We offer blind debossing and 24k gold leaf hot-stamping for up to three initials on clochette key tags or inner pocket folios. Select "Bespoke Monogramming" during checkout or contact the concierge immediately after placing your commission.'
    }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-8 text-center space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-semibold">
          Client Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
          Frequently Answered Inquiries
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-body">
          Guidelines on leather preservation, delivery protocols, and our lifetime workshop commitment.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Topics' },
          { id: 'care', label: 'Leather Care & Patina' },
          { id: 'shipping', label: 'Courier & Customs' },
          { id: 'returns', label: '30-Day Returns' },
          { id: 'repairs', label: 'Warranty & Repairs' },
          { id: 'bespoke', label: 'Bespoke Monogramming' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeCategory === cat.id
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-950 font-semibold shadow-sm'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden bg-white dark:bg-stone-900 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition-colors hover:bg-stone-50/50 dark:hover:bg-stone-800/40"
              >
                <span className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-amber-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-6 sm:px-6 pt-0 text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-body border-t border-stone-100 dark:border-stone-800/60 pt-4 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

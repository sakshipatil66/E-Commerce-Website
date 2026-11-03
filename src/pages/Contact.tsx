import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Order & Delivery Inquiry');
  const [orderRef, setOrderRef] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setSubmitted(true);
    showToast('Inquiry transmitted to the Atelier Concierge. We respond within 12 hours.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="border-b border-stone-200 dark:border-stone-800 pb-8 text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 font-semibold">
          Client Services
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100">
          The Atelier Concierge
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-body">
          Whether inquiring about a personalized leather commission, requesting a restoration consult, or checking order logistics, our concierge team is at your disposal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white dark:bg-stone-900 p-6 sm:p-10 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
                Inquiry Received
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Thank you, {name}. A dedicated client advisor from our Scandicci workshop has received your message and will follow up via {email}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold uppercase tracking-wider rounded-lg"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-2">
                Send an Inquiry
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Vance"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="julian@domain.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Inquiry Topic</label>
                  <select
                    value={topic}
                    onChange={e => setTopic(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                  >
                    <option value="Order & Delivery Inquiry">Order & Delivery Inquiry</option>
                    <option value="Bespoke Monogramming">Bespoke Monogramming</option>
                    <option value="Leather Care & Lifetime Guarantee">Leather Care & Lifetime Guarantee</option>
                    <option value="Press & Editorial Inquiries">Press & Editorial Inquiries</option>
                    <option value="Wholesale & Boutique Partners">Wholesale & Boutique Partners</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Order Reference (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. ORD-8492"
                    value={orderRef}
                    onChange={e => setOrderRef(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs font-mono rounded-lg outline-none uppercase"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How may our concierge assist your commission?"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 text-xs uppercase tracking-wider font-bold rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 pt-3"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Studio Coordinates & Hours */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-stone-50 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Florentine Master Workshop
            </h3>
            <div className="space-y-3 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">VÉLANE Atelier S.r.l.</p>
                  <p>Via de' Tornabuoni, 14, 50123 Firenze FI, Italy</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <span>concierge@velane-atelier.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <span>+39 055 214 8920 (Mon-Fri 09:00 - 18:00 CET)</span>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-stone-200 dark:border-stone-700">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">Studio Hours</p>
                  <p>Monday – Friday: 09:00 – 18:00 CET</p>
                  <p>Saturday: By Private Appointment Only</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-stone-50 dark:bg-stone-900/60 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-3">
            <h3 className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              New York Client Showroom
            </h3>
            <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <p>432 Crosby Street, 4th Floor, SoHo, New York, NY 10012</p>
              <p>Direct: +1 (212) 555-0194</p>
              <p className="text-[11px] text-stone-500">Walk-ins welcomed for leather tactile swatches and sizing fittings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

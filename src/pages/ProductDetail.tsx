import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Heart,
  ShoppingBag,
  Check,
  ChevronRight,
  Share2,
  CheckCircle2,
  MessageSquarePlus,
  Layers,
  Ruler
} from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    getProductBySlug,
    getProductById,
    products,
    addToCart,
    openCart,
    toggleWishlist,
    isInWishlist,
    reviews,
    addReview,
    showToast
  } = useStore();

  const product = getProductById(id || '') || getProductBySlug(id || '');

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'dimensions' | 'shipping' | 'reviews'>('details');

  // Review Form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">Piece Not Found</h2>
        <p className="text-sm text-stone-500">The silhouette you are seeking may have been archived or retired from the atelier catalog.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-semibold rounded-lg"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const selectedVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const isWishlisted = isInWishlist(product.id);
  const productReviews = reviews.filter(r => r.productId === product.id);
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.collection === product.collection))
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    openCart();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link to product copied to clipboard.');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    addReview({
      productId: product.id,
      userName: reviewerName.trim(),
      rating,
      title: reviewTitle.trim() || 'Verified Client Experience',
      comment: reviewComment.trim(),
      verifiedPurchase: true
    });

    setReviewerName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 font-sans">
        <Link to="/" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">Atelier</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link to="/shop" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">Catalog</Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <Link to={`/shop?category=${product.category}`} className="capitalize hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-900 dark:text-stone-100 font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Contiguous PDP Grid (Sticky Gallery Left, Contiguous Module Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left: Gallery (65%-75% visual weight) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 shadow-sm">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            {product.isBestSeller && (
              <span className="absolute top-4 left-4 bg-amber-600 text-white text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded shadow">
                Permanent Classic
              </span>
            )}
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 p-2.5 bg-white/90 dark:bg-stone-900/90 rounded-full shadow-md text-stone-700 dark:text-stone-300 hover:text-stone-950 transition-colors backdrop-blur"
              aria-label="Share product"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIdx === idx
                      ? 'border-amber-600 scale-105 shadow-md'
                      : 'border-stone-200 dark:border-stone-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Angle thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-medium">
              <span>{product.collection.replace('-', ' ')}</span>
              <span>·</span>
              <span>{product.madeIn}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              {product.tagline}
            </p>

            {/* Rating summary */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
                {product.rating}
              </span>
              <span className="text-xs text-stone-400">
                · {productReviews.length} Verified Client Reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-base text-stone-400 line-through font-mono">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xs text-emerald-600 font-medium ml-1">
                Tax calculated at checkout
              </span>
            </div>
          </div>

          {/* Leather Tone Variant Selector */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-stone-500 uppercase tracking-wider font-medium">Leather Colorway</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                {selectedVariant.name}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.variants.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariantIdx(idx)}
                  className={`group relative w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedVariantIdx === idx
                      ? 'border-stone-900 dark:border-white scale-110 shadow-md ring-2 ring-amber-500/40'
                      : 'border-transparent opacity-85 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: v.colorHex }}
                  title={v.colorName}
                >
                  {selectedVariantIdx === idx && (
                    <Check className="w-4 h-4 text-white drop-shadow" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500">
              Stock availability: <span className="font-medium text-stone-800 dark:text-stone-200">{selectedVariant.stockCount} editions remaining in this dye lot</span>
            </p>
          </div>

          {/* Quantity Stepper & Main CTA */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg p-1 bg-stone-50 dark:bg-stone-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900 transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-mono font-bold tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900 transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 text-xs uppercase tracking-widest font-bold rounded-lg shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag · ${(product.price * quantity)}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-lg border transition-colors ${
                  isWishlisted
                    ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-rose-600'
                }`}
                aria-label="Save to wishlist"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Value Trust Strips */}
            <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800 space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Complimentary DHL Express courier delivery worldwide</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                <span>30-Day home examination with prepaid return shipping</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Lifetime atelier repair warranty on all seams and hardware</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Product Dossier: Craftsmanship, Dimensions, Shipping, Reviews */}
      <div className="border-t border-stone-200 dark:border-stone-800 pt-10">
        <div className="flex border-b border-stone-200 dark:border-stone-800 gap-8 overflow-x-auto scrollbar-none">
          {[
            { id: 'details', label: 'Craftsmanship & Description' },
            { id: 'dimensions', label: 'Dimensions & Specifications' },
            { id: 'shipping', label: 'Shipping & Complimentary Returns' },
            { id: 'reviews', label: `Client Reviews (${productReviews.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs uppercase tracking-wider font-semibold transition-colors whitespace-nowrap relative ${
                activeTab === tab.id
                  ? 'text-stone-900 dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-amber-600'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8">
          {/* Tab 1: Craftsmanship */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-body">
              <div className="space-y-4">
                <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                  The Philosophy of the Silhouette
                </h3>
                <p>{product.description}</p>
                <p>
                  Every skin is steeped in wooden tanning drums for up to forty days using natural extracts derived from Tuscan mimosa and chestnut barks. This time-honored artisanal method preserves the authentic grain structure and results in a piece that develops a rich, luminous patina over years of use.
                </p>
              </div>
              <div className="space-y-3 bg-stone-50 dark:bg-stone-800/40 p-6 rounded-xl border border-stone-200/80 dark:border-stone-800">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100">
                  Atelier Specifications
                </h4>
                <div className="space-y-2 text-xs">
                  <p><strong>Primary Leather:</strong> {product.material}</p>
                  <p><strong>Hardware Finish:</strong> {product.hardware}</p>
                  <p><strong>Origin Workshop:</strong> {product.madeIn}</p>
                  <p><strong>Stitch Technique:</strong> Traditional dual-needle saddle seam using waxed linen thread.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Dimensions */}
          {activeTab === 'dimensions' && (
            <div className="max-w-2xl space-y-4 text-xs text-stone-600 dark:text-stone-300">
              <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                Measurement Specifications
              </h3>
              <div className="divide-y divide-stone-200 dark:divide-stone-800 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                <div className="flex justify-between p-3.5 bg-white dark:bg-stone-900">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Outer Dimensions</span>
                  <span className="font-mono tabular-nums">{product.dimensions}</span>
                </div>
                <div className="flex justify-between p-3.5 bg-stone-50 dark:bg-stone-800/40">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Unladen Weight</span>
                  <span className="font-mono tabular-nums">{product.weight}</span>
                </div>
                <div className="flex justify-between p-3.5 bg-white dark:bg-stone-900">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Handle / Shoulder Drop</span>
                  <span className="font-mono tabular-nums">{product.strapDrop}</span>
                </div>
                <div className="flex justify-between p-3.5 bg-stone-50 dark:bg-stone-800/40">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">Interior Compartments</span>
                  <span>Dedicated padded laptop folio + zippered security slot</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Shipping & Returns */}
          {activeTab === 'shipping' && (
            <div className="max-w-3xl space-y-4 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
              <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                White-Glove Delivery & Guarantee
              </h3>
              <p>
                All orders are dispatched directly from our regional fulfillment centers in Milan and New York. Your leather goods arrive encased in organic cotton dust bags and housed within our signature embossed gift boxes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">Express Courier Delivery</h4>
                  <p className="mt-1">Delivered via DHL Express or FedEx Air within 2–4 business days. Real-time GPS tracking provided upon departure.</p>
                </div>
                <div className="p-4 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40">
                  <h4 className="font-semibold text-stone-900 dark:text-stone-100">30-Day Evaluation</h4>
                  <p className="mt-1">If the silhouette does not meet your personal aesthetic standards, return it in original condition for a full refund or exchange.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900 dark:text-stone-100">
                    Verified Client Evaluations
                  </h3>
                  <p className="text-xs text-stone-500">
                    Based on {productReviews.length} authenticated deliveries. Average rating: {product.rating} / 5.0
                  </p>
                </div>

                <button
                  onClick={() => setShowReviewForm(prev => !prev)}
                  className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs uppercase tracking-wider font-semibold rounded-lg flex items-center gap-2 hover:opacity-90 self-start sm:self-auto"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>Write An Evaluation</span>
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleReviewSubmit}
                  className="p-6 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 rounded-xl space-y-4 max-w-xl animate-in fade-in duration-200"
                >
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                    Submit Your Client Experience
                  </h4>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Charlotte Dubois"
                      value={reviewerName}
                      onChange={e => setReviewerName(e.target.value)}
                      className="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Rating</label>
                    <div className="flex gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="p-1"
                        >
                          <Star className={`w-5 h-5 ${star <= rating ? 'fill-current' : 'text-stone-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Exceptional leather scent and immaculate seams"
                      value={reviewTitle}
                      onChange={e => setReviewTitle(e.target.value)}
                      className="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-stone-700 dark:text-stone-300">Comment</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe the tactile feel, brass weight, and daily functionality..."
                      value={reviewComment}
                      onChange={e => setReviewComment(e.target.value)}
                      className="w-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 px-3 py-2 text-xs rounded-lg outline-none"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-5 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold rounded-lg"
                    >
                      Publish Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 border border-stone-300 dark:border-stone-700 text-xs rounded-lg text-stone-600 dark:text-stone-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Review Cards List */}
              <div className="space-y-4">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-stone-500 italic">Be the first to review this new atelier release.</p>
                ) : (
                  productReviews.map(rev => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900/60 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-stone-900 dark:text-stone-100">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Verified Client</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-400 font-mono">{rev.date}</span>
                      </div>

                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-stone-300'}`} />
                        ))}
                      </div>

                      <h4 className="text-xs font-bold text-stone-800 dark:text-stone-200">{rev.title}</h4>
                      <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Complementary Silhouettes (Related Products) */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-stone-200 dark:border-stone-800 space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
                Pairing Suggestions
              </p>
              <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                Complementary Atelier Pieces
              </h2>
            </div>
            <Link to="/shop" className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100 hover:text-amber-600 transition-colors">
              Explore All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { X, ShoppingBag, Heart, Star, Check, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const navigate = useNavigate();
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    openCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const selectedVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    closeQuickView();
    openCart();
  };

  const handleGoToProduct = () => {
    closeQuickView();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white dark:bg-stone-900 rounded-2xl max-w-3xl w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 bg-white/80 dark:bg-stone-800/80 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery View */}
          <div className="bg-stone-100 dark:bg-stone-800/40 p-6 flex flex-col justify-between">
            <div className="aspect-square rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-center">
              <img
                src={product.images[selectedImageIdx] || product.images[0]}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 mt-4 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIdx === idx
                        ? 'border-amber-600 scale-105'
                        : 'border-stone-200 dark:border-stone-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Origin */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-medium">
                <span>{product.category}</span>
                <span>·</span>
                <span>{product.madeIn}</span>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mt-1">
                {product.name}
              </h2>

              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {product.tagline}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2.5 text-xs text-stone-600 dark:text-stone-300">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="font-semibold">{product.rating}</span>
                <span className="text-stone-400">({product.reviewCount} verified reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-serif font-bold font-mono tabular-nums text-stone-900 dark:text-stone-100">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono line-through text-stone-400">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-600 font-medium">In Stock · Ready to dispatch</span>
              </div>

              {/* Variant Selector */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-500">Selected Leather Tone:</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {selectedVariant.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.variants.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`relative w-7 h-7 rounded-full border-2 transition-transform ${
                        selectedVariantIdx === idx
                          ? 'border-stone-900 dark:border-white scale-110 shadow-md ring-2 ring-amber-500/50'
                          : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: v.colorHex }}
                      title={v.colorName}
                    >
                      {selectedVariantIdx === idx && (
                        <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Specs */}
              <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                <p><strong>Material:</strong> {product.material}</p>
                <p><strong>Dimensions:</strong> {product.dimensions}</p>
              </div>
            </div>

            {/* Quantity & CTA */}
            <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-200 dark:border-stone-700 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-semibold tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-stone-600 dark:text-stone-300 hover:text-stone-900"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 rounded-lg text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · ${(product.price * quantity)}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/40 text-rose-600'
                      : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-rose-600'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleGoToProduct}
                className="w-full text-center text-xs text-amber-700 dark:text-amber-400 hover:underline flex items-center justify-center gap-1 font-medium pt-1"
              >
                <span>View Full Product Story & Atelier Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

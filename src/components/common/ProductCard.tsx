import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showCategory = true }) => {
  const { toggleWishlist, isInWishlist, addToCart, openQuickView } = useStore();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const selectedVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const isWishlisted = isInWishlist(product.id);

  // If product has a second image, show on hover
  const displayImage = isHovered && product.images[1] ? product.images[1] : product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVariant, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white dark:bg-stone-900/60 rounded-xl border border-stone-200/80 dark:border-stone-800/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Frame */}
      <Link to={`/product/${product.id}`} className="relative aspect-[4/3] sm:aspect-square bg-stone-100 dark:bg-stone-800/50 overflow-hidden block">
        <img
          src={displayImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quiet, Single Tag (if new or bestseller, NO pill sandwiches) */}
        {product.isNewArrival && (
          <span className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 text-[10px] uppercase font-semibold tracking-wider px-2 py-1 rounded">
            New Edition
          </span>
        )}
        {!product.isNewArrival && product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-amber-600/90 text-white text-[10px] uppercase font-semibold tracking-wider px-2 py-1 rounded">
            Atelier Classic
          </span>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleWishlistClick}
            className={`p-2 rounded-full shadow-md backdrop-blur-md transition-colors ${
              isWishlisted
                ? 'bg-rose-600 text-white'
                : 'bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:text-rose-600'
            }`}
            aria-label="Save to wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleQuickViewClick}
            className="p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:text-amber-600 shadow-md backdrop-blur-md transition-colors"
            aria-label="Quick preview"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Add Button Bar on Desktop Hover */}
        <div className="hidden sm:block absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-stone-950/70 via-stone-950/30 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 bg-white text-stone-950 hover:bg-stone-100 text-xs font-semibold uppercase tracking-wider rounded shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Bag</span>
          </button>
        </div>
      </Link>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata line without pill boxes */}
          {showCategory && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-stone-500 dark:text-stone-400">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.madeIn}</span>
            </div>
          )}

          <Link to={`/product/${product.id}`} className="block mt-1">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Color variants & Price row */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          {/* Swatches */}
          <div className="flex items-center gap-1.5" onClick={e => e.stopPropagation()}>
            {product.variants.map((variant, idx) => (
              <button
                key={variant.id}
                onClick={e => {
                  e.preventDefault();
                  setSelectedVariantIdx(idx);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedVariantIdx === idx
                    ? 'ring-2 ring-stone-900 dark:ring-stone-100 ring-offset-1 scale-110'
                    : 'border-stone-300 dark:border-stone-700 opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: variant.colorHex }}
                title={variant.colorName}
                aria-label={`Select ${variant.colorName}`}
              />
            ))}
          </div>

          {/* Price with tabular numerals */}
          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-sm font-semibold font-mono tabular-nums text-stone-900 dark:text-stone-100">
              ${product.price}
            </span>
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="sm:hidden pt-1">
          <button
            onClick={handleQuickAdd}
            className="w-full py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
};

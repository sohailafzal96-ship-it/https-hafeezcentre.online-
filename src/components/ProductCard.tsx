import React from 'react';
import {
  Heart,
  Scale,
  ShoppingCart,
  MessageCircle,
  Star,
  CheckCircle,
  Shield,
  Layers,
} from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const {
    addToCart,
    toggleWishlist,
    toggleCompare,
    wishlist,
    compareList,
    formatPKR,
    getWhatsAppOrderUrl,
    setSelectedProduct,
    setCurrentView,
    addRecentlyViewed,
    dealerMode,
    language,
  } = useApp();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const isUrdu = language === 'ur';

  const handleCardClick = () => {
    setSelectedProduct(product);
    addRecentlyViewed(product.id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getConditionBadge = () => {
    switch (product.condition) {
      case 'New':
        return {
          bg: 'bg-emerald-600 text-white',
          label: isUrdu ? 'برانڈ نیو' : 'Brand New Boxed',
        };
      case 'Refurbished':
        return {
          bg: 'bg-purple-700 text-white',
          label: isUrdu ? 'ریفربشڈ امپورٹ' : 'Certified Refurbished',
        };
      case 'Used':
      default:
        return {
          bg: 'bg-blue-800 text-white',
          label: isUrdu ? 'یوزڈ امپورٹڈ A+' : 'Used Grade A+',
        };
    }
  };

  const conditionInfo = getConditionBadge();

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition p-4 flex flex-col md:flex-row gap-4 items-start relative group">
        {/* Thumbnail Image */}
        <div
          onClick={handleCardClick}
          className="w-full md:w-56 h-48 bg-slate-100 rounded-lg overflow-hidden relative shrink-0 cursor-pointer"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            loading="lazy"
          />
          <span
            className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${conditionInfo.bg}`}
          >
            {conditionInfo.label}
          </span>
        </div>

        {/* Info Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wide">
              {product.brand}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] text-slate-500 font-mono">SKU: {product.sku}</span>
            <div className="flex items-center gap-1 text-amber-500 text-xs ml-auto">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-[11px] text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={handleCardClick}
            className="text-base font-bold text-slate-900 hover:text-blue-700 transition cursor-pointer line-clamp-2"
          >
            {isUrdu ? product.titleUrdu : product.title}
          </h3>

          {/* Quick Specs Pill Row */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {product.specs.processor && (
              <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {product.specs.processor.split('(')[0]}
              </span>
            )}
            {product.specs.ram && (
              <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {product.specs.ram.split('(')[0]}
              </span>
            )}
            {product.specs.storage && (
              <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {product.specs.storage.split('(')[0]}
              </span>
            )}
            {product.specs.display && (
              <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {product.specs.display.split('(')[0]}
              </span>
            )}
          </div>

          <div className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span className="truncate">{product.warranty.type}</span>
          </div>
        </div>

        {/* Pricing & Actions Column */}
        <div className="w-full md:w-56 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
          <div>
            <div className="text-xl font-extrabold text-blue-900">
              {formatPKR(dealerMode ? product.wholesalePrice : product.price)}
            </div>
            {product.originalPrice && !dealerMode && (
              <div className="text-xs text-slate-400 line-through">
                {formatPKR(product.originalPrice)}
              </div>
            )}
            {dealerMode && (
              <div className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded inline-block mt-1">
                Wholesale MOQ: {product.wholesaleMinQty} units
              </div>
            )}
            <div className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>In Stock at Hafeez Centre</span>
            </div>
          </div>

          <div className="space-y-1.5 mt-3">
            <button
              onClick={() => addToCart(product, dealerMode ? product.wholesaleMinQty : 1, dealerMode)}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'کارٹ میں شامل کریں' : 'Add to Cart'}</span>
            </button>
            <a
              href={getWhatsAppOrderUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition text-center"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'واٹس ایپ پر آرڈر' : 'Order via WhatsApp'}</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Standard Grid Card
  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group relative">
      {/* Top action icons (Wishlist & Compare) */}
      <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-1.5 rounded-full backdrop-blur-xs transition shadow-xs ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
          }`}
          title="Save to Wishlist"
        >
          <Heart className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(product.id);
          }}
          className={`p-1.5 rounded-full backdrop-blur-xs transition shadow-xs ${
            isCompared
              ? 'bg-blue-700 text-white'
              : 'bg-white/90 text-slate-600 hover:text-blue-700 hover:bg-white'
          }`}
          title="Compare specs"
        >
          <Scale className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Image Container with Badges */}
      <div
        onClick={handleCardClick}
        className="w-full h-44 sm:h-48 bg-slate-100 overflow-hidden relative cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Condition Badge */}
        <span
          className={`absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs ${conditionInfo.bg}`}
        >
          {conditionInfo.label}
        </span>

        {/* Discount Badge */}
        {product.discountPercent && !dealerMode && (
          <span className="absolute bottom-2 left-2 text-[10px] font-black bg-rose-600 text-white px-2 py-0.5 rounded shadow-xs">
            -{product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Body content */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-extrabold text-blue-800 uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800 text-xs">{product.rating}</span>
              <span className="text-[10px] text-slate-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={handleCardClick}
            className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-800 transition line-clamp-2 cursor-pointer leading-snug"
          >
            {isUrdu ? product.titleUrdu : product.title}
          </h3>

          {/* Quick Specs Chips */}
          <div className="flex flex-wrap gap-1 mt-2.5">
            {product.specs.processor && (
              <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium truncate max-w-[140px]">
                {product.specs.processor.split('(')[0]}
              </span>
            )}
            {product.specs.ram && (
              <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                {product.specs.ram.split('(')[0]}
              </span>
            )}
            {product.specs.storage && (
              <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium">
                {product.specs.storage.split('(')[0]}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Call to Actions */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-base sm:text-lg font-black text-slate-900">
                {formatPKR(dealerMode ? product.wholesalePrice : product.price)}
              </div>
              {product.originalPrice && !dealerMode && (
                <div className="text-[11px] text-slate-400 line-through">
                  {formatPKR(product.originalPrice)}
                </div>
              )}
            </div>
            {dealerMode ? (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                MOQ: {product.wholesaleMinQty}
              </span>
            ) : (
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                Lahore Stock
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-1.5 mt-2.5">
            <button
              onClick={() => addToCart(product, dealerMode ? product.wholesaleMinQty : 1, dealerMode)}
              className="bg-slate-900 hover:bg-blue-900 text-white font-bold py-2 px-2 rounded-lg text-xs flex items-center justify-center gap-1 transition shadow-xs"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Cart</span>
            </button>
            <a
              href={getWhatsAppOrderUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-2 rounded-lg text-xs flex items-center justify-center gap-1 transition text-center"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

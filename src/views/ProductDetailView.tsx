import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Truck,
  MapPin,
  MessageCircle,
  ShoppingCart,
  Scale,
  Heart,
  ChevronLeft,
  CheckCircle2,
  Clock,
  Building2,
  AlertCircle,
  Share2,
  User,
  ThumbsUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOP_INFO, MOCK_REVIEWS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    products,
    setCurrentView,
    addToCart,
    toggleWishlist,
    toggleCompare,
    wishlist,
    compareList,
    formatPKR,
    getWhatsAppOrderUrl,
    addReview,
    reviews,
    showNotification,
    dealerMode,
    language,
  } = useApp();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">No product selected</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="mt-4 bg-blue-800 text-white px-4 py-2 rounded-lg text-xs font-bold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(dealerMode ? selectedProduct.wholesaleMinQty : 1);
  const [activeTab, setActiveTab] = useState<'specs' | 'warranty' | 'reviews' | 'wholesale'>('specs');

  // Review submission state
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const isUrdu = language === 'ur';
  const isWishlisted = wishlist.includes(selectedProduct.id);
  const isCompared = compareList.includes(selectedProduct.id);

  const productReviews = reviews.filter((r) => r.productId === selectedProduct.id);

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === selectedProduct.category && p.id !== selectedProduct.id)
    .slice(0, 4);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;
    addReview({
      productId: selectedProduct.id,
      author: reviewName,
      city: reviewCity || 'Pakistan',
      rating: reviewRating,
      comment: reviewComment,
      verifiedPurchase: true,
    });
    setReviewName('');
    setReviewCity('');
    setReviewComment('');
  };

  const getConditionColor = () => {
    if (selectedProduct.condition === 'New') return 'bg-emerald-600 text-white';
    if (selectedProduct.condition === 'Refurbished') return 'bg-purple-700 text-white';
    return 'bg-blue-800 text-white';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-1 hover:text-blue-700 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-slate-400">SKU: {selectedProduct.sku}</span>
          <span className="text-slate-300">•</span>
          <span className="text-blue-700 font-bold uppercase">{selectedProduct.brand}</span>
        </div>
      </div>

      {/* Main Top Section: Images Gallery + Product Buy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Main Large Image */}
          <div className="w-full h-80 sm:h-96 rounded-2xl bg-white border border-slate-200 overflow-hidden relative shadow-xs flex items-center justify-center p-2">
            <img
              src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
              alt={selectedProduct.title}
              className="w-full h-full object-contain"
            />
            {/* Condition badge */}
            <span
              className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-md shadow-xs ${getConditionColor()}`}
            >
              {selectedProduct.condition} ({selectedProduct.grade || 'Tested'})
            </span>

            {/* Quick Action floating buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5">
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`p-2 rounded-full shadow-md backdrop-blur-xs transition ${
                  isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/90 text-slate-600 hover:text-rose-500'
                }`}
                title="Save to Wishlist"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleCompare(selectedProduct.id)}
                className={`p-2 rounded-full shadow-md backdrop-blur-xs transition ${
                  isCompared ? 'bg-blue-700 text-white' : 'bg-white/90 text-slate-600 hover:text-blue-700'
                }`}
                title="Compare"
              >
                <Scale className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {selectedProduct.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 bg-white shrink-0 transition ${
                    activeImageIndex === idx ? 'border-blue-700 shadow-xs' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Live Shop Verification Notice */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Available for Physical Testing:</span>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Visit our testing bench at Shop #3-A, 4th Floor, Hafeez Centre. Run battery tests, SSD diagnostics, and physical checks.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Specs, Pricing & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          {/* Header Title & Rating */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-black uppercase text-blue-800 tracking-wider">
                {selectedProduct.brand}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-mono text-slate-500">Model: {selectedProduct.sku}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {isUrdu ? selectedProduct.titleUrdu : selectedProduct.title}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(selectedProduct.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-slate-800">{selectedProduct.rating} / 5.0</span>
              <span className="text-slate-400">({selectedProduct.reviewCount} customer reviews)</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <span className="text-xs text-slate-500 font-medium block">
                {dealerMode ? 'Wholesale Dealer Price' : 'Special Retail Price (PKR)'}
              </span>
              <div className="text-2xl sm:text-3xl font-black text-blue-900">
                {formatPKR(dealerMode ? selectedProduct.wholesalePrice : selectedProduct.price)}
              </div>
              {selectedProduct.originalPrice && !dealerMode && (
                <div className="flex items-center gap-2 text-xs mt-0.5">
                  <span className="text-slate-400 line-through">
                    {formatPKR(selectedProduct.originalPrice)}
                  </span>
                  <span className="text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                    Save {selectedProduct.discountPercent}%
                  </span>
                </div>
              )}
            </div>

            {/* Bulk / Wholesale Tier Badge */}
            <div className="text-right">
              <span className="text-xs font-bold text-slate-700 block">Wholesale Rate:</span>
              <span className="text-sm font-extrabold text-amber-600">
                {formatPKR(selectedProduct.wholesalePrice)}
              </span>
              <span className="text-[11px] text-slate-500 block">
                (MOQ: {selectedProduct.wholesaleMinQty} units)
              </span>
            </div>
          </div>

          {/* Stock & Delivery Info */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
              <div className="font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Stock Status</span>
              </div>
              <div className="text-[11px] text-emerald-700 mt-1">
                {selectedProduct.stockCount} units available in Lahore
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
              <div className="font-bold flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-700" />
                <span>Pakistan Delivery</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">
                Lahore: Same day • Other cities: 24-48 hrs
              </div>
            </div>
          </div>

          {/* Key Spec Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs pt-1">
            {selectedProduct.specs.processor && (
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Processor</span>
                <span className="font-bold text-slate-800 truncate block">
                  {selectedProduct.specs.processor.split('(')[0]}
                </span>
              </div>
            )}
            {selectedProduct.specs.ram && (
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
                <span className="text-[10px] text-slate-400 block">RAM</span>
                <span className="font-bold text-slate-800 truncate block">
                  {selectedProduct.specs.ram.split('(')[0]}
                </span>
              </div>
            )}
            {selectedProduct.specs.storage && (
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Storage</span>
                <span className="font-bold text-slate-800 truncate block">
                  {selectedProduct.specs.storage.split('(')[0]}
                </span>
              </div>
            )}
            {selectedProduct.specs.display && (
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Display</span>
                <span className="font-bold text-slate-800 truncate block">
                  {selectedProduct.specs.display.split('(')[0]}
                </span>
              </div>
            )}
            {selectedProduct.specs.graphics && (
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Graphics</span>
                <span className="font-bold text-slate-800 truncate block">
                  {selectedProduct.specs.graphics.split('(')[0]}
                </span>
              </div>
            )}
            {selectedProduct.specs.battery && (
              <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
                <span className="text-[10px] text-slate-400 block">Battery Backup</span>
                <span className="font-bold text-slate-800 truncate block">
                  {selectedProduct.specs.battery.split('(')[0]}
                </span>
              </div>
            )}
          </div>

          {/* Quantity Selector + Call to Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-slate-900 font-mono">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                >
                  +
                </button>
              </div>

              {quantity >= selectedProduct.wholesaleMinQty && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                  Wholesale Tier Active!
                </span>
              )}
            </div>

            {/* Main Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* WhatsApp Direct Order Button */}
              <a
                href={getWhatsAppOrderUrl(
                  selectedProduct,
                  `I want to order ${quantity} units at Hafeez Centre.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-emerald-700/20"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>{isUrdu ? 'واٹس ایپ پر فوری آرڈر' : 'Order via WhatsApp'}</span>
              </a>

              {/* Add to Cart Button */}
              <button
                onClick={() =>
                  addToCart(
                    selectedProduct,
                    quantity,
                    quantity >= selectedProduct.wholesaleMinQty || dealerMode
                  )
                }
                className="bg-slate-900 hover:bg-blue-900 text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{isUrdu ? 'کارٹ میں شامل کریں' : 'Add to Cart'}</span>
              </button>
            </div>
          </div>

          {/* Warranty & Shop Guarantee Footer Bar */}
          <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{selectedProduct.warranty.type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Free Delivery in Lahore on Orders &gt; Rs. 50k</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Tabs: Full Specifications, Warranty Policy, Wholesale Tiers, Customer Reviews */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-5 py-3.5 transition border-b-2 shrink-0 ${
              activeTab === 'specs'
                ? 'border-blue-700 text-blue-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('warranty')}
            className={`px-5 py-3.5 transition border-b-2 shrink-0 ${
              activeTab === 'warranty'
                ? 'border-blue-700 text-blue-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Warranty & Testing Policy
          </button>
          <button
            onClick={() => setActiveTab('wholesale')}
            className={`px-5 py-3.5 transition border-b-2 shrink-0 ${
              activeTab === 'wholesale'
                ? 'border-blue-700 text-blue-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Wholesale & Bulk Tiers
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-3.5 transition border-b-2 shrink-0 ${
              activeTab === 'reviews'
                ? 'border-blue-700 text-blue-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Customer Reviews ({productReviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {/* 1. Full Specs Table */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <h3 className="font-bold text-slate-900 text-base">Full Product Specifications</h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200 text-xs">
                {Object.entries(selectedProduct.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-1 sm:grid-cols-3 p-3 hover:bg-slate-50">
                    <span className="font-bold text-slate-700 capitalize sm:col-span-1">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-slate-900 sm:col-span-2">{val}</span>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="pt-4">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Key Highlights:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedProduct.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 2. Warranty & Testing Policy */}
          {activeTab === 'warranty' && (
            <div className="max-w-3xl space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-950">
                <h4 className="font-bold text-sm mb-1">{selectedProduct.warranty.type}</h4>
                <p>{selectedProduct.warranty.description}</p>
                {selectedProduct.warranty.urduDescription && (
                  <p className="mt-2 text-blue-900 font-urdu">{selectedProduct.warranty.urduDescription}</p>
                )}
              </div>

              <h4 className="font-bold text-slate-900 text-sm pt-2">Hafeez Centre Testing Standards:</h4>
              <ul className="space-y-2 list-disc pl-5">
                <li>Every used/refurbished unit undergoes a 14-point diagnostic test before handover or courier packing.</li>
                <li>Battery life is guaranteed as stated (80%+ original capacity).</li>
                <li>Instant exchange or repair at Shop #3-A (4th Floor), Hafeez Centre if any internal hardware error occurs within 30 days.</li>
                <li>Physical damage, water spillage, or broken display panels are not covered under warranty.</li>
              </ul>
            </div>
          )}

          {/* 3. Wholesale & Bulk Tiers */}
          {activeTab === 'wholesale' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Bulk & Dealer Volume Pricing</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Direct container wholesale rates for IT resellers, call centers, and schools.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-xs text-slate-500 font-bold uppercase">1 - 2 Units</div>
                  <div className="text-xl font-black text-slate-900 mt-1">
                    {formatPKR(selectedProduct.price)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Standard Retail Price</div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                  <div className="text-xs text-blue-800 font-bold uppercase">
                    {selectedProduct.wholesaleMinQty} - 9 Units
                  </div>
                  <div className="text-xl font-black text-blue-900 mt-1">
                    {formatPKR(selectedProduct.wholesalePrice)}
                  </div>
                  <div className="text-[11px] text-blue-700 mt-1">Wholesale Dealer Rate</div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                  <div className="text-xs text-amber-800 font-bold uppercase">10+ Units (Carton)</div>
                  <div className="text-xl font-black text-amber-900 mt-1">
                    {formatPKR(Math.round(selectedProduct.wholesalePrice * 0.96))}
                  </div>
                  <div className="text-[11px] text-amber-700 mt-1">Institutional / Container Rate</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm">Need a Formal NTN Quotation for your Organization?</h4>
                  <p className="text-xs text-slate-300">
                    We issue formal quotation and tax compliance invoices with direct delivery across Pakistan.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentView('wholesale')}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shrink-0 transition"
                >
                  Generate Official RFQ Slip
                </button>
              </div>
            </div>
          )}

          {/* 4. Customer Reviews Tab */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Customer Feedback</h3>
                  <p className="text-xs text-slate-500">
                    Verified purchase reviews from Hafeez Centre walk-ins and COD deliveries.
                  </p>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold text-xs">
                            {rev.author[0]}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900">{rev.author}</span>
                            <span className="text-slate-400 text-[11px] ml-2">({rev.city})</span>
                          </div>
                        </div>
                        <div className="flex items-center text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{rev.comment}</p>
                      <div className="mt-2 text-[10px] text-slate-400">Date: {rev.date}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">
                    No reviews submitted yet for this product. Be the first to share your experience!
                  </p>
                )}
              </div>

              {/* Write a review form */}
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 max-w-xl">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Write a Customer Review</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Asad Ali"
                        className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">City *</label>
                      <input
                        type="text"
                        required
                        value={reviewCity}
                        onChange={(e) => setReviewCity(e.target.value)}
                        placeholder="e.g. Lahore / Karachi"
                        className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="p-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value={5}>5 Stars - Excellent (Highly Recommend)</option>
                      <option value={4}>4 Stars - Good Condition</option>
                      <option value={3}>3 Stars - Average</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Your Review *</label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience regarding performance, battery health, and packaging..."
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-lg text-xs"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Similar Products in {selectedProduct.category.toUpperCase()}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

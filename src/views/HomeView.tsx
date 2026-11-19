import React, { useState, useEffect, useMemo } from 'react';
import {
  Laptop,
  ShieldCheck,
  Truck,
  Building2,
  Clock,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Percent,
  Search,
  MessageCircle,
  FileText,
  BadgeCheck,
  Cpu,
  Monitor,
  HardDrive,
  Wifi,
  Video,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOP_INFO, CATEGORIES, BLOG_POSTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { CategoryKey } from '../types';

export const HomeView: React.FC = () => {
  const {
    products,
    setCurrentView,
    setSelectedCategory,
    setSelectedProduct,
    setSelectedBlogPost,
    formatPKR,
    language,
    dealerMode,
    setDealerMode,
  } = useApp();

  const [laptopConditionFilter, setLaptopConditionFilter] = useState<'all' | 'Used' | 'New' | 'Refurbished'>('all');
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const isUrdu = language === 'ur';

  // Filter top selling laptops
  const laptopProducts = products.filter((p) => p.category === 'laptops');
  const filteredLaptops =
    laptopConditionFilter === 'all'
      ? laptopProducts
      : laptopProducts.filter((p) => p.condition === laptopConditionFilter);

  // Flash deals
  const dealProducts = products.filter((p) => p.isDeal);

  // Featured showcase slides (all in-stock products including newly added items)
  const featuredSlides = useMemo(() => {
    const inStock = products.filter((p) => p.stockCount > 0 && p.images && p.images.length > 0);
    return inStock.length > 0 ? inStock : products;
  }, [products]);

  useEffect(() => {
    if (featuredSlides.length <= 1 || isSliderPaused) return;
    const timer = window.setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredSlides.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [featuredSlides.length, isSliderPaused]);

  useEffect(() => {
    if (featuredIndex >= featuredSlides.length) {
      setFeaturedIndex(0);
    }
  }, [featuredIndex, featuredSlides.length]);

  const activeSlide = featuredSlides[featuredIndex] || products[0];
  const activeSlidePrice = activeSlide ? (dealerMode ? activeSlide.wholesalePrice : activeSlide.price) : 0;
  const activeSlideDiscount =
    activeSlide && activeSlide.originalPrice && activeSlide.originalPrice > activeSlidePrice
      ? Math.round(((activeSlide.originalPrice - activeSlidePrice) / activeSlide.originalPrice) * 100)
      : 0;
  const activeSlideSpecs = activeSlide
    ? Object.values(activeSlide.specs || {})
        .filter((v): v is string => Boolean(v && v.trim()))
        .slice(0, 4)
    : [];

  return (
    <div className="space-y-12 pb-16">
      {/* 1. Hero Section: High Impact Pakistani IT Hub Showcase */}
      <section className="relative bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-hidden py-12 md:py-16 px-4">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-700 text-blue-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Shop #3-A, 4th Floor, Hafeez Centre, Lahore</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Pakistan’s Trusted <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-sky-300 to-amber-300">
                IT Hardware & Laptop
              </span>{' '}
              Wholesale Marketplace
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              {isUrdu
                ? 'حفیظ سینٹر گلبرگ لاہور کی مستند دکان۔ کورائی 5 اور کورائی 7 لیپ ٹاپس، ڈیسک ٹاپ، ایس ایس ڈی اور سی سی ٹی وی ہول سیل نرخوں پر 30 دن کی تسلی بخش وارنٹی اور کیش آن ڈیلیوری کے ساتھ۔'
                : 'Direct importers of Grade A+ enterprise laptops, custom gaming PCs, networking, and storage. Serving retail buyers and bulk corporate dealers with genuine warranties and nationwide COD.'}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg border-y border-slate-800 py-3">
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-400">14,000+</div>
                <div className="text-[11px] text-slate-400 font-medium">Laptops Sold</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">30 Days</div>
                <div className="text-[11px] text-slate-400 font-medium">Checking Warranty</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-sky-400">All Pakistan</div>
                <div className="text-[11px] text-slate-400 font-medium">COD Delivery</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('laptops');
                  setCurrentView('shop');
                }}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg text-sm transition shadow-lg shadow-blue-900/50 flex items-center gap-2 group"
              >
                <span>Browse Laptops & PCs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setCurrentView('wholesale')}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-bold px-5 py-3 rounded-lg text-sm transition flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-amber-400" />
                <span>Wholesale & RFQ Portal</span>
              </button>
            </div>
          </div>

          {/* Right Column: Auto-Sliding Featured Hardware Showcase Card */}
          {activeSlide && (
            <div
              className="lg:col-span-5"
              onMouseEnter={() => setIsSliderPaused(true)}
              onMouseLeave={() => setIsSliderPaused(false)}
            >
              <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xs">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                    <span className="text-xs font-bold text-slate-200 truncate">
                      {activeSlide.isDeal ? 'Featured Hafeez Centre Deal' : 'Featured Hafeez Centre Product'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono text-slate-400">
                      {featuredIndex + 1}/{featuredSlides.length}
                    </span>
                    {activeSlideDiscount > 0 ? (
                      <span className="text-[11px] bg-rose-950 text-rose-300 font-bold px-2 py-0.5 rounded border border-rose-800">
                        Save {activeSlideDiscount}% Today
                      </span>
                    ) : (
                      <span className="text-[11px] bg-blue-950 text-blue-300 font-bold px-2 py-0.5 rounded border border-blue-800">
                        {activeSlide.condition}
                      </span>
                    )}
                  </div>
                </div>

                {/* Sliding Product Preview */}
                <div className="mt-4 space-y-4">
                  <div className="h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-950 relative group">
                    <img
                      key={activeSlide.id}
                      src={activeSlide.images[0]}
                      alt={activeSlide.title}
                      onClick={() => {
                        setSelectedProduct(activeSlide);
                        setCurrentView('product-detail');
                      }}
                      className="w-full h-full object-cover cursor-pointer transition-all duration-500 group-hover:scale-105"
                    />

                    {/* Prev / Next Slide Arrows */}
                    {featuredSlides.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setFeaturedIndex((prev) => (prev - 1 + featuredSlides.length) % featuredSlides.length)
                          }
                          aria-label="Previous featured product"
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white border border-slate-700 flex items-center justify-center transition opacity-85 hover:opacity-100"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setFeaturedIndex((prev) => (prev + 1) % featuredSlides.length)}
                          aria-label="Next featured product"
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/75 hover:bg-slate-950 text-white border border-slate-700 flex items-center justify-center transition opacity-85 hover:opacity-100"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    <div className="absolute bottom-2 left-2 bg-slate-950/80 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] font-bold text-emerald-400 border border-emerald-900/60">
                      {activeSlide.grade || `${activeSlide.brand} • ${activeSlide.condition}`}
                    </div>
                  </div>

                  <div>
                    <h3
                      onClick={() => {
                        setSelectedProduct(activeSlide);
                        setCurrentView('product-detail');
                      }}
                      className="text-base sm:text-lg font-bold text-white line-clamp-2 min-h-[3.25rem] cursor-pointer hover:text-sky-300 transition"
                    >
                      {activeSlide.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-2 text-[11px]">
                      {activeSlideSpecs.map((spec, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded max-w-[180px] truncate">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-xs text-slate-400">
                        {dealerMode ? 'Wholesale Dealer Price' : 'Hafeez Centre Price'}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <div className="text-xl sm:text-2xl font-black text-amber-400">
                          {formatPKR(activeSlidePrice)}
                        </div>
                        {activeSlide.originalPrice && activeSlide.originalPrice > activeSlidePrice && (
                          <span className="text-xs text-slate-500 line-through">
                            {formatPKR(activeSlide.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedProduct(activeSlide);
                        setCurrentView('product-detail');
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition shrink-0"
                    >
                      View Specs & Test
                    </button>
                  </div>

                  {/* Slide Indicator Dots */}
                  {featuredSlides.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      {featuredSlides.map((slide, idx) => (
                        <button
                          key={slide.id}
                          type="button"
                          onClick={() => setFeaturedIndex(idx)}
                          aria-label={`Show ${slide.title}`}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === featuredIndex ? 'w-5 bg-amber-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Trust Assurance Highlights (Pakistani Buyers Priorities) */}
      <section className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">Hafeez Centre Shop</div>
              <div className="text-[11px] text-slate-500">Live testing bench in Lahore</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">30 Days Checking</div>
              <div className="text-[11px] text-slate-500">Hardware replacement warranty</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">All Pakistan COD</div>
              <div className="text-[11px] text-slate-500">Pay when parcel arrives</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 sm:pt-0 sm:pl-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-xs sm:text-sm">Wholesale MOQ Tiers</div>
              <div className="text-[11px] text-slate-500">Official NTN sales tax bills</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Categories Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isUrdu ? 'تمام پروڈکٹ کیٹیگریز' : 'Explore IT Categories'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Everything in hardware from laptops to enterprise networking & security
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentView('shop');
            }}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            return (
              <div
                key={cat.key}
                onClick={() => {
                  setSelectedCategory(cat.key);
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition p-4 flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-800 flex items-center justify-center mb-2.5 transition duration-200">
                  <Laptop className="w-6 h-6" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-blue-700 transition">
                  {isUrdu ? cat.nameUrdu : cat.name}
                </h4>
                <span className="text-[10px] text-slate-400 mt-1">
                  {cat.subcategories.length} sub-types
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Top Selling Laptops with Condition Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 mb-1">
              <BadgeCheck className="w-4 h-4" />
              <span>Tested & Certified by Hafeez Centre Techs</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isUrdu ? 'سب سے زیادہ فروخت ہونے والے لیپ ٹاپس' : 'Top Selling Laptops in Lahore & Pakistan'}
            </h2>
          </div>

          {/* Condition Filter Pill Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setLaptopConditionFilter('all')}
              className={`px-3 py-1.5 rounded-md transition ${
                laptopConditionFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Laptops ({laptopProducts.length})
            </button>
            <button
              onClick={() => setLaptopConditionFilter('Used')}
              className={`px-3 py-1.5 rounded-md transition ${
                laptopConditionFilter === 'Used'
                  ? 'bg-blue-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Used Grade A+
            </button>
            <button
              onClick={() => setLaptopConditionFilter('Refurbished')}
              className={`px-3 py-1.5 rounded-md transition ${
                laptopConditionFilter === 'Refurbished'
                  ? 'bg-purple-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Refurbished
            </button>
            <button
              onClick={() => setLaptopConditionFilter('New')}
              className={`px-3 py-1.5 rounded-md transition ${
                laptopConditionFilter === 'New'
                  ? 'bg-emerald-700 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Brand New
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredLaptops.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Wholesale & Corporate Procurement Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-10 text-white border border-slate-800 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/70 border border-amber-800/80 px-2.5 py-1 rounded">
              B2B & Institutional Procurement
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Buying for an Office, Call Center, School, or Resale Shop?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Soft Impex Traders directly imports container lots of laptops and mini PCs. Get tiered wholesale
              discounts, formal quotation slips, commercial invoices, and custom hardware upgrades.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setCurrentView('wholesale')}
                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs sm:text-sm transition shadow-md flex items-center gap-1.5"
              >
                <Building2 className="w-4 h-4" />
                <span>Submit Wholesale RFQ</span>
              </button>
              <button
                onClick={() => setDealerMode(!dealerMode)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-4 py-2.5 rounded-lg text-xs sm:text-sm transition"
              >
                {dealerMode ? 'Wholesale Pricing Active' : 'Switch to Dealer Rate Mode'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Flash Deals of the Week with Countdown */}
      {dealProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-rose-200">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-600 text-white">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {isUrdu ? 'ہفتہ وار رعایت اور خصوصی آفرز' : 'Hafeez Centre Flash Deals'}
                </h2>
                <p className="text-xs text-rose-600 font-semibold">
                  Limited stock items at clearance price points
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('deals')}
              className="text-xs font-bold text-rose-700 hover:text-rose-900"
            >
              See All Deals →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {dealProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Hafeez Centre Shop Location & Floor Guide (Crucial for Trust) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Info */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded">
                <MapPin className="w-3.5 h-3.5" />
                <span>Physical Store Location</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Visit Us at Hafeez Centre, Gulberg III, Lahore
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We believe in 100% transparency. Unlike online-only sellers, Soft Impex Traders has two physical
                presence locations inside Hafeez Centre for testing, after-sales service, and pickup.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm text-blue-900">
                    Retail & Testing Counter:
                  </div>
                  <div className="text-xs text-slate-700 font-semibold mt-1">Shop #3-A, 4th Floor</div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Take the main elevator to 4th Floor; Shop #3-A is right by the front corridor.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm text-emerald-900">
                    Wholesale & Dispatch Hub:
                  </div>
                  <div className="text-xs text-slate-700 font-semibold mt-1">Shop #3-A, 4th Floor</div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Bulk carton lots, diagnostics bench, packing & commercial invoice counter.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={`https://wa.me/${SHOP_INFO.whatsapp}?text=${encodeURIComponent(
                    'Asalam-o-Alaikum Soft Impex Traders, I am visiting Hafeez Centre today. Please share exact shop pin and parking directions.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-1.5 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Get Live Directions on WhatsApp</span>
                </a>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-lg text-xs transition"
                >
                  View Floor Map & Contact Details
                </button>
              </div>
            </div>

            {/* Right Map Preview Graphic */}
            <div className="lg:col-span-5 bg-slate-900 rounded-xl overflow-hidden p-5 text-white border border-slate-800 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Hafeez Centre, Main Boulevard</span>
                  <span className="text-emerald-400">Open Now (11 AM - 10 PM)</span>
                </div>
                <div className="h-40 rounded-lg bg-slate-800 relative flex items-center justify-center overflow-hidden border border-slate-700">
                  {/* Styled Map Graphic */}
                  <div className="text-center p-4">
                    <MapPin className="w-10 h-10 text-rose-500 mx-auto animate-bounce" />
                    <div className="font-extrabold text-sm text-white mt-1">Hafeez Centre IT Plaza</div>
                    <div className="text-[11px] text-slate-400">Gulberg III, Lahore, Pakistan</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300 space-y-1">
                <div>🚗 <strong>Parking:</strong> Hafeez Centre underground parking or Main Boulevard service lane.</div>
                <div>🚆 <strong>Metro Bus:</strong> Gulberg / Siddiq Trade Center station is 400m away.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Blog / Buying Guides for SEO */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isUrdu ? 'آئی ٹی خریدنے کی مکمل گائیڈز' : 'Tech Guides & IT Market News'}
            </h2>
            <p className="text-xs text-slate-500">
              Expert advice on selecting laptops, SSDs, and avoiding traps in the used market
            </p>
          </div>
          <button
            onClick={() => setCurrentView('blog')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900"
          >
            Read All Guides →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => {
                setSelectedBlogPost(post);
                setCurrentView('blog');
              }}
              className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 overflow-hidden shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 text-[11px] text-blue-700 font-bold mb-1.5">
                    <span>{post.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 font-normal">{post.readTime}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-800 transition line-clamp-2">
                    {isUrdu ? post.titleUrdu : post.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              <div className="p-4 pt-0 text-xs font-bold text-blue-700 flex items-center gap-1">
                <span>Read Full Article</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

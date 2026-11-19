import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  Scale,
  Phone,
  MapPin,
  Clock,
  Menu,
  X,
  Laptop,
  Layers,
  Sparkles,
  ShieldCheck,
  Building2,
  FileText,
  SlidersHorizontal,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOP_INFO, CATEGORIES } from '../data/mockData';
import { CategoryKey } from '../types';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartCount,
    wishlist,
    compareList,
    dealerMode,
    setDealerMode,
    language,
    setLanguage,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    formatPKR,
    cartSubtotal,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentView('shop');
  };

  const isUrdu = language === 'ur';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Bar: Pakistani Shop Info & Timings */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Shop Physical Address in Hafeez Centre */}
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>Hafeez Centre Lahore (Shop #3-A, 4th Floor)</span>
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{SHOP_INFO.workingHours}</span>
            </span>
          </div>

          {/* Quick Actions: Call, Wholesale Toggle, Language Switcher */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Click to Call */}
            <a
              href={`tel:${SHOP_INFO.phone.replace(/[\s-]/g, '')}`}
              className="inline-flex items-center gap-1 text-slate-200 hover:text-emerald-400 font-medium transition"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">Call Shop:</span>
              <span className="font-mono">{SHOP_INFO.phone}</span>
            </a>

            <span className="text-slate-600">|</span>

            {/* Wholesale Dealer Mode Switch */}
            <button
              onClick={() => setDealerMode(!dealerMode)}
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold transition border ${
                dealerMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                  : 'bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700'
              }`}
              title="Toggle wholesale dealer pricing view"
            >
              <Building2 className="w-3 h-3" />
              <span>{dealerMode ? 'Wholesale Mode: ON' : 'Dealer Rates'}</span>
            </button>

            <span className="text-slate-600">|</span>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(isUrdu ? 'en' : 'ur')}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium"
            >
              <span className="text-[11px] font-bold px-1 py-0.5 rounded bg-slate-800 border border-slate-700">
                {isUrdu ? 'English' : 'اردو'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Shop Identity */}
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-hidden shrink-0 cursor-pointer"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-blue-900 text-white flex items-center justify-center font-black text-base sm:text-lg shadow-md border border-blue-800 group-hover:bg-blue-800 transition shrink-0">
              <span className="tracking-tighter">SIT</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-900 transition whitespace-nowrap">
                  Soft Impex <span className="text-blue-700">Traders</span>
                </span>
                <span className="hidden xl:inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap shrink-0">
                  Hafeez Centre
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block whitespace-nowrap">
                {isUrdu
                  ? 'لاہور کا سب سے بڑا آئی ٹی و ہول سیل لیپ ٹاپ مارکیٹ پلیس'
                  : 'IT Hardware, Laptops & Bulk Wholesale • www.hafeezcentre.online'}
              </p>
            </div>
          </button>

          {/* Search Bar with Category Select */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 min-w-0 max-w-lg items-center relative"
          >
            <div className="flex w-full items-center border-2 border-slate-300 focus-within:border-blue-700 rounded-lg overflow-hidden bg-white shadow-xs transition">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as CategoryKey | 'all')}
                className="bg-slate-100 text-slate-700 text-xs font-semibold py-2.5 px-3 border-r border-slate-200 focus:outline-hidden hover:bg-slate-200 cursor-pointer"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {isUrdu ? c.nameUrdu : c.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder={
                  isUrdu
                    ? 'لیپ ٹاپ، ایس ایس ڈی، ریم یا برانڈ سرچ کریں...'
                    : 'Search laptops, core i7, SSD, monitors, CCTV, Dell, HP...'
                }
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden"
              />
              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white px-5 py-2.5 flex items-center justify-center transition font-semibold text-xs tracking-wide"
              >
                <Search className="w-4 h-4 mr-1.5" />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Right Action Icons: Compare, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Compare Button */}
            <button
              onClick={() => setCurrentView('compare')}
              className={`p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition relative ${
                currentView === 'compare' ? 'bg-blue-50 text-blue-700' : ''
              }`}
              title="Product comparison"
            >
              <Scale className="w-5 h-5" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setCurrentView('wishlist')}
              className={`p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition relative ${
                currentView === 'wishlist' ? 'bg-blue-50 text-blue-700' : ''
              }`}
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Total in PKR */}
            <button
              onClick={() => setCurrentView('cart')}
              className="flex items-center gap-2 bg-slate-900 hover:bg-blue-900 text-white px-3 sm:px-3.5 py-2 rounded-lg shadow-xs transition group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <div className="text-[10px] text-slate-300 font-medium">Cart</div>
                <div className="font-bold text-amber-300">{formatPKR(cartSubtotal)}</div>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <form onSubmit={handleSearchSubmit} className="mt-3 md:hidden">
          <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
            <input
              type="text"
              placeholder={isUrdu ? 'لیپ ٹاپ یا ہارڈویئر تلاش کریں...' : 'Search laptops, SSD, RAM, CCTV...'}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden"
            />
            <button type="submit" className="bg-blue-800 text-white px-3 py-2">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Navigation Bar / Mega Categories */}
      <nav className="border-t border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {/* Categories dropdown button */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-blue-800 text-white hover:bg-blue-900 transition"
              >
                <Layers className="w-4 h-4" />
                <span>{isUrdu ? 'تمام شعبہ جات' : 'All Categories'}</span>
              </button>

              {/* Mega Dropdown */}
              {categoryDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-72 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setSelectedCategory(cat.key);
                        setCurrentView('shop');
                        setCategoryDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-slate-800 hover:text-blue-900 flex items-center justify-between text-xs"
                    >
                      <span>{isUrdu ? cat.nameUrdu : cat.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        {cat.subcategories.length} sub-items
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fast Quick Links */}
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3 py-2 rounded-md hover:text-blue-800 hover:bg-white transition cursor-pointer ${
                currentView === 'home' ? 'text-blue-800 bg-white font-bold shadow-2xs' : ''
              }`}
            >
              {isUrdu ? 'ہوم' : 'Home'}
            </button>

            <button
              onClick={() => {
                setSelectedCategory('laptops');
                setCurrentView('shop');
              }}
              className={`px-3 py-2 rounded-md hover:text-blue-800 hover:bg-white transition ${
                selectedCategory === 'laptops' && currentView === 'shop' ? 'text-blue-800 bg-white font-bold shadow-2xs' : ''
              }`}
            >
              {isUrdu ? 'لیپ ٹاپس' : 'Laptops'}
            </button>

            <button
              onClick={() => {
                setSelectedCategory('desktops');
                setCurrentView('shop');
              }}
              className="px-3 py-2 rounded-md hover:text-blue-800 hover:bg-white transition"
            >
              {isUrdu ? 'ڈیسک ٹاپ و منی پی سی' : 'Desktops & Mini PCs'}
            </button>

            <button
              onClick={() => {
                setSelectedCategory('storage');
                setCurrentView('shop');
              }}
              className="px-3 py-2 rounded-md hover:text-blue-800 hover:bg-white transition"
            >
              {isUrdu ? 'ایس ایس ڈی و ریم' : 'Storage & SSD'}
            </button>

            <button
              onClick={() => {
                setSelectedCategory('networking');
                setCurrentView('shop');
              }}
              className="px-3 py-2 rounded-md hover:text-blue-800 hover:bg-white transition"
            >
              {isUrdu ? 'نیٹ ورکنگ' : 'Networking'}
            </button>

            <button
              onClick={() => {
                setSelectedCategory('cctv-security');
                setCurrentView('shop');
              }}
              className="px-3 py-2 rounded-md hover:text-blue-800 hover:bg-white transition"
            >
              {isUrdu ? 'سی سی ٹی وی کیمرے' : 'CCTV & Security'}
            </button>

            <button
              onClick={() => setCurrentView('deals')}
              className={`px-3 py-2 rounded-md transition inline-flex items-center gap-1 text-rose-700 hover:bg-rose-50 ${
                currentView === 'deals' ? 'bg-rose-100 font-bold' : ''
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'ڈیلز و بچت آفرز' : 'Deals & Offers'}</span>
            </button>

            <button
              onClick={() => setCurrentView('wholesale')}
              className={`px-3 py-2 rounded-md transition inline-flex items-center gap-1 text-emerald-800 hover:bg-emerald-50 ${
                currentView === 'wholesale' ? 'bg-emerald-100 font-bold' : ''
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'ہول سیل و بلک آرڈرز' : 'Wholesale & B2B'}</span>
            </button>
          </div>

          {/* Right helper links: Order Tracking, Shop Location */}
          <div className="flex items-center gap-2 py-1">
            <button
              onClick={() => setCurrentView('track-order')}
              className={`px-2.5 py-1.5 rounded-md hover:bg-white text-slate-700 transition inline-flex items-center gap-1 ${
                currentView === 'track-order' ? 'bg-white text-blue-800 font-bold' : ''
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-700" />
              <span>{isUrdu ? 'آرڈر ٹریک کریں' : 'Track Order / Invoice'}</span>
            </button>

            <button
              onClick={() => setCurrentView('contact')}
              className="px-2.5 py-1.5 rounded-md hover:bg-white text-slate-700 transition inline-flex items-center gap-1"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>{isUrdu ? 'شاپ لوکیشن' : 'Shop Location'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-800 text-sm">Navigation</span>
            <button
              onClick={() => setDealerMode(!dealerMode)}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                dealerMode ? 'bg-amber-400 text-slate-900' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {dealerMode ? 'Wholesale Mode Active' : 'Enable Wholesale Rates'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => {
                setCurrentView('home');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left font-semibold text-slate-800 hover:bg-blue-50"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentView('shop');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left font-semibold text-slate-800 hover:bg-blue-50"
            >
              Browse Catalog
            </button>
            <button
              onClick={() => {
                setCurrentView('wholesale');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-emerald-50 text-left font-semibold text-emerald-900"
            >
              Wholesale & RFQ
            </button>
            <button
              onClick={() => {
                setCurrentView('deals');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-rose-50 text-left font-semibold text-rose-900"
            >
              Deals & Clearance
            </button>
            <button
              onClick={() => {
                setCurrentView('track-order');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left font-semibold text-slate-800 hover:bg-blue-50"
            >
              Track Order / Invoice
            </button>
            <button
              onClick={() => {
                setCurrentView('compare');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left font-semibold text-slate-800 hover:bg-blue-50"
            >
              Compare ({compareList.length})
            </button>
            <button
              onClick={() => {
                setCurrentView('blog');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left font-semibold text-slate-800 hover:bg-blue-50"
            >
              Guides & Blog
            </button>
            <button
              onClick={() => {
                setCurrentView('warranty');
                setMobileMenuOpen(false);
              }}
              className="p-2.5 rounded-lg bg-slate-50 text-left font-semibold text-slate-800 hover:bg-blue-50"
            >
              Warranty Policy
            </button>
            <button
              onClick={() => {
                setCurrentView('contact');
                setMobileMenuOpen(false);
              }}
              className="col-span-2 p-2.5 rounded-lg bg-slate-50 text-left font-semibold text-slate-800 hover:bg-blue-50"
            >
              Contact & Map
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Shop: {SHOP_INFO.addressShort}</span>
            <a
              href={`https://wa.me/${SHOP_INFO.whatsapp}`}
              className="font-bold text-emerald-600"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

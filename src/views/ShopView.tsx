import React, { useState, useMemo } from 'react';
import {
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Search,
  X,
  RotateCcw,
  Check,
  ChevronDown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/mockData';
import { CategoryKey, Condition } from '../types';

export const ShopView: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCondition,
    setSelectedCondition,
    selectedBrand,
    setSelectedBrand,
    formatPKR,
    dealerMode,
    language,
  } = useApp();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [priceMax, setPriceMax] = useState<number>(600000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const isUrdu = language === 'ur';

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach((p) => brands.add(p.brand));
    return Array.from(brands).sort();
  }, [products]);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchUrdu = p.titleUrdu?.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchSub = p.subcategory.toLowerCase().includes(q);
          const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchUrdu && !matchSku && !matchBrand && !matchSub && !matchTags) {
            return false;
          }
        }

        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Condition
        if (selectedCondition !== 'all' && p.condition !== selectedCondition) {
          return false;
        }

        // Brand
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
          return false;
        }

        // Price Max
        const activePrice = dealerMode ? p.wholesalePrice : p.price;
        if (activePrice > priceMax) {
          return false;
        }

        // In Stock
        if (inStockOnly && p.stockStatus === 'out_of_stock') {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = dealerMode ? a.wholesalePrice : a.price;
        const priceB = dealerMode ? b.wholesalePrice : b.price;

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedCondition,
    selectedBrand,
    priceMax,
    inStockOnly,
    sortBy,
    dealerMode,
  ]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSelectedBrand('all');
    setPriceMax(600000);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedCondition !== 'all' ||
    selectedBrand !== 'all' ||
    priceMax < 600000 ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {selectedCategory === 'all'
              ? isUrdu
                ? 'تمام آئی ٹی ہارڈویئر کیٹلاگ'
                : 'All IT Hardware Catalog'
              : CATEGORIES.find((c) => c.key === selectedCategory)?.name || 'Products'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hafeez Centre inventory with verified Pakistani warranty & nationwide delivery
          </p>
        </div>

        {/* View mode & Sort controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters {hasActiveFilters && '•'}</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-slate-300 rounded-lg py-2 px-2.5 font-medium text-slate-700 focus:outline-hidden"
            >
              <option value="featured">Featured / Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>

          {/* Grid vs List toggle */}
          <div className="hidden sm:flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-800 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6 bg-white p-5 rounded-xl border border-slate-200 h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-blue-700" />
              <span>Filters</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Categories
            </h4>
            <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition flex items-center justify-between ${
                  selectedCategory === 'all'
                    ? 'bg-blue-50 text-blue-800 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] text-slate-400">{products.length}</span>
              </button>
              {CATEGORIES.map((cat) => {
                const count = products.filter((p) => p.category === cat.key).length;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition flex items-center justify-between ${
                      selectedCategory === cat.key
                        ? 'bg-blue-50 text-blue-800 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{isUrdu ? cat.nameUrdu : cat.name}</span>
                    <span className="text-[10px] text-slate-400">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Condition Filter */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Condition
            </h4>
            <div className="space-y-1">
              {(['all', 'Used', 'Refurbished', 'New'] as const).map((cond) => (
                <button
                  key={cond}
                  onClick={() => setSelectedCondition(cond)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition flex items-center justify-between ${
                    selectedCondition === cond
                      ? 'bg-blue-50 text-blue-800 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>
                    {cond === 'all'
                      ? 'All Conditions'
                      : cond === 'Used'
                      ? 'Used Grade A+ (US/UK)'
                      : cond === 'Refurbished'
                      ? 'Certified Refurbished'
                      : 'Brand New Sealed'}
                  </span>
                  {selectedCondition === cond && <Check className="w-3.5 h-3.5 text-blue-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Brand
            </h4>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition flex items-center justify-between ${
                  selectedBrand === 'all'
                    ? 'bg-blue-50 text-blue-800 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>All Brands</span>
              </button>
              {allBrands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition flex items-center justify-between ${
                    selectedBrand === brand
                      ? 'bg-blue-50 text-blue-800 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{brand}</span>
                  {selectedBrand === brand && <Check className="w-3.5 h-3.5 text-blue-700" />}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Max Price
              </h4>
              <span className="text-xs font-black text-blue-800">{formatPKR(priceMax)}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={600000}
              step={5000}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-blue-700 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
              <span>Rs. 5,000</span>
              <span>Rs. 600,000+</span>
            </div>
          </div>

          {/* In-Stock Toggle */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700">In-Stock Only</span>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 accent-blue-700 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Product Grid / List Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-blue-50/60 border border-blue-200 text-xs">
              <span className="font-bold text-blue-900">Active:</span>

              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-slate-700 border border-slate-200">
                  Search: "{searchQuery}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-slate-700 border border-slate-200">
                  Category: {selectedCategory}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                </span>
              )}

              {selectedCondition !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-slate-700 border border-slate-200">
                  Condition: {selectedCondition}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCondition('all')} />
                </span>
              )}

              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-slate-700 border border-slate-200">
                  Brand: {selectedBrand}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedBrand('all')} />
                </span>
              )}

              {priceMax < 600000 && (
                <span className="inline-flex items-center gap-1 bg-white px-2 py-1 rounded text-slate-700 border border-slate-200">
                  Under: {formatPKR(priceMax)}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setPriceMax(600000)} />
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:underline font-semibold ml-auto"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results count */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong>{filteredProducts.length}</strong> IT products
            </span>
            {dealerMode && (
              <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold border border-amber-200">
                Wholesale Dealer Rates Active
              </span>
            )}
          </div>

          {/* Grid Render */}
          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4">
              <Search className="w-12 h-12 text-slate-300 mx-auto" />
              <div>
                <h3 className="font-bold text-slate-800 text-lg">No matching products found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  We couldn't find any hardware matching your current filter criteria. Try adjusting the price slider,
                  condition, or search terms.
                </p>
              </div>
              <button
                onClick={clearAllFilters}
                className="bg-blue-800 text-white font-bold text-xs px-4 py-2 rounded-lg"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-5 overflow-y-auto space-y-5 animate-in slide-in-from-right">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Filter Products</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase mb-2">Category</h4>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase mb-2">Condition</h4>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value as any)}
                className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="all">All Conditions</option>
                <option value="Used">Used Grade A+</option>
                <option value="Refurbished">Certified Refurbished</option>
                <option value="New">Brand New Boxed</option>
              </select>
            </div>

            {/* Brand */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase mb-2">Brand</h4>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="all">All Brands</option>
                {allBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Max */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold">Max Price:</span>
                <span className="font-black text-blue-800">{formatPKR(priceMax)}</span>
              </div>
              <input
                type="range"
                min={5000}
                max={600000}
                step={5000}
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-blue-700"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="w-1/2 py-2 text-xs font-bold text-slate-700 bg-slate-100 rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-2 text-xs font-bold text-white bg-blue-800 rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

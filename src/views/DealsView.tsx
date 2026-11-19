import React, { useState } from 'react';
import { Sparkles, Clock, Percent, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const DealsView: React.FC = () => {
  const { products, setCurrentView, language } = useApp();
  const [dealFilter, setDealFilter] = useState<'all' | 'under100k' | 'new' | 'used'>('all');
  const isUrdu = language === 'ur';

  const dealProducts = products.filter((p) => {
    if (!p.isDeal && !p.discountPercent) return false;
    if (dealFilter === 'under100k') return p.price <= 100000;
    if (dealFilter === 'new') return p.condition === 'New';
    if (dealFilter === 'used') return p.condition === 'Used';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Deals Hero Banner with Countdown Timer Graphic */}
      <div className="bg-linear-to-r from-rose-950 via-slate-900 to-rose-900 text-white rounded-2xl p-6 sm:p-10 border border-rose-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Limited Lot Clearance • Direct Hafeez Centre Counter</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Special Deals & IT Hardware Clearance
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm">
            Save up to 18% on selected corporate laptops, fast Gen4 SSDs, wireless combos, and custom gaming PCs.
            Every unit includes our signature 30-day checking warranty.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-rose-200 font-bold bg-rose-900/60 px-3 py-1.5 rounded-lg border border-rose-700">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Offer Valid while stock lasts in shop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        <button
          onClick={() => setDealFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition ${
            dealFilter === 'all'
              ? 'bg-rose-700 text-white font-bold'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          All Deals
        </button>
        <button
          onClick={() => setDealFilter('under100k')}
          className={`px-3 py-1.5 rounded-lg transition ${
            dealFilter === 'under100k'
              ? 'bg-rose-700 text-white font-bold'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Under 100,000 PKR
        </button>
        <button
          onClick={() => setDealFilter('used')}
          className={`px-3 py-1.5 rounded-lg transition ${
            dealFilter === 'used'
              ? 'bg-rose-700 text-white font-bold'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Used Grade A+ Deals
        </button>
        <button
          onClick={() => setDealFilter('new')}
          className={`px-3 py-1.5 rounded-lg transition ${
            dealFilter === 'new'
              ? 'bg-rose-700 text-white font-bold'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          Brand New Sealed Offers
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {dealProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

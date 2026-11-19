import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  Building,
  HelpCircle,
  ExternalLink,
  Server,
} from 'lucide-react';
import { SHOP_INFO, CATEGORIES } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, language } = useApp();
  const isUrdu = language === 'ur';

  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-xs">
      {/* 4 Pillars Trust Row */}
      <div className="max-w-7xl mx-auto px-4 pb-10 border-b border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-blue-900/60 text-blue-400 border border-blue-800/80 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Hafeez Centre Shop</h4>
              <p className="text-slate-400 text-xs mt-1">
                Physical shop in Asia's largest IT center. Test before you buy at Shop #3-A, 4th Floor.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-emerald-900/60 text-emerald-400 border border-emerald-800/80 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Checking Warranty</h4>
              <p className="text-slate-400 text-xs mt-1">
                Full 30-day testing warranty on used machines. 1-year brand warranty on new units.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-amber-900/60 text-amber-400 border border-amber-800/80 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Nationwide Pakistan COD</h4>
              <p className="text-slate-400 text-xs mt-1">
                Safe delivery via TCS & Trax to Karachi, Islamabad, KPK, Quetta, & same-day in Lahore.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-purple-900/60 text-purple-400 border border-purple-800/80 shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Direct Wholesale Rates</h4>
              <p className="text-slate-400 text-xs mt-1">
                Direct container imports for resellers, software houses, call centers & schools with NTN invoices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Col 1: Shop & Legal Profile */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-800 text-white flex items-center justify-center font-black text-sm tracking-tighter shrink-0">
              SIT
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-white whitespace-nowrap">
                Soft Impex <span className="text-blue-500">Traders</span>
              </span>
              <p className="text-[11px] text-slate-400">Hafeez Centre IT Marketplace</p>
            </div>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            Registered IT hardware importers, wholesale distributors, and retail stockists operating directly out of
            Hafeez Centre Lahore. Supplying laptops, mini desktops, networking, storage, and CCTV equipment across
            Pakistan since 2012.
          </p>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{SHOP_INFO.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                WhatsApp / Mobile:{' '}
                <a href={`tel:${SHOP_INFO.phone}`} className="hover:text-emerald-300 font-mono font-bold">
                  {SHOP_INFO.phone}
                </a>{' '}
                | Tel:{' '}
                <a
                  href={`tel:${SHOP_INFO.landline.replace(/[\s-]/g, '')}`}
                  className="hover:text-emerald-300 font-mono font-bold"
                >
                  {SHOP_INFO.landline}
                </a>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>sales@hafeezcentre.online | www.hafeezcentre.online</span>
            </div>
          </div>
        </div>

        {/* Col 2: Categories */}
        <div className="space-y-3">
          <h5 className="text-white font-bold text-sm tracking-wide">Top Categories</h5>
          <ul className="space-y-2 text-slate-400 text-xs">
            {CATEGORIES.slice(0, 6).map((c) => (
              <li key={c.key}>
                <button
                  onClick={() => {
                    setSelectedCategory(c.key);
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition"
                >
                  {isUrdu ? c.nameUrdu : c.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-blue-400 hover:text-blue-300 font-semibold"
              >
                View All Categories →
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care & Services */}
        <div className="space-y-3">
          <h5 className="text-white font-bold text-sm tracking-wide">Customer & B2B</h5>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li>
              <button
                onClick={() => {
                  setCurrentView('wholesale');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-400 transition font-semibold text-emerald-400"
              >
                Wholesale Portal & RFQ
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('track-order');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-400 transition"
              >
                Track Order & Tax Invoice
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('warranty');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-400 transition"
              >
                Warranty & Return Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('compare');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-400 transition"
              >
                Side-by-Side Product Comparison
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('faq');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-400 transition"
              >
                Frequently Asked Questions (FAQ)
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentView('blog');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-blue-400 transition"
              >
                IT Market Guides & Articles
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Shop Hours & Hosting/Deploy Guide */}
        <div className="space-y-3">
          <h5 className="text-white font-bold text-sm tracking-wide">Business Hours</h5>
          <div className="text-xs text-slate-400 space-y-1.5">
            <p className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Monday – Saturday:</span>
            </p>
            <p className="font-semibold text-white pl-5">11:00 AM – 10:00 PM</p>
            <p className="text-[11px] text-slate-400 pl-5">Friday Prayer Break: 1:00 PM – 2:30 PM</p>
            <p className="text-[11px] text-slate-400 pl-5">Sunday: Open by appointment for bulk dispatch</p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentView('cpanel-guide');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full text-left p-2.5 rounded-lg bg-blue-950 border border-blue-800 text-blue-200 hover:bg-blue-900 transition flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-blue-400" />
                <div>
                  <div className="font-bold text-[11px]">cPanel & Hosting Guide</div>
                  <div className="text-[10px] text-blue-300">Deploy to www.hafeezcentre.online</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Channels & Courier Logos in Pakistan */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[11px] text-slate-400 font-semibold">Accepted in Pakistan:</span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[11px] font-bold text-emerald-400 border border-slate-800">
            Cash on Delivery (COD)
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[11px] font-bold text-blue-400 border border-slate-800">
            Meezan Bank (IBAN)
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[11px] font-bold text-teal-400 border border-slate-800">
            Standard Chartered
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[11px] font-bold text-rose-400 border border-slate-800">
            JazzCash
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[11px] font-bold text-green-400 border border-slate-800">
            Easypaisa
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-900 text-[11px] font-bold text-amber-400 border border-slate-800">
            Hafeez Centre Shop Counter Pickup
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Couriers: TCS • Trax Courier • Leopards • Bykea / Lahore Bike</span>
        </div>
      </div>

      {/* Bottom Copyright & Disclaimer */}
      <div className="max-w-7xl mx-auto px-4 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
        <div>
          © {new Date().getFullYear()} Soft Impex Traders (Hafeez Centre Lahore). All rights reserved. Registered on
          domain www.hafeezcentre.online.
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setCurrentView('warranty')} className="hover:text-slate-300">
            Warranty Policy
          </button>
          <span>•</span>
          <button onClick={() => setCurrentView('contact')} className="hover:text-slate-300">
            Shop Directions
          </button>
        </div>
      </div>
    </footer>
  );
};

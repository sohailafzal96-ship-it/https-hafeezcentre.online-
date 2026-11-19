import React, { useState } from 'react';
import { MessageCircle, Phone, ArrowUp, Scale, X, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOP_INFO } from '../data/mockData';

export const FloatingActions: React.FC = () => {
  const {
    compareList,
    clearCompare,
    setCurrentView,
    notification,
    cartCount,
    language,
  } = useApp();

  const [chatPopupOpen, setChatPopupOpen] = useState(false);
  const [quickQuestion, setQuickQuestion] = useState('');
  const isUrdu = language === 'ur';

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = quickQuestion.trim()
      ? `Asalam-o-Alaikum Soft Impex Traders, ${quickQuestion}`
      : 'Asalam-o-Alaikum Soft Impex Traders, I need information about laptops and IT hardware at Hafeez Centre.';
    window.open(`https://wa.me/${SHOP_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setChatPopupOpen(false);
    setQuickQuestion('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Toast Notification Banner */}
      {notification && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* Floating Compare Widget (if items selected) */}
      {compareList.length > 0 && (
        <div className="fixed bottom-20 right-4 z-40 bg-blue-900 text-white rounded-xl shadow-2xl p-3 border border-blue-700 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold">
              {compareList.length} {compareList.length === 1 ? 'item' : 'items'} in comparison
            </span>
          </div>
          <button
            onClick={() => setCurrentView('compare')}
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-3 py-1 rounded text-xs font-bold transition"
          >
            Compare Now
          </button>
          <button
            onClick={clearCompare}
            className="text-slate-300 hover:text-white p-1"
            title="Clear"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* WhatsApp Chat Popup Box */}
      {chatPopupOpen && (
        <div className="fixed bottom-20 right-4 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs tracking-tighter">
                SIT
              </div>
              <div>
                <h4 className="font-bold text-sm">Soft Impex Traders</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
                  Hafeez Centre Sales Team (Online)
                </p>
              </div>
            </div>
            <button
              onClick={() => setChatPopupOpen(false)}
              className="text-emerald-100 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body message */}
          <div className="p-4 bg-emerald-50/40 text-xs text-slate-700 space-y-2">
            <div className="bg-white p-2.5 rounded-lg shadow-2xs border border-slate-100">
              <p className="font-medium">
                {isUrdu
                  ? 'السلام علیکم! حفیظ سینٹر لاہور سے سافٹ امپیکس ٹریڈرز۔ کیا ہم آپ کی لیپ ٹاپ یا ہول سیل خریداری میں مدد کر سکتے ہیں؟'
                  : 'Asalam-o-Alaikum! Welcome to Soft Impex Traders at Hafeez Centre Lahore. How can we help you with laptops or wholesale inquiries today?'}
              </p>
              <span className="text-[10px] text-slate-400 block text-right mt-1">Shop Rep</span>
            </div>

            {/* Quick Suggestions */}
            <div className="space-y-1 pt-1">
              <button
                type="button"
                onClick={() => setQuickQuestion('I want prices for Core i7 laptops in Hafeez Centre.')}
                className="w-full text-left p-1.5 rounded bg-white hover:bg-emerald-100 border border-slate-200 text-[11px] text-slate-700 transition"
              >
                💻 Core i7 laptop prices?
              </button>
              <button
                type="button"
                onClick={() => setQuickQuestion('I need wholesale quotation for 10+ PCs/Laptops.')}
                className="w-full text-left p-1.5 rounded bg-white hover:bg-emerald-100 border border-slate-200 text-[11px] text-slate-700 transition"
              >
                🏢 Wholesale quotation for office/shop
              </button>
              <button
                type="button"
                onClick={() => setQuickQuestion('Where exactly is your shop inside Hafeez Centre?')}
                className="w-full text-left p-1.5 rounded bg-white hover:bg-emerald-100 border border-slate-200 text-[11px] text-slate-700 transition"
              >
                📍 Shop floor & location directions
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleWhatsAppSend} className="pt-2">
              <textarea
                value={quickQuestion}
                onChange={(e) => setQuickQuestion(e.target.value)}
                placeholder="Type your question or model..."
                rows={2}
                className="w-full p-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600 bg-white"
              />
              <button
                type="submit"
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-2.5 items-end">
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-900 text-white shadow-md flex items-center justify-center transition"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* WhatsApp Floating Button */}
        <button
          onClick={() => setChatPopupOpen(!chatPopupOpen)}
          className="h-12 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xl flex items-center gap-2 border-2 border-white transition transform hover:scale-105 active:scale-95 group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white group-hover:animate-pulse" />
          <span className="text-xs hidden sm:inline">WhatsApp Hafeez Centre</span>
        </button>
      </div>

      {/* Sticky Bottom Bar for Mobile Devices */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-xl px-2 py-1.5 flex items-center justify-around">
        <a
          href={`tel:${SHOP_INFO.phone}`}
          className="flex flex-col items-center py-1 px-3 text-slate-700 active:text-blue-700"
        >
          <Phone className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-bold mt-0.5">Call Shop</span>
        </a>

        <a
          href={`https://wa.me/${SHOP_INFO.whatsapp}?text=${encodeURIComponent(
            'Asalam-o-Alaikum Soft Impex Traders, I have an inquiry about laptops in Hafeez Centre.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center py-1 px-3 text-slate-700 active:text-emerald-700"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span className="text-[10px] font-bold mt-0.5">WhatsApp</span>
        </a>

        <button
          onClick={() => setCurrentView('wholesale')}
          className="flex flex-col items-center py-1 px-3 text-slate-700 active:text-amber-700"
        >
          <Scale className="w-4 h-4 text-amber-600" />
          <span className="text-[10px] font-bold mt-0.5">Wholesale</span>
        </button>

        <button
          onClick={() => setCurrentView('cart')}
          className="flex flex-col items-center py-1 px-3 text-slate-700 active:text-blue-700 relative"
        >
          <ShoppingCart className="w-4 h-4 text-blue-800" />
          <span className="text-[10px] font-bold mt-0.5">Cart</span>
          {cartCount > 0 && (
            <span className="absolute top-0 right-2 bg-amber-500 text-slate-950 font-black text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </>
  );
};

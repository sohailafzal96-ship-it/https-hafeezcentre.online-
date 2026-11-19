import React from 'react';
import {
  Scale,
  X,
  ShoppingCart,
  MessageCircle,
  Plus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CompareView: React.FC = () => {
  const {
    compareList,
    toggleCompare,
    clearCompare,
    products,
    formatPKR,
    addToCart,
    getWhatsAppOrderUrl,
    setCurrentView,
    setSelectedProduct,
    dealerMode,
    language,
  } = useApp();

  const isUrdu = language === 'ur';

  // Get compared products
  const comparedProducts = products.filter((p) => compareList.includes(p.id));

  if (comparedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto text-blue-800">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-800">No Products in Comparison</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Click the compare scale icon on any product card or detail page to compare up to 4 laptops side by side.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-6 py-2.5 rounded-lg text-xs transition inline-flex items-center gap-1.5"
        >
          <span>Browse Laptops & PCs</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  const specRows = [
    { label: 'Condition & Grade', getVal: (p: any) => `${p.condition} (${p.grade || 'Tested'})` },
    { label: 'Processor', getVal: (p: any) => p.specs.processor || 'N/A' },
    { label: 'Generation', getVal: (p: any) => p.specs.generation || 'N/A' },
    { label: 'Installed RAM', getVal: (p: any) => p.specs.ram || 'N/A' },
    { label: 'Storage (SSD/HDD)', getVal: (p: any) => p.specs.storage || 'N/A' },
    { label: 'Display & Screen', getVal: (p: any) => p.specs.display || 'N/A' },
    { label: 'Graphics GPU', getVal: (p: any) => p.specs.graphics || 'N/A' },
    { label: 'Battery Health / Backup', getVal: (p: any) => p.specs.battery || 'N/A' },
    { label: 'Operating System', getVal: (p: any) => p.specs.os || 'N/A' },
    { label: 'Ports & Connectivity', getVal: (p: any) => p.specs.ports || 'N/A' },
    { label: 'Weight & Chassis', getVal: (p: any) => p.specs.weight || 'N/A' },
    { label: 'Warranty Coverage', getVal: (p: any) => p.warranty.type },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isUrdu ? 'لیپ ٹاپس اور کمپیوٹرز کا موازنہ' : 'Side-by-Side Product Comparison'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparing {comparedProducts.length} IT products from Hafeez Centre inventory
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('shop')}
            className="text-xs font-bold text-blue-700 hover:underline"
          >
            + Add More Items
          </button>
          <button
            onClick={clearCompare}
            className="text-xs text-rose-600 hover:underline font-semibold"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-xs">
        <table className="w-full text-xs text-left min-w-[700px]">
          {/* Header Row: Products info cards */}
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="p-4 w-48 text-slate-500 font-bold uppercase text-[11px] align-top">
                Products
              </th>
              {comparedProducts.map((p) => (
                <th key={p.id} className="p-4 min-w-[220px] max-w-[280px] align-top">
                  <div className="space-y-2 relative">
                    <button
                      onClick={() => toggleCompare(p.id)}
                      className="absolute -top-1 -right-1 text-slate-400 hover:text-rose-600 p-1"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="w-full h-36 rounded-lg bg-slate-100 overflow-hidden">
                      <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="text-[10px] uppercase font-bold text-blue-800">{p.brand}</div>
                    <div
                      onClick={() => {
                        setSelectedProduct(p);
                        setCurrentView('product-detail');
                      }}
                      className="font-bold text-slate-900 line-clamp-2 hover:text-blue-700 cursor-pointer"
                    >
                      {p.title}
                    </div>

                    <div className="text-base font-black text-blue-900">
                      {formatPKR(dealerMode ? p.wholesalePrice : p.price)}
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <button
                        onClick={() => addToCart(p, 1, dealerMode)}
                        className="w-full bg-slate-900 hover:bg-blue-900 text-white font-bold py-1.5 px-2 rounded-lg text-xs flex items-center justify-center gap-1"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                      <a
                        href={getWhatsAppOrderUrl(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-2 rounded-lg text-xs flex items-center justify-center gap-1 text-center"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Specs Rows */}
          <tbody className="divide-y divide-slate-100">
            {specRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-700 bg-slate-50/50">{row.label}</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3.5 text-slate-800 font-medium">
                    {row.getVal(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

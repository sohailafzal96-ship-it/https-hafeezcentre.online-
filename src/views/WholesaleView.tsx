import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Truck,
  Send,
  MessageCircle,
  Download,
  Printer,
  Sparkles,
  Phone,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOP_INFO } from '../data/mockData';

export const WholesaleView: React.FC = () => {
  const {
    dealerMode,
    setDealerMode,
    createWholesaleInquiry,
    formatPKR,
    products,
    showNotification,
    language,
  } = useApp();

  const isUrdu = language === 'ur';

  // RFQ form state
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lahore');
  const [natureOfBusiness, setNatureOfBusiness] = useState('Reseller / Shopkeeper');
  const [itemsRequired, setItemsRequired] = useState('');
  const [estimatedQuantity, setEstimatedQuantity] = useState(10);
  const [budgetPKR, setBudgetPKR] = useState('Rs. 500,000 - 1,000,000');
  const [submittedRfq, setSubmittedRfq] = useState<any>(null);

  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactPerson.trim() || !phone.trim() || !itemsRequired.trim()) {
      showNotification('Please fill in all mandatory RFQ fields.');
      return;
    }

    const rfqData = {
      companyName,
      contactPerson,
      phone,
      whatsapp: whatsapp || phone,
      email: email || 'dealer@hafeezcentre.online',
      city,
      natureOfBusiness,
      itemsRequired,
      estimatedQuantity: Number(estimatedQuantity),
      budgetPKR,
    };

    createWholesaleInquiry(rfqData);
    setSubmittedRfq({
      ...rfqData,
      id: `RFQ-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-PK'),
    });
  };

  const handleSendWhatsAppRfq = () => {
    if (!submittedRfq) return;
    const msg = `Asalam-o-Alaikum Soft Impex Traders B2B Hafeez Centre,
Official RFQ from: ${submittedRfq.companyName} (${submittedRfq.contactPerson})
📍 City: ${submittedRfq.city}
🏢 Business: ${submittedRfq.natureOfBusiness}
📦 Required: ${submittedRfq.itemsRequired}
🔢 Approx Quantity: ${submittedRfq.estimatedQuantity} units
💵 Budget: ${submittedRfq.budgetPKR}
📞 Contact: ${submittedRfq.phone}`;

    window.open(`https://wa.me/${SHOP_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* 1. Header Banner */}
      <div className="bg-linear-to-r from-slate-950 via-slate-900 to-blue-950 text-white rounded-2xl p-8 sm:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Direct Container Import Wholesale Wing (Shop #3-A, 4th Floor, Hafeez Centre)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Wholesale IT Hardware & Bulk Laptop Supply in Pakistan
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Supplying IT shopkeepers, software houses, call centers, universities, and government contractors across
            Pakistan with direct container import pricing, commercial NTN tax invoices, and guaranteed Grade A+ stock.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setDealerMode(!dealerMode)}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                dealerMode
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-500 shadow-md'
                  : 'bg-blue-600 hover:bg-blue-500 text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{dealerMode ? 'Dealer Mode Active (Viewing Wholesale Rates)' : 'Toggle Wholesale Dealer Pricing'}</span>
            </button>
            <a
              href={`tel:${SHOP_INFO.phone}`}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Talk to Wholesale Manager</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Top Wholesale Volume Categories */}
      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Popular Bulk Inventory in Stock
            </h2>
            <p className="text-xs text-slate-500">
              Minimum Order Quantities (MOQ) start from only 3 to 10 units for registered dealers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-800 uppercase">Corporate Laptops</span>
              <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-bold">
                MOQ: 3 Units
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Dell Latitude & HP EliteBook</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Grade A+ US/UK imports with Intel Core i5/i7 8th, 10th & 11th Gen. Ideal for call centers, software
              companies, and local laptop retail shops.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex justify-between font-mono">
              <span>Wholesale Range:</span>
              <strong className="text-slate-900 font-bold">Rs. 45,000 – 140,000</strong>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase">Mini Workstations</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold">
                MOQ: 5 Units
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Dell OptiPlex & HP ProDesk Micro PCs</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ultra-compact palm size desktops consuming under 65W power. Ready for 24/7 call centers and lab
              installations with Windows 11 Pro.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex justify-between font-mono">
              <span>Wholesale Range:</span>
              <strong className="text-slate-900 font-bold">Rs. 32,000 – 65,000</strong>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-800 uppercase">Storage & Components</span>
              <span className="text-[10px] bg-purple-50 text-purple-800 px-2 py-0.5 rounded font-bold">
                MOQ: 10 Units
              </span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Lexar / Kingston NVMe SSDs & RAM</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Original sealed retail blister packs with 3-year warranty. M.2 NVMe PCIe Gen3/Gen4 and DDR4/DDR5
              modules.
            </p>
            <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex justify-between font-mono">
              <span>Wholesale Range:</span>
              <strong className="text-slate-900 font-bold">Rs. 3,500 – 24,000</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official RFQ (Request For Quotation) Builder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: RFQ Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded mb-1">
              <FileText className="w-3.5 h-3.5" />
              <span>Official B2B Quotation Builder</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Request a Custom Bulk Quotation (RFQ)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in your requirements to receive a formal quotation slip with FBR tax breakdown.
            </p>
          </div>

          <form onSubmit={handleRfqSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Company / Organization / Shop Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Apex Technologies / Lahore Grammar School"
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Contact Person Name *</label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Engr. Sohail Afzal"
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">City in Pakistan *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Lahore / Islamabad / Karachi"
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nature of Business</label>
                <select
                  value={natureOfBusiness}
                  onChange={(e) => setNatureOfBusiness(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Reseller / Shopkeeper">Reseller / Computer Shopkeeper</option>
                  <option value="Software House / IT">Software House / IT Company</option>
                  <option value="Call Center / BPO">Call Center / BPO Operations</option>
                  <option value="School / College / University">Educational Institution</option>
                  <option value="Corporate / Govt">Corporate / Govt Contractor</option>
                  <option value="Personal Bulk">Personal Bulk Purchase</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Estimated Quantity (Units)</label>
                <input
                  type="number"
                  min={3}
                  value={estimatedQuantity}
                  onChange={(e) => setEstimatedQuantity(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">
                Items Required & Detailed Specifications *
              </label>
              <textarea
                required
                rows={3}
                value={itemsRequired}
                onChange={(e) => setItemsRequired(e.target.value)}
                placeholder="e.g. 20x Dell Latitude 7400 Core i7 with 16GB RAM + 20x 24-inch IPS Frameless Monitors. Need Windows 11 Pro pre-installed."
                className="w-full p-2.5 border border-slate-300 rounded-lg bg-white text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Target Budget Range (PKR)</label>
              <input
                type="text"
                value={budgetPKR}
                onChange={(e) => setBudgetPKR(e.target.value)}
                placeholder="e.g. Rs. 1,000,000 - 1,500,000"
                className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-black py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Submit RFQ to Hafeez Centre Wholesale Team</span>
            </button>
          </form>
        </div>

        {/* Right: Instant RFQ Preview & Generated Slip */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                Live Quotation Slip Preview
              </span>
            </div>

            {submittedRfq ? (
              <div className="space-y-4 text-xs animate-in fade-in">
                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-2">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>RFQ Reference:</span>
                    <span className="font-mono text-white font-bold">{submittedRfq.id}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Issuing Branch:</span>
                    <span className="text-white">Shop #3-A (4th Floor), Hafeez Centre</span>
                  </div>
                  <div className="pt-2 border-t border-slate-700 font-bold text-white">
                    Client: {submittedRfq.companyName}
                  </div>
                  <div className="text-slate-300">Contact: {submittedRfq.contactPerson} ({submittedRfq.phone})</div>
                  <div className="text-slate-300">City: {submittedRfq.city}</div>
                  <div className="pt-2 border-t border-slate-700">
                    <span className="text-slate-400 text-[11px] block">Items Requested:</span>
                    <p className="text-slate-200 mt-0.5">{submittedRfq.itemsRequired}</p>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-700 text-amber-400 font-bold">
                    <span>Target Budget:</span>
                    <span>{submittedRfq.budgetPKR}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleSendWhatsAppRfq}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send this RFQ on WhatsApp for Instant Rate</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-2 transition border border-slate-700"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Quotation Draft</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-3 text-slate-400 text-xs">
                <FileText className="w-10 h-10 text-slate-600 mx-auto" />
                <p>Fill out the RFQ form on the left to see your quotation draft generated here in real time.</p>
              </div>
            )}
          </div>

          {/* Wholesale Benefits Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-sm">Why Buy Wholesale from Soft Impex?</h4>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct container import rates — bypass middlemen margins</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>GST/NTN invoices with sales tax for company audits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom RAM/SSD upgrades done at our Hafeez Centre lab</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Same-day bulk carton dispatch via Daewoo Cargo or TCS</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

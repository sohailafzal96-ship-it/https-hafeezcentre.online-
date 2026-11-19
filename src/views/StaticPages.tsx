import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Building2,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  AlertCircle,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { SHOP_INFO, FAQS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const AboutView: React.FC = () => {
  const { setCurrentView, language } = useApp();
  const isUrdu = language === 'ur';

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
          About Our Business
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Soft Impex Traders — Hafeez Centre IT Marketplace
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {isUrdu
            ? 'حفیظ سینٹر گلبرگ لاہور میں 2012 سے قائم آئی ٹی ہارڈویئر، لیپ ٹاپ اور ہول سیل کا معتبر نام۔'
            : 'Connecting retail customers and wholesale IT buyers with genuine, high-grade computer hardware straight from Asia’s renowned computer hub.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-black text-slate-900">Who We Are</h2>
          <p>
            Established in <strong>Hafeez Centre, Main Boulevard, Gulberg III, Lahore</strong>, Soft Impex Traders began
            with a mission to eliminate the uncertainty and false promises commonly associated with the Pakistani
            used laptop and hardware market.
          </p>
          <p>
            Over the last decade, we have expanded from a single retail shop to direct container imports, serving
            thousands of freelancers, programmers, software houses, call centers, and computer shopkeepers across
            Lahore, Karachi, Islamabad, Peshawar, and Quetta.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200">
            <h3 className="font-bold text-blue-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-700" />
              <span>Zero-Deception Guarantee</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              We never repaint scuffed bodies or conceal replaced chips. Condition grades (A+, Mint, Boxed) are stated
              with 100% honesty.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
            <h3 className="font-bold text-emerald-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>30-Day Testing Support</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Test your battery, SSD, and display. If any internal component fails, we replace or repair it at our
              shop without hassle.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
            <h3 className="font-bold text-amber-900 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-700" />
              <span>Direct Wholesale Wing</span>
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Shop #3-A on the 4th Floor is exclusively dedicated to retail testing, carton lots, B2B procurement, and commercial tax
              invoices.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WarrantyView: React.FC = () => {
  const { language } = useApp();
  const isUrdu = language === 'ur';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Customer Protection
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
          Warranty, Testing & Replacement Policy
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Clear, honest, and straightforward warranty terms for walk-in and online Pakistani buyers
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        {/* Section 1: Used/Refurbished */}
        <div className="space-y-3 pb-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            <span>1. Used & Certified Refurbished Machines (30-Day Checking Warranty)</span>
          </h2>
          <p>
            Every used laptop, mini PC, and desktop sold by Soft Impex Traders includes our standard{' '}
            <strong>30-Day Checking Warranty</strong> starting from the date of physical collection or courier
            delivery.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs">
            <li>Motherboard, processor, RAM, and internal SSD functionality.</li>
            <li>Charging port, DC jack, and original power adapter.</li>
            <li>Keyboard keys, trackpad, webcam, and internal speakers.</li>
            <li>Battery backup guaranteed as described (minimum 3 to 4+ hours on corporate models).</li>
          </ul>
        </div>

        {/* Section 2: Brand New Units */}
        <div className="space-y-3 pb-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>2. Brand New Sealed Pack Units (1 Year Official Warranty)</span>
          </h2>
          <p>
            Brand new products (Apple MacBooks, Asus ROG, TP-Link, Samsung Monitors, HP Printers, Hikvision CCTV) carry
            their official <strong>1 Year Manufacturer or Local Distributor Warranty</strong>. Warranty claims can be
            processed directly through authorized brand centers or submitted at our Hafeez Centre counter.
          </p>
        </div>

        {/* Section 3: Exclusions */}
        <div className="space-y-3 pb-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 text-rose-700">
            <AlertCircle className="w-5 h-5 text-rose-600" />
            <span>3. What is NOT Covered Under Warranty</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-xs">
            <li>Physical accidental damage (cracked screen, broken casing from drops).</li>
            <li>Liquid spills (water, tea, or soda on keyboard or internals).</li>
            <li>Electrical burn due to unstable household WAPDA voltage or faulty local extension boards.</li>
            <li>Unauthorized tampering or removal of our shop security warranty sticker.</li>
          </ul>
        </div>

        {/* Section 4: Return & Claim Process */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900">4. How to Claim Warranty or Replacement</h2>
          <p className="text-xs">
            <strong>For Lahore Residents:</strong> Bring the machine along with your purchase invoice to Shop #3-A,
            4th Floor, Hafeez Centre for immediate on-spot diagnosis.
          </p>
          <p className="text-xs">
            <strong>For Outside Lahore (Karachi, Islamabad, KPK, etc.):</strong> Send a WhatsApp video showing the issue
            to <strong>+92 321 4621777</strong>. Our technical team will guide you to safely courier the parcel to our
            Hafeez Centre address for free repair or unit replacement.
          </p>
        </div>
      </div>
    </div>
  );
};

export const ContactView: React.FC = () => {
  const { showNotification } = useApp();
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMsg, setFormMsg] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Thank you! Your message has been sent to our Hafeez Centre team.');
    setFormName('');
    setFormPhone('');
    setFormMsg('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Visit Us or Contact Soft Impex Traders
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Located in the heart of Hafeez Centre, Main Boulevard, Gulberg III, Lahore, Pakistan
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Shop Addresses & Counters
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Retail & Testing Shop:</div>
                  <div className="text-slate-600">Shop #3-A, 4th Floor, Hafeez Centre</div>
                  <div className="text-[11px] text-slate-400">Main Boulevard, Gulberg III, Lahore</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Wholesale & Container Dispatches:</div>
                  <div className="text-slate-600">Shop #3-A, 4th Floor, Hafeez Centre</div>
                  <div className="text-[11px] text-slate-400">Bulk Carton Lots & Dealer Counter</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Phone & WhatsApp:</div>
                  <div className="font-mono text-slate-800 font-bold">{SHOP_INFO.phone}</div>
                  <div className="font-mono text-slate-500">Landline: {SHOP_INFO.landline}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Email Address:</div>
                  <div className="text-slate-700">{SHOP_INFO.email}</div>
                  <div className="text-slate-400 font-mono">{SHOP_INFO.domain}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Store Timings:</div>
                  <div className="text-slate-700">Mon – Sat: 11:00 AM – 10:00 PM</div>
                  <div className="text-[11px] text-slate-500">Friday Prayer Break: 1:00 PM – 2:30 PM</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <a
                href={`https://wa.me/${SHOP_INFO.whatsapp}?text=${encodeURIComponent(
                  'Asalam-o-Alaikum Soft Impex Traders, I am visiting Hafeez Centre and need shop directions.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Shop Representative</span>
              </a>
            </div>
          </div>
        </div>

        {/* Map / Directions & Message Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Simulated Google Maps Display */}
          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-6 text-white space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-400">Hafeez Centre Location Map</span>
              <span className="text-emerald-400 font-medium">Verified Physical Shop</span>
            </div>

            <div className="h-52 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
              <MapPin className="w-12 h-12 text-rose-500 animate-bounce" />
              <div className="font-black text-base mt-2">Hafeez Centre, Gulberg III, Lahore</div>
              <div className="text-xs text-slate-400">Shop #3-A, 4th Floor, Hafeez Centre</div>
              <div className="mt-3 flex gap-2">
                <a
                  href="https://maps.google.com/?q=Hafeez+Centre+Lahore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-white block">By Road / Car:</strong>
                Main Boulevard Gulberg, near Liberty Chowk and Siddiq Trade Center.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-white block">By Metro / Bus:</strong>
                Kalma Chowk or Siddiq Trade Center station within 5 minutes walking distance.
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Send an Inquiry or Message</h3>
            <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Full name"
                    className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full p-2.5 border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Your Inquiry / Message *</label>
                <textarea
                  required
                  rows={3}
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="Ask about laptop models, prices, wholesale cartons, or warranty..."
                  className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 px-5 rounded-lg text-xs"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQView: React.FC = () => {
  const { language } = useApp();
  const isUrdu = language === 'ur';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
          Frequently Asked Questions
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
          {isUrdu ? 'اکثر پوچھے جانے والے سوالات' : 'Everything You Need to Know'}
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Questions regarding Hafeez Centre shopping, testing warranties, nationwide COD, and wholesale
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-2 text-xs"
          >
            <h3 className="font-bold text-slate-900 text-sm flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <span>{isUrdu ? faq.qUrdu : faq.q}</span>
            </h3>
            <p className="text-slate-600 pl-6 leading-relaxed">
              {isUrdu ? faq.aUrdu : faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

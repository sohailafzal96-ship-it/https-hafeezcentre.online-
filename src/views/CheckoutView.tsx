import React, { useState } from 'react';
import {
  Truck,
  Building2,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  MapPin,
  Clock,
  ArrowRight,
  MessageCircle,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOP_INFO, PAKISTAN_CITIES } from '../data/mockData';
import { PaymentMethod } from '../types';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    createOrder,
    formatPKR,
    setCurrentView,
    setSelectedOrder,
    showNotification,
    language,
  } = useApp();

  const isUrdu = language === 'ur';

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(PAKISTAN_CITIES[0].name);
  const [deliveryType, setDeliveryType] = useState<'courier' | 'pickup'>('courier');
  const [companyName, setCompanyName] = useState('');
  const [ntn, setNtn] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-800">Your cart is empty</h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-blue-800 text-white font-bold px-6 py-2 rounded-lg text-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // Calculate shipping cost
  const selectedCityObj = PAKISTAN_CITIES.find((c) => c.name === city) || PAKISTAN_CITIES[0];
  const shippingFee = deliveryType === 'pickup' ? 0 : selectedCityObj.shippingFee;
  const grandTotal = cartSubtotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || (deliveryType === 'courier' && !address.trim())) {
      showNotification('Please fill in all required customer and address details.');
      return;
    }

    const orderItems = cart.map((item) => ({
      productId: item.product.id,
      title: item.product.title,
      sku: item.product.sku,
      condition: item.product.condition,
      price: item.unitPrice,
      quantity: item.quantity,
      total: item.unitPrice * item.quantity,
    }));

    const newOrder = createOrder({
      customer: {
        name,
        phone,
        whatsapp: whatsapp || phone,
        email: email || 'customer@hafeezcentre.online',
        address: deliveryType === 'pickup' ? 'Shop #3-A, 4th Floor, Hafeez Centre, Gulberg III, Lahore (Self-Pickup)' : address,
        city,
        province: selectedCityObj.province,
        companyName: companyName || undefined,
        ntn: ntn || undefined,
        notes: notes || undefined,
      },
      items: orderItems,
      subtotal: cartSubtotal,
      shippingFee,
      discount: 0,
      total: grandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'shop_pickup' || paymentMethod === 'cod' ? 'unpaid' : 'unpaid',
      orderStatus: 'confirmed',
      courier:
        deliveryType === 'pickup'
          ? 'Hafeez Centre Shop Pickup'
          : city === 'Lahore'
          ? 'Lahore Express Bike Courier'
          : 'Trax / TCS Courier Express',
      trackingNumber: `TRX-${Math.floor(1000000 + Math.random() * 9000000)}`,
      notes,
    });

    setSelectedOrder(newOrder);
    setCurrentView('track-order');
    showNotification(`Order ${newOrder.orderNumber} placed successfully!`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {isUrdu ? 'آرڈر مکمل کریں اور ادائیگی' : 'Checkout & Pakistan Shipping'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Fast dispatch from Hafeez Centre Lahore with nationwide verification & SMS/WhatsApp updates
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Details (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Delivery Method Option */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs">
                1
              </span>
              <span>Delivery or In-Store Pickup Option</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div
                onClick={() => setDeliveryType('courier')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                  deliveryType === 'courier'
                    ? 'border-blue-700 bg-blue-50/50 text-blue-950 font-bold'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-blue-700" />
                    <span>Courier Delivery Across Pakistan</span>
                  </div>
                  {deliveryType === 'courier' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
                </div>
                <p className="text-slate-500 font-normal text-[11px] mt-1">
                  Trax / TCS Express courier to your home or office address with Cash on Delivery.
                </p>
              </div>

              <div
                onClick={() => {
                  setDeliveryType('pickup');
                  setCity('Lahore');
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                  deliveryType === 'pickup'
                    ? 'border-blue-700 bg-blue-50/50 text-blue-950 font-bold'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Pick up from Hafeez Centre (Free)</span>
                  </div>
                  {deliveryType === 'pickup' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
                </div>
                <p className="text-slate-500 font-normal text-[11px] mt-1">
                  Test and inspect unit in person at Shop #3-A, 4th Floor, Hafeez Centre Lahore. Zero shipping fee.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Customer Contact & Shipping Address */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs">
                2
              </span>
              <span>Customer Information & Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sohail Afzal / Usman Ali"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-blue-700 bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Active Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300 1234567"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-blue-700 bg-white font-mono"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Courier will call on this number for delivery
                </span>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="0300 1234567 (for dispatch video)"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-blue-700 bg-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@gmail.com"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-blue-700 bg-white"
                />
              </div>
            </div>

            {/* City Selection & Address (only if courier) */}
            {deliveryType === 'courier' && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">City in Pakistan *</label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-blue-700 bg-white font-medium"
                    >
                      {PAKISTAN_CITIES.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name} ({c.province}) - Rs. {c.shippingFee}
                        </option>
                      ))}
                    </select>
                    <span className="text-[10px] text-emerald-700 font-medium block mt-1">
                      Estimated Delivery Time: {selectedCityObj.deliveryTime}
                    </span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Postal Code (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 54000"
                      className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-blue-700 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">
                    Complete Street Address (House/Plaza/Floor/Sector) *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Office #304, 3rd Floor, Al-Hafeez Heights, Gulberg III / House #12, Street 4, Sector F-8/2"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:border-blue-700 bg-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* Optional Corporate Procurement details for Tax Invoice */}
            <div className="pt-2 border-t border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    Company / School Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="For GST/NTN Tax Bill"
                    className="w-full p-2.5 border border-slate-300 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">NTN Number (Optional)</label>
                  <input
                    type="text"
                    value={ntn}
                    onChange={(e) => setNtn(e.target.value)}
                    placeholder="e.g. 1234567-8"
                    className="w-full p-2.5 border border-slate-300 rounded-lg bg-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-medium text-xs mb-1">Special Order Instructions</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Please install extra 16GB RAM or Windows 11 Pro before packing"
                className="w-full p-2.5 border border-slate-300 rounded-lg bg-white text-xs"
              />
            </div>
          </div>

          {/* Step 3: Payment Method in Pakistan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs">
                3
              </span>
              <span>Select Payment Method</span>
            </h3>

            <div className="space-y-3 text-xs">
              {/* Option A: Cash on Delivery */}
              <label
                className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                  paymentMethod === 'cod'
                    ? 'border-blue-700 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-blue-700"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <span>Cash on Delivery (COD)</span>
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded">
                      Most Popular
                    </span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    Pay the courier delivery rider in cash upon receiving your hardware parcel. Available in all
                    Pakistani cities.
                  </p>
                </div>
              </label>

              {/* Option B: Direct Bank Transfer (Meezan / Standard Chartered) */}
              <label
                className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-blue-700 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="mt-1 accent-blue-700"
                />
                <div className="w-full">
                  <div className="font-bold text-slate-900 text-sm">
                    Direct Bank Transfer (Meezan Bank & Standard Chartered IBAN)
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    Transfer online from your mobile banking app directly to Soft Impex Traders official business accounts.
                  </p>

                  {paymentMethod === 'bank_transfer' && (
                    <div className="mt-3 p-3 rounded-lg bg-white border border-blue-200 text-slate-800 space-y-2 text-[11px]">
                      <div className="font-bold text-blue-900">1. Meezan Bank Limited</div>
                      <div className="font-mono text-xs">
                        Account: {SHOP_INFO.bankAccounts[0].accountNumber} • Title:{' '}
                        {SHOP_INFO.bankAccounts[0].accountTitle}
                      </div>
                      <div className="font-mono text-slate-500">IBAN: {SHOP_INFO.bankAccounts[0].iban}</div>

                      <div className="font-bold text-blue-900 pt-1">2. Standard Chartered Bank</div>
                      <div className="font-mono text-xs">
                        Account: {SHOP_INFO.bankAccounts[1].accountNumber} • Title:{' '}
                        {SHOP_INFO.bankAccounts[1].accountTitle}
                      </div>
                      <div className="font-mono text-slate-500">IBAN: {SHOP_INFO.bankAccounts[1].iban}</div>

                      <p className="text-[10px] text-amber-700 font-semibold pt-1">
                        * Please send a screenshot of the transfer receipt on WhatsApp ({SHOP_INFO.phone}) along with your
                        order number for instant packing.
                      </p>
                    </div>
                  )}
                </div>
              </label>

              {/* Option C: JazzCash / Easypaisa */}
              <label
                className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                  paymentMethod === 'jazzcash'
                    ? 'border-blue-700 bg-blue-50/50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="jazzcash"
                  checked={paymentMethod === 'jazzcash'}
                  onChange={() => setPaymentMethod('jazzcash')}
                  className="mt-1 accent-blue-700"
                />
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    JazzCash & Easypaisa (Merchant Till / Mobile)
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    Quick wallet transfer to <strong>0321 4621777</strong> (Title: Soft Impex Traders).
                  </p>
                </div>
              </label>

              {/* Option D: Shop Counter Cash/Card on Pickup */}
              {deliveryType === 'pickup' && (
                <label
                  className={`p-4 rounded-xl border-2 flex items-start gap-3 cursor-pointer transition ${
                    paymentMethod === 'shop_pickup'
                      ? 'border-blue-700 bg-blue-50/50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="shop_pickup"
                    checked={paymentMethod === 'shop_pickup'}
                    onChange={() => setPaymentMethod('shop_pickup')}
                    className="mt-1 accent-blue-700"
                  />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      Pay at Shop Counter (Cash / Card POS)
                    </div>
                    <p className="text-slate-500 mt-0.5">
                      Pay at Shop #3-A, 4th Floor, Hafeez Centre after you inspect and test your item.
                    </p>
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Confirmation Box (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
              Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-2 first:pt-0 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-bold text-slate-800 truncate">{item.product.title}</div>
                    <div className="text-[11px] text-slate-500">
                      Qty: {item.quantity} × {formatPKR(item.unitPrice)}
                    </div>
                  </div>
                  <div className="font-bold text-slate-900 whitespace-nowrap">
                    {formatPKR(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">{formatPKR(cartSubtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Shipping ({deliveryType === 'pickup' ? 'Shop Pickup' : city})</span>
                <span className="font-bold text-slate-900">
                  {shippingFee === 0 ? 'FREE' : formatPKR(shippingFee)}
                </span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="text-base font-black text-slate-900">Total Payable</span>
                <span className="text-[10px] text-slate-400 block">Includes packing & insurance</span>
              </div>
              <div className="text-2xl font-black text-blue-900">{formatPKR(grandTotal)}</div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-blue-900/30 cursor-pointer"
            >
              <span>Confirm & Place Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>30-Day Physical Checking Warranty Included</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Our team will confirm your order via phone/WhatsApp call before courier dispatch.</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

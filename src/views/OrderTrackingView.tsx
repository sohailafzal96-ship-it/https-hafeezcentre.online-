import React, { useState } from 'react';
import {
  Search,
  Printer,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Building2,
  MessageCircle,
  FileText,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOP_INFO } from '../data/mockData';
import { Order } from '../types';

export const OrderTrackingView: React.FC = () => {
  const { orders, findOrder, selectedOrder, setSelectedOrder, formatPKR, language } = useApp();
  const [searchInput, setSearchInput] = useState(selectedOrder ? selectedOrder.orderNumber : '');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(selectedOrder || (orders[0] || null));
  const [errorMessage, setErrorMessage] = useState('');

  const isUrdu = language === 'ur';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!searchInput.trim()) return;

    const found = findOrder(searchInput);
    if (found) {
      setSearchedOrder(found);
      setSelectedOrder(found);
    } else {
      setErrorMessage(`No order found matching "${searchInput}". Please check your order ID or phone number.`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const getStepStatus = (step: number, status: Order['orderStatus']) => {
    const statusLevels: Record<Order['orderStatus'], number> = {
      pending: 1,
      confirmed: 2,
      dispatched: 4,
      delivered: 5,
      cancelled: 0,
    };
    const currentLevel = statusLevels[status] || 1;
    if (currentLevel >= step) return 'completed';
    if (currentLevel === step - 1) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Search Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4 print:hidden">
        <div className="max-w-xl">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isUrdu ? 'آرڈر ٹریکنگ اور انوائس' : 'Order Tracking & Official Tax Invoice'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your Soft Impex Traders order ID (e.g. <span className="font-mono font-bold">ST-2026-8941</span>) or
            your mobile phone number.
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. ST-2026-8941 or 03214567890"
              className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-700 bg-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-6 py-2.5 rounded-lg text-xs transition"
          >
            Track Order
          </button>
        </form>

        {errorMessage && (
          <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
            {errorMessage}
          </div>
        )}
      </div>

      {searchedOrder && (
        <div className="space-y-8">
          {/* Visual Order Timeline (Screen Only) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs print:hidden space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs text-slate-400">Order Number:</span>
                <div className="text-lg font-black text-slate-900 font-mono">
                  {searchedOrder.orderNumber}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 uppercase tracking-wide">
                  Status: {searchedOrder.orderStatus}
                </span>
                <button
                  onClick={handlePrint}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
              {/* Step 1 */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    getStepStatus(1, searchedOrder.orderStatus) === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Order Placed</div>
                  <div className="text-[10px] text-slate-400">{searchedOrder.date}</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    getStepStatus(2, searchedOrder.orderStatus) === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Shop Verification</div>
                  <div className="text-[10px] text-slate-400">Hafeez Centre Counter</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    getStepStatus(3, searchedOrder.orderStatus) === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-blue-600 text-white animate-pulse'
                  }`}
                >
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Tested & Packed</div>
                  <div className="text-[10px] text-slate-400">14-Point Diagnostic</div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex sm:flex-col items-center sm:text-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                    getStepStatus(4, searchedOrder.orderStatus) === 'completed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Courier Dispatch</div>
                  <div className="text-[10px] font-mono text-blue-700 font-bold">
                    {searchedOrder.trackingNumber || 'Pending'}
                  </div>
                </div>
              </div>
            </div>

            {/* Courier Details Info Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-slate-500 font-medium">Assigned Courier:</span>{' '}
                <strong className="text-slate-900">{searchedOrder.courier}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Tracking Code:</span>{' '}
                <strong className="text-blue-800 font-mono">{searchedOrder.trackingNumber}</strong>
              </div>
              <a
                href={`https://wa.me/${SHOP_INFO.whatsapp}?text=${encodeURIComponent(
                  `Asalam-o-Alaikum Soft Impex Traders, I am checking on the status of my order ${searchedOrder.orderNumber}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Shop for Live Update</span>
              </a>
            </div>
          </div>

          {/* Printable Official Tax Invoice Slip */}
          <div className="bg-white rounded-2xl border border-slate-300 p-8 sm:p-10 shadow-md space-y-6 print:border-none print:shadow-none print:p-0">
            {/* Header: Shop details & NTN */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b-2 border-slate-900">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded bg-blue-900 text-white font-black text-base tracking-tighter flex items-center justify-center shrink-0">
                    SIT
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 whitespace-nowrap">
                      SOFT IMPEX TRADERS
                    </h2>
                    <p className="text-xs text-slate-500">
                      Hafeez Centre IT Hardware & Wholesale Hub
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-600 space-y-0.5">
                  <p>{SHOP_INFO.address}</p>
                  <p>Tel: {SHOP_INFO.landline} | Mobile/WhatsApp: {SHOP_INFO.phone}</p>
                  <p>Email: {SHOP_INFO.email} | Web: {SHOP_INFO.domain}</p>
                </div>
              </div>

              {/* Tax & Invoice Number */}
              <div className="text-left sm:text-right space-y-1 text-xs">
                <span className="inline-block bg-slate-900 text-white font-black px-3 py-1 text-xs uppercase tracking-wider rounded">
                  Commercial Tax Invoice
                </span>
                <div className="text-base font-black text-slate-900 font-mono mt-1">
                  Invoice #: {searchedOrder.orderNumber}
                </div>
                <div className="text-slate-500">Date: {searchedOrder.date}</div>
              </div>
            </div>

            {/* Bill To & Ship To Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs pb-4 border-b border-slate-200">
              <div>
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block mb-1">
                  Billed & Shipped To:
                </span>
                <div className="font-bold text-slate-900 text-sm">{searchedOrder.customer.name}</div>
                {searchedOrder.customer.companyName && (
                  <div className="font-bold text-blue-900">{searchedOrder.customer.companyName}</div>
                )}
                {searchedOrder.customer.ntn && (
                  <div className="font-mono text-slate-600">NTN: {searchedOrder.customer.ntn}</div>
                )}
                <div className="text-slate-700 mt-1">{searchedOrder.customer.address}</div>
                <div className="text-slate-700">
                  {searchedOrder.customer.city}, {searchedOrder.customer.province}
                </div>
                <div className="text-slate-700 mt-1 font-mono">
                  Phone: {searchedOrder.customer.phone}
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider block mb-1">
                  Shipping & Payment Terms:
                </span>
                <div>
                  <strong>Courier:</strong> {searchedOrder.courier}
                </div>
                <div>
                  <strong>Payment Method:</strong>{' '}
                  <span className="uppercase font-semibold">{searchedOrder.paymentMethod.replace('_', ' ')}</span>
                </div>
                <div>
                  <strong>Payment Status:</strong>{' '}
                  <span className="uppercase font-bold text-emerald-700">
                    {searchedOrder.paymentStatus}
                  </span>
                </div>
                {searchedOrder.notes && (
                  <div className="text-slate-500 italic mt-2">Note: {searchedOrder.notes}</div>
                )}
              </div>
            </div>

            {/* Itemized Table */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Product Description</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Condition</th>
                    <th className="p-3 text-right">Unit Price (PKR)</th>
                    <th className="p-3 text-center">Qty</th>
                    <th className="p-3 text-right">Total (PKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {searchedOrder.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 text-slate-500">{idx + 1}</td>
                      <td className="p-3 font-bold text-slate-900">{item.title}</td>
                      <td className="p-3 font-mono text-slate-500">{item.sku}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold">
                          {item.condition}
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono">{formatPKR(item.price)}</td>
                      <td className="p-3 text-center font-bold">{item.quantity}</td>
                      <td className="p-3 text-right font-bold text-slate-900 font-mono">
                        {formatPKR(item.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations & Total */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-2">
              <div className="max-w-md text-[11px] text-slate-500 space-y-1">
                <div className="font-bold text-slate-800">Warranty & Checking Note:</div>
                <p>
                  Used and refurbished items carry a 30-Day Physical Checking Warranty from Soft Impex Traders.
                  Please inspect parcel packaging upon courier receipt. In case of any dispute or technical failure,
                  contact our Hafeez Centre support team within 30 days with this invoice copy.
                </p>
              </div>

              <div className="w-full sm:w-64 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {formatPKR(searchedOrder.subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Fee:</span>
                  <span className="font-bold text-slate-900 font-mono">
                    {searchedOrder.shippingFee === 0 ? 'FREE' : formatPKR(searchedOrder.shippingFee)}
                  </span>
                </div>
                {searchedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount:</span>
                    <span className="font-bold font-mono">-{formatPKR(searchedOrder.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t-2 border-slate-900 text-sm font-black text-slate-900">
                  <span>Total Payable:</span>
                  <span className="font-mono text-blue-900">{formatPKR(searchedOrder.total)}</span>
                </div>
              </div>
            </div>

            {/* Signature & Stamp */}
            <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
              <div>
                <p className="font-bold text-slate-800">Soft Impex Traders (Authorized Signatory)</p>
                <div className="w-40 border-b border-dashed border-slate-400 mt-8"></div>
                <p className="text-[10px] text-slate-400 mt-1">Hafeez Centre Lahore, Pakistan</p>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-slate-400">Computer Generated Tax Invoice • No signature required</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

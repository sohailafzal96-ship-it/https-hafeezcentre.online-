import React, { useState } from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  Tag,
  MessageCircle,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SHOP_INFO } from '../data/mockData';

export const CartView: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    formatPKR,
    setCurrentView,
    language,
    showNotification,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [appliedCouponCode, setAppliedCouponCode] = useState<string>('');

  const isUrdu = language === 'ur';

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponInput.trim().toUpperCase();
    if (clean === 'HAFEEZ1000') {
      setAppliedDiscount(1000);
      setAppliedCouponCode('HAFEEZ1000');
      showNotification('Coupon HAFEEZ1000 applied! Rs. 1,000 discount granted.');
    } else if (clean === 'WELCOMEPAK') {
      const disc = Math.round(cartSubtotal * 0.05);
      setAppliedDiscount(disc);
      setAppliedCouponCode('WELCOMEPAK (5% Off)');
      showNotification(`Coupon WELCOMEPAK applied! ${formatPKR(disc)} discount granted.`);
    } else {
      showNotification('Invalid or expired coupon code.');
    }
  };

  const grandTotal = Math.max(0, cartSubtotal - appliedDiscount);

  // Generate WhatsApp order message for entire cart
  const handleWhatsAppCartOrder = () => {
    if (cart.length === 0) return;
    const itemsList = cart
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.title} (x${item.quantity}) - ${formatPKR(
            item.unitPrice * item.quantity
          )} [Condition: ${item.product.condition}]`
      )
      .join('\n');

    const msg = `Asalam-o-Alaikum Soft Impex Traders (Hafeez Centre),
I want to place an order for the following items:
${itemsList}

Subtotal: ${formatPKR(cartSubtotal)}
${appliedDiscount > 0 ? `Discount: -${formatPKR(appliedDiscount)}\n` : ''}Total Amount: ${formatPKR(
      grandTotal
    )}

Please confirm stock availability and dispatch time.`;

    window.open(`https://wa.me/${SHOP_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-800">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore our wide collection of laptops, desktops, storage, and networking hardware from Hafeez Centre.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-6 py-2.5 rounded-lg text-xs transition inline-flex items-center gap-1.5"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {isUrdu ? 'آپ کا شاپنگ کارٹ' : 'Your Shopping Cart'}
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review your items before proceeding to Pakistan courier delivery or in-shop pickup
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart items table (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.isWholesale}`}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Image + Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-blue-800 uppercase">
                        {item.product.brand}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold">
                        {item.product.condition}
                      </span>
                      {item.isWholesale && (
                        <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                          Wholesale Rate
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                      {isUrdu ? item.product.titleUrdu : item.product.title}
                    </h4>

                    <div className="text-xs text-slate-500 mt-1">
                      Unit Price: <span className="font-bold text-slate-800">{formatPKR(item.unitPrice)}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity Controls & Line Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 text-slate-600 hover:bg-slate-100 transition"
                      title="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900 font-mono">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 text-slate-600 hover:bg-slate-100 transition"
                      title="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[90px]">
                    <div className="text-sm font-black text-slate-900">
                      {formatPKR(item.unitPrice * item.quantity)}
                    </div>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Buttons: Continue Shopping & Clear */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentView('shop')}
              className="text-xs font-bold text-blue-700 hover:underline"
            >
              ← Continue Shopping
            </button>
            <button
              onClick={clearCart}
              className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Entire Cart</span>
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary & Checkout Box (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <h3 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            {/* Subtotal */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Cart Subtotal</span>
                <span className="font-bold text-slate-900">{formatPKR(cartSubtotal)}</span>
              </div>

              {appliedDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-semibold">
                  <span>Discount ({appliedCouponCode})</span>
                  <span>-{formatPKR(appliedDiscount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-600">
                <span>Shipping / Courier</span>
                <span className="text-[11px] text-slate-500">Calculated at Checkout</span>
              </div>
            </div>

            {/* Promo Code Box */}
            <form onSubmit={handleApplyCoupon} className="pt-2 border-t border-slate-100">
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">
                Have a Voucher or Dealer Code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. HAFEEZ1000"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 p-2 text-xs border border-slate-300 rounded-lg uppercase font-mono"
                />
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-2 rounded-lg text-xs transition"
                >
                  Apply
                </button>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Try code <span className="font-mono font-bold text-blue-700">HAFEEZ1000</span> for Rs. 1,000 off!
              </span>
            </form>

            {/* Total */}
            <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <span className="font-black text-slate-900 text-base">Estimated Total</span>
                <span className="text-[10px] text-slate-400 block">Excluding shipping charges</span>
              </div>
              <div className="text-xl font-black text-blue-900">{formatPKR(grandTotal)}</div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-black py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppCartOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order Entire Cart on WhatsApp</span>
              </button>
            </div>

            {/* Trust Assurance Badge */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>30-Day Hafeez Centre Checking Warranty</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Truck className="w-3.5 h-3.5" />
                <span>Cash on Delivery (COD) across all cities</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

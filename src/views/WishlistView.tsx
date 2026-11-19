import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistView: React.FC = () => {
  const { wishlist, products, setCurrentView, toggleWishlist } = useApp();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-500">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-800">Your Wishlist is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Save your favourite laptops, PCs, or accessories to track prices and order later.
        </p>
        <button
          onClick={() => setCurrentView('shop')}
          className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-6 py-2.5 rounded-lg text-xs transition inline-flex items-center gap-1.5"
        >
          <span>Browse Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Saved Wishlist ({wishlistedProducts.length})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Your saved IT hardware ready for cart addition or WhatsApp inquiry
          </p>
        </div>
        <button
          onClick={() => setCurrentView('shop')}
          className="text-xs font-bold text-blue-700 hover:underline"
        >
          + Continue Browsing
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistedProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

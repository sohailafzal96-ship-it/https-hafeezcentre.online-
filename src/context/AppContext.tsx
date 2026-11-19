import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Review,
  WholesaleQuoteRequest,
  BlogPost,
  ViewMode,
  CategoryKey,
  Condition,
} from '../types';
import { INITIAL_PRODUCTS, MOCK_REVIEWS, SHOP_INFO, BLOG_POSTS } from '../data/mockData';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  compareList: string[];
  recentlyViewed: string[];
  orders: Order[];
  wholesaleInquiries: WholesaleQuoteRequest[];
  reviews: Review[];
  dealerMode: boolean;
  language: 'en' | 'ur';
  currentView: ViewMode;
  selectedProduct: Product | null;
  selectedBlogPost: BlogPost | null;
  selectedOrder: Order | null;
  searchQuery: string;
  selectedCategory: CategoryKey | 'all';
  selectedCondition: Condition | 'all';
  selectedBrand: string | 'all';
  notification: string | null;

  // Actions
  setLanguage: (lang: 'en' | 'ur') => void;
  setDealerMode: (enabled: boolean) => void;
  setCurrentView: (view: ViewMode) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSelectedBlogPost: (post: BlogPost | null) => void;
  setSelectedOrder: (order: Order | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: CategoryKey | 'all') => void;
  setSelectedCondition: (cond: Condition | 'all') => void;
  setSelectedBrand: (brand: string | 'all') => void;
  showNotification: (msg: string) => void;

  // Cart
  addToCart: (product: Product, quantity?: number, isWholesale?: boolean) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Wishlist & Compare
  toggleWishlist: (productId: string) => void;
  toggleCompare: (productId: string) => void;
  clearCompare: () => void;
  addRecentlyViewed: (productId: string) => void;

  // Orders & Inquiries
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'date'>) => Order;
  findOrder: (query: string) => Order | undefined;
  createWholesaleInquiry: (inquiry: Omit<WholesaleQuoteRequest, 'id' | 'date' | 'status'>) => void;
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Admin Catalog Management
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetDefaultCatalog: () => void;
  bulkImportProducts: (importedProducts: Product[]) => void;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], tracking?: string) => void;

  // Helpers
  formatPKR: (val: number) => string;
  getWhatsAppOrderUrl: (product: Product, note?: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'ST-2026-8941',
    date: '2026-11-06 14:32',
    customer: {
      name: 'Muhammad Kashif',
      phone: '03214567890',
      whatsapp: '03214567890',
      email: 'kashif.it@example.com',
      address: 'House #45, Street 8, Sector G-11/2',
      city: 'Islamabad',
      province: 'Federal',
      companyName: 'Vertex Software House',
      ntn: '4920182-1',
    },
    items: [
      {
        productId: 'prod-001',
        title: 'Dell Latitude 7400 Core i7 8th Gen (16GB / 512GB SSD)',
        sku: 'DELL-LAT-7400-I7',
        condition: 'Used',
        price: 68500,
        quantity: 2,
        total: 137000,
      },
    ],
    subtotal: 137000,
    shippingFee: 450,
    discount: 1000,
    couponCode: 'HAFEEZ1000',
    total: 136450,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'verified',
    orderStatus: 'dispatched',
    courier: 'Trax Courier',
    trackingNumber: 'TRX-PK-8910245',
    notes: 'Please verify original Dell charger in parcel box.',
  },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('softimpex_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('softimpex_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('softimpex_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['prod-001', 'prod-003'];
  });

  // Compare
  const [compareList, setCompareList] = useState<string[]>([]);

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(['prod-001', 'prod-002']);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('softimpex_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SAMPLE_ORDERS;
  });

  // Wholesale inquiries
  const [wholesaleInquiries, setWholesaleInquiries] = useState<WholesaleQuoteRequest[]>(() => {
    try {
      const saved = localStorage.getItem('softimpex_rfqs');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'rfq-01',
        companyName: 'Apex Tech Solutions',
        contactPerson: 'Saad Rafique',
        phone: '03009988776',
        whatsapp: '03009988776',
        email: 'procurement@apextech.pk',
        city: 'Lahore',
        natureOfBusiness: 'Software House / IT',
        itemsRequired: '25x Dell OptiPlex Mini PCs + 25x 24-inch IPS Monitors',
        estimatedQuantity: 25,
        budgetPKR: 'Rs. 2,000,000 - 2,500,000',
        date: '2026-11-08',
        status: 'Contacted',
      },
    ];
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('softimpex_reviews');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return MOCK_REVIEWS;
  });

  // UI state
  const [dealerMode, setDealerMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | 'all'>('all');
  const [selectedCondition, setSelectedCondition] = useState<Condition | 'all'>('all');
  const [selectedBrand, setSelectedBrand] = useState<string | 'all'>('all');
  const [notification, setNotification] = useState<string | null>(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('softimpex_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('softimpex_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('softimpex_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('softimpex_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('softimpex_rfqs', JSON.stringify(wholesaleInquiries));
  }, [wholesaleInquiries]);

  useEffect(() => {
    localStorage.setItem('softimpex_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const formatPKR = (val: number): string => {
    return 'Rs. ' + Math.round(val).toLocaleString('en-PK');
  };

  const getWhatsAppOrderUrl = (product: Product, note?: string): string => {
    const text = encodeURIComponent(
      `Asalam-o-Alaikum Soft Impex Traders (Hafeez Centre),
I want to inquire/order:
📦 Product: ${product.title}
🏷️ SKU: ${product.sku}
💵 Price: ${formatPKR(dealerMode ? product.wholesalePrice : product.price)}
📌 Condition: ${product.condition} (${product.grade || ''})
${note ? `💬 Note: ${note}` : ''}
🔗 Link: https://${SHOP_INFO.domain}/product/${product.slug}`
    );
    return `https://wa.me/${SHOP_INFO.whatsapp}?text=${text}`;
  };

  // Cart actions
  const addToCart = (product: Product, quantity = 1, isWholesale = false) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.isWholesale === isWholesale);
      const unitPrice = isWholesale ? product.wholesalePrice : product.price;
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.isWholesale === isWholesale
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, isWholesale, unitPrice }];
    });
    showNotification(`Added ${product.title.slice(0, 30)}... to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showNotification('Removed from Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showNotification('Saved to Wishlist');
        return [...prev, productId];
      }
    });
  };

  // Compare
  const toggleCompare = (productId: string) => {
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        showNotification('Removed from comparison');
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        showNotification('You can compare a maximum of 4 products at once.');
        return prev;
      }
      showNotification('Added to comparison');
      return [...prev, productId];
    });
  };

  const clearCompare = () => setCompareList([]);

  const addRecentlyViewed = (productId: string) => {
    setRecentlyViewed((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, 8));
  };

  // Orders
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'date'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `ST-2026-${randomSuffix}`,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const findOrder = (query: string): Order | undefined => {
    const clean = query.trim().toLowerCase();
    return orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === clean ||
        o.customer.phone.replace(/[\s-]/g, '').includes(clean) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase() === clean)
    );
  };

  const createWholesaleInquiry = (inquiry: Omit<WholesaleQuoteRequest, 'id' | 'date' | 'status'>) => {
    const newInquiry: WholesaleQuoteRequest = {
      ...inquiry,
      id: `rfq-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'Pending',
    };
    setWholesaleInquiries((prev) => [newInquiry, ...prev]);
    showNotification('Wholesale RFQ submitted! Our B2B Hafeez Centre team will contact you shortly.');
  };

  const addReview = (review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
    };
    setReviews((prev) => [newReview, ...prev]);
    showNotification('Thank you for reviewing your purchase at Soft Impex Traders!');
  };

  // Admin Catalog
  const addProduct = (p: Omit<Product, 'id'>) => {
    const newProd: Product = {
      ...p,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [newProd, ...prev]);
    showNotification('Product added to live catalog successfully!');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showNotification(`Product ${updated.sku} updated!`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showNotification('Product deleted from catalog');
  };

  const resetDefaultCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('softimpex_products');
    showNotification('Reset to factory default Hafeez Centre catalog.');
  };

  const bulkImportProducts = (imported: Product[]) => {
    setProducts((prev) => [...imported, ...prev]);
    showNotification(`Imported ${imported.length} products successfully!`);
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus'], tracking?: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              orderStatus: status,
              trackingNumber: tracking || ord.trackingNumber,
              paymentStatus: status === 'delivered' ? 'paid' : ord.paymentStatus,
            }
          : ord
      )
    );
    showNotification(`Order status updated to ${status}!`);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        compareList,
        recentlyViewed,
        orders,
        wholesaleInquiries,
        reviews,
        dealerMode,
        language,
        currentView,
        selectedProduct,
        selectedBlogPost,
        selectedOrder,
        searchQuery,
        selectedCategory,
        selectedCondition,
        selectedBrand,
        notification,

        setLanguage,
        setDealerMode,
        setCurrentView,
        setSelectedProduct,
        setSelectedBlogPost,
        setSelectedOrder,
        setSearchQuery,
        setSelectedCategory,
        setSelectedCondition,
        setSelectedBrand,
        showNotification,

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,

        toggleWishlist,
        toggleCompare,
        clearCompare,
        addRecentlyViewed,

        createOrder,
        findOrder,
        createWholesaleInquiry,
        addReview,

        addProduct,
        updateProduct,
        deleteProduct,
        resetDefaultCatalog,
        bulkImportProducts,
        updateOrderStatus,

        formatPKR,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

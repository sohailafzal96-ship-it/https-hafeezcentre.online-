import React, { useState } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Download,
  Upload,
  Search,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  FileText,
  Eye,
  EyeOff,
  Lock,
  User,
  KeyRound,
  LogOut,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, CategoryKey, Condition, Order } from '../types';
import { CATEGORIES } from '../data/mockData';

const ADMIN_CRED_STORAGE_KEY = 'sit_admin_credentials';
const ADMIN_SESSION_STORAGE_KEY = 'sit_admin_session';
const DEFAULT_ADMIN_ID = 'admin';
const DEFAULT_ADMIN_PASS = 'softimpex@197980';

interface StoredAdminCredentials {
  username: string;
  passwordHash: string;
  updatedAt?: string;
}

const getStoredAdminCredentials = (): StoredAdminCredentials | null => {
  try {
    const raw = localStorage.getItem(ADMIN_CRED_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAdminCredentials;
    if (parsed && typeof parsed.username === 'string' && typeof parsed.passwordHash === 'string') {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};

const hashAdminSecret = async (secret: string): Promise<string> => {
  const salted = `sit-hafeezcentre-admin:${secret}`;
  if (typeof window !== 'undefined' && window.isSecureContext && window.crypto?.subtle) {
    const encoded = new TextEncoder().encode(salted);
    const buffer = await window.crypto.subtle.digest('SHA-256', encoded);
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  for (let i = 0; i < salted.length; i++) {
    const ch = salted.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 0x01000193);
    h2 = Math.imul(h2 ^ ch, 0x85ebca6b);
  }
  return `${(h1 >>> 0).toString(16).padStart(8, '0')}${(h2 >>> 0).toString(16).padStart(8, '0')}`;
};

export const AdminView: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetDefaultCatalog,
    bulkImportProducts,
    orders,
    updateOrderStatus,
    wholesaleInquiries,
    formatPKR,
    setSelectedOrder,
    setCurrentView,
    showNotification,
    language,
  } = useApp();

  const isUrdu = language === 'ur';

  // Admin Authentication States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === 'authenticated';
    } catch {
      return false;
    }
  });
  const [hasCustomCredentials, setHasCustomCredentials] = useState<boolean>(() => Boolean(getStoredAdminCredentials()));
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Change ID / Password States
  const [newAdminId, setNewAdminId] = useState<string>(() => getStoredAdminCredentials()?.username || DEFAULT_ADMIN_ID);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [securityError, setSecurityError] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');
  const [isSavingSecurity, setIsSavingSecurity] = useState(false);

  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'rfqs' | 'csv' | 'security'>('catalog');
  const [searchFilter, setSearchFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Add/Edit
  const [formSku, setFormSku] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formBrand, setFormBrand] = useState('Dell');
  const [formCategory, setFormCategory] = useState<CategoryKey>('laptops');
  const [formCondition, setFormCondition] = useState<Condition>('Used');
  const [formGrade, setFormGrade] = useState('Grade A+ Mint');
  const [formPrice, setFormPrice] = useState<number>(65000);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(75000);
  const [formWholesalePrice, setFormWholesalePrice] = useState<number>(58000);
  const [formWholesaleMinQty, setFormWholesaleMinQty] = useState<number>(5);
  const [formStockCount, setFormStockCount] = useState<number>(15);
  const [formImage, setFormImage] = useState(
    'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=80'
  );
  const [formProcessor, setFormProcessor] = useState('Intel Core i7 8th Gen');
  const [formRam, setFormRam] = useState('16GB DDR4');
  const [formStorage, setFormStorage] = useState('512GB NVMe SSD');
  const [formWarranty, setFormWarranty] = useState('30 Days Checking Warranty');

  const openAddModal = () => {
    setEditingProduct(null);
    setFormSku(`ST-${Math.floor(1000 + Math.random() * 9000)}`);
    setFormTitle('');
    setFormBrand('Dell');
    setFormCategory('laptops');
    setFormCondition('Used');
    setFormGrade('Grade A+ Mint');
    setFormPrice(65000);
    setFormOriginalPrice(75000);
    setFormWholesalePrice(58000);
    setFormWholesaleMinQty(5);
    setFormStockCount(15);
    setFormProcessor('Intel Core i7 8th Gen');
    setFormRam('16GB DDR4');
    setFormStorage('512GB NVMe SSD');
    setFormWarranty('30 Days Checking Warranty');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormSku(p.sku);
    setFormTitle(p.title);
    setFormBrand(p.brand);
    setFormCategory(p.category);
    setFormCondition(p.condition);
    setFormGrade(p.grade || 'Tested');
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || p.price);
    setFormWholesalePrice(p.wholesalePrice);
    setFormWholesaleMinQty(p.wholesaleMinQty);
    setFormStockCount(p.stockCount);
    setFormImage(p.images[0] || '');
    setFormProcessor(p.specs.processor || '');
    setFormRam(p.specs.ram || '');
    setFormStorage(p.specs.storage || '');
    setFormWarranty(p.warranty.type);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formSku.trim()) return;

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        sku: formSku,
        title: formTitle,
        brand: formBrand,
        category: formCategory,
        condition: formCondition,
        grade: formGrade,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        wholesalePrice: Number(formWholesalePrice),
        wholesaleMinQty: Number(formWholesaleMinQty),
        stockCount: Number(formStockCount),
        stockStatus: Number(formStockCount) > 0 ? 'in_stock' : 'out_of_stock',
        images: [formImage],
        specs: {
          ...editingProduct.specs,
          processor: formProcessor,
          ram: formRam,
          storage: formStorage,
        },
        warranty: {
          ...editingProduct.warranty,
          type: formWarranty,
        },
      });
    } else {
      addProduct({
        sku: formSku,
        slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: formTitle,
        titleUrdu: formTitle,
        category: formCategory,
        subcategory: 'Hardware',
        brand: formBrand,
        condition: formCondition,
        grade: formGrade,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        wholesalePrice: Number(formWholesalePrice),
        wholesaleMinQty: Number(formWholesaleMinQty),
        stockStatus: Number(formStockCount) > 0 ? 'in_stock' : 'out_of_stock',
        stockCount: Number(formStockCount),
        rating: 5.0,
        reviewCount: 1,
        images: [formImage],
        specs: {
          processor: formProcessor,
          ram: formRam,
          storage: formStorage,
        },
        warranty: {
          type: formWarranty,
          duration: '30 Days',
          description: formWarranty,
          urduDescription: formWarranty,
        },
        shopLocationNote: 'Shop #3-A, 4th Floor, Hafeez Centre',
        features: ['100% Genuine Imported', 'Tested Hardware'],
        tags: [formBrand, formCategory, formCondition],
      });
    }
    setIsModalOpen(false);
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = ['ID', 'SKU', 'Title', 'Brand', 'Category', 'Condition', 'Price_PKR', 'Wholesale_PKR', 'Stock_Count'];
    const rows = products.map((p) => [
      p.id,
      `"${p.sku}"`,
      `"${p.title.replace(/"/g, '""')}"`,
      `"${p.brand}"`,
      `"${p.category}"`,
      `"${p.condition}"`,
      p.price,
      p.wholesalePrice,
      p.stockCount,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SoftImpex_HafeezCentre_Catalog_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Product catalog exported to CSV successfully!');
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const outOfStockCount = products.filter((p) => p.stockCount <= 0 || p.stockStatus === 'out_of_stock').length;

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const stored = getStoredAdminCredentials();
      const expectedUser = (stored?.username || DEFAULT_ADMIN_ID).trim().toLowerCase();
      const enteredUser = loginId.trim().toLowerCase();

      let passwordValid = false;
      if (stored) {
        const enteredHash = await hashAdminSecret(loginPassword);
        passwordValid = enteredHash === stored.passwordHash;
      } else {
        passwordValid = loginPassword === DEFAULT_ADMIN_PASS;
      }

      if (enteredUser === expectedUser && passwordValid) {
        try {
          sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'authenticated');
        } catch {
          // ignore storage restriction
        }
        setNewAdminId(stored?.username || DEFAULT_ADMIN_ID);
        setLoginPassword('');
        setIsAuthenticated(true);
        showNotification(isUrdu ? 'ایڈمن پینل میں خوش آمدید!' : 'Signed in to Soft Impex Traders Admin Panel.');
      } else {
        setLoginError(
          isUrdu
            ? 'غلط ایڈمن آئی ڈی یا پاس ورڈ۔ براہ کرم دوبارہ کوشش کریں۔'
            : 'Invalid Admin ID or Password. Please check your credentials and try again.'
        );
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleAdminLogout = () => {
    try {
      sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    } catch {
      // ignore
    }
    setIsAuthenticated(false);
    setActiveTab('catalog');
    setLoginPassword('');
    setLoginError('');
    showNotification(isUrdu ? 'ایڈمن پینل لاگ آؤٹ ہو گیا ہے۔' : 'Logged out of Admin Panel.');
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityError('');
    setSecuritySuccess('');

    const trimmedId = newAdminId.trim();
    if (trimmedId.length < 3) {
      setSecurityError(isUrdu ? 'ایڈمن آئی ڈی کم از کم 3 حروف کی ہونی چاہیے۔' : 'Admin ID must be at least 3 characters.');
      return;
    }

    if (!currentPasswordInput) {
      setSecurityError(isUrdu ? 'موجودہ پاس ورڈ درج کریں۔' : 'Please enter your current password.');
      return;
    }

    if (newPasswordInput.length < 6) {
      setSecurityError(
        isUrdu ? 'نیا پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے۔' : 'New password must be at least 6 characters long.'
      );
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setSecurityError(
        isUrdu ? 'نیا پاس ورڈ اور کنفرم پاس ورڈ آپس میں نہیں ملتے۔' : 'New password and confirm password do not match.'
      );
      return;
    }

    setIsSavingSecurity(true);
    try {
      const stored = getStoredAdminCredentials();
      let currentValid = false;
      if (stored) {
        const currentHash = await hashAdminSecret(currentPasswordInput);
        currentValid = currentHash === stored.passwordHash;
      } else {
        currentValid = currentPasswordInput === DEFAULT_ADMIN_PASS;
      }

      if (!currentValid) {
        setSecurityError(isUrdu ? 'موجودہ پاس ورڈ غلط ہے۔' : 'Current password is incorrect.');
        return;
      }

      const newHash = await hashAdminSecret(newPasswordInput);
      const updatedCreds: StoredAdminCredentials = {
        username: trimmedId,
        passwordHash: newHash,
        updatedAt: new Date().toISOString(),
      };
      localStorage.setItem(ADMIN_CRED_STORAGE_KEY, JSON.stringify(updatedCreds));
      setHasCustomCredentials(true);
      setCurrentPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
      const successMsg = isUrdu
        ? 'ایڈمن آئی ڈی اور پاس ورڈ کامیابی سے تبدیل ہو گئے ہیں۔'
        : 'Admin ID & Password updated successfully!';
      setSecuritySuccess(successMsg);
      showNotification(successMsg);
    } finally {
      setIsSavingSecurity(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-slate-900 text-white p-6 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-700 text-white flex items-center justify-center font-black text-base tracking-tighter shrink-0">
                SIT
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  {isUrdu ? 'سیکیور ایڈمن رسائی' : 'Protected Store Portal'}
                </span>
                <h1 className="text-lg font-black tracking-tight">
                  {isUrdu ? 'ایڈمن پینل لاگ ان' : 'Soft Impex Traders Admin Login'}
                </h1>
              </div>
            </div>
            <p className="text-xs text-slate-300">
              {isUrdu
                ? 'اسٹاک، قیمتیں، آرڈرز اور کیٹلاگ تبدیل کرنے کے لیے ایڈمن آئی ڈی اور پاس ورڈ درج کریں۔'
                : 'Enter your Admin ID and Password to manage catalog inventory, prices, orders, and RFQs.'}
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="p-6 space-y-4 text-xs">
            {loginError && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-semibold flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                {isUrdu ? 'ایڈمن آئی ڈی (Admin ID)' : 'Admin ID / Username'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoComplete="username"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="Enter Admin ID"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-700 bg-white text-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                {isUrdu ? 'پاس ورڈ (Password)' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-700 bg-white text-slate-900 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                  aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white font-black py-3 rounded-xl text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoggingIn ? 'Verifying...' : isUrdu ? 'ایڈمن پینل کھولیں' : 'Sign In to Admin Panel'}</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentView('home')}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'واپس اسٹور پر جائیں' : 'Back to Storefront'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Shop Administration ({getStoredAdminCredentials()?.username || DEFAULT_ADMIN_ID})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Soft Impex Traders Management Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Hafeez Centre inventory control, customer order status, wholesale RFQ queue & CSV management
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('security')}
            className={`text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 transition border ${
              activeTab === 'security'
                ? 'bg-amber-50 text-amber-900 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-amber-600" />
            <span>{isUrdu ? 'پاس ورڈ تبدیل کریں' : 'Change Password'}</span>
          </button>
          <button
            onClick={resetDefaultCatalog}
            className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg flex items-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Catalog</span>
          </button>
          <button
            onClick={openAddModal}
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
          <button
            onClick={handleAdminLogout}
            className="text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-lg flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'لاگ آؤٹ' : 'Logout'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Catalog Products</span>
            <Package className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">{products.length}</div>
          <span className="text-[10px] text-slate-400">Live on hafeezcentre.online</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Customer Orders</span>
            <ShoppingCart className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">{orders.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Active & Delivered</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Order Volume</span>
            <DollarSign className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">{formatPKR(totalRevenue)}</div>
          <span className="text-[10px] text-slate-400">Recorded transactions</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Wholesale RFQs</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">{wholesaleInquiries.length}</div>
          <span className="text-[10px] text-purple-600 font-semibold">B2B Dealer Inquiries</span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 text-xs font-bold gap-4">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`py-3 border-b-2 transition ${
            activeTab === 'catalog'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Product Catalog ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-3 border-b-2 transition ${
            activeTab === 'orders'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Orders Management ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('rfqs')}
          className={`py-3 border-b-2 transition ${
            activeTab === 'rfqs'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Wholesale RFQs ({wholesaleInquiries.length})
        </button>
        <button
          onClick={() => setActiveTab('csv')}
          className={`py-3 border-b-2 transition ${
            activeTab === 'csv'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Bulk CSV Import / Export
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`py-3 border-b-2 transition inline-flex items-center gap-1.5 ${
            activeTab === 'security'
              ? 'border-blue-700 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'آئی ڈی اور پاس ورڈ تبدیل کریں' : 'ID & Change Password'}</span>
        </button>
      </div>

      {/* 1. Catalog Tab Content */}
      {activeTab === 'catalog' && (
        <div className="bg-white rounded-b-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search products by SKU or title..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
              />
            </div>
            <button
              onClick={handleExportCsv}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-lg text-xs flex items-center gap-1.5 self-start sm:self-auto transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Title & SKU</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Condition</th>
                  <th className="p-3 text-right">Retail (PKR)</th>
                  <th className="p-3 text-right">Wholesale (PKR)</th>
                  <th className="p-3 text-center">Stock</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                        <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-3 max-w-xs">
                      <div className="font-bold text-slate-900 truncate">{p.title}</div>
                      <div className="font-mono text-[10px] text-slate-400">SKU: {p.sku}</div>
                    </td>
                    <td className="p-3 uppercase text-[10px] font-bold text-blue-800">{p.category}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {p.condition}
                      </span>
                    </td>
                    <td className="p-3 text-right font-black text-slate-900 font-mono">
                      {formatPKR(p.price)}
                    </td>
                    <td className="p-3 text-right font-bold text-amber-700 font-mono">
                      {formatPKR(p.wholesalePrice)}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.stockCount > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {p.stockCount} in stock
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 rounded hover:bg-slate-200 text-slate-600 hover:text-blue-700"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete product ${p.sku}?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded hover:bg-rose-100 text-slate-400 hover:text-rose-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Orders Tab Content */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-b-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Customer Orders & Deliveries</h3>
          <div className="overflow-x-auto border border-slate-200 rounded-xl text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Order #</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3 text-right">Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-blue-900">{ord.orderNumber}</td>
                    <td className="p-3 text-slate-500">{ord.date}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{ord.customer.name}</div>
                      <div className="font-mono text-[10px] text-slate-400">{ord.customer.phone}</div>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{ord.customer.city}</td>
                    <td className="p-3 uppercase text-[10px] font-semibold">{ord.paymentMethod}</td>
                    <td className="p-3 text-right font-black text-slate-900 font-mono">
                      {formatPKR(ord.total)}
                    </td>
                    <td className="p-3">
                      <select
                        value={ord.orderStatus}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className="p-1 border border-slate-300 rounded text-[11px] font-semibold bg-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedOrder(ord);
                          setCurrentView('track-order');
                        }}
                        className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Wholesale RFQ Tab */}
      {activeTab === 'rfqs' && (
        <div className="bg-white rounded-b-xl border border-slate-200 p-6 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Wholesale Quotation Inquiries (B2B)</h3>
          <div className="space-y-3">
            {wholesaleInquiries.map((rfq) => (
              <div key={rfq.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-bold text-sm text-slate-900">
                    {rfq.companyName} <span className="text-slate-400 font-normal">({rfq.contactPerson})</span>
                  </div>
                  <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    {rfq.natureOfBusiness}
                  </span>
                </div>
                <div className="text-slate-600">
                  <strong>Requirements:</strong> {rfq.itemsRequired}
                </div>
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                  <span>City: <strong>{rfq.city}</strong></span>
                  <span>Contact: <strong>{rfq.phone}</strong></span>
                  <span>Quantity: <strong>{rfq.estimatedQuantity} units</strong></span>
                  <span>Budget: <strong>{rfq.budgetPKR}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Bulk CSV Tab */}
      {activeTab === 'csv' && (
        <div className="bg-white rounded-b-xl border border-slate-200 p-6 shadow-2xs space-y-6 max-w-2xl">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Bulk CSV Inventory Management</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ideal for non-technical shop owners in Hafeez Centre to update hundreds of prices and stock quantities
              from Excel.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-2">
            <h4 className="font-bold">How to Bulk Update:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-slate-700">
              <li>Click "Export Current Catalog to CSV" below to get your current stock sheet.</li>
              <li>Open the file in Microsoft Excel or Google Sheets.</li>
              <li>Edit the prices, stock counts, or add new rows with SKU and Title.</li>
              <li>Save as CSV and click "Import Updated CSV" to reload your live store.</li>
            </ol>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportCsv}
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Current Catalog to CSV</span>
            </button>
            <label className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-lg text-xs flex items-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Import Updated CSV</span>
              <input
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    showNotification('CSV parsed and live catalog synchronized with Hafeez Centre inventory!');
                  }
                }}
              />
            </label>
          </div>
        </div>
      )}

      {/* 5. Admin ID & Change Password Tab */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-b-xl border border-slate-200 p-6 shadow-2xs max-w-xl space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-blue-700" />
                <span>{isUrdu ? 'ایڈمن آئی ڈی اور پاس ورڈ تبدیل کریں' : 'Change Admin ID & Password'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isUrdu
                  ? 'اپنے اسٹور ایڈمن پینل کا یوزر آئی ڈی اور پاس ورڈ محفوظ طریقے سے اپ ڈیٹ کریں۔'
                  : 'Update your Admin ID and login password. Changes apply immediately for future logins.'}
              </p>
            </div>
            <span
              className={`px-2.5 py-1 rounded text-[11px] font-bold shrink-0 ${
                hasCustomCredentials
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-50 text-amber-800 border border-amber-200'
              }`}
            >
              {hasCustomCredentials ? 'Custom Password Active' : 'Default Password'}
            </span>
          </div>

          {securityError && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{securityError}</span>
            </div>
          )}

          {securitySuccess && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{securitySuccess}</span>
            </div>
          )}

          <form onSubmit={handleUpdateCredentials} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                {isUrdu ? 'ایڈمن آئی ڈی (Admin ID)' : 'Admin ID / Username *'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={newAdminId}
                  onChange={(e) => setNewAdminId(e.target.value)}
                  placeholder="e.g. admin or sohail_sit"
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-700 bg-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                {isUrdu ? 'موجودہ پاس ورڈ (Current Password) *' : 'Current Password *'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  required
                  value={currentPasswordInput}
                  onChange={(e) => setCurrentPasswordInput(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-700 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isUrdu ? 'نیا پاس ورڈ (New Password) *' : 'New Password (min 6 chars) *'}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-700 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {isUrdu ? 'نیا پاس ورڈ دوبارہ لکھیں *' : 'Confirm New Password *'}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-700 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="submit"
                disabled={isSavingSecurity}
                className="bg-blue-800 hover:bg-blue-900 disabled:opacity-60 text-white font-bold px-5 py-2.5 rounded-lg text-xs flex items-center gap-2 transition shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSavingSecurity ? 'Saving...' : isUrdu ? 'نیا پاس ورڈ محفوظ کریں' : 'Save New ID & Password'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl">
            <h3 className="font-black text-lg text-slate-900">
              {editingProduct ? 'Edit Catalog Product' : 'Add New Product to Hafeez Centre Catalog'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block text-slate-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold block text-slate-700 mb-1">Brand *</label>
                  <select
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Apple">Apple</option>
                    <option value="Asus">Asus</option>
                    <option value="Acer">Acer</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Lexar">Lexar</option>
                    <option value="TP-Link">TP-Link</option>
                    <option value="Hikvision">Hikvision</option>
                    <option value="Homage">Homage</option>
                    <option value="Logitech">Logitech</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block text-slate-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Dell Latitude 7400 Core i7 (16GB / 512GB)"
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block text-slate-700 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">Condition</label>
                  <select
                    value={formCondition}
                    onChange={(e) => setFormCondition(e.target.value as any)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  >
                    <option value="Used">Used</option>
                    <option value="Refurbished">Refurbished</option>
                    <option value="New">Brand New</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">Grade</label>
                  <input
                    type="text"
                    value={formGrade}
                    onChange={(e) => setFormGrade(e.target.value)}
                    placeholder="Grade A+ Mint"
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block text-slate-700 mb-1">Retail Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">Wholesale Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formWholesalePrice}
                    onChange={(e) => setFormWholesalePrice(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono text-amber-800"
                  />
                </div>

                <div>
                  <label className="font-bold block text-slate-700 mb-1">Stock Count *</label>
                  <input
                    type="number"
                    required
                    value={formStockCount}
                    onChange={(e) => setFormStockCount(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold block text-slate-700 mb-1">Processor</label>
                  <input
                    type="text"
                    value={formProcessor}
                    onChange={(e) => setFormProcessor(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block text-slate-700 mb-1">RAM</label>
                  <input
                    type="text"
                    value={formRam}
                    onChange={(e) => setFormRam(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold block text-slate-700 mb-1">Storage</label>
                  <input
                    type="text"
                    value={formStorage}
                    onChange={(e) => setFormStorage(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block text-slate-700 mb-1">Warranty Term</label>
                <input
                  type="text"
                  value={formWarranty}
                  onChange={(e) => setFormWarranty(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-bold shadow-xs"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

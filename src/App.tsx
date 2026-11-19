import React, { useEffect, useRef } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { WholesaleView } from './views/WholesaleView';
import { DealsView } from './views/DealsView';
import { CompareView } from './views/CompareView';
import { WishlistView } from './views/WishlistView';
import { OrderTrackingView } from './views/OrderTrackingView';
import { AboutView, ContactView, WarrantyView, FAQView } from './views/StaticPages';
import { BlogView } from './views/BlogView';
import { AdminView } from './views/AdminView';
import { CpanelDeploymentGuideView } from './views/CpanelDeploymentGuideView';

const SECRET_ADMIN_SEQUENCE = '@197980';

const MainContent: React.FC = () => {
  const { currentView, setCurrentView, selectedProduct } = useApp();
  const isFirstRender = useRef(true);
  const secretBufferRef = useRef('');

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (
          tag === 'INPUT' ||
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          target.isContentEditable
        ) {
          return;
        }
      }

      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      if (e.key.length === 1) {
        secretBufferRef.current = (secretBufferRef.current + e.key).slice(-SECRET_ADMIN_SEQUENCE.length);
        if (secretBufferRef.current === SECRET_ADMIN_SEQUENCE) {
          secretBufferRef.current = '';
          setCurrentView('admin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [setCurrentView]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const w = window as Window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: 'virtual_page_view',
      page_view_name: currentView,
      page_path: currentView === 'product-detail' && selectedProduct ? `/product/${selectedProduct.slug}` : `/${currentView}`,
      page_title: currentView === 'product-detail' && selectedProduct ? selectedProduct.title : document.title,
    });
  }, [currentView, selectedProduct]);

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'shop':
        return <ShopView />;
      case 'product-detail':
        return <ProductDetailView />;
      case 'cart':
        return <CartView />;
      case 'checkout':
        return <CheckoutView />;
      case 'wholesale':
        return <WholesaleView />;
      case 'deals':
        return <DealsView />;
      case 'compare':
        return <CompareView />;
      case 'wishlist':
        return <WishlistView />;
      case 'track-order':
        return <OrderTrackingView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'warranty':
        return <WarrantyView />;
      case 'faq':
        return <FAQView />;
      case 'blog':
        return <BlogView />;
      case 'admin':
        return <AdminView />;
      case 'cpanel-guide':
        return <CpanelDeploymentGuideView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white pb-14 md:pb-0">
      <Header />
      <main className="flex-1">{renderView()}</main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

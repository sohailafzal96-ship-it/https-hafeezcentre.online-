export type Condition = 'New' | 'Used' | 'Refurbished';

export type CategoryKey =
  | 'laptops'
  | 'desktops'
  | 'monitors'
  | 'storage'
  | 'ram-processor'
  | 'motherboards-gpu'
  | 'networking'
  | 'cctv-security'
  | 'ups-power'
  | 'accessories'
  | 'gaming'
  | 'software'
  | 'spare-parts';

export interface CategoryInfo {
  key: CategoryKey;
  name: string;
  nameUrdu: string;
  iconName: string;
  description: string;
  subcategories: string[];
}

export interface ProductSpecs {
  processor?: string;
  generation?: string;
  ram?: string;
  storage?: string;
  display?: string;
  graphics?: string;
  battery?: string;
  os?: string;
  ports?: string;
  weight?: string;
  resolution?: string;
  refreshRate?: string;
  speed?: string;
  capacity?: string;
  formFactor?: string;
  channels?: string;
  powerOutput?: string;
  backupTime?: string;
  [key: string]: string | undefined;
}

export interface WarrantyInfo {
  type: string;
  duration: string;
  description: string;
  urduDescription: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  title: string;
  titleUrdu: string;
  category: CategoryKey;
  subcategory: string;
  brand: string;
  condition: Condition;
  grade?: string; // e.g. "Brand New Boxed", "Grade A+ (9.8/10)", "Grade A Clean"
  price: number; // PKR
  originalPrice?: number; // PKR
  wholesalePrice: number; // PKR
  wholesaleMinQty: number; // e.g. 5
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockCount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  isFeatured?: boolean;
  isDeal?: boolean;
  dealExpiresAt?: string;
  discountPercent?: number;
  specs: ProductSpecs;
  warranty: WarrantyInfo;
  shopLocationNote: string;
  features: string[];
  featuresUrdu?: string[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  isWholesale: boolean;
  unitPrice: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  province: string;
  companyName?: string;
  ntn?: string;
  notes?: string;
}

export interface OrderItemSummary {
  productId: string;
  title: string;
  sku: string;
  condition: Condition;
  price: number;
  quantity: number;
  total: number;
}

export type PaymentMethod = 'cod' | 'bank_transfer' | 'jazzcash' | 'easypaisa' | 'shop_pickup';
export type OrderStatus = 'pending' | 'confirmed' | 'dispatched' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'verified' | 'paid';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: OrderCustomer;
  items: OrderItemSummary[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  courier: string;
  trackingNumber: string;
  notes?: string;
}

export interface WholesaleQuoteRequest {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  natureOfBusiness: string;
  itemsRequired: string;
  estimatedQuantity: number;
  budgetPKR: string;
  date: string;
  status: 'Pending' | 'Contacted' | 'Quoted' | 'Completed';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleUrdu: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  tags: string[];
}

export type ViewMode =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'wholesale'
  | 'deals'
  | 'compare'
  | 'wishlist'
  | 'track-order'
  | 'about'
  | 'contact'
  | 'warranty'
  | 'blog'
  | 'faq'
  | 'admin'
  | 'cpanel-guide';

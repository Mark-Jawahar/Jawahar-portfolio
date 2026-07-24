export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  comparePrice?: number;
  images: string[];
  category: "apparel" | "gifts";
  collection: "The Apparel Collection" | "The Gifting Collection";
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  materials: string[];
  isBestSeller?: boolean;
  isNew?: boolean;
  isCustomizable?: boolean;
  isGiftReady?: boolean;
  isPremiumPackaging?: boolean;
  occasions?: string[];
  rating: number;
  reviewCount: number;
  deliveryEstimate: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  content: string;
  productName?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shipping: number;
  subtotal: number;
  status: "pending" | "verified" | "shipped" | "delivered";
  paymentStatus: "pending" | "verified";
  paymentScreenshot?: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
  };
  createdAt: string;
}

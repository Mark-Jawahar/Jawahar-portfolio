import { Product, Testimonial, FAQItem } from "./types";

export const products: Product[] = [
  {
    id: "crochet-top-01",
    name: "The Seraphina Crop Top",
    tagline: "Delicate elegance in every thread",
    description:
      "Handcrafted with premium cotton-blend yarn, the Seraphina Crop Top features an intricate lace pattern that drapes effortlessly. Each piece is meticulously crocheted to create a timeless silhouette that transitions seamlessly from day to evening.",
    price: 2499,
    images: [
      "/images/products/top-1.jpg",
      "/images/products/top-2.jpg",
      "/images/products/top-3.jpg",
    ],
    category: "apparel",
    collection: "The Apparel Collection",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#FFF8E7" },
      { name: "Dusty Rose", hex: "#C9A9A6" },
      { name: "Sage", hex: "#A8B5A0" },
      { name: "Charcoal", hex: "#4A4A4A" },
    ],
    materials: ["Premium Cotton Blend", "Hand-dyed"],
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 124,
    deliveryEstimate: "7-10",
    inStock: true,
  },
  {
    id: "crochet-top-02",
    name: "The Aria Boho Top",
    tagline: "Effortless bohemian sophistication",
    description:
      "The Aria Boho Top is a celebration of texture and movement. Crocheted with an open-stitch pattern, it offers a relaxed fit that feels as beautiful as it looks. Perfect for warm days and layered evenings.",
    price: 2199,
    comparePrice: 2799,
    images: [
      "/images/products/top-2.jpg",
      "/images/products/top-1.jpg",
      "/images/products/top-3.jpg",
    ],
    category: "apparel",
    collection: "The Apparel Collection",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Terracotta", hex: "#E3735E" },
      { name: "Ocean", hex: "#4F7C8A" },
    ],
    materials: ["Mercerized Cotton", "Eco-friendly Dyes"],
    isNew: true,
    rating: 4.8,
    reviewCount: 89,
    deliveryEstimate: "7-10",
    inStock: true,
  },
  {
    id: "crochet-jacket-01",
    name: "The Luminary Duster Jacket",
    tagline: "A statement in slow fashion",
    description:
      "An heirloom piece in the making. The Luminary Duster Jacket is our most ambitious design — a floor-length open cardigan handcrafted over 40 hours using artisanal stitchwork. Each jacket is a unique work of wearable art.",
    price: 5999,
    images: [
      "/images/products/jacket-1.jpg",
      "/images/products/jacket-2.jpg",
      "/images/products/jacket-3.jpg",
    ],
    category: "apparel",
    collection: "The Apparel Collection",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Ecru", hex: "#F5EFE3" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Moss", hex: "#6B7B5E" },
    ],
    materials: ["Premium Acrylic Blend", "Hand-finished Hems"],
    isBestSeller: true,
    isPremiumPackaging: true,
    rating: 5.0,
    reviewCount: 56,
    deliveryEstimate: "10-14",
    inStock: true,
  },
  {
    id: "crochet-jacket-02",
    name: "The Nova Cropped Jacket",
    tagline: "Modern structure, handcrafted soul",
    description:
      "A contemporary take on the classic cardigan. The Nova Cropped Jacket features clean lines with artisanal texture, making it the perfect layering piece for the modern minimalist.",
    price: 3499,
    images: [
      "/images/products/jacket-2.jpg",
      "/images/products/jacket-1.jpg",
    ],
    category: "apparel",
    collection: "The Apparel Collection",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Sand", hex: "#D4C5B5" },
      { name: "Slate", hex: "#708090" },
      { name: "Burgundy", hex: "#6E2C3D" },
    ],
    materials: ["Alpaca Blend Yarn", "Wooden Buttons"],
    isNew: true,
    rating: 4.7,
    reviewCount: 34,
    deliveryEstimate: "7-10",
    inStock: true,
  },
  {
    id: "crochet-cap-01",
    name: "The Willow Bucket Hat",
    tagline: "Sun-kissed style, handwoven grace",
    description:
      "The Willow Bucket Hat is your everyday essential reimagined. Hand-crocheted with a dense stitch for structure, it offers sun protection without compromising on style. Available in an array of sun-drenched hues.",
    price: 1499,
    images: [
      "/images/products/cap-1.jpg",
      "/images/products/cap-2.jpg",
    ],
    category: "apparel",
    collection: "The Apparel Collection",
    sizes: ["One Size"],
    colors: [
      { name: "Natural", hex: "#E8DCC8" },
      { name: "Blush", hex: "#E8C4C0" },
      { name: "Navy", hex: "#1B2A4A" },
      { name: "Mustard", hex: "#D4A847" },
    ],
    materials: ["Raffia Cotton Blend", "Reinforced Brim"],
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 203,
    deliveryEstimate: "5-7",
    inStock: true,
  },
  {
    id: "crochet-cap-02",
    name: "The Solis Beanie",
    tagline: "Warmth redefined, stitch by stitch",
    description:
      "The Solis Beanie combines luxurious softness with architectural ribbing. Each beanie is worked in the round with zero seams, ensuring a flawless fit and exceptional comfort.",
    price: 1299,
    images: [
      "/images/products/cap-2.jpg",
      "/images/products/cap-1.jpg",
    ],
    category: "apparel",
    collection: "The Apparel Collection",
    sizes: ["One Size"],
    colors: [
      { name: "Oatmeal", hex: "#F0E6D3" },
      { name: "Espresso", hex: "#3C2A1E" },
      { name: "Forest", hex: "#2D4A2E" },
      { name: "Burgundy", hex: "#6E2C3D" },
    ],
    materials: ["Merino Wool Blend", "Hand-finished"],
    rating: 4.9,
    reviewCount: 167,
    deliveryEstimate: "5-7",
    inStock: true,
  },
  {
    id: "bouquet-01",
    name: "The Eternal Rose Bouquet",
    tagline: "Blooms that never fade",
    description:
      "A breathtaking arrangement of hand-crocheted roses that defy time. Each petal is individually shaped and wired for natural form. Presented in our signature packaging, this bouquet is the ultimate everlasting gift.",
    price: 3499,
    comparePrice: 4299,
    images: [
      "/images/products/bouquet-1.jpg",
      "/images/products/bouquet-2.jpg",
      "/images/products/bouquet-3.jpg",
    ],
    category: "gifts",
    collection: "The Gifting Collection",
    colors: [
      { name: "Classic Red", hex: "#8B1A1A" },
      { name: "Blush Pink", hex: "#D4A0A0" },
      { name: "Pure White", hex: "#F5F0EB" },
      { name: "Lavender Dream", hex: "#9B8EC4" },
    ],
    materials: ["Premium Acrylic Yarn", "Floral Wire", "Satin Ribbon"],
    isCustomizable: true,
    isGiftReady: true,
    isPremiumPackaging: true,
    isBestSeller: true,
    occasions: ["Anniversary", "Wedding", "Valentine's Day", "Birthday", "Just Because"],
    rating: 5.0,
    reviewCount: 312,
    deliveryEstimate: "7-10",
    inStock: true,
  },
  {
    id: "bouquet-02",
    name: "The Wildflower Collection",
    tagline: "A meadow of handcrafted memories",
    description:
      "An eclectic mix of hand-crocheted wildflowers including daisies, lavender, and poppies. Arranged in a terracotta planter, this piece brings the outdoors in — permanently.",
    price: 4299,
    images: [
      "/images/products/bouquet-2.jpg",
      "/images/products/bouquet-1.jpg",
    ],
    category: "gifts",
    collection: "The Gifting Collection",
    colors: [
      { name: "Garden Mix", hex: "#A8C4A0" },
      { name: "Sunset Mix", hex: "#E8A87C" },
      { name: "Pastel Dream", hex: "#D4C4D4" },
    ],
    materials: ["Cotton Yarn", "Terracotta Planter", "Hand-painted Details"],
    isCustomizable: true,
    isGiftReady: true,
    isPremiumPackaging: true,
    isNew: true,
    occasions: ["Housewarming", "Birthday", "Get Well", "Thank You"],
    rating: 4.9,
    reviewCount: 78,
    deliveryEstimate: "7-10",
    inStock: true,
  },
  {
    id: "keychain-01",
    name: "The Petite Bloom Keychain",
    tagline: "A daily touch of handmade joy",
    description:
      "A miniature work of art for your keys or bag. Each Petite Bloom Keychain features a hand-crocheted flower with pearl accents, finished with our signature gold-toned hardware.",
    price: 699,
    images: [
      "/images/products/keychain-1.jpg",
      "/images/products/keychain-2.jpg",
    ],
    category: "gifts",
    collection: "The Gifting Collection",
    colors: [
      { name: "Rose Gold", hex: "#E8B4A0" },
      { name: "Silver Lilac", hex: "#C0B4D4" },
      { name: "Golden Sun", hex: "#E8C840" },
      { name: "Ocean Blue", hex: "#4A7C8A" },
    ],
    materials: ["Cotton Yarn", "Gold-toned Hardware", "Pearl Beads"],
    isGiftReady: true,
    isCustomizable: true,
    isPremiumPackaging: true,
    occasions: ["Birthday", "Thank You", "Just Because", "Graduation"],
    rating: 4.8,
    reviewCount: 445,
    deliveryEstimate: "3-5",
    inStock: true,
  },
  {
    id: "keychain-02",
    name: "The Mini Macrame Keychain",
    tagline: "Tiny knots, timeless charm",
    description:
      "Intricately knotted with premium cord, the Mini Macrame Keychain is available in a variety of gemstone-inspired colorways. A subtle statement piece for the minimalist.",
    price: 499,
    images: [
      "/images/products/keychain-2.jpg",
      "/images/products/keychain-1.jpg",
    ],
    category: "gifts",
    collection: "The Gifting Collection",
    colors: [
      { name: "Amethyst", hex: "#8A6CA8" },
      { name: "Jade", hex: "#4A8A5A" },
      { name: "Coral", hex: "#E87A6A" },
      { name: "Onyx", hex: "#2A2A2A" },
    ],
    materials: ["Premium Macrame Cord", "Wooden Beads", "Brass Ring"],
    isGiftReady: true,
    occasions: ["Birthday", "Christmas", "Party Favor", "Just Because"],
    rating: 4.7,
    reviewCount: 289,
    deliveryEstimate: "3-5",
    inStock: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Ananya Sharma",
    location: "Mumbai, India",
    avatar: "/images/avatars/avatar-1.jpg",
    rating: 5,
    content:
      "I've never received so many compliments on a piece of clothing. The Seraphina Top is absolutely exquisite — the stitchwork is incredible. You can feel the love and care in every detail.",
    productName: "The Seraphina Crop Top",
  },
  {
    id: "t2",
    name: "Priya Mehta",
    location: "Delhi, India",
    avatar: "/images/avatars/avatar-2.jpg",
    rating: 5,
    content:
      "Ordered the Eternal Rose Bouquet for my anniversary and it took my wife's breath away. She couldn't believe it was crocheted. The craftsmanship is museum-worthy.",
    productName: "The Eternal Rose Bouquet",
  },
  {
    id: "t3",
    name: "Sarah Chen",
    location: "Bangalore, India",
    avatar: "/images/avatars/avatar-3.jpg",
    rating: 5,
    content:
      "The Luminary Duster is hands down the most beautiful garment I own. It feels like wearing a piece of art. HookedByPree has redefined what handmade fashion can be.",
    productName: "The Luminary Duster Jacket",
  },
  {
    id: "t4",
    name: "Ritu Kapoor",
    location: "Jaipur, India",
    avatar: "/images/avatars/avatar-4.jpg",
    rating: 5,
    content:
      "I bought the Willow Bucket Hat for my summer trip and it was my most complemented accessory. The quality is unmatched. Absolutely worth every penny.",
    productName: "The Willow Bucket Hat",
  },
  {
    id: "t5",
    name: "Neha Verma",
    location: "Pune, India",
    avatar: "/images/avatars/avatar-5.jpg",
    rating: 5,
    content:
      "The Petite Bloom Keychain is my new favorite accessory. It adds the perfect touch of whimsy to my bag. I've already ordered three more as gifts!",
    productName: "The Petite Bloom Keychain",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "How long does shipping take?",
    answer:
      "Domestic shipping within India typically takes 5-10 business days depending on your location. Each item is made to order, so please allow 2-3 days for crafting before dispatch.",
    category: "Shipping",
  },
  {
    question: "Do you accept custom orders?",
    answer:
      "Absolutely! We love bringing your vision to life. You can specify customization preferences on select product pages, or reach out via our Contact page for a completely bespoke piece.",
    category: "Customization",
  },
  {
    question: "How do I care for my crochet items?",
    answer:
      "Hand wash cold with mild detergent. Lay flat to dry away from direct sunlight. Gently reshape while damp. Avoid wringing or machine drying to preserve the integrity of the stitchwork.",
    category: "Care Instructions",
  },
  {
    question: "What is your return policy?",
    answer:
      "We accept returns within 7 days of delivery for unused items in original condition. Customized and personalized items are final sale. Please reach out to initiate a return.",
    category: "Returns",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI payments via any UPI app (Google Pay, PhonePe, Paytm, BHIM). Our UPI ID is 9620151434@upi. We also accept direct bank transfers for larger orders.",
    category: "Payment",
  },
  {
    question: "How does UPI payment work?",
    answer:
      "After placing your order, you'll receive a QR code and our UPI ID. Complete the payment in your preferred UPI app and upload the payment screenshot. Your order will be verified within 24 hours.",
    category: "UPI",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes! Once your order is dispatched, you'll receive a tracking link via email and WhatsApp. You can also check your order status by contacting us with your order ID.",
    category: "Order Tracking",
  },
  {
    question: "Are your products truly handmade?",
    answer:
      "Yes — every single item is 100% hand-crocheted by skilled artisans. No machines are used in the crafting process. Each piece carries the unique touch of its maker.",
    category: "General",
  },
];

export const apparelProducts = products.filter((p) => p.category === "apparel");
export const giftProducts = products.filter((p) => p.category === "gifts");

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
}

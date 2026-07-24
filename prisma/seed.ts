import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash("admin@123", 10);

  await prisma.user.upsert({
    where: { email: "admin@hookedbypree.com" },
    update: {},
    create: {
      name: "Pree",
      email: "admin@hookedbypree.com",
      password: adminPassword,
      phone: "+919620151434",
      role: "admin",
    },
  });

  const products = [
    {
      id: "crochet-top-01",
      name: "The Seraphina Crop Top",
      tagline: "Delicate elegance in every thread",
      description: "Handcrafted with premium cotton-blend yarn, the Seraphina Crop Top features an intricate lace pattern that drapes effortlessly.",
      price: 2499,
      images: JSON.stringify(["/images/products/top-1.jpg", "/images/products/top-2.jpg", "/images/products/top-3.jpg"]),
      category: "apparel",
      collection: "The Apparel Collection",
      sizes: JSON.stringify(["XS", "S", "M", "L", "XL"]),
      colors: JSON.stringify([{ name: "Ivory", hex: "#FFF8E7" }, { name: "Dusty Rose", hex: "#C9A9A6" }, { name: "Sage", hex: "#A8B5A0" }, { name: "Charcoal", hex: "#4A4A4A" }]),
      materials: JSON.stringify(["Premium Cotton Blend", "Hand-dyed"]),
      isBestSeller: true,
      rating: 4.9,
      reviewCount: 124,
      deliveryEstimate: "7-10",
    },
    {
      id: "crochet-top-02",
      name: "The Aria Boho Top",
      tagline: "Effortless bohemian sophistication",
      description: "The Aria Boho Top is a celebration of texture and movement.",
      price: 2199,
      comparePrice: 2799,
      images: JSON.stringify(["/images/products/top-2.jpg", "/images/products/top-1.jpg", "/images/products/top-3.jpg"]),
      category: "apparel",
      collection: "The Apparel Collection",
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      colors: JSON.stringify([{ name: "Cream", hex: "#FFFDD0" }, { name: "Terracotta", hex: "#E3735E" }, { name: "Ocean", hex: "#4F7C8A" }]),
      materials: JSON.stringify(["Mercerized Cotton", "Eco-friendly Dyes"]),
      isNew: true,
      rating: 4.8,
      reviewCount: 89,
      deliveryEstimate: "7-10",
    },
    {
      id: "crochet-jacket-01",
      name: "The Luminary Duster Jacket",
      tagline: "A statement in slow fashion",
      description: "An heirloom piece in the making.",
      price: 5999,
      images: JSON.stringify(["/images/products/jacket-1.jpg", "/images/products/jacket-2.jpg", "/images/products/jacket-3.jpg"]),
      category: "apparel",
      collection: "The Apparel Collection",
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      colors: JSON.stringify([{ name: "Ecru", hex: "#F5EFE3" }, { name: "Black", hex: "#1A1A1A" }, { name: "Moss", hex: "#6B7B5E" }]),
      materials: JSON.stringify(["Premium Acrylic Blend", "Hand-finished Hems"]),
      isBestSeller: true,
      isPremiumPackaging: true,
      rating: 5.0,
      reviewCount: 56,
      deliveryEstimate: "10-14",
    },
    {
      id: "crochet-jacket-02",
      name: "The Nova Cropped Jacket",
      tagline: "Modern structure, handcrafted soul",
      description: "A contemporary take on the classic cardigan.",
      price: 3499,
      images: JSON.stringify(["/images/products/jacket-2.jpg", "/images/products/jacket-1.jpg"]),
      category: "apparel",
      collection: "The Apparel Collection",
      sizes: JSON.stringify(["XS", "S", "M", "L"]),
      colors: JSON.stringify([{ name: "Sand", hex: "#D4C5B5" }, { name: "Slate", hex: "#708090" }, { name: "Burgundy", hex: "#6E2C3D" }]),
      materials: JSON.stringify(["Alpaca Blend Yarn", "Wooden Buttons"]),
      isNew: true,
      rating: 4.7,
      reviewCount: 34,
      deliveryEstimate: "7-10",
    },
    {
      id: "crochet-cap-01",
      name: "The Willow Bucket Hat",
      tagline: "Sun-kissed style, handwoven grace",
      description: "The Willow Bucket Hat is your everyday essential reimagined.",
      price: 1499,
      images: JSON.stringify(["/images/products/cap-1.jpg", "/images/products/cap-2.jpg"]),
      category: "apparel",
      collection: "The Apparel Collection",
      sizes: JSON.stringify(["One Size"]),
      colors: JSON.stringify([{ name: "Natural", hex: "#E8DCC8" }, { name: "Blush", hex: "#E8C4C0" }, { name: "Navy", hex: "#1B2A4A" }, { name: "Mustard", hex: "#D4A847" }]),
      materials: JSON.stringify(["Raffia Cotton Blend", "Reinforced Brim"]),
      isBestSeller: true,
      rating: 4.8,
      reviewCount: 203,
      deliveryEstimate: "5-7",
    },
    {
      id: "crochet-cap-02",
      name: "The Solis Beanie",
      tagline: "Warmth redefined, stitch by stitch",
      description: "The Solis Beanie combines luxurious softness with architectural ribbing.",
      price: 1299,
      images: JSON.stringify(["/images/products/cap-2.jpg", "/images/products/cap-1.jpg"]),
      category: "apparel",
      collection: "The Apparel Collection",
      sizes: JSON.stringify(["One Size"]),
      colors: JSON.stringify([{ name: "Oatmeal", hex: "#F0E6D3" }, { name: "Espresso", hex: "#3C2A1E" }, { name: "Forest", hex: "#2D4A2E" }, { name: "Burgundy", hex: "#6E2C3D" }]),
      materials: JSON.stringify(["Merino Wool Blend", "Hand-finished"]),
      rating: 4.9,
      reviewCount: 167,
    },
    {
      id: "bouquet-01",
      name: "The Eternal Rose Bouquet",
      tagline: "Blooms that never fade",
      description: "A breathtaking arrangement of hand-crocheted roses that defy time.",
      price: 3499,
      comparePrice: 4299,
      images: JSON.stringify(["/images/products/bouquet-1.jpg", "/images/products/bouquet-2.jpg", "/images/products/bouquet-3.jpg"]),
      category: "gifts",
      collection: "The Gifting Collection",
      colors: JSON.stringify([{ name: "Classic Red", hex: "#8B1A1A" }, { name: "Blush Pink", hex: "#D4A0A0" }, { name: "Pure White", hex: "#F5F0EB" }, { name: "Lavender Dream", hex: "#9B8EC4" }]),
      materials: JSON.stringify(["Premium Acrylic Yarn", "Floral Wire", "Satin Ribbon"]),
      isCustomizable: true,
      isGiftReady: true,
      isPremiumPackaging: true,
      isBestSeller: true,
      occasions: JSON.stringify(["Anniversary", "Wedding", "Valentine's Day", "Birthday", "Just Because"]),
      rating: 5.0,
      reviewCount: 312,
      deliveryEstimate: "7-10",
    },
    {
      id: "bouquet-02",
      name: "The Wildflower Collection",
      tagline: "A meadow of handcrafted memories",
      description: "An eclectic mix of hand-crocheted wildflowers.",
      price: 4299,
      images: JSON.stringify(["/images/products/bouquet-2.jpg", "/images/products/bouquet-1.jpg"]),
      category: "gifts",
      collection: "The Gifting Collection",
      colors: JSON.stringify([{ name: "Garden Mix", hex: "#A8C4A0" }, { name: "Sunset Mix", hex: "#E8A87C" }, { name: "Pastel Dream", hex: "#D4C4D4" }]),
      materials: JSON.stringify(["Cotton Yarn", "Terracotta Planter", "Hand-painted Details"]),
      isCustomizable: true,
      isGiftReady: true,
      isPremiumPackaging: true,
      isNew: true,
      occasions: JSON.stringify(["Housewarming", "Birthday", "Get Well", "Thank You"]),
      rating: 4.9,
      reviewCount: 78,
      deliveryEstimate: "7-10",
    },
    {
      id: "keychain-01",
      name: "The Petite Bloom Keychain",
      tagline: "A daily touch of handmade joy",
      description: "A miniature work of art for your keys or bag.",
      price: 699,
      images: JSON.stringify(["/images/products/keychain-1.jpg", "/images/products/keychain-2.jpg"]),
      category: "gifts",
      collection: "The Gifting Collection",
      colors: JSON.stringify([{ name: "Rose Gold", hex: "#E8B4A0" }, { name: "Silver Lilac", hex: "#C0B4D4" }, { name: "Golden Sun", hex: "#E8C840" }, { name: "Ocean Blue", hex: "#4A7C8A" }]),
      materials: JSON.stringify(["Cotton Yarn", "Gold-toned Hardware", "Pearl Beads"]),
      isGiftReady: true,
      isCustomizable: true,
      isPremiumPackaging: true,
      occasions: JSON.stringify(["Birthday", "Thank You", "Just Because", "Graduation"]),
      rating: 4.8,
      reviewCount: 445,
      deliveryEstimate: "3-5",
    },
    {
      id: "keychain-02",
      name: "The Mini Macrame Keychain",
      tagline: "Tiny knots, timeless charm",
      description: "Intricately knotted with premium cord.",
      price: 499,
      images: JSON.stringify(["/images/products/keychain-2.jpg", "/images/products/keychain-1.jpg"]),
      category: "gifts",
      collection: "The Gifting Collection",
      colors: JSON.stringify([{ name: "Amethyst", hex: "#8A6CA8" }, { name: "Jade", hex: "#4A8A5A" }, { name: "Coral", hex: "#E87A6A" }, { name: "Onyx", hex: "#2A2A2A" }]),
      materials: JSON.stringify(["Premium Macrame Cord", "Wooden Beads", "Brass Ring"]),
      isGiftReady: true,
      occasions: JSON.stringify(["Birthday", "Christmas", "Party Favor", "Just Because"]),
      rating: 4.7,
      reviewCount: 289,
      deliveryEstimate: "3-5",
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  console.log("Database seeded successfully!");
  console.log(`Admin: admin@hookedbypree.com / admin@123`);
  console.log(`Products: ${products.length} inserted`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

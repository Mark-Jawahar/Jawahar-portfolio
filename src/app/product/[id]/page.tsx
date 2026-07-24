"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  HiOutlineHeart,
  HiOutlineStar,
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineGift,
  HiOutlineSwatch,
  HiOutlineMinus,
  HiOutlinePlus,
  HiOutlineChevronLeft,
} from "react-icons/hi2";
import { getProductById, getRelatedProducts } from "@/lib/products";
import { formatPrice, getDeliveryDate } from "@/lib/utils";
import { useCart } from "@/lib/CartContext";
import ProductImage from "@/components/ui/ProductImage";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductById(params.id as string);
  const { addItem, openCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="page-top">
        <div className="container-luxury py-32 text-center">
          <h1 className="text-2xl font-serif">Product Not Found</h1>
          <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
            The piece you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium border-b border-[var(--color-text-primary)] pb-0.5 hover:opacity-60 transition-opacity"
          >
            <HiOutlineChevronLeft className="w-3 h-3" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = getRelatedProducts(product);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    openCart();
  };

  return (
    <div className="page-top">
      <div className="container-luxury py-8 lg:py-12">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8"
        >
          <HiOutlineChevronLeft className="w-3 h-3" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductImage
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              priority
            />
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-24 rounded-[var(--radius-lg)] overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === i
                        ? "border-[var(--color-text-primary)] opacity-100"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={img || "/placeholder.svg"}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              {product.isBestSeller && (
                <span className="px-3 py-1 rounded-full bg-[var(--color-accent)]/90 text-[10px] font-medium text-white tracking-wider uppercase">
                  Best Seller
                </span>
              )}
              {product.isNew && (
                <span className="px-3 py-1 rounded-full bg-[var(--color-text-primary)]/90 text-[10px] font-medium text-[var(--color-bg-primary)] tracking-wider uppercase">
                  New
                </span>
              )}
              <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase tracking-[0.1em]">
                {product.collection}
              </span>
            </div>

            <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-serif text-[var(--color-text-primary)] leading-tight">
              {product.name}
            </h1>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{product.tagline}</p>

            <div className="flex items-center gap-2 mt-5">
              <HiOutlineStar className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-[var(--color-text-tertiary)]">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mt-8">
              <span className="text-3xl font-serif text-[var(--color-text-primary)]">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-sm text-[var(--color-text-tertiary)] line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>

            <p className="mt-8 text-sm text-[var(--color-text-secondary)] leading-relaxed text-pretty">
              {product.description}
            </p>

            {product.colors && product.colors.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-[0.1em] mb-3">
                  Color: <span className="text-[var(--color-text-primary)]">{selectedColor || "Select"}</span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color.name
                          ? "border-[var(--color-text-primary)] scale-110 shadow-[var(--shadow-sm)]"
                          : "border-[var(--color-border)] hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-[0.1em] mb-3">
                  Size: <span className="text-[var(--color-text-primary)]">{selectedSize || "Select"}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 px-5 rounded-[var(--radius-lg)] text-xs font-medium border transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] border-[var(--color-text-primary)]"
                          : "bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-primary)]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8">
              <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-[0.1em] mb-3">
                Quantity
              </p>
              <div className="flex items-center border border-[var(--color-border)] rounded-[var(--radius-lg)] w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[var(--color-overlay)] rounded-[var(--radius-lg)] transition-colors"
                >
                  <HiOutlineMinus className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-sm font-medium select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-[var(--color-overlay)] rounded-[var(--radius-lg)] transition-colors"
                >
                  <HiOutlinePlus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-10">
              <button
                onClick={handleBuyNow}
                className="flex-1 h-12 rounded-[var(--radius-lg)] bg-[var(--color-text-primary)] text-[var(--color-bg-primary)] text-sm font-medium hover:opacity-85 transition-all duration-500 active:scale-[0.97]"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 rounded-[var(--radius-lg)] border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-medium hover:bg-[var(--color-overlay)] transition-all duration-500 active:scale-[0.97]"
              >
                {addedToCart ? "Added!" : "Add to Cart"}
              </button>
              <button
                className="w-12 h-12 rounded-[var(--radius-lg)] border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-overlay)] transition-all duration-500 flex-shrink-0"
                aria-label="Add to wishlist"
              >
                <HiOutlineHeart className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-8 p-6 rounded-[var(--radius-xl)] bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <HiOutlineTruck className="w-[18px] h-[18px] text-[var(--color-accent)]" />
                  <span className="text-[var(--color-text-secondary)]">
                    Estimated delivery: <span className="text-[var(--color-text-primary)] font-medium">{getDeliveryDate(product.deliveryEstimate)}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <HiOutlineShieldCheck className="w-[18px] h-[18px] text-[var(--color-accent)]" />
                  <span className="text-[var(--color-text-secondary)]">
                    100% Handmade Guarantee
                  </span>
                </div>
                {product.isPremiumPackaging && (
                  <div className="flex items-center gap-3 text-sm">
                    <HiOutlineGift className="w-[18px] h-[18px] text-[var(--color-accent)]" />
                    <span className="text-[var(--color-text-secondary)]">
                      Premium Packaging
                    </span>
                  </div>
                )}
                {product.isCustomizable && (
                  <div className="flex items-center gap-3 text-sm">
                    <HiOutlineSwatch className="w-[18px] h-[18px] text-[var(--color-accent)]" />
                    <span className="text-[var(--color-text-secondary)]">
                      Customization Available
                    </span>
                  </div>
                )}
              </div>
            </div>

            {product.materials && product.materials.length > 0 && (
              <div className="mt-8">
                <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-[0.1em] mb-3">
                  Materials
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((mat) => (
                    <span
                      key={mat}
                      className="px-4 py-1.5 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)]"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.occasions && product.occasions.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-[0.1em] mb-3">
                  Perfect For
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.occasions.map((occ) => (
                    <span
                      key={occ}
                      className="px-4 py-1.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-medium"
                    >
                      {occ}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20 lg:mt-28 pt-12 lg:pt-16 border-t border-[var(--color-border)]">
            <h2 className="text-xl lg:text-2xl font-serif text-[var(--color-text-primary)]">
              Complete the Look
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Explore more pieces from our {product.collection}
            </p>
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
              {relatedProducts.map((related, i) => (
                <ProductCard key={related.id} product={related} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

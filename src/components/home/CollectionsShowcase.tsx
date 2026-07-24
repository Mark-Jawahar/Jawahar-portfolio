"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const collections = [
  {
    title: "The Apparel Collection",
    description: "Bespoke Crochet Tops, Statement Jackets, Artisan Caps",
    tagline: "Step into sustainable handcrafted fashion that makes a statement.",
    href: "/apparel",
    gradient: "from-[var(--color-accent)] to-[var(--color-accent-hover)]",
    imageBg: "bg-gradient-to-br from-[#f5f0eb] to-[#e8dcc8]",
  },
  {
    title: "The Gifting Collection",
    description: "Everlasting Crochet Bouquets, Signature Crochet Keychains",
    tagline: "Give the gift of everlasting memories with handcrafted creations made to last forever.",
    href: "/gifts",
    gradient: "from-[var(--color-accent)] to-[var(--color-accent-hover)]",
    imageBg: "bg-gradient-to-br from-[#e8e0d8] to-[#d4c5b5]",
  },
];

export default function CollectionsShowcase() {
  return (
    <section className="section-padding bg-[var(--color-bg-secondary)]">
      <div className="container-site">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {collections.map((collection, i) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={collection.href}
                className="group block relative rounded-[var(--radius-container)] overflow-hidden"
              >
                <div className={`aspect-[4/5] ${collection.imageBg} relative`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
                    <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-white/70 mb-3">
                      Collection
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-serif text-white leading-tight">
                      {collection.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80 max-w-sm">
                      {collection.tagline}
                    </p>
                    <p className="mt-1 text-xs text-white/60">
                      {collection.description}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-white border-b border-white/50 pb-0.5 group-hover:gap-3 transition-all duration-300">
                      Explore Collection
                      <HiOutlineArrowLongRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

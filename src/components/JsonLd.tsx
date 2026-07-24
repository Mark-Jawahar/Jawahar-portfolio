export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "HookedByPree",
    description: "Premium handcrafted crochet creations. Bespoke apparel and everlasting gifts.",
    url: "https://hookedbypree.com",
    image: "https://hookedbypree.com/placeholder.svg",
    telephone: "+919620151434",
    email: "hello@hookedbypree.com",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    sameAs: [
      "https://instagram.com/hookedbypree",
      "https://wa.me/919620151434",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <h1 className="text-8xl sm:text-9xl font-light text-white/10">404</h1>
      <p className="text-white/40 text-lg mt-4 mb-8">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm hover:bg-white/10 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}

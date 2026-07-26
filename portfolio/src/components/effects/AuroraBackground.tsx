"use client";

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[50%] rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168,216,234,0.4) 0%, transparent 70%)",
          animation: "aurora 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196,181,253,0.3) 0%, transparent 70%)",
          animation: "aurora 16s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full opacity-[0.04]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(168,216,234,0.2) 0%, transparent 70%)",
          animation: "aurora 14s ease-in-out infinite 2s",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_50%)]" />
    </div>
  );
}

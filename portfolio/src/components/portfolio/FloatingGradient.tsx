export function FloatingGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03] animate-float"
        style={{
          background:
            "radial-gradient(circle, #2563eb 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background:
            "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
          animationDelay: "2s",
        }}
      />
    </div>
  );
}

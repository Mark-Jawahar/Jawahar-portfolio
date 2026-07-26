export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-2xl font-light text-white/80 mb-8">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["Projects", "Experience", "Skills", "Certificates", "Gallery", "Messages"].map((item) => (
          <div
            key={item}
            className="glass rounded-2xl p-6 hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <h3 className="text-white/70 font-medium">{item}</h3>
            <p className="text-white/30 text-sm mt-1">Manage your {item.toLowerCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

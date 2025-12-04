export const LoginBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orbe 1 */}
      <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[80px] animate-pulse" />

      {/* Orbe 2 */}
      <div className="absolute -bottom-[15%] -left-[10%] w-[600px] h-[600px] rounded-full bg-violet-500/20 blur-[80px] animate-pulse delay-1000" />

      {/* Orbe 3 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/20 blur-[80px] animate-pulse delay-700" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

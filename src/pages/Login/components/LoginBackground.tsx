export const LoginBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Orbes flotantes */}
      <div
        className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-blue-500/30 blur-[120px] animate-float"
        style={{ animationDelay: '0s' }}
      />

      <div
        className="absolute -bottom-[15%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-500/25 blur-[120px] animate-float"
        style={{ animationDelay: '2s' }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-violet-500/20 blur-[120px] animate-float"
        style={{ animationDelay: '4s' }}
      />

      {/* Figuras geométricas animadas */}
      {/* Círculos */}
      <div className="absolute top-[20%] left-[10%] w-16 h-16 rounded-full border-2 border-indigo-400/20 animate-float" style={{ animationDelay: '1s', animationDuration: '10s' }} />
      <div className="absolute top-[60%] right-[15%] w-12 h-12 rounded-full border-2 border-violet-400/20 animate-float" style={{ animationDelay: '3s', animationDuration: '12s' }} />
      <div className="absolute bottom-[30%] left-[20%] w-20 h-20 rounded-full border-2 border-blue-400/15 animate-float" style={{ animationDelay: '2s', animationDuration: '14s' }} />

      {/* Cuadrados rotando */}
      <div className="absolute top-[40%] right-[10%] w-14 h-14 border-2 border-indigo-400/20 animate-spin" style={{ animationDuration: '20s' }} />
      <div className="absolute top-[70%] left-[15%] w-10 h-10 border-2 border-violet-400/15 animate-spin" style={{ animationDuration: '25s' }} />
      <div className="absolute top-[15%] right-[25%] w-12 h-12 border-2 border-blue-400/20 rotate-45 animate-float" style={{ animationDelay: '4s', animationDuration: '16s' }} />

      {/* Triángulos (usando borders) */}
      <div
        className="absolute top-[50%] left-[5%] w-0 h-0 animate-float"
        style={{
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '35px solid rgba(99, 102, 241, 0.15)',
          animationDelay: '5s',
          animationDuration: '18s'
        }}
      />
      <div
        className="absolute bottom-[20%] right-[20%] w-0 h-0 animate-float"
        style={{
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '26px solid rgba(139, 92, 246, 0.15)',
          animationDelay: '1.5s',
          animationDuration: '15s'
        }}
      />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

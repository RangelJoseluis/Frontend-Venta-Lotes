import { Shield } from 'lucide-react';

export const LoginHeader = () => {
  return (
    <div className="text-center mb-6 animate-fade-in">
      <div className="inline-flex mb-4 relative">
        <div className="w-[90px] h-[90px] bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-[0_15px_40px_rgba(99,102,241,0.5)] relative overflow-hidden transition-all duration-300 hover:scale-105 hover:rotate-3 hover:shadow-[0_20px_60px_rgba(99,102,241,0.7)] animate-bounce-slow">
          {/* Shine effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-100%] animate-shine" />

          <Shield className="w-[45px] h-[45px] text-white relative z-10 drop-shadow-md" />
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-white mb-1.5 tracking-tight drop-shadow-lg">
        Lote Smart
      </h1>
      <p className="text-slate-300 flex items-center justify-center gap-2 text-xs font-medium">
        <Shield className="w-3.5 h-3.5 text-indigo-400" />
        Sistema de Gestión de lotes Profesional
      </p>
    </div>
  );
};

import type { ReactNode } from 'react';

interface LoginCardProps {
  children: ReactNode;
}

export const LoginCard = ({ children }: LoginCardProps) => {
  return (
    <div className="bg-white/98 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.2)] relative overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200 border border-white/30">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 bg-[length:200%_100%] animate-gradient-shift" />

      <div className="mb-5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse" />
          <h2 className="text-2xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Iniciar Sesión
          </h2>
        </div>
      </div>
      {children}
    </div>
  );
};

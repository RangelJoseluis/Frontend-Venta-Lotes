import type { ReactNode } from 'react';

interface LoginCardProps {
  children: ReactNode;
}

export const LoginCard = ({ children }: LoginCardProps) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200 border border-slate-700/50">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 bg-[length:200%_100%] animate-gradient-shift" />

      <div className="mb-5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-pulse" />
          <h2 className="text-2xl font-bold text-white">
            Iniciar Sesión
          </h2>
        </div>
      </div>
      {children}
    </div>
  );
};

import { Shield, Mail, Lock } from 'lucide-react';

export const DemoCredentials = () => {
  return (
    <div className="mt-5 p-3 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-3.5 h-3.5 text-indigo-600" />
        <p className="text-xs font-semibold text-slate-700">
          Credenciales de prueba
        </p>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs">
          <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-slate-600 font-medium">Email:</span>
          <span className="text-slate-900 font-mono bg-white px-1.5 py-0.5 rounded text-[11px]">
            admin@dominio.com
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Lock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="text-slate-600 font-medium">Contraseña:</span>
          <span className="text-slate-900 font-mono bg-white px-1.5 py-0.5 rounded text-[11px]">
            Admin123!
          </span>
        </div>
      </div>
    </div>
  );
};

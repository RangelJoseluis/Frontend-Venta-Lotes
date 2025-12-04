import { Shield, Mail, Lock } from 'lucide-react';

export const DemoCredentials = () => {
  return (
    <div className="mt-5 p-3 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/10 dark:to-violet-900/10 border border-blue-200 dark:border-blue-800 rounded-xl">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Credenciales de prueba
        </p>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs">
          <Mail className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400 font-medium">Email:</span>
          <span className="text-slate-900 dark:text-white font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
            admin@dominio.com
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Lock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
          <span className="text-slate-600 dark:text-slate-400 font-medium">Contraseña:</span>
          <span className="text-slate-900 dark:text-white font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">
            Admin123!
          </span>
        </div>
      </div>
    </div>
  );
};

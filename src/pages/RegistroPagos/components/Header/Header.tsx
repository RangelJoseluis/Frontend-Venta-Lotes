/**
 * COMPONENTE: Header
 * 
 * Encabezado de la página de registro de pagos
 * Diseño compacto y moderno con Tailwind CSS
 */

import { ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onBack: () => void;
}

export default function Header({ onBack }: HeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
          title="Volver"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white leading-none">
            Registrar Pago de Cuota
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gestión de Pagos / Nuevo Registro
          </p>
        </div>
      </div>
    </div>
  );
}

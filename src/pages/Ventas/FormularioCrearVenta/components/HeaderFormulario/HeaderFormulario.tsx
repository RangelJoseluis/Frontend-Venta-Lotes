// Componente HeaderFormulario - Encabezado compacto del formulario de crear venta
// Diseño moderno con Tailwind CSS

import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HeaderFormulario: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="p-2 -ml-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
          title="Volver al Dashboard"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white leading-none">
            Registrar Nueva Venta
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gestión de Ventas / Nueva Venta
          </p>
        </div>
      </div>
    </div>
  );
};

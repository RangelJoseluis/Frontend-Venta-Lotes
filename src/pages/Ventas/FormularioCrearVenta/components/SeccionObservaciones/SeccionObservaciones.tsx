// Componente SeccionObservaciones - Campo de notas y comentarios
// Diseño moderno con Tailwind CSS

import { FileText } from 'lucide-react';

interface SeccionObservacionesProps {
  observaciones: string;
  onObservacionesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const SeccionObservaciones: React.FC<SeccionObservacionesProps> = ({
  observaciones,
  onObservacionesChange
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <FileText size={20} className="text-slate-600 dark:text-slate-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Notas y Comentarios
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Información adicional sobre la venta
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="observaciones" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
          <FileText size={16} className="text-slate-400" />
          Observaciones
        </label>
        <textarea
          id="observaciones"
          name="observaciones"
          value={observaciones}
          onChange={onObservacionesChange}
          rows={4}
          placeholder="Venta con plan de financiación a 2 años, cliente aprobado por crédito"
          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
        />
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Información adicional sobre la venta, condiciones especiales o acuerdos
        </p>
      </div>
    </div>
  );
};

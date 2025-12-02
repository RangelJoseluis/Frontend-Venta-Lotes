// Componente ResumenVenta - Muestra el resumen de cálculos de la venta
// Diseño moderno con Tailwind CSS

import { DollarSign } from 'lucide-react';
import type { VentaFormData } from '../../types';
import { calcularResumenVenta } from '../../utils/calculosFinancieros';
import { formatCurrency } from '../../utils/formatters';

interface ResumenVentaProps {
  formData: VentaFormData;
}

export const ResumenVenta: React.FC<ResumenVentaProps> = ({ formData }) => {
  // Solo mostrar resumen si hay datos suficientes para cuotas
  const shouldShowResumen =
    formData.precioVenta &&
    formData.modalidadPago === 'cuotas' &&
    formData.montoInicial;

  if (!shouldShowResumen) {
    return null;
  }

  const resumen = calcularResumenVenta(
    formData.precioVenta,
    formData.montoInicial,
    formData.cantidadCuotas
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
          <DollarSign size={20} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h4 className="text-lg font-semibold text-slate-800 dark:text-white">
          Resumen de la Venta
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            Precio Total
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            ${formatCurrency(resumen.precioTotal)}
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            Inicial
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            ${formatCurrency(resumen.montoInicial)}
          </p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
            Saldo a Financiar
          </p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">
            ${formatCurrency(resumen.saldoAFinanciar)}
          </p>
        </div>

        {resumen.valorCuota && resumen.cantidadCuotas && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-800">
            <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">
              Valor por Cuota ({resumen.cantidadCuotas} cuotas)
            </p>
            <p className="text-lg font-bold text-blue-900 dark:text-blue-100">
              ${formatCurrency(resumen.valorCuota)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

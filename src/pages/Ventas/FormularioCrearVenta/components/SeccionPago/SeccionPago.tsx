// Componente SeccionPago - Configuración de pago y financiación
// Diseño moderno con Tailwind CSS

import { DollarSign, Calendar, CreditCard } from 'lucide-react';
import type { VentaFormData } from '../../types';
import { MODALIDADES_PAGO, OPCIONES_CUOTAS } from '../../constants';
import { formatCurrencyInput } from '../../utils/formatters';

interface SeccionPagoProps {
  formData: VentaFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCurrencyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SeccionPago: React.FC<SeccionPagoProps> = ({
  formData,
  onInputChange,
  onCurrencyChange
}) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <DollarSign size={20} className="text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Condiciones de Pago
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Define el precio y modalidad de pago
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Precio de Venta */}
        <div className="space-y-2">
          <label htmlFor="precioVenta" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <DollarSign size={16} className="text-slate-400" />
            Precio de Venta <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">$</span>
            <input
              type="text"
              id="precioVenta"
              name="precioVenta"
              value={formatCurrencyInput(formData.precioVenta)}
              onChange={onCurrencyChange}
              placeholder="0"
              className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              required
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Precio final acordado para la venta del lote
          </p>
        </div>

        {/* Modalidad de Pago */}
        <div className="space-y-2">
          <label htmlFor="modalidadPago" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <CreditCard size={16} className="text-slate-400" />
            Modalidad de Pago <span className="text-red-500">*</span>
          </label>
          <select
            id="modalidadPago"
            name="modalidadPago"
            value={formData.modalidadPago}
            onChange={onInputChange}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            required
          >
            {MODALIDADES_PAGO.map(modalidad => (
              <option key={modalidad.value} value={modalidad.value}>
                {modalidad.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Forma de pago: contado completo o financiación por cuotas
          </p>
        </div>

        {/* Cantidad de Cuotas - Solo si es modalidad cuotas */}
        {formData.modalidadPago === 'cuotas' && (
          <div className="space-y-2">
            <label htmlFor="cantidadCuotas" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Calendar size={16} className="text-slate-400" />
              Cantidad de Cuotas <span className="text-red-500">*</span>
            </label>
            <select
              id="cantidadCuotas"
              name="cantidadCuotas"
              value={formData.cantidadCuotas}
              onChange={onInputChange}
              className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              required
            >
              {OPCIONES_CUOTAS.map(opcion => (
                <option key={opcion.value} value={opcion.value}>
                  {opcion.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Número de cuotas mensuales para el financiamiento
            </p>
          </div>
        )}

        {/* Monto Inicial - Solo si es modalidad cuotas */}
        {formData.modalidadPago === 'cuotas' && (
          <div className="space-y-2">
            <label htmlFor="montoInicial" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <DollarSign size={16} className="text-slate-400" />
              Monto Inicial <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">$</span>
              <input
                type="text"
                id="montoInicial"
                name="montoInicial"
                value={formatCurrencyInput(formData.montoInicial)}
                onChange={onCurrencyChange}
                placeholder="0"
                className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                required
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pago inicial requerido al momento de la firma
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * COMPONENTE: SeccionPago
 * 
 * Sección del formulario con los campos de información del pago
 * Diseño moderno con Tailwind CSS
 */

import { DollarSign, Calendar, CreditCard, FileText } from 'lucide-react';
import type { Cuota } from '../../../../types';
import type { PagoFormData } from '../../types';
import { METODO_PAGO_OPTIONS } from '../../constants';

interface SeccionPagoProps {
  formData: PagoFormData;
  cuotaSeleccionada: Cuota | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onAutocompletarMonto: () => void;
}

export default function SeccionPago({
  formData,
  cuotaSeleccionada,
  onChange,
  onAutocompletarMonto
}: SeccionPagoProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
          <DollarSign size={20} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Información del Pago
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Detalles del pago a registrar
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monto */}
        <div className="space-y-2">
          <label htmlFor="monto" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <DollarSign size={16} className="text-slate-400" />
            Monto <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">$</span>
            <input
              type="number"
              id="monto"
              name="monto"
              value={formData.monto}
              onChange={onChange}
              placeholder="0"
              step="0.01"
              min="0"
              className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>
          {cuotaSeleccionada && (
            <button
              type="button"
              onClick={onAutocompletarMonto}
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline transition-colors"
            >
              Usar monto pendiente ({cuotaSeleccionada.montoPendiente.toLocaleString('es-CO')})
            </button>
          )}
        </div>

        {/* Fecha de Pago */}
        <div className="space-y-2">
          <label htmlFor="fechaPago" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <Calendar size={16} className="text-slate-400" />
            Fecha de Pago <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="fechaPago"
            name="fechaPago"
            value={formData.fechaPago}
            onChange={onChange}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            required
          />
        </div>

        {/* Método de Pago */}
        <div className="space-y-2">
          <label htmlFor="metodoPago" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <CreditCard size={16} className="text-slate-400" />
            Método de Pago <span className="text-red-500">*</span>
          </label>
          <select
            id="metodoPago"
            name="metodoPago"
            value={formData.metodoPago}
            onChange={onChange}
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
            required
          >
            {METODO_PAGO_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Referencia */}
        <div className="space-y-2">
          <label htmlFor="referencia" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <FileText size={16} className="text-slate-400" />
            Referencia
          </label>
          <input
            type="text"
            id="referencia"
            name="referencia"
            value={formData.referencia}
            onChange={onChange}
            placeholder="Ej: TRANS-2025-001"
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Opcional. Se genera automáticamente si no se especifica.
          </p>
        </div>

        {/* Observaciones */}
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="observaciones" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <FileText size={16} className="text-slate-400" />
            Observaciones
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={onChange}
            placeholder="Información adicional sobre el pago..."
            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
            rows={3}
          />
        </div>
      </div>
    </div>
  );
}

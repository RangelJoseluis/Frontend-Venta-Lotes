/**
 * Componente SeccionVenta - Información de la venta
 * Migrado a Tailwind CSS
 */

import { FileText, User, Phone, Calendar, DollarSign, CreditCard } from 'lucide-react';
import { formatearPrecio, formatearFecha } from '../../utils/formatters';
import type { Venta } from '../../../../types';

interface SeccionVentaProps {
  venta: Venta;
}

const SeccionVenta = ({ venta }: SeccionVentaProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
        <FileText size={18} className="text-blue-600 dark:text-blue-400" />
        Información de Venta
      </h3>

      <div className="space-y-4">
        {/* Precio de Venta */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={16} className="text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400 uppercase tracking-wider">Precio de Venta</span>
          </div>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatearPrecio(venta.precioVenta)}</p>
        </div>

        {/* Modalidad de Pago */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard size={16} className="text-slate-500 dark:text-slate-400" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Modalidad de Pago</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {venta.modalidadPago === 'contado' ? 'Contado' : 'Cuotas'}
          </p>
        </div>

        {/* Información de cuotas (si aplica) */}
        {venta.modalidadPago === 'cuotas' && (
          <div className="grid grid-cols-2 gap-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="space-y-1">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-400 uppercase tracking-wider">Cuotas</span>
              <p className="text-sm font-bold text-blue-900 dark:text-blue-200">{venta.cantidadCuotas}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-medium text-blue-700 dark:text-blue-400 uppercase tracking-wider">Monto Inicial</span>
              <p className="text-sm font-bold text-blue-900 dark:text-blue-200">{formatearPrecio(venta.montoInicial)}</p>
            </div>
          </div>
        )}

        {/* Fecha de Venta */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-500 dark:text-slate-400" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Fecha de Venta</span>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatearFecha(venta.fechaVenta)}</p>
        </div>

        {/* Información del Cliente */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <User size={16} className="text-blue-600 dark:text-blue-400" />
            Cliente
          </h4>

          <div className="space-y-3">
            <div className="space-y-1">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Nombre</span>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {venta.cliente?.nombres} {venta.cliente?.apellidos}
              </p>
            </div>



            {venta.cliente?.telefono && (
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-500 dark:text-slate-400" />
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Teléfono</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">{venta.cliente.telefono}</p>
              </div>
            )}
          </div>
        </div>

        {/* Observaciones */}
        {venta.observaciones && (
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Observaciones</span>
            <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
              {venta.observaciones}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionVenta;

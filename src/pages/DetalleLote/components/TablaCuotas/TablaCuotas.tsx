/**
 * Componente TablaCuotas - Tabla de cuotas con detalles
 * Migrado a Tailwind CSS - Versión ultra compacta
 */

import { Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { formatearPrecio, formatearFecha } from '../../utils/formatters';
import type { Cuota } from '../../types';

interface TablaCuotasProps {
  cuotas: Cuota[];
}

const TablaCuotas = ({ cuotas }: TablaCuotasProps) => {
  if (cuotas.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar size={14} className="text-blue-600 dark:text-blue-400" />
          Cuotas ({cuotas.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full text-[11px]">
            <thead className="sticky top-0 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left py-1.5 px-2 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">#</th>
                <th className="text-right py-1.5 px-2 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Valor</th>
                <th className="text-right py-1.5 px-2 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Pagado</th>
                <th className="text-right py-1.5 px-2 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Pend.</th>
                <th className="text-left py-1.5 px-2 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Vence</th>
                <th className="text-center py-1.5 px-2 font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {cuotas.map((cuota) => (
                <tr
                  key={cuota.uid}
                  className={`transition-colors ${cuota.estaVencida && cuota.estado !== 'pagada'
                      ? 'bg-red-50 dark:bg-red-900/10'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'
                    }`}
                >
                  {/* Número de Cuota */}
                  <td className="py-1.5 px-2 whitespace-nowrap">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {cuota.numeroCuota}
                    </span>
                  </td>

                  {/* Valor */}
                  <td className="py-1.5 px-2 text-right font-medium text-slate-900 dark:text-white whitespace-nowrap">
                    {formatearPrecio(cuota.valor)}
                  </td>

                  {/* Pagado */}
                  <td className="py-1.5 px-2 text-right font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                    {formatearPrecio(cuota.montoPagado)}
                  </td>

                  {/* Pendiente */}
                  <td className="py-1.5 px-2 text-right font-medium text-amber-600 dark:text-amber-400 whitespace-nowrap">
                    {formatearPrecio(cuota.montoPendiente)}
                  </td>

                  {/* Vencimiento */}
                  <td className="py-1.5 px-2 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-slate-700 dark:text-slate-300">
                        {formatearFecha(cuota.fechaVencimiento)}
                      </span>
                      {cuota.estaVencida && cuota.estado !== 'pagada' && (
                        <span className="inline-flex items-center gap-0.5 text-[9px] text-red-600 dark:text-red-400 font-medium">
                          <AlertCircle size={9} />
                          Vencida
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Estado */}
                  <td className="py-1.5 px-2 text-center whitespace-nowrap">
                    {cuota.estado === 'pagada' ? (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-[9px] font-medium">
                        <CheckCircle size={10} />
                        Pagada
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-[9px] font-medium">
                        <Clock size={10} />
                        Pend.
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaCuotas;

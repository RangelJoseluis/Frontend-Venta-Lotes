import React from 'react';
import { ShoppingCart, CreditCard, Clock, DollarSign, Loader } from 'lucide-react';
import type { EstadisticasVentasProps } from '../../types';
import { formatearMoneda } from '../../utils/formatters';

const EstadisticasVentas: React.FC<EstadisticasVentasProps> = ({
  totalVentas,
  ventasContado,
  ventasCuotas,
  ventasPendientes,
  montoTotal,
  cargando
}) => {
  // Función para formatear montos grandes de forma compacta
  const formatearMontoCompacto = (valor: number): string => {
    const absValor = Math.abs(valor);

    if (absValor >= 1_000_000_000) {
      // Miles de millones (Billones en inglés)
      return `$${(valor / 1_000_000_000).toFixed(1)}B`;
    } else if (absValor >= 1_000_000) {
      // Millones
      return `$${(valor / 1_000_000).toFixed(1)}M`;
    } else if (absValor >= 10_000) {
      // Decenas de miles (para valores grandes pero no millones)
      return `$${(valor / 1_000).toFixed(0)}K`;
    } else {
      // Valores menores, formato normal pero sin decimales
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(valor);
    }
  };

  if (cargando) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
        <div className="col-span-full flex flex-col items-center justify-center min-h-[120px] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <Loader className="animate-spin mb-2 text-indigo-500" size={24} />
          <p className="text-sm text-slate-500 dark:text-slate-400">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-8">
      {/* Total Ventas */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-blue-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-blue-100 dark:bg-blue-900/30 text-blue-500">
          <ShoppingCart size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Total Ventas</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{totalVentas}</h3>
        </div>
      </div>

      {/* Contado */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-emerald-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500">
          <DollarSign size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Contado</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{ventasContado}</h3>
        </div>
      </div>

      {/* Cuotas */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-amber-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-amber-100 dark:bg-amber-900/30 text-amber-500">
          <CreditCard size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Cuotas</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{ventasCuotas}</h3>
        </div>
      </div>

      {/* Pendientes */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-red-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-red-100 dark:bg-red-900/30 text-red-500">
          <Clock size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Pendientes</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{ventasPendientes}</h3>
        </div>
      </div>

      {/* Monto Total - Formato Compacto */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4 md:p-6 flex items-center gap-4 shadow-sm border-l-4 border-indigo-500 transition-transform hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg shrink-0 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500">
          <DollarSign size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Monto Total</p>
          <h3
            className="text-2xl font-bold text-slate-800 dark:text-white"
            title={formatearMoneda(montoTotal)}
          >
            {formatearMontoCompacto(montoTotal)}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasVentas;

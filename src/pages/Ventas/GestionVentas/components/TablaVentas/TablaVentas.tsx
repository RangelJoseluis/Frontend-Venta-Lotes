import React from 'react';
import { Eye, Download, Trash2, Loader, MapPin, FileText, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { TablaVentasProps } from '../../types';
import {
  formatearMoneda,
  formatearFecha,
  formatearModalidadPago
} from '../../utils/formatters';

const TablaVentas: React.FC<TablaVentasProps> = ({
  ventas,
  cargando,
  onEliminar,
  onPrevisualizarFactura,
  onDescargarFactura
}) => {
  const navigate = useNavigate();

  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <Loader className="animate-spin mb-4 text-indigo-500 mx-auto" size={40} />
          <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-1">Cargando ventas...</h3>
          <p className="text-sm">Por favor espera un momento</p>
        </div>
      </div>
    );
  }

  if (ventas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <AlertCircle size={64} className="mb-4 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="text-xl font-medium text-slate-700 dark:text-slate-200 mb-2">No hay ventas registradas</h3>
          <p className="text-sm">Aún no se han encontrado ventas en el sistema</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden w-full mb-8">
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">LOTE</th>
              <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">CLIENTE</th>
              <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">VENTA</th>
              <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">MODALIDAD</th>
              <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">ESTADO</th>
              <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">ACCIONES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {ventas.map((venta) => (
              <tr key={venta.uid} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                {/* Columna: LOTE */}
                <td className="px-4 py-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500 text-white shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-slate-800 dark:text-white">{venta.lote?.codigo || 'N/A'}</span>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">{formatearMoneda(venta.precioVenta)}</span>
                    </div>
                  </div>
                </td>

                {/* Columna: CLIENTE */}
                <td className="px-4 py-4 align-middle">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {venta.cliente?.nombres} {venta.cliente?.apellidos}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{venta.cliente?.documento}</span>
                  </div>
                </td>

                {/* Columna: VENTA */}
                <td className="px-4 py-4 align-middle">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-slate-800 dark:text-white">{formatearFecha(venta.fechaVenta)}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {venta.montoPendiente > 0 ? (
                        `Pendiente: ${formatearMoneda(venta.montoPendiente)}`
                      ) : (
                        'Totalmente pagado'
                      )}
                    </span>
                  </div>
                </td>

                {/* Columna: MODALIDAD */}
                <td className="px-4 py-4 align-middle">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${venta.modalidadPago?.toLowerCase() === 'cuotas'
                    ? 'bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                    : 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                    }`}>
                    {formatearModalidadPago(venta.modalidadPago)}
                  </span>
                </td>

                {/* Columna: ESTADO */}
                <td className="px-4 py-4 align-middle">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide inline-flex items-center gap-1.5 ${venta.estado?.toLowerCase() === 'activa'
                    ? 'bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                    : venta.estado?.toLowerCase() === 'pendiente'
                      ? 'bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
                      : 'bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-300'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${venta.estado?.toLowerCase() === 'activa' ? 'bg-emerald-500'
                      : venta.estado?.toLowerCase() === 'pendiente' ? 'bg-amber-500'
                        : 'bg-red-500'
                      }`}></span>
                    {venta.estado}
                  </span>
                </td>

                {/* Columna: ACCIONES */}
                <td className="px-4 py-4 align-middle">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigate(`/lotes/${venta.lote?.uid}`)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                      title="Ver detalle del lote"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onPrevisualizarFactura(venta.uid)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                      title="Previsualizar factura"
                    >
                      <FileText size={16} />
                    </button>
                    <button
                      onClick={() => onDescargarFactura(venta.uid)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                      title="Descargar factura"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      onClick={() => onEliminar(venta.uid, venta.codigo)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-red-500 hover:bg-red-600 text-white shadow-sm"
                      title="Eliminar venta"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaVentas;

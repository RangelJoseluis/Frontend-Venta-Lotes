// Componente TabHistorial - Muestra el historial de cambios de estado de lotes
import { useState } from 'react';
import { Search, History, Loader } from 'lucide-react';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import type { Lote, CambioEstadoLote } from '../../types';

interface TabHistorialProps {
  lotes: Lote[];
  loteSeleccionado: string;
  historialLote: CambioEstadoLote[];
  loadingHistorial: boolean;
  onLoteChange: (loteUid: string) => void;
}

const TabHistorial = ({
  lotes,
  loteSeleccionado,
  historialLote,
  loadingHistorial,
  onLoteChange,
}: TabHistorialProps) => {
  const [busquedaLote, setBusquedaLote] = useState('');

  // Filtrar lotes por búsqueda
  const lotesFiltrados = lotes.filter((lote) =>
    lote.codigo?.toLowerCase().includes(busquedaLote.toLowerCase())
  );

  // Obtener información del lote seleccionado
  const loteInfo = lotes.find((l) => l.uid === loteSeleccionado);

  const getEstadoBadgeClasses = (estado: string) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';
    switch (estado?.toLowerCase()) {
      case 'disponible':
        return `${baseClasses} bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30`;
      case 'vendido':
        return `${baseClasses} bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30`;
      case 'encuotas':
        return `${baseClasses} bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30`;
      default:
        return `${baseClasses} bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400 border-slate-200 dark:border-slate-500/30`;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Historial de Cambios de Lote</h2>

      {/* Selector de Lote */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Search size={20} className="text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Seleccionar Lote
            </h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Busca y selecciona un lote para ver su historial de cambios
          </p>
        </div>

        <div className="space-y-4">
          {/* Buscador */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por código de lote..."
              value={busquedaLote}
              onChange={(e) => setBusquedaLote(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Selector de Lote */}
          <select
            value={loteSeleccionado}
            onChange={(e) => onLoteChange(e.target.value)}
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">-- Selecciona un lote --</option>
            {lotesFiltrados.map((lote) => {
              const precio = (lote as any).precioLista || lote.precio || 0;
              return (
                <option key={lote.uid} value={lote.uid}>
                  {lote.codigo} - {lote.estado} - {formatCurrency(precio)}
                </option>
              );
            })}
          </select>

          {/* Información del lote seleccionado */}
          {loteSeleccionado && loteInfo && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Código:</span>
                <p className="font-medium text-slate-900 dark:text-white">{loteInfo.codigo}</p>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Estado:</span>
                <div className="mt-1">
                  <span className={getEstadoBadgeClasses(loteInfo.estado)}>
                    {loteInfo.estado}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Superficie:</span>
                <p className="font-medium text-slate-900 dark:text-white">
                  {(loteInfo as any)?.superficieM2 || loteInfo?.superficie || 0} m²
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Precio:</span>
                <p className="font-medium text-slate-900 dark:text-white">
                  {formatCurrency((loteInfo as any)?.precioLista || loteInfo?.precio || 0)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de Historial */}
      {loteSeleccionado && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <History size={24} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Historial de Cambios ({historialLote.length})
              </h3>
            </div>
          </div>

          {loadingHistorial ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="animate-spin mb-3 text-blue-500" size={40} />
              <p className="text-slate-500 dark:text-slate-400">Cargando historial...</p>
            </div>
          ) : historialLote.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
              <div className="text-6xl mb-4">📋</div>
              <h4 className="text-lg font-medium text-slate-700 dark:text-slate-300">Sin cambios registrados</h4>
              <p className="text-sm">Este lote no tiene cambios de estado registrados en el sistema</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Estado Anterior</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Estado Nuevo</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Motivo</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Usuario</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Observaciones</th>
                    <th className="px-6 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">Requiere Aprobación</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {historialLote.map((cambio) => (
                    <tr key={cambio.uid} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4 align-middle">
                        <div className="flex flex-col">
                          <strong className="text-slate-900 dark:text-white">{formatDateTime(cambio.fechaCambio).split(',')[0]}</strong>
                          <span className="text-xs text-slate-500 dark:text-slate-400">{formatDateTime(cambio.fechaCambio).split(',')[1]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className={getEstadoBadgeClasses(cambio.estadoAnterior || '')}>
                          {cambio.estadoAnterior || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className={getEstadoBadgeClasses(cambio.estadoNuevo || '')}>
                          {cambio.estadoNuevo || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-middle text-slate-700 dark:text-slate-300">{cambio.motivo || '-'}</td>
                      <td className="px-6 py-4 align-middle text-slate-700 dark:text-slate-300">{cambio.usuarioEmail || 'Sistema'}</td>
                      <td className="px-6 py-4 align-middle text-slate-700 dark:text-slate-300 max-w-xs truncate">
                        {cambio.observaciones || '-'}
                      </td>
                      <td className="px-6 py-4 align-middle">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cambio.requiereAprobacionEspecial
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                          }`}>
                          {cambio.requiereAprobacionEspecial ? 'Sí' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TabHistorial;

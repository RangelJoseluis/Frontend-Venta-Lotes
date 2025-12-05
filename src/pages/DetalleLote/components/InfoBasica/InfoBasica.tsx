/**
 * Componente InfoBasica - Información básica del lote
 * Migrado a Tailwind CSS
 */

import { FileText, CheckCircle, X } from 'lucide-react';
import { formatearPrecio } from '../../utils/formatters';
import type { Lote } from '../../types';

interface InfoBasicaProps {
  lote: Lote;
}

const InfoBasica = ({ lote }: InfoBasicaProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
        <FileText size={20} className="text-blue-600 dark:text-blue-400" />
        Información Básica
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Código */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Código</span>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{lote.codigo}</p>
        </div>

        {/* Precio de Lista */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Precio de Lista</span>
          <p className="text-sm font-bold text-green-600 dark:text-green-400">{formatearPrecio(lote.precioLista)}</p>
        </div>

        {/* Superficie */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Superficie</span>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{parseFloat(lote.superficieM2).toFixed(2)} m²</p>
        </div>

        {/* Dimensiones */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dimensiones</span>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {parseFloat(lote.anchoM).toFixed(2)}m × {parseFloat(lote.largoM).toFixed(2)}m
          </p>
        </div>

        {/* Dirección */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dirección</span>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{lote.direccion}</p>
        </div>

        {/* Manzana */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Manzana</span>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{lote.manzana}</p>
        </div>

        {/* Número de Lote */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Número de Lote</span>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">{lote.numeroLote}</p>
        </div>

        {/* Topografía */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Topografía</span>
          <p className="text-sm font-semibold text-slate-900 dark:text-white capitalize">{lote.topografia}</p>
        </div>

        {/* Orientación (opcional) */}
        {lote.orientacion && (
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Orientación</span>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{lote.orientacion}</p>
          </div>
        )}

        {/* Vista (opcional) */}
        {lote.vista && (
          <div className="space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Vista</span>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{lote.vista}</p>
          </div>
        )}

        {/* Amueblado */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amueblado</span>
          <p className="text-sm font-semibold flex items-center gap-1">
            {lote.amueblado ? (
              <>
                <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400">Sí</span>
              </>
            ) : (
              <>
                <X size={16} className="text-slate-400 dark:text-slate-500" />
                <span className="text-slate-500 dark:text-slate-400">No</span>
              </>
            )}
          </p>
        </div>

        {/* Observaciones (ancho completo si existe) */}
        {lote.observaciones && (
          <div className="sm:col-span-2 lg:col-span-3 space-y-1">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Observaciones</span>
            <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
              {lote.observaciones}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoBasica;

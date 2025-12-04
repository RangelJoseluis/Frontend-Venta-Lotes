/**
 * Componente HeaderDetalleLote - Header con título, estado y acciones
 * Migrado a Tailwind CSS
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Edit, Eye, Download } from 'lucide-react';
import facturasService from '../../../../services/facturas.service';
import { obtenerColorEstado, obtenerTextoEstado } from '../../utils/formatters';
import type { Lote } from '../../types';
import type { Venta } from '../../../../types';

interface HeaderDetalleLoteProps {
  lote: Lote;
  venta: Venta | null;
}

const HeaderDetalleLote = ({ lote, venta }: HeaderDetalleLoteProps) => {
  const navigate = useNavigate();

  const handlePrevisualizarFactura = async () => {
    if (!venta) return;

    try {
      await facturasService.previsualizarFacturaVenta(venta.uid);
    } catch (error) {
      console.error('Error al previsualizar factura:', error);
      alert('Error al previsualizar la factura');
    }
  };

  const handleDescargarFactura = async () => {
    if (!venta) return;

    try {
      await facturasService.descargarFacturaVenta(venta.uid);
    } catch (error) {
      console.error('Error al descargar factura:', error);
      alert('Error al descargar la factura');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Lado izquierdo: Botón volver + Título */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/lotes')}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            title="Volver a Lotes"
          >
            <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Home size={28} className="text-blue-600 dark:text-blue-400" />
              Lote {lote.codigo}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {lote.manzana} - Lote {lote.numeroLote}
            </p>
          </div>
        </div>

        {/* Lado derecho: Badge de estado + Botones de acción */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Badge de estado */}
          <span
            className="px-3 py-1.5 rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: obtenerColorEstado(lote.estado) }}
          >
            {obtenerTextoEstado(lote.estado)}
          </span>

          {/* Botones de factura (solo si hay venta) */}
          {venta && (
            <>
              <button
                onClick={handlePrevisualizarFactura}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
                title="Previsualizar Factura"
              >
                <Eye size={18} />
                <span className="hidden sm:inline">Previsualizar</span>
              </button>
              <button
                onClick={handleDescargarFactura}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                title="Descargar Factura"
              >
                <Download size={18} />
                <span className="hidden sm:inline">Descargar</span>
              </button>
            </>
          )}

          {/* Botón Editar */}
          <button
            onClick={() => navigate(`/lotes/editar/${lote.uid}`)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Edit size={18} />
            <span className="hidden sm:inline">Editar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderDetalleLote;

// Componente HeaderDetalleLote - Header con título, estado y acciones
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Edit, Eye, Download } from 'lucide-react';
import facturasService from '../../../../services/facturas.service';
import { obtenerColorEstado, obtenerTextoEstado } from '../../utils/formatters';
import type { Lote } from '../../types';
import type { Venta } from '../../../../types';
import './HeaderDetalleLote.css';

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
    <div className="detalle-header">
      <div className="header-left">
        <button onClick={() => navigate('/lotes')} className="btn-back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1>
            <Home size={28} />
            Lote {lote.codigo}
          </h1>
          <p className="header-subtitle">
            {lote.manzana} - Lote {lote.numeroLote}
          </p>
        </div>
      </div>
      <div className="header-actions">
        <span 
          className="estado-badge"
          style={{ backgroundColor: obtenerColorEstado(lote.estado) }}
        >
          {obtenerTextoEstado(lote.estado)}
        </span>
        {venta && (
          <>
            <button
              onClick={handlePrevisualizarFactura}
              className="btn-preview"
              title="Previsualizar Factura"
            >
              <Eye size={20} />
              Previsualizar
            </button>
            <button
              onClick={handleDescargarFactura}
              className="btn-download"
              title="Descargar Factura"
            >
              <Download size={20} />
              Descargar
            </button>
          </>
        )}
        <button
          onClick={() => navigate(`/lotes/editar/${lote.uid}`)}
          className="btn-editar"
        >
          <Edit size={20} />
          Editar
        </button>
      </div>
    </div>
  );
};

export default HeaderDetalleLote;

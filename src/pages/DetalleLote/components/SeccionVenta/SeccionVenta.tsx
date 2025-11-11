// Componente SeccionVenta - Información de la venta
import { FileText } from 'lucide-react';
import { formatearPrecio, formatearFecha } from '../../utils/formatters';
import type { Venta } from '../../../../types';
import './SeccionVenta.css';

interface SeccionVentaProps {
  venta: Venta;
}

const SeccionVenta = ({ venta }: SeccionVentaProps) => {
  return (
    <div className="detalle-card">
      <h3 className="card-title-small">
        <FileText size={18} />
        Información de Venta
      </h3>
      <div className="info-grid-venta">
        <div className="info-item">
          <span className="info-label">Precio de Venta</span>
          <span className="info-value precio">{formatearPrecio(venta.precioVenta)}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Modalidad de Pago</span>
          <span className="info-value">
            {venta.modalidadPago === 'contado' ? 'Contado' : 'Cuotas'}
          </span>
        </div>
        {venta.modalidadPago === 'cuotas' && (
          <>
            <div className="info-item">
              <span className="info-label">Cantidad de Cuotas</span>
              <span className="info-value">{venta.cantidadCuotas}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Monto Inicial</span>
              <span className="info-value">{formatearPrecio(venta.montoInicial)}</span>
            </div>
          </>
        )}
        <div className="info-item">
          <span className="info-label">Fecha de Venta</span>
          <span className="info-value">{formatearFecha(venta.fechaVenta)}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Cliente</span>
          <span className="info-value">
            {venta.cliente?.nombres} {venta.cliente?.apellidos}
          </span>
        </div>
        {venta.cliente?.email && (
          <div className="info-item">
            <span className="info-label">Email</span>
            <span className="info-value">{venta.cliente.email}</span>
          </div>
        )}
        {venta.cliente?.telefono && (
          <div className="info-item">
            <span className="info-label">Teléfono</span>
            <span className="info-value">{venta.cliente.telefono}</span>
          </div>
        )}
        {venta.observaciones && (
          <div className="info-item full-width">
            <span className="info-label">Observaciones</span>
            <span className="info-value">{venta.observaciones}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeccionVenta;

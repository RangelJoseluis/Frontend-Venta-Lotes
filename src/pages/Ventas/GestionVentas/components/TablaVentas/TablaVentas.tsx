import React from 'react';
import { Eye, Download, Trash2, Loader, ShoppingCart, MapPin, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { TablaVentasProps } from '../../types';
import { 
  formatearMoneda, 
  formatearFecha, 
  formatearModalidadPago
} from '../../utils/formatters';
import './TablaVentas.css';

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
      <div className="tabla-loading">
        <div className="loading-content">
          <Loader className="loading-spinner" size={40} />
          <h3>Cargando ventas...</h3>
          <p>Por favor espera un momento</p>
        </div>
      </div>
    );
  }

  if (ventas.length === 0) {
    return (
      <div className="tabla-empty">
        <div className="empty-content">
          <ShoppingCart size={64} className="empty-icon" />
          <h3>No hay ventas registradas</h3>
          <p>Aún no se han encontrado ventas en el sistema</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tabla-wrapper">
      <div className="tabla-container">
        <table className="tabla-principal">
          <thead>
            <tr>
              <th className="th-lote">Lote</th>
              <th className="th-cliente">Cliente</th>
              <th className="th-venta">Venta</th>
              <th className="th-modalidad">Modalidad</th>
              <th className="th-estado">Estado</th>
              <th className="th-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.uid} className="fila-tabla">
                <td className="td-lote">
                  <div className="celda-lote">
                    <div className="lote-icono">
                      <MapPin size={18} />
                    </div>
                    <div className="lote-info">
                      <span className="lote-codigo">{venta.lote?.codigo || 'N/A'}</span>
                      <span className="lote-precio">{formatearMoneda(venta.precioVenta)}</span>
                    </div>
                  </div>
                </td>
                <td className="td-cliente">
                  <div className="celda-cliente">
                    <span className="cliente-nombre">
                      {venta.cliente?.nombres} {venta.cliente?.apellidos}
                    </span>
                    <span className="cliente-documento">{venta.cliente?.documento}</span>
                  </div>
                </td>
                <td className="td-venta">
                  <div className="celda-venta">
                    <span className="venta-fecha">{formatearFecha(venta.fechaVenta)}</span>
                    <span className="venta-pendiente">
                      {venta.montoPendiente > 0 ? (
                        `Pendiente: ${formatearMoneda(venta.montoPendiente)}`
                      ) : (
                        'Totalmente pagado'
                      )}
                    </span>
                  </div>
                </td>
                <td className="td-modalidad">
                  <span className={`badge-modalidad modalidad-${venta.modalidadPago?.toLowerCase()}`}>
                    {formatearModalidadPago(venta.modalidadPago)}
                  </span>
                </td>
                <td className="td-estado">
                  <span className={`badge-estado estado-${venta.estado?.toLowerCase()}`}>
                    <span className="estado-dot"></span>
                    {venta.estado}
                  </span>
                </td>
                <td className="td-acciones">
                  <div className="acciones-grupo">
                    <button
                      className="btn-accion btn-ver"
                      onClick={() => navigate(`/lotes/${venta.lote?.uid}`)}
                      title="Ver detalle del lote"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-accion btn-preview"
                      onClick={() => onPrevisualizarFactura(venta.uid)}
                      title="Previsualizar factura"
                    >
                      <FileText size={16} />
                    </button>
                    <button
                      className="btn-accion btn-download"
                      onClick={() => onDescargarFactura(venta.uid)}
                      title="Descargar factura"
                    >
                      <Download size={16} />
                    </button>
                    <button
                      className="btn-accion btn-eliminar"
                      onClick={() => onEliminar(venta.uid, venta.codigo)} 
                      title="Eliminar venta"
                    >
                      <Trash2 size={24} />
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

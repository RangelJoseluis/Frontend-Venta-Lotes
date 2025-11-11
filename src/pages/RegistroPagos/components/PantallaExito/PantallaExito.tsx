/**
 * COMPONENTE: PantallaExito
 * 
 * Pantalla de confirmación después de registrar un pago exitosamente
 * Muestra detalles del pago, discriminación mora/capital y botones de acción
 */

import { CheckCircle, Eye, Download, Plus, Home } from 'lucide-react';
import type { CrearPagoResponse } from '../../../../types';
import DiscriminacionPago from '../../../../components/DiscriminacionPago';
import facturasService from '../../../../services/facturas.service';
import { formatCurrency } from '../../utils/formatters';
import './PantallaExito.css';

interface PantallaExitoProps {
  pagoResponse: CrearPagoResponse;
  onNuevoPago: () => void;
  onVolver: () => void;
}

export default function PantallaExito({ pagoResponse, onNuevoPago, onVolver }: PantallaExitoProps) {
  const handlePrevisualizar = async () => {
    try {
      await facturasService.previsualizarTicketPago(pagoResponse.pago.uid);
    } catch (error) {
      console.error('Error al previsualizar ticket:', error);
      alert('Error al previsualizar el ticket');
    }
  };

  const handleDescargar = async () => {
    try {
      await facturasService.descargarTicketPago(pagoResponse.pago.uid);
    } catch (error) {
      console.error('Error al descargar ticket:', error);
      alert('Error al descargar el ticket');
    }
  };

  return (
    <div className="pago-container">
      <div className="pago-wrapper">
        <div className="success-container">
          <div className="success-card">
            {/* Icono de éxito */}
            <div className="success-icon">
              <CheckCircle />
            </div>

            {/* Título y mensaje */}
            <h2 className="success-title">¡Pago registrado exitosamente!</h2>
            <p className="success-message">{pagoResponse.mensaje}</p>

            {/* Detalles del pago */}
            <div className="success-details">
              <div className="detail-row">
                <span className="detail-label">Monto:</span>
                <span className="detail-value text-green-600 font-bold">
                  {pagoResponse.pago.montoFormateado}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Método:</span>
                <span className="detail-value">{pagoResponse.pago.metodoPagoFormateado}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Referencia:</span>
                <span className="detail-value font-mono">{pagoResponse.pago.referencia}</span>
              </div>
              {pagoResponse.excedente > 0 && (
                <div className="detail-row">
                  <span className="detail-label">Excedente:</span>
                  <span className="detail-value text-orange-600">
                    {formatCurrency(pagoResponse.excedente)}
                  </span>
                </div>
              )}
            </div>

            {/* Discriminación de Pago (Mora/Capital) */}
            {(pagoResponse.pago.montoAplicadoMora || pagoResponse.pago.montoAplicadoCapital) && (
              <DiscriminacionPago
                montoTotal={pagoResponse.pago.monto}
                montoTotalFormateado={pagoResponse.pago.montoFormateado}
                montoAplicadoMora={pagoResponse.pago.montoAplicadoMora}
                montoAplicadoCapital={pagoResponse.pago.montoAplicadoCapital}
                montoAplicadoMoraFormateado={pagoResponse.pago.montoAplicadoMoraFormateado}
                montoAplicadoCapitalFormateado={pagoResponse.pago.montoAplicadoCapitalFormateado}
              />
            )}

            {/* Botones de acción */}
            <div className="success-actions">
              <button onClick={handlePrevisualizar} className="btn btn-preview">
                <Eye size={20} />
                Previsualizar Ticket
              </button>
              <button onClick={handleDescargar} className="btn btn-download">
                <Download size={20} />
                Descargar Ticket
              </button>
              <button onClick={onNuevoPago} className="btn btn-primary">
                <Plus size={20} />
                Registrar Otro Pago
              </button>
              <button onClick={onVolver} className="btn btn-secondary">
                <Home size={20} />
                Volver al Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente TablaCuotas - Tabla de cuotas con detalles
import { Calendar } from 'lucide-react';
import { formatearPrecio, formatearFecha } from '../../utils/formatters';
import type { Cuota } from '../../types';
import './TablaCuotas.css';

interface TablaCuotasProps {
  cuotas: Cuota[];
}

const TablaCuotas = ({ cuotas }: TablaCuotasProps) => {
  if (cuotas.length === 0) {
    return null;
  }

  return (
    <div className="detalle-card">
      <h3 className="card-title-small">
        <Calendar size={18} />
        Cuotas ({cuotas.length})
      </h3>
      <div className="tabla-scroll">
        <table className="tabla-cuotas">
          <thead>
            <tr>
              <th>Cuota</th>
              <th>Valor</th>
              <th>Pagado</th>
              <th>Pendiente</th>
              <th>Vencimiento</th>
              <th style={{ textAlign: 'center' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {cuotas.map((cuota) => (
              <tr
                key={cuota.uid}
                className={cuota.estaVencida && cuota.estado !== 'pagada' ? 'cuota-vencida' : ''}
              >
                <td>
                  <span className="cuota-numero">Cuota {cuota.numeroCuota}</span>
                </td>
                <td>{formatearPrecio(cuota.valor)}</td>
                <td className="monto-pagado">
                  {formatearPrecio(cuota.montoPagado)}
                </td>
                <td className="monto-pendiente">
                  {formatearPrecio(cuota.montoPendiente)}
                </td>
                <td>
                  {formatearFecha(cuota.fechaVencimiento)}
                  {cuota.estaVencida && cuota.estado !== 'pagada' && (
                    <span className="badge-vencida">(Vencida)</span>
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span className={`estado-badge ${cuota.estado === 'pagada' ? 'pagada' : 'pendiente'}`}>
                    {cuota.estado === 'pagada' ? 'Pagada' : 'Pendiente'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaCuotas;

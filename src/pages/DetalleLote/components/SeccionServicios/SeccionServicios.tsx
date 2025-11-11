// Componente SeccionServicios - Listado de servicios del lote
import { CheckCircle } from 'lucide-react';
import type { Lote } from '../../types';
import './SeccionServicios.css';

interface SeccionServiciosProps {
  lote: Lote;
}

const SeccionServicios = ({ lote }: SeccionServiciosProps) => {
  // Si no hay servicios, no mostrar el componente
  if (!lote.servicios || lote.servicios.length === 0) {
    return null;
  }

  return (
    <div className="detalle-card">
      <h2 className="card-title">
        <CheckCircle size={20} />
        Servicios Disponibles
      </h2>
      <div className="servicios-grid">
        {lote.servicios.map((servicio, index) => (
          <div key={index} className="servicio-item">
            <CheckCircle size={16} className="servicio-icon" />
            <span className="servicio-nombre">{servicio.nombre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeccionServicios;

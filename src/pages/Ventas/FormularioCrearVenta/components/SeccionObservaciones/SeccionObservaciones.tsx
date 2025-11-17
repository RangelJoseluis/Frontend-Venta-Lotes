// Componente SeccionObservaciones - Campo de notas y comentarios
// Textarea para observaciones adicionales de la venta

import { FileText } from 'lucide-react';
import type { VentaFormData } from '../../types';
import './SeccionObservaciones.css';

interface SeccionObservacionesProps {
  observaciones: string;
  onObservacionesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const SeccionObservaciones: React.FC<SeccionObservacionesProps> = ({
  observaciones,
  onObservacionesChange
}) => {
  return (
    <div className="formulario-section">
      <div className="formulario-section-header">
        <FileText className="formulario-section-icon" />
        <h3 className="formulario-section-title">Notas y Comentarios</h3>
      </div>

      <div className="formulario-grid">
        <div className="formulario-field">
          <label htmlFor="observaciones" className="formulario-label">
            Observaciones
          </label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={observaciones}
            onChange={onObservacionesChange}
            rows={4}
            placeholder="Venta con plan de financiación a 2 años, cliente aprobado por crédito"
            className="formulario-textarea"
          />
          <p className="formulario-help">
            Información adicional sobre la venta, condiciones especiales o acuerdos
          </p>
        </div>
      </div>
    </div>
  );
};

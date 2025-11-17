// Componente HeaderFormulario - Encabezado del formulario de crear venta
// Muestra el título, descripción y navegación de regreso

import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HeaderFormulario.css';

export const HeaderFormulario: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="formulario-header">
      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="formulario-back-btn"
      >
        <ArrowLeft size={20} />
        Volver al Dashboard
      </button>
      
      <div className="formulario-title-section">
        <div className="formulario-title-icon">
          <FileText size={32} />
        </div>
        <div>
          <h1 className="formulario-title">Registrar Nueva Venta</h1>
          <p className="formulario-subtitle">
            Complete la información del cliente, lote y condiciones de pago
          </p>
        </div>
      </div>
    </div>
  );
};

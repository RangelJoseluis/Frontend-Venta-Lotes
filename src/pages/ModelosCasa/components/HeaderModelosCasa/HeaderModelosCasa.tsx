// Componente HeaderModelosCasa - Header con navegación y botones (estilo GestionLotes)
import { ArrowLeft, Home, Plus } from 'lucide-react';
import type { HeaderModelosCasaProps } from '../../types';
import './HeaderModelosCasa.css';

const HeaderModelosCasa = ({ onNuevoModelo, onVolver, totalModelos }: HeaderModelosCasaProps) => {
  return (
    <div className="gestion-header">
      <div className="header-left">
        <div className="header-icon">
          <Home size={24} />
        </div>
        <div>
          <h1 className="header-title">
            Gestión de Modelos de Casa
          </h1>
          <p className="header-subtitle">
            {totalModelos} modelo{totalModelos !== 1 ? 's' : ''} registrado{totalModelos !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={onVolver}
          className="btn-volver-dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: '#1e293b',
            border: '2px solid #e2e8f0',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f8fafc';
            e.currentTarget.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.borderColor = '#e2e8f0';
          }}
        >
          <ArrowLeft size={20} />
          Volver al Dashboard
        </button>
        <button
          onClick={onNuevoModelo}
          className="btn-nuevo-lote"
        >
          <Plus size={20} />
          Nuevo Modelo
        </button>
      </div>
    </div>
  );
};

export default HeaderModelosCasa;

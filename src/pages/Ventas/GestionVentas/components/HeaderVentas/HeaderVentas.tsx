// ============================================================================
// COMPONENTE: HEADER DE GESTIÓN DE VENTAS
// ============================================================================

import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HeaderVentas.css';

interface HeaderVentasProps {
  onNuevaVenta?: () => void;
}

const HeaderVentas: React.FC<HeaderVentasProps> = ({ onNuevaVenta }) => {
  const navigate = useNavigate();

  const handleNuevaVenta = () => {
    if (onNuevaVenta) {
      onNuevaVenta();
    } else {
      navigate('/ventas/crear');
    }
  };

  return (
    <div className="header-ventas">
      <button 
        className="btn-volver"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft size={20} />
        Volver al Dashboard
      </button>
      
      <h1>Gestión de Ventas</h1>
      
      <button 
        className="btn-nuevo"
        onClick={handleNuevaVenta}
      >
        <Plus size={20} />
        Nueva Venta
      </button>
    </div>
  );
};

export default HeaderVentas;

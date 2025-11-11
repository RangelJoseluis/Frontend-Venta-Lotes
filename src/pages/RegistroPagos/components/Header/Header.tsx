/**
 * COMPONENTE: Header
 * 
 * Encabezado de la página de registro de pagos
 * Incluye botón de volver, título e icono
 */

import { ArrowLeft, DollarSign } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onBack: () => void;
}

export default function Header({ onBack }: HeaderProps) {
  return (
    <div className="pago-header">
      <button onClick={onBack} className="back-button">
        <ArrowLeft size={20} />
        Volver
      </button>
      <div className="header-content">
        <div className="header-icon">
          <DollarSign />
        </div>
        <div>
          <h1 className="header-title">Registrar Pago de Cuota</h1>
          <p className="header-subtitle">Complete el formulario para registrar un nuevo pago</p>
        </div>
      </div>
    </div>
  );
}

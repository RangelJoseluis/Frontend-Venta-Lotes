import { Shield } from 'lucide-react';
import './LoginHeader.css';

export const LoginHeader = () => {
  return (
    <div className="login-header">
      <div className="logo-container">
        <div className="logo-placeholder">
          <Shield className="logo-icon" />
        </div>
      </div>

      <h1 className="login-title">
        Lote Smart
      </h1>
      <p className="login-subtitle">
        <Shield className="subtitle-icon" />
        Sistema de Gestión de lotes Profesional
      </p>
    </div>
  );
};

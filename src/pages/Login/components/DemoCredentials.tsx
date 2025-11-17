import { Shield, Mail, Lock } from 'lucide-react';
import './DemoCredentials.css';

export const DemoCredentials = () => {
  return (
    <div className="demo-credentials">
      <div className="credentials-header">
        <Shield className="credentials-icon" />
        <p className="credentials-title">Credenciales de prueba</p>
      </div>
      <div className="credentials-list">
        <div className="credential-item">
          <Mail className="credential-icon" />
          <span className="credential-label">Email:</span>
          <span className="credential-value">admin@dominio.com</span>
        </div>
        <div className="credential-item">
          <Lock className="credential-icon" />
          <span className="credential-label">Contraseña:</span>
          <span className="credential-value">Admin123!</span>
        </div>
      </div>
    </div>
  );
};

import { ReactNode } from 'react';
import './LoginCard.css';

interface LoginCardProps {
  children: ReactNode;
}

export const LoginCard = ({ children }: LoginCardProps) => {
  return (
    <div className="login-card">
      <div className="card-header">
        <div className="card-title-wrapper">
          <div className="card-icon-decorator"></div>
          <h2 className="card-title">Iniciar Sesión</h2>
        </div>
      </div>
      {children}
    </div>
  );
};

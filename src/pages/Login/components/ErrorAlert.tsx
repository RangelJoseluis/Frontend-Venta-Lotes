import { AlertCircle } from 'lucide-react';
import './ErrorAlert.css';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="error-alert">
      <AlertCircle className="error-icon" />
      <div className="error-content">
        <p className="error-title">Error al iniciar sesión</p>
        <p className="error-message">{message}</p>
      </div>
    </div>
  );
};

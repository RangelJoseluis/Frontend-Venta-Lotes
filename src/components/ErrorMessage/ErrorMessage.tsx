import { AlertTriangle, RefreshCw } from 'lucide-react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ 
  title = 'Error al cargar datos', 
  message, 
  onRetry = () => window.location.reload() 
}: ErrorMessageProps) => {
  return (
    <div className="error-message-container">
      <div className="error-message-card">
        <div className="error-icon-wrapper">
          <AlertTriangle className="error-icon" />
        </div>
        <h2 className="error-title">{title}</h2>
        <p className="error-description">{message}</p>
        <button 
          onClick={onRetry}
          className="error-retry-button"
        >
          <RefreshCw className="retry-icon" />
          <span>Reintentar</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;

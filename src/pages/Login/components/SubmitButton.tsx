import { LogIn } from 'lucide-react';
import './SubmitButton.css';

interface SubmitButtonProps {
  isLoading: boolean;
}

export const SubmitButton = ({ isLoading }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="submit-button"
    >
      <div className="button-content">
        {isLoading ? (
          <>
            <div className="spinner"></div>
            <span>Iniciando sesión...</span>
          </>
        ) : (
          <>
            <LogIn className="button-icon" />
            <span>Iniciar Sesión</span>
          </>
        )}
      </div>
      <div className="button-shine"></div>
    </button>
  );
};

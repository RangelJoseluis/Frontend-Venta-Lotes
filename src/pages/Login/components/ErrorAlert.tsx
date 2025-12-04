import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert = ({ message }: ErrorAlertProps) => {
  return (
    <div className="flex items-start gap-3 p-3 mb-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-in slide-in-from-top-2 fade-in duration-300">
      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="font-semibold text-red-900 text-xs mb-0.5">
          Error al iniciar sesión
        </p>
        <p className="text-red-700 text-xs">
          {message}
        </p>
      </div>
    </div>
  );
};

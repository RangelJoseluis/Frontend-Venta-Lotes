import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import type { AlertasEstadoProps } from '../../types';
import { TIMEOUTS } from '../../constants';

const AlertasEstado: React.FC<AlertasEstadoProps> = ({
    error,
    success,
    onLimpiarError,
    onLimpiarSuccess
}) => {
    // Auto-hide mensajes después de un tiempo
    useEffect(() => {
        if (success && onLimpiarSuccess) {
            const timer = setTimeout(() => {
                onLimpiarSuccess();
            }, TIMEOUTS.MENSAJE_EXITO);
            return () => clearTimeout(timer);
        }
    }, [success, onLimpiarSuccess]);

    useEffect(() => {
        if (error && onLimpiarError) {
            const timer = setTimeout(() => {
                onLimpiarError();
            }, TIMEOUTS.MENSAJE_ERROR);
            return () => clearTimeout(timer);
        }
    }, [error, onLimpiarError]);

    if (!error && !success) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
            {/* Mensaje de éxito */}
            {success && (
                <div className="flex items-center gap-3 px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-lg text-emerald-700 dark:text-emerald-300 animate-in slide-in-from-right duration-300">
                    <CheckCircle size={20} className="shrink-0" />
                    <span className="text-sm font-medium">{success}</span>
                    {onLimpiarSuccess && (
                        <button
                            onClick={onLimpiarSuccess}
                            className="p-1 hover:bg-emerald-100 dark:hover:bg-emerald-800 rounded-full transition-colors ml-2"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            {/* Mensaje de error */}
            {error && (
                <div className="flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg shadow-lg text-red-700 dark:text-red-300 animate-in slide-in-from-right duration-300">
                    <AlertCircle size={20} className="shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                    {onLimpiarError && (
                        <button
                            onClick={onLimpiarError}
                            className="p-1 hover:bg-red-100 dark:hover:bg-red-800 rounded-full transition-colors ml-2"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default AlertasEstado;

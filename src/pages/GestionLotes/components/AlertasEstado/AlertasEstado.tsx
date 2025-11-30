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
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-[400px] w-full md:w-auto">
            {/* Mensaje de éxito */}
            {success && (
                <div className="flex items-center gap-3 p-4 rounded-lg shadow-lg relative animate-in slide-in-from-right duration-300 bg-emerald-100 dark:bg-emerald-900/30 border-l-4 border-emerald-500 text-emerald-800 dark:text-emerald-200">
                    <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                    <span className="flex-1 font-medium text-sm">{success}</span>
                    {onLimpiarSuccess && (
                        <button onClick={onLimpiarSuccess} className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors ml-auto text-emerald-800 dark:text-emerald-200">
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            {/* Mensaje de error */}
            {error && (
                <div className="flex items-center gap-3 p-4 rounded-lg shadow-lg relative animate-in slide-in-from-right duration-300 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 text-red-800 dark:text-red-200">
                    <AlertCircle size={20} className="text-red-500 shrink-0" />
                    <span className="flex-1 font-medium text-sm">{error}</span>
                    {onLimpiarError && (
                        <button onClick={onLimpiarError} className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors ml-auto text-red-800 dark:text-red-200">
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default AlertasEstado;

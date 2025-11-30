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
            }, TIMEOUTS.MENSAJE_AUTO_HIDE);
            return () => clearTimeout(timer);
        }
    }, [success, onLimpiarSuccess]);

    useEffect(() => {
        if (error && onLimpiarError) {
            const timer = setTimeout(() => {
                onLimpiarError();
            }, TIMEOUTS.MENSAJE_AUTO_HIDE);
            return () => clearTimeout(timer);
        }
    }, [error, onLimpiarError]);

    if (!error && !success) {
        return null;
    }

    return (
        <div className="mb-6 space-y-4">
            {/* Mensaje de éxito */}
            {success && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                    <CheckCircle size={20} className="shrink-0" />
                    <span className="flex-1 text-sm font-medium">{success}</span>
                    {onLimpiarSuccess && (
                        <button
                            onClick={onLimpiarSuccess}
                            className="p-1 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 rounded-full transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            {/* Mensaje de error */}
            {error && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400">
                    <AlertCircle size={20} className="shrink-0" />
                    <span className="flex-1 text-sm font-medium">{error}</span>
                    {onLimpiarError && (
                        <button
                            onClick={onLimpiarError}
                            className="p-1 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-full transition-colors"
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

import React from 'react';
import { X } from 'lucide-react';
import type { ModalConfirmacionProps } from '../../types';

const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({
    isOpen,
    titulo,
    mensaje,
    onConfirmar,
    onCancelar,
    loading = false
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-[1000] animate-in fade-in duration-200"
            onClick={onCancelar}
        >
            <div
                className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-[90%] md:w-full animate-in slide-in-from-bottom-4 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {titulo}
                    </h2>
                    <button
                        className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={onCancelar}
                        disabled={loading}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {mensaje}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:justify-end p-6 border-t border-slate-200 dark:border-slate-700">
                    <button
                        className="w-full md:w-auto px-6 py-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={onCancelar}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        className="w-full md:w-auto px-6 py-3 bg-gradient-to-br from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white rounded-lg font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/30 dark:hover:shadow-red-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                        onClick={onConfirmar}
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;

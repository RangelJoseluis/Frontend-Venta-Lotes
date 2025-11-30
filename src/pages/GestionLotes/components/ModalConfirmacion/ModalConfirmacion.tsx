import React from 'react';
import { AlertCircle, X, Trash2, Loader } from 'lucide-react';
import type { ModalConfirmacionProps } from '../../types';

const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({
    isOpen,
    lote,
    onConfirmar,
    onCancelar,
    loading
}) => {
    if (!isOpen || !lote) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200" onClick={onCancelar}>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-[500px] w-[90%] animate-in slide-in-from-bottom-4 duration-300" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-800 dark:text-white m-0">
                        <AlertCircle size={24} className="text-red-500" />
                        Confirmar Eliminación
                    </h3>
                    <button onClick={onCancelar} className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-slate-600 dark:text-slate-300 mb-4">¿Estás seguro de que deseas eliminar el lote?</p>
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg border border-slate-100 dark:border-slate-700 my-4 flex flex-col gap-1">
                        <strong className="text-lg text-blue-600 dark:text-blue-400">{lote.codigo}</strong>
                        <span className="text-slate-700 dark:text-slate-200 font-medium">{lote.direccion}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                            Manzana: {lote.manzana} - Lote: {lote.numeroLote}
                        </span>
                    </div>
                    <p className="text-amber-600 dark:text-amber-400 text-sm font-medium mt-4 flex items-center gap-2">
                        <AlertCircle size={16} />
                        Esta acción no se puede deshacer.
                    </p>
                </div>
                <div className="flex gap-4 justify-end p-6 border-t border-slate-200 dark:border-slate-700 flex-col md:flex-row">
                    <button
                        onClick={onCancelar}
                        className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700 rounded-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirmar}
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin" size={16} />
                                Eliminando...
                            </>
                        ) : (
                            <>
                                <Trash2 size={16} />
                                Eliminar
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;

import React from 'react';
import { Eye, Edit, Trash2, MapPin, Loader, AlertCircle } from 'lucide-react';
import type { TablaLotesProps } from '../../types';
import { formatearPrecio, formatearFecha, formatearSuperficie, obtenerColorEstado, obtenerNombreEstado } from '../../utils';


const TablaLotes: React.FC<TablaLotesProps> = ({
    lotes,
    loading,
    onVer,
    onEditar,
    onEliminar
}) => {
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-center text-slate-500 dark:text-slate-400">
                    <Loader className="animate-spin mb-4 text-indigo-500 mx-auto" size={40} />
                    <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-1">Cargando lotes...</h3>
                    <p className="text-sm">Por favor espera un momento</p>
                </div>
            </div>
        );
    }

    if (lotes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-center text-slate-500 dark:text-slate-400">
                    <AlertCircle size={64} className="mb-4 text-slate-300 dark:text-slate-600 mx-auto" />
                    <h3 className="text-xl font-medium text-slate-700 dark:text-slate-200 mb-2">No hay lotes registrados</h3>
                    <p className="text-sm">Aún no se han encontrado lotes en el sistema</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden w-full mb-8">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm min-w-[1000px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">CÓDIGO</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">UBICACIÓN</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">SUPERFICIE</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">PRECIO</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">ESTADO</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">MODELO CASA</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">ACTUALIZADO</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {lotes.map((lote) => (
                            <tr key={lote.uid} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                {/* Columna: CÓDIGO */}
                                <td className="px-4 py-4 align-middle">
                                    <span className="font-semibold text-blue-600 dark:text-blue-400">{lote.codigo}</span>
                                </td>

                                {/* Columna: UBICACIÓN */}
                                <td className="px-4 py-4 align-middle">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500 text-white shrink-0">
                                            <MapPin size={20} />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-slate-800 dark:text-white">{lote.direccion}</span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                                Mz: {lote.manzana} - Lote: {lote.numeroLote}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Columna: SUPERFICIE */}
                                <td className="px-4 py-4 align-middle">
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                                        {formatearSuperficie(lote.superficieM2)}
                                    </span>
                                </td>

                                {/* Columna: PRECIO */}
                                <td className="px-4 py-4 align-middle">
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base">{formatearPrecio(lote.precioLista)}</span>
                                </td>

                                {/* Columna: ESTADO */}
                                <td className="px-4 py-4 align-middle">
                                    <span
                                        className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-white"
                                        style={{ backgroundColor: obtenerColorEstado(lote.estado) }}
                                    >
                                        {obtenerNombreEstado(lote.estado)}
                                    </span>
                                </td>

                                {/* Columna: MODELO CASA */}
                                <td className="px-4 py-4 align-middle">
                                    {lote.modeloCasa ? (
                                        <span className="text-slate-600 dark:text-slate-300">{lote.modeloCasa.nombre}</span>
                                    ) : (
                                        <span className="text-slate-400 italic">Sin modelo</span>
                                    )}
                                </td>

                                {/* Columna: ACTUALIZADO */}
                                <td className="px-4 py-4 align-middle">
                                    <span className="text-slate-500 dark:text-slate-400">{formatearFecha(lote.actualizadoEn)}</span>
                                </td>

                                {/* Columna: ACCIONES */}
                                <td className="px-4 py-4 align-middle">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onVer(lote.uid)}
                                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                            title="Ver detalles"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => onEditar(lote.uid)}
                                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                                            title="Editar"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => onEliminar(lote)}
                                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-red-500 hover:bg-red-600 text-white shadow-sm"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaLotes;

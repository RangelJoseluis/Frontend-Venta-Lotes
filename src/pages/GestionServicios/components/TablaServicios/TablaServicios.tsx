import React from 'react';
import { Eye, Edit, Trash2, Settings, Loader, AlertCircle } from 'lucide-react';
import type { TablaServiciosProps } from '../../types';
import { CATEGORIAS_SERVICIO, TIPOS_SERVICIO } from '../../constants';

const TablaServicios: React.FC<TablaServiciosProps> = ({
    servicios,
    loading,
    onEditar,
    onEliminar,
    onVerDetalle
}) => {
    const formatearCosto = (costo: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(costo);
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-center text-slate-500 dark:text-slate-400">
                    <Loader className="animate-spin mb-4 text-indigo-500 mx-auto" size={40} />
                    <h3 className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-1">Cargando servicios...</h3>
                    <p className="text-sm">Por favor espera un momento</p>
                </div>
            </div>
        );
    }

    if (servicios.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="text-center text-slate-500 dark:text-slate-400">
                    <AlertCircle size={64} className="mb-4 text-slate-300 dark:text-slate-600 mx-auto" />
                    <h3 className="text-xl font-medium text-slate-700 dark:text-slate-200 mb-2">No hay servicios registrados</h3>
                    <p className="text-sm">Aún no se han encontrado servicios en el sistema</p>
                </div>
            </div>
        );
    }

    // Mapeo de categorías a colores
    const getCategoriaColor = (categoria: string) => {
        const colores: Record<string, string> = {
            comunicaciones: 'bg-purple-500/10 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300',
            transporte: 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300',
            entretenimiento: 'bg-pink-500/10 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300',
            consumo_basico: 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-300',
            otros: 'bg-gray-500/10 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300'
        };
        return colores[categoria] || colores.otros;
    };

    // Mapeo de tipos a colores
    const getTipoColor = (tipo: string) => {
        const colores: Record<string, string> = {
            privado: 'bg-pink-500/10 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300',
            publico: 'bg-teal-500/10 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300'
        };
        return colores[tipo] || colores.publico;
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden w-full mb-8">
            <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">SERVICIO</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">CATEGORÍA</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">TIPO</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">COSTO MENSUAL</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">ESTADO</th>
                            <th className="px-4 py-4 text-left font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                        {servicios.map((servicio) => (
                            <tr key={servicio.uid} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                {/* Columna: SERVICIO */}
                                <td className="px-4 py-4 align-middle">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500 text-white shrink-0">
                                            <Settings size={20} />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-slate-800 dark:text-white">
                                                {servicio.nombre}
                                            </span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                {servicio.descripcion.length > 50
                                                    ? `${servicio.descripcion.substring(0, 50)}...`
                                                    : servicio.descripcion}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Columna: CATEGORÍA */}
                                <td className="px-4 py-4 align-middle">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getCategoriaColor(servicio.categoria)}`}>
                                        {CATEGORIAS_SERVICIO[servicio.categoria]}
                                    </span>
                                </td>

                                {/* Columna: TIPO */}
                                <td className="px-4 py-4 align-middle">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${getTipoColor(servicio.tipo)}`}>
                                        {TIPOS_SERVICIO[servicio.tipo]}
                                    </span>
                                </td>

                                {/* Columna: COSTO */}
                                <td className="px-4 py-4 align-middle">
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                        {formatearCosto(servicio.costoMensualBase || 0)}
                                    </span>
                                </td>

                                {/* Columna: ESTADO */}
                                <td className="px-4 py-4 align-middle">
                                    {servicio.estado === 'activo' ? (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
                                            ACTIVO
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-300">
                                            INACTIVO
                                        </span>
                                    )}
                                </td>

                                {/* Columna: ACCIONES */}
                                <td className="px-4 py-4 align-middle">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onVerDetalle(servicio.uid)}
                                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                                            title="Ver detalles"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => onEditar(servicio.uid)}
                                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                                            title="Editar servicio"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => onEliminar(servicio.uid)}
                                            className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-red-500 hover:bg-red-600 text-white shadow-sm"
                                            title="Eliminar servicio"
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

export default TablaServicios;

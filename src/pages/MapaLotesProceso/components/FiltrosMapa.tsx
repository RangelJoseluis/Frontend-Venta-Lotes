/**
 * Panel de Filtros del Mapa
 * Permite filtrar lotes por estado, precio y superficie
 */

import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { EstadoLote } from '../../../types';

interface FiltrosMapaProps {
    onFiltrosChange: (filtros: FiltrosState) => void;
    totalLotes: number;
    lotesFiltrados: number;
}

export interface FiltrosState {
    estados: {
        disponible: boolean;
        en_cuotas: boolean;
        vendido: boolean;
    };
    precioMin: number;
    precioMax: number;
    superficieMin: number;
    superficieMax: number;
}

const FiltrosMapa = ({ onFiltrosChange, totalLotes, lotesFiltrados }: FiltrosMapaProps) => {
    const [mostrar, setMostrar] = useState(false);
    const [filtros, setFiltros] = useState<FiltrosState>({
        estados: {
            disponible: true,
            en_cuotas: true,
            vendido: true,
        },
        precioMin: 0,
        precioMax: 100000000,
        superficieMin: 0,
        superficieMax: 10000,
    });

    const handleEstadoChange = (estado: keyof typeof filtros.estados) => {
        const nuevosFiltros = {
            ...filtros,
            estados: {
                ...filtros.estados,
                [estado]: !filtros.estados[estado],
            },
        };
        setFiltros(nuevosFiltros);
        onFiltrosChange(nuevosFiltros);
    };

    const handleLimpiar = () => {
        const filtrosLimpios: FiltrosState = {
            estados: {
                disponible: true,
                en_cuotas: true,
                vendido: true,
            },
            precioMin: 0,
            precioMax: 100000000,
            superficieMin: 0,
            superficieMax: 10000,
        };
        setFiltros(filtrosLimpios);
        onFiltrosChange(filtrosLimpios);
    };

    return (
        <div className="absolute top-4 right-4 z-[1000]">
            {/* Botón toggle */}
            <button
                onClick={() => setMostrar(!mostrar)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
                <Filter size={18} />
                <span className="font-medium">Filtros</span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                    {lotesFiltrados}/{totalLotes}
                </span>
                {mostrar ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Panel de filtros */}
            {mostrar && (
                <div className="mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900 dark:text-white">Filtros</h3>
                        <button
                            onClick={() => setMostrar(false)}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Filtro por estado */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Estado
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filtros.estados.disponible}
                                    onChange={() => handleEstadoChange('disponible')}
                                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Disponible</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filtros.estados.en_cuotas}
                                    onChange={() => handleEstadoChange('en_cuotas')}
                                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">En Cuotas</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filtros.estados.vendido}
                                    onChange={() => handleEstadoChange('vendido')}
                                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                                />
                                <span className="text-sm text-slate-700 dark:text-slate-300">Vendido</span>
                            </label>
                        </div>
                    </div>

                    {/* Botón limpiar */}
                    <button
                        onClick={handleLimpiar}
                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium"
                    >
                        Limpiar Filtros
                    </button>
                </div>
            )}
        </div>
    );
};

export default FiltrosMapa;

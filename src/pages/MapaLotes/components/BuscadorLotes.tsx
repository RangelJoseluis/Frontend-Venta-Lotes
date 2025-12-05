/**
 * Componente BuscadorLotes - Búsqueda colapsable de lotes
 * Permite buscar por código de lote o por cliente (admin)
 */

import { useState } from 'react';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { LoteParaMapa } from '../../../types/mapa';

interface BuscadorLotesProps {
    lotes: LoteParaMapa[];
    onBuscar: (termino: string) => void;
    terminoBusqueda: string;
    resultados: number;
}

const BuscadorLotes = ({ lotes, onBuscar, terminoBusqueda, resultados }: BuscadorLotesProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleLimpiar = () => {
        onBuscar('');
    };

    return (
        <div className="relative">
            {/* Botón toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${isOpen || terminoBusqueda
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-500'
                    }`}
            >
                <Search size={16} />
                <span>Buscar</span>
                {terminoBusqueda && (
                    <span className="px-1.5 py-0.5 bg-white/20 rounded text-xs font-semibold">
                        {resultados}
                    </span>
                )}
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {/* Panel de búsqueda */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xl p-4 z-[1002]">
                    <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                                Buscar Lote
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors"
                            >
                                <X size={16} className="text-slate-500 dark:text-slate-400" />
                            </button>
                        </div>

                        {/* Campo de búsqueda */}
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                value={terminoBusqueda}
                                onChange={(e) => onBuscar(e.target.value)}
                                placeholder="Buscar por código (ej: L001)..."
                                className="w-full pl-9 pr-9 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                autoFocus
                            />
                            {terminoBusqueda && (
                                <button
                                    onClick={handleLimpiar}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded transition-colors"
                                >
                                    <X size={14} className="text-slate-500 dark:text-slate-400" />
                                </button>
                            )}
                        </div>

                        {/* Resultados */}
                        {terminoBusqueda && (
                            <div className="text-xs text-slate-600 dark:text-slate-400">
                                {resultados === 0 ? (
                                    <span className="text-red-600 dark:text-red-400">
                                        No se encontraron lotes
                                    </span>
                                ) : (
                                    <span>
                                        Se encontraron <strong className="text-blue-600 dark:text-blue-400">{resultados}</strong> lote{resultados !== 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Sugerencias rápidas */}
                        {!terminoBusqueda && (
                            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Sugerencias:</p>
                                <div className="flex flex-wrap gap-1">
                                    {lotes.slice(0, 5).map((lote) => (
                                        <button
                                            key={lote.uid}
                                            onClick={() => onBuscar(lote.codigo)}
                                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-xs rounded transition-colors text-slate-700 dark:text-slate-300"
                                        >
                                            {lote.codigo}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuscadorLotes;

/**
 * Selector de Capas del Mapa - Versión Compacta
 * Permite cambiar entre vista de mapa, satélite e híbrida
 */

import { Map, Satellite, Layers } from 'lucide-react';
import type { TipoCapaMapa } from '../../../types/mapa';

interface SelectorCapasProps {
    tipoCapa: TipoCapaMapa;
    onCambiarCapa: (tipo: TipoCapaMapa) => void;
}

const SelectorCapas = ({ tipoCapa, onCambiarCapa }: SelectorCapasProps) => {
    return (
        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 p-1">
            <button
                onClick={() => onCambiarCapa('mapa')}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${tipoCapa === 'mapa'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                title="Vista de Mapa"
            >
                <Map size={14} />
                <span>Mapa</span>
            </button>

            <button
                onClick={() => onCambiarCapa('satelite')}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${tipoCapa === 'satelite'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                title="Vista Satelital"
            >
                <Satellite size={14} />
                <span>Satélite</span>
            </button>

            <button
                onClick={() => onCambiarCapa('hibrido')}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${tipoCapa === 'hibrido'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                title="Vista Híbrida"
            >
                <Layers size={14} />
                <span>Híbrido</span>
            </button>
        </div>
    );
};

export default SelectorCapas;

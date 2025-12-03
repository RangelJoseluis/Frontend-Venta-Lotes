/**
 * Selector de Capas del Mapa
 * Permite cambiar entre vista de mapa, satélite e híbrido
 */

import { Map, Satellite, Layers } from 'lucide-react';
import type { TipoCapaMapa } from '../../../types/mapa';

interface SelectorCapasProps {
    tipoCapa: TipoCapaMapa;
    onCambiarCapa: (capa: TipoCapaMapa) => void;
}

const SelectorCapas = ({ tipoCapa, onCambiarCapa }: SelectorCapasProps) => {
    const capas: { tipo: TipoCapaMapa; label: string; icon: React.ReactNode }[] = [
        { tipo: 'mapa', label: 'Mapa', icon: <Map size={16} /> },
        { tipo: 'satelite', label: 'Satélite', icon: <Satellite size={16} /> },
        { tipo: 'hibrido', label: 'Híbrido', icon: <Layers size={16} /> },
    ];

    return (
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1 shadow-sm">
            {capas.map((capa) => (
                <button
                    key={capa.tipo}
                    onClick={() => onCambiarCapa(capa.tipo)}
                    className={`
            flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all
            ${tipoCapa === capa.tipo
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                        }
          `}
                >
                    {capa.icon}
                    <span>{capa.label}</span>
                </button>
            ))}
        </div>
    );
};

export default SelectorCapas;

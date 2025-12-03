import { useState } from 'react';
import { ChevronUp, ChevronDown, Info } from 'lucide-react';
import { COLORES_MAPA } from '../utils/iconHelpers';

const Leyenda = () => {
    const [isOpen, setIsOpen] = useState(false);

    const items = [
        { color: COLORES_MAPA.disponible, label: 'Disponible' },
        { color: COLORES_MAPA.en_cuotas, label: 'En Cuotas' },
        { color: COLORES_MAPA.vendido, label: 'Vendido' },
        { color: COLORES_MAPA.destacado, label: 'Tu Lote', icon: '⭐' },
    ];

    return (
        <div className="relative">
            {/* Panel desplegable (hacia arriba) */}
            {isOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 shadow-xl z-50">
                    <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                        Leyenda
                    </h3>
                    <div className="space-y-2">
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div
                                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px]"
                                    style={{ backgroundColor: item.color }}
                                >
                                    {item.icon}
                                </div>
                                <span className="text-sm text-slate-700 dark:text-slate-300">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Botón activador */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                    ${isOpen
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }
                `}
            >
                <Info size={16} />
                <span>Leyenda</span>
                {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
        </div>
    );
};

export default Leyenda;

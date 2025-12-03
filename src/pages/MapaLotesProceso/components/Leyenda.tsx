/**
 * Leyenda del Mapa
 * Muestra los colores de los estados de los lotes
 */

import { COLORES_MAPA } from '../utils/iconHelpers';

const Leyenda = () => {
    const items = [
        { color: COLORES_MAPA.disponible, label: 'Disponible', count: 0 },
        { color: COLORES_MAPA.en_cuotas, label: 'En Cuotas', count: 0 },
        { color: COLORES_MAPA.vendido, label: 'Vendido', count: 0 },
        { color: COLORES_MAPA.destacado, label: 'Tu Lote', icon: '⭐' },
    ];

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-3 shadow-sm">
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
    );
};

export default Leyenda;

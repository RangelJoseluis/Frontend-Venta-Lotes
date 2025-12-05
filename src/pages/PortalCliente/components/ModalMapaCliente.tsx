import React from 'react';
import { X, Map as MapIcon } from 'lucide-react';
import type { VentaResumen } from '../../../types';

interface ModalMapaClienteProps {
    isOpen: boolean;
    onClose: () => void;
    ventas: VentaResumen[];
}

export const ModalMapaCliente: React.FC<ModalMapaClienteProps> = ({ isOpen, onClose, ventas }) => {
    if (!isOpen) return null;

    // Calcular estado de pago de cada venta
    const calcularEstadoPago = (venta: VentaResumen): 'completado' | 'en_proceso' => {
        // Si es pago de contado, está completado
        if (venta.modalidadPago === 'contado') return 'completado';

        // Si es a crédito, asumimos que está en proceso
        return 'en_proceso';
    };

    // Crear mapa de lotes del cliente con su estado
    const lotesCliente = ventas.map(venta => ({
        codigo: venta.lote.codigo,
        estado: calcularEstadoPago(venta),
        venta
    }));

    // Definir coordenadas de los lotes (simulado - deberías obtenerlo del backend)
    // Formato: [x, y] para cada esquina del polígono
    const lotesCoords: Record<string, number[][]> = {
        'L001': [[50, 50], [150, 50], [150, 150], [50, 150]],
        'L002': [[150, 50], [250, 50], [250, 150], [150, 150]],
        'L003': [[250, 50], [350, 50], [350, 150], [250, 150]],
        'L004': [[350, 50], [450, 50], [450, 150], [350, 150]],
        'L005': [[450, 50], [550, 50], [550, 150], [450, 150]],
        'L006': [[550, 50], [650, 50], [650, 150], [550, 150]],
        'L007': [[50, 150], [150, 150], [150, 250], [50, 250]],
        'L008': [[150, 150], [250, 150], [250, 250], [150, 250]],
        'L009': [[250, 150], [350, 150], [350, 250], [250, 250]],
        'L010': [[350, 150], [450, 150], [450, 250], [350, 250]],
        'L011': [[450, 150], [550, 150], [550, 250], [450, 250]],
        'L012': [[550, 150], [650, 150], [650, 250], [550, 250]],
    };

    const todosLosLotes = Object.keys(lotesCoords);

    // Función para obtener color del lote
    const getLoteColor = (codigo: string): string => {
        const lote = lotesCliente.find(l => l.codigo === codigo);
        if (!lote) return '#e5e7eb'; // Gris para lotes no del cliente

        if (lote.estado === 'completado') return '#10b981'; // Verde
        if (lote.estado === 'en_proceso') return '#f59e0b'; // Naranja
        return '#e5e7eb';
    };

    // Función para obtener opacidad del lote
    const getLoteOpacity = (codigo: string): number => {
        const lote = lotesCliente.find(l => l.codigo === codigo);
        return lote ? 0.8 : 0.15; // Lotes del cliente más visibles
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-6xl bg-white dark:bg-slate-800 rounded-2xl shadow-2xl transform transition-all">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <MapIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                                    Mis Lotes en el Mapa
                                </h2>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Visualiza la ubicación de tus propiedades
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            <X className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                        </button>
                    </div>

                    {/* Leyenda */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded shadow-sm"></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Pago de Contado
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-orange-500 rounded shadow-sm"></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Pago a Crédito
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded shadow-sm opacity-30"></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Otros Lotes
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mapa SVG */}
                    <div className="p-6">
                        <div className="bg-slate-100 dark:bg-slate-900 rounded-xl p-4 overflow-auto">
                            <svg
                                viewBox="0 0 700 300"
                                className="w-full h-auto"
                                style={{ minHeight: '500px' }}
                            >
                                {/* Fondo */}
                                <rect x="0" y="0" width="700" height="300" fill="#f1f5f9" className="dark:fill-slate-800" />

                                {/* Calles */}
                                <rect x="0" y="145" width="700" height="10" fill="#94a3b8" opacity="0.5" />
                                <rect x="345" y="0" width="10" height="300" fill="#94a3b8" opacity="0.5" />

                                {/* Lotes */}
                                {todosLosLotes.map((codigo) => {
                                    const coords = lotesCoords[codigo];
                                    const lote = lotesCliente.find(l => l.codigo === codigo);
                                    const color = getLoteColor(codigo);
                                    const opacity = getLoteOpacity(codigo);

                                    // Convertir coordenadas a string de puntos
                                    const points = coords.map(([x, y]) => `${x},${y}`).join(' ');

                                    return (
                                        <g key={codigo}>
                                            {/* Polígono del lote */}
                                            <polygon
                                                points={points}
                                                fill={color}
                                                opacity={opacity}
                                                stroke={lote ? '#fff' : '#cbd5e1'}
                                                strokeWidth={lote ? 3 : 1}
                                                className="transition-all duration-300 hover:opacity-100"
                                            />

                                            {/* Texto del código */}
                                            <text
                                                x={(coords[0][0] + coords[2][0]) / 2}
                                                y={(coords[0][1] + coords[2][1]) / 2}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                className="text-xs font-bold pointer-events-none"
                                                fill={lote ? '#fff' : '#64748b'}
                                                opacity={lote ? 1 : 0.5}
                                            >
                                                {codigo}
                                            </text>

                                            {/* Icono para lotes del cliente */}
                                            {lote && (
                                                <text
                                                    x={(coords[0][0] + coords[2][0]) / 2}
                                                    y={(coords[0][1] + coords[2][1]) / 2 + 15}
                                                    textAnchor="middle"
                                                    className="text-lg pointer-events-none"
                                                >
                                                    {lote.estado === 'completado' ? '✓' : '⏳'}
                                                </text>
                                            )}
                                        </g>
                                    );
                                })}
                            </svg>
                        </div>

                        {/* Información adicional */}
                        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                <strong>Nota:</strong> Los lotes resaltados son de tu propiedad.
                                {lotesCliente.length > 0 && ` Tienes ${lotesCliente.length} lote(s) en total.`}
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 rounded-b-2xl">
                        <button
                            onClick={onClose}
                            className="w-full sm:w-auto px-6 py-2.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

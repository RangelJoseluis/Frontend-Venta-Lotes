import React from 'react';
import { DollarSign, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { usePagosCliente } from '../hooks/usePagosCliente';
import { TablaPagos } from './TablaPagos';

export const MisPagos: React.FC = () => {
    const { pagos, estadisticas, loading, error } = usePagosCliente();

    const formatearMoneda = (valor: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(valor);
    };

    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">
                            Error al cargar pagos
                        </h3>
                        <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Tarjetas de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total de Pagos */}
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/30">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <DollarSign className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-blue-100 mb-1">
                        Total de Pagos
                    </h3>
                    <p className="text-3xl font-bold">
                        {loading ? '...' : estadisticas.totalPagos}
                    </p>
                </div>

                {/* Monto Total Pagado */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-500/30">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-emerald-100 mb-1">
                        Monto Total Pagado
                    </h3>
                    <p className="text-2xl font-bold">
                        {loading ? '...' : formatearMoneda(estadisticas.montoTotal)}
                    </p>
                </div>

                {/* Pagos del Mes */}
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-500/30">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <Calendar className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-purple-100 mb-1">
                        Pagos este Mes
                    </h3>
                    <p className="text-3xl font-bold">
                        {loading ? '...' : estadisticas.pagosMesActual}
                    </p>
                </div>

                {/* Monto del Mes */}
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg shadow-amber-500/30">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                            <DollarSign className="w-6 h-6" />
                        </div>
                    </div>
                    <h3 className="text-sm font-medium text-amber-100 mb-1">
                        Monto este Mes
                    </h3>
                    <p className="text-2xl font-bold">
                        {loading ? '...' : formatearMoneda(estadisticas.montoMesActual)}
                    </p>
                </div>
            </div>

            {/* Tabla de Pagos */}
            <TablaPagos pagos={pagos} loading={loading} />
        </div>
    );
};

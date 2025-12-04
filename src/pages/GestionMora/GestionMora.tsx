/**
 * PÁGINA: GESTIÓN DE MORA (MODULAR)
 * Componente principal que orquesta todos los sub-componentes
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { useGestionMora, useFiltrosMora } from './hooks';
import {
    HeaderGestion,
    EstadisticasMora,
    FiltrosMora,
    AlertasEstado,
    TablaCuotasMora
} from './components';

const GestionMora: React.FC = () => {
    const navigate = useNavigate();

    // Hooks personalizados
    const {
        cuotas,
        estadisticas,
        isLoading,
        error,
        cargarDatos,
        calcularMoraMasiva,
        limpiarError
    } = useGestionMora();

    const {
        filtroCliente,
        filtroLote,
        cuotasFiltradas,
        setFiltroCliente,
        setFiltroLote
    } = useFiltrosMora(cuotas);

    // Cargar datos al montar
    useEffect(() => {
        cargarDatos();
    }, [cargarDatos]);

    // Mostrar loading inicial
    if (isLoading && !estadisticas) {
        return (
            <div className="max-w-[1400px] mx-auto px-6 py-6 bg-fondo-pagina dark:bg-slate-950 min-h-screen">
                <div className="flex flex-col items-center justify-center min-h-[500px] bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
                    <Loader className="text-orange-500 dark:text-orange-400 animate-spin mb-5" size={56} />
                    <p className="text-base font-medium text-slate-600 dark:text-slate-400">
                        Cargando información de mora...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-none mx-auto px-1 py-1 bg-fondo-pagina dark:bg-slate-950 min-h-screen">
            <HeaderGestion
                onVolver={() => navigate('/dashboard')}
                onCalcularMora={calcularMoraMasiva}
                isLoading={isLoading}
            />

            {estadisticas && <EstadisticasMora estadisticas={estadisticas} />}

            <FiltrosMora
                filtroCliente={filtroCliente}
                filtroLote={filtroLote}
                onClienteChange={setFiltroCliente}
                onLoteChange={setFiltroLote}
            />

            <AlertasEstado
                error={error}
                success={null}
                onLimpiarError={limpiarError}
                onLimpiarSuccess={() => { }}
            />

            <TablaCuotasMora
                cuotas={cuotasFiltradas}
                onVerDetalle={(uid) => navigate(`/cuotas/${uid}`)}
                onRegistrarPago={() => navigate('/registrar-pago')}
            />
        </div>
    );
};

export default GestionMora;

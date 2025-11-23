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
import './GestionMora.css';

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
            <div className="mora-container">
                <div className="loading-container">
                    <Loader className="spinner-large" size={56} />
                    <p>Cargando información de mora...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mora-container">
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

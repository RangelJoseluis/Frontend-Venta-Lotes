/**
 * MAPA LOTES PROCESO - Versión reconstruida con Tailwind CSS
 * 
 * Componente principal del mapa interactivo de lotes.
 * Construido desde cero siguiendo las mejores prácticas de layout.
 */

import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import lotesMapaService from '../../services/lotes-mapa.service';
import type { LoteParaMapa, RolMapa, TipoCapaMapa } from '../../types/mapa';
import { TILES_CONFIG } from '../../types/mapa';
import { useAuthStore } from '../../store/authStore';
import { obtenerCentroZona, obtenerZoomZona } from '../../config/zona.config';

// Estilos de Leaflet (necesarios)
import 'leaflet/dist/leaflet.css';

// Componentes
import LoteMarker from './components/LoteMarker';
import LotePolygon from './components/LotePolygon';
import SelectorCapas from './components/SelectorCapas';
import Leyenda from './components/Leyenda';
import FiltrosMapa from './components/FiltrosMapa';
import type { FiltrosState } from './components/FiltrosMapa';
import PanelDetalles from './components/PanelDetalles';

const MapaLotesProceso = () => {
    const { user, isAuthenticated } = useAuthStore();

    // Estados básicos
    const [lotes, setLotes] = useState<LoteParaMapa[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tipoCapa, setTipoCapa] = useState<TipoCapaMapa>('satelite');

    // Estado de selección y filtros
    const [loteSeleccionado, setLoteSeleccionado] = useState<LoteParaMapa | null>(null);
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

    /**
     * Detectar rol del usuario
     */
    const detectarRol = (): RolMapa => {
        if (!isAuthenticated || !user) return 'invitado';
        if (user.roles?.includes('admin')) return 'admin';
        if (user.roles?.includes('cliente')) return 'cliente';
        return 'invitado';
    };

    const rol = detectarRol();

    /**
     * Cargar lotes desde el backend
     */
    const cargarLotes = async () => {
        try {
            setLoading(true);
            setError(null);
            const lotesData = await lotesMapaService.obtenerLotesVisibles(rol);
            setLotes(lotesData);
            console.log(`✅ ${lotesData.length} lotes cargados para rol: ${rol}`);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error al cargar los lotes');
            console.error('❌ Error al cargar lotes:', err);
        } finally {
            setLoading(false);
        }
    };

    // Cargar lotes al montar
    useEffect(() => {
        cargarLotes();
    }, [rol]);

    /**
     * Filtrar lotes según los filtros activos
     */
    const lotesFiltrados = useMemo(() => {
        return lotes.filter((lote) => {
            // Filtro por estado
            if (!filtros.estados[lote.estado]) return false;

            // Filtro por precio
            if (lote.precio < filtros.precioMin || lote.precio > filtros.precioMax) return false;

            // Filtro por superficie
            if (lote.superficie < filtros.superficieMin || lote.superficie > filtros.superficieMax) return false;

            return true;
        });
    }, [lotes, filtros]);

    const handleSelectLote = (lote: LoteParaMapa) => {
        setLoteSeleccionado(lote);
    };

    return (
        <div className="w-full -mt-4 -mb-6">
            <div className="max-w-full mx-auto px-1 sm:px-2 lg:px-0.5">
                {/* Header Compacto */}
                <div className="mb-1.5 pb-1.5 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                                <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    Mapa de Lotes
                                    <span className="text-sm font-normal text-slate-500 dark:text-slate-400">
                                        ({lotesFiltrados.length} visibles de {lotes.length})
                                    </span>
                                </h1>
                            </div>
                        </div>

                        {/* Controles en el Header (Capas y Filtros) */}
                        <div className="flex items-center gap-2">
                            <SelectorCapas tipoCapa={tipoCapa} onCambiarCapa={setTipoCapa} />
                            <FiltrosMapa
                                onFiltrosChange={setFiltros}
                                totalLotes={lotes.length}
                                lotesFiltrados={lotesFiltrados.length}
                            />
                        </div>
                    </div>
                </div>

                {/* Contenedor del Mapa */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative">

                    <div className="absolute bottom-4 left-1 z-[1000]">
                        <Leyenda />
                    </div>

                    {/* Panel de Detalles (Slide-over) */}
                    {loteSeleccionado && (
                        <PanelDetalles
                            lote={loteSeleccionado}
                            onCerrar={() => setLoteSeleccionado(null)}
                        />
                    )}

                    {/* Mapa */}
                    <div className="h-[410px] w-full relative z-0">
                        {loading && (
                            <div className="absolute inset-0 z-50 bg-white/80 dark:bg-slate-900/80 flex items-center justify-center">
                                <p className="text-slate-600 dark:text-slate-300 font-medium">Cargando mapa...</p>
                            </div>
                        )}

                        {error && (
                            <div className="absolute inset-0 z-50 bg-white/90 dark:bg-slate-900/90 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                                    <button
                                        onClick={cargarLotes}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Reintentar
                                    </button>
                                </div>
                            </div>
                        )}

                        {!error && (
                            <MapContainer
                                center={obtenerCentroZona()}
                                zoom={obtenerZoomZona()}
                                style={{ height: '100%', width: '100%' }}
                                className="z-0"
                            >
                                <TileLayer
                                    key={tipoCapa}
                                    url={TILES_CONFIG[tipoCapa].url}
                                    attribution={TILES_CONFIG[tipoCapa].atribucion}
                                    maxZoom={22}
                                />

                                {/* Renderizar polígonos de lotes */}
                                {lotesFiltrados.map((lote) => (
                                    <LotePolygon
                                        key={`poly-${lote.uid}`}
                                        lote={lote}
                                        esDestacado={lote.uid === loteSeleccionado?.uid}
                                        onSelectLote={handleSelectLote}
                                    />
                                ))}

                                {/* Renderizar marcadores de lotes */}
                                {lotesFiltrados.map((lote) => (
                                    <LoteMarker
                                        key={`marker-${lote.uid}`}
                                        lote={lote}
                                        esDestacado={lote.uid === loteSeleccionado?.uid}
                                        onSelectLote={handleSelectLote}
                                    />
                                ))}
                            </MapContainer>
                        )}
                    </div>

                    {/* Stats en la parte inferior */}
                    <div className="px-6 py-[0.05rem] bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-center gap-8">
                            <div className="text-center">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Total Lotes</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white">{lotes.length}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-slate-500 dark:text-slate-400">Disponibles</p>
                                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                    {lotes.filter(l => l.estado === 'disponible').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapaLotesProceso;

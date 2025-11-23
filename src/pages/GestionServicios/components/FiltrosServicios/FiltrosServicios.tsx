import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { FiltrosServiciosProps } from '../../types';
import { CATEGORIAS_SERVICIO, TIPOS_SERVICIO, ESTADOS_SERVICIO } from '../../constants';
import './FiltrosServicios.css';

const FiltrosServicios: React.FC<FiltrosServiciosProps> = ({
    filtros,
    onBusquedaChange,
    onCategoriaChange,
    onTipoChange,
    onEstadoChange
}) => {
    return (
        <div className="filtros-servicios">
            <div className="filtros-left">
                <div className="busqueda-container">
                    <Search size={20} className="busqueda-icono" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o descripción..."
                        value={filtros.busqueda}
                        onChange={(e) => onBusquedaChange(e.target.value)}
                        className="busqueda-input"
                    />
                </div>
                <button className="btn-filtros">
                    <Filter size={18} />
                    Filtros
                </button>
            </div>

            <div className="filtros-right">
                <select
                    value={filtros.categoria || ''}
                    onChange={(e) => onCategoriaChange(e.target.value as any || undefined)}
                    className="filtro-select"
                >
                    <option value="">Todas las categorías</option>
                    {Object.entries(CATEGORIAS_SERVICIO).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>

                <select
                    value={filtros.tipo || ''}
                    onChange={(e) => onTipoChange(e.target.value as any || undefined)}
                    className="filtro-select"
                >
                    <option value="">Todos los tipos</option>
                    {Object.entries(TIPOS_SERVICIO).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>

                <select
                    value={filtros.estado || ''}
                    onChange={(e) => onEstadoChange(e.target.value as any || undefined)}
                    className="filtro-select"
                >
                    <option value="">Todos los estados</option>
                    {Object.entries(ESTADOS_SERVICIO).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FiltrosServicios;

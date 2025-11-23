import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { FiltrosLotesProps } from '../../types';
import { BUSQUEDA_CONFIG } from '../../constants';
import './FiltrosLotes.css';

const FiltrosLotes: React.FC<FiltrosLotesProps> = ({
    filtros,
    onBusquedaChange,
    onEstadoChange
}) => {
    return (
        <div className="filtros-lotes">
            <div className="filtros-left">
                <div className="busqueda-container">
                    <Search size={20} className="busqueda-icono" />
                    <input
                        type="text"
                        placeholder={BUSQUEDA_CONFIG.PLACEHOLDER}
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
                    value={filtros.estado}
                    onChange={(e) => onEstadoChange(e.target.value)}
                    className="filtro-select"
                >
                    <option value="todos">Todos los estados</option>
                    <option value="disponible">Disponible</option>
                    <option value="en_cuotas">En Cuotas</option>
                    <option value="vendido">Vendido</option>
                </select>
            </div>
        </div>
    );
};

export default FiltrosLotes;

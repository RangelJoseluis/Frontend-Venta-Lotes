import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { FiltrosPagosProps } from '../../types';
import './FiltrosPagos.css';

const FiltrosPagos: React.FC<FiltrosPagosProps> = ({
    busqueda,
    onBusquedaChange,
    filtroMetodo,
    onFiltroMetodoChange
}) => {
    return (
        <div className="filtros-container">
            {/* Buscador a la izquierda */}
            <div className="busqueda-wrapper">
                <Search size={20} />
                <input
                    type="text"
                    placeholder="Buscar por venta, cuota o referencia..."
                    value={busqueda}
                    onChange={(e) => onBusquedaChange(e.target.value)}
                    className="input-busqueda"
                />
            </div>

            {/* Filtros a la derecha */}
            <div className="filtros-acciones">
                <button
                    className="btn-filtros"
                >
                    <Filter size={18} />
                    Filtros
                </button>

                <select
                    value={filtroMetodo}
                    onChange={(e) => onFiltroMetodoChange(e.target.value)}
                    className="select-metodo"
                >
                    <option value="">Todos los métodos</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="cheque">Cheque</option>
                    <option value="tarjeta">Tarjeta</option>
                </select>
            </div>
        </div>
    );
};

export default FiltrosPagos;

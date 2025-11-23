import React from 'react';
import { Filter } from 'lucide-react';
import type { FiltrosMoraProps } from '../../types';
import './FiltrosMora.css';

const FiltrosMora: React.FC<FiltrosMoraProps> = ({
    filtroCliente,
    filtroLote,
    onClienteChange,
    onLoteChange
}) => {
    return (
        <div className="filtros-container">
            <div className="filtros-header">
                <Filter size={20} />
                <h3>Filtros</h3>
            </div>
            <div className="filtros-grid">
                <div className="filtro-field">
                    <label>Cliente</label>
                    <input
                        type="text"
                        placeholder="Buscar por cliente..."
                        value={filtroCliente}
                        onChange={(e) => onClienteChange(e.target.value)}
                        className="filtro-input"
                    />
                </div>
                <div className="filtro-field">
                    <label>Lote</label>
                    <input
                        type="text"
                        placeholder="Buscar por lote..."
                        value={filtroLote}
                        onChange={(e) => onLoteChange(e.target.value)}
                        className="filtro-input"
                    />
                </div>
            </div>
        </div>
    );
};

export default FiltrosMora;

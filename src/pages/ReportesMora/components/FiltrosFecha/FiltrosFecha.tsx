import React from 'react';
import type { FiltrosFechaProps } from '../../types';
import './FiltrosFecha.css';

const FiltrosFecha: React.FC<FiltrosFechaProps> = ({
    fechaInicio,
    fechaFin,
    onFechaInicioChange,
    onFechaFinChange,
    onAplicar
}) => {
    return (
        <div className="filtros-seccion">
            <div className="filtros-grid">
                <div className="filtro-field">
                    <label>Fecha Inicio</label>
                    <input
                        type="date"
                        value={fechaInicio}
                        onChange={(e) => onFechaInicioChange(e.target.value)}
                        className="filtro-input"
                    />
                </div>
                <div className="filtro-field">
                    <label>Fecha Fin</label>
                    <input
                        type="date"
                        value={fechaFin}
                        onChange={(e) => onFechaFinChange(e.target.value)}
                        className="filtro-input"
                    />
                </div>
                <div className="filtro-field">
                    <button onClick={onAplicar} className="btn-aplicar">
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FiltrosFecha;

import React from 'react';
import { CheckCircle, DollarSign, Home, Maximize2 } from 'lucide-react';
import type { EstadisticasLotesProps } from '../../types';
import './EstadisticasLotes.css';

const EstadisticasLotes: React.FC<EstadisticasLotesProps> = ({
    totalLotes,
    lotesDisponibles,
    lotesEnCuotas,
    lotesVendidos
}) => {
    return (
        <div className="estadisticas-lotes">
            <div className="estadistica-card">
                <div className="estadistica-icono disponible">
                    <CheckCircle size={24} />
                </div>
                <div className="estadistica-info">
                    <p className="estadistica-label">Disponibles</p>
                    <h3 className="estadistica-valor">{lotesDisponibles}</h3>
                </div>
            </div>

            <div className="estadistica-card">
                <div className="estadistica-icono cuotas">
                    <DollarSign size={24} />
                </div>
                <div className="estadistica-info">
                    <p className="estadistica-label">En Cuotas</p>
                    <h3 className="estadistica-valor">{lotesEnCuotas}</h3>
                </div>
            </div>

            <div className="estadistica-card">
                <div className="estadistica-icono vendido">
                    <Home size={24} />
                </div>
                <div className="estadistica-info">
                    <p className="estadistica-label">Vendidos</p>
                    <h3 className="estadistica-valor">{lotesVendidos}</h3>
                </div>
            </div>

            <div className="estadistica-card">
                <div className="estadistica-icono total">
                    <Maximize2 size={24} />
                </div>
                <div className="estadistica-info">
                    <p className="estadistica-label">Total Lotes</p>
                    <h3 className="estadistica-valor">{totalLotes}</h3>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasLotes;

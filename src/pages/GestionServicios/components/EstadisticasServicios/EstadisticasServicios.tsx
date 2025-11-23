import React from 'react';
import { TrendingUp, TrendingDown, Activity, DollarSign } from 'lucide-react';
import type { EstadisticasServiciosProps } from '../../types';
import './EstadisticasServicios.css';

const EstadisticasServicios: React.FC<EstadisticasServiciosProps> = ({
    totalServicios,
    serviciosActivos,
    serviciosInactivos,
    serviciosEsenciales,
    costoPromedioMensual
}) => {
    return (
        <div className="estadisticas-servicios">
            <div className="estadistica-card">
                <div className="estadistica-icono total">
                    <Activity size={24} />
                </div>
                <div className="estadistica-info">
                    <p className="estadistica-label">Total Servicios</p>
                    <h3 className="estadistica-valor">{totalServicios}</h3>
                </div>
            </div>

            <div className="estadistica-card">
                <div className="estadistica-icono activos">
                    <TrendingUp size={24} />
                </div>
                <div className="estadistica-info">
                    <p className="estadistica-label">Activos</p>
                    <h3 className="estadistica-valor">{serviciosActivos}</h3>
                </div>
            </div>

            <div className="estadistica-card">
                <div className="estadistica-icono inactivos">
                    <TrendingDown size={24} />
                </div>
                <div className="estadistica-info">
                    <p className="estadistica-label">Inactivos</p>
                    <h3 className="estadistica-valor">{serviciosInactivos}</h3>
                </div>
            </div>

            <div className="estadistica-card">
                <div className="estadistica-icono esenciales">
                    <Activity size={24} />
                </div>
                <div className="estadistica-info">
                    <p className="estadistica-label">Esenciales</p>
                    <h3 className="estadistica-valor">{serviciosEsenciales}</h3>
                </div>
            </div>

            <div className="estadistica-card">
                <div className="estadistica-icono costo">
                    <DollarSign size={24} />
                </div>
                <div className="estadistica-info">
                    <p className="estadistica-label">Costo Promedio</p>
                    <h3 className="estadistica-valor">
                        ${costoPromedioMensual.toLocaleString('es-CO')}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default EstadisticasServicios;

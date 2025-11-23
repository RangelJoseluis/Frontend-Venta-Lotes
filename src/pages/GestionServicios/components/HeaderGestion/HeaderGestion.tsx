import React from 'react';
import { Settings, Plus, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { HeaderGestionProps } from '../../types';
import './HeaderGestion.css';

const HeaderGestion: React.FC<HeaderGestionProps> = ({
    totalServicios,
    serviciosFiltrados,
    onNuevoServicio,
    onVolverDashboard
}) => {
    const navigate = useNavigate();

    const handleVolver = () => {
        if (onVolverDashboard) {
            onVolverDashboard();
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div className="gestion-header">
            <div className="header-left">
                <h1>
                    <Home size={24} />
                    Gestión de Servicios
                </h1>
                <p className="header-subtitle">
                    {serviciosFiltrados} de {totalServicios} servicios
                </p>
            </div>
            <div className="header-actions">
                <button
                    onClick={handleVolver}
                    className="btn-volver-dashboard"
                >
                    <ArrowLeft size={20} />
                    Volver al Dashboard
                </button>
                <button
                    onClick={onNuevoServicio}
                    className="btn-nuevo-servicio"
                >
                    <Plus size={20} />
                    Nuevo Servicio
                </button>
            </div>
        </div>
    );
};

export default HeaderGestion;

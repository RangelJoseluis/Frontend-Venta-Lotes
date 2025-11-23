import React from 'react';
import { Home, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { HeaderGestionProps } from '../../types';
import './HeaderGestion.css';

const HeaderGestion: React.FC<HeaderGestionProps> = ({
    totalLotes,
    lotesFiltrados,
    onNuevoLote,
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
                    Gestión de Lotes
                </h1>
                <p className="header-subtitle">
                    {lotesFiltrados} de {totalLotes} lotes
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
                    onClick={onNuevoLote}
                    className="btn-nuevo-lote"
                >
                    <Plus size={20} />
                    Nuevo Lote
                </button>
            </div>
        </div>
    );
};

export default HeaderGestion;

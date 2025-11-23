import React from 'react';
import { ArrowLeft, AlertTriangle, Calculator } from 'lucide-react';
import type { HeaderGestionProps } from '../../types';
import './HeaderGestion.css';

const HeaderGestion: React.FC<HeaderGestionProps> = ({
    onVolver,
    onCalcularMora,
    isLoading
}) => {
    return (
        <div className="mora-header">
            <button onClick={onVolver} className="back-button">
                <ArrowLeft size={20} />
                Volver
            </button>
            <div className="header-content">
                <div className="header-icon">
                    <AlertTriangle size={32} />
                </div>
                <div>
                    <h1 className="header-title">Gestión de Mora</h1>
                    <p className="header-subtitle">Administración de cuotas vencidas y mora acumulada</p>
                </div>
            </div>
            <button onClick={onCalcularMora} className="btn-action" disabled={isLoading}>
                <Calculator size={20} />
                Calcular Mora Masiva
            </button>
        </div>
    );
};

export default HeaderGestion;

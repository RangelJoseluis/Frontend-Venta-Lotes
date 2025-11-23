import React from 'react';
import { Users, Calendar, FileText, TrendingUp } from 'lucide-react';
import type { SelectorTipoReporteProps } from '../../types';
import './SelectorTipoReporte.css';

const SelectorTipoReporte: React.FC<SelectorTipoReporteProps> = ({
    tipoActual,
    onCambioTipo
}) => {
    return (
        <div className="filtros-seccion">
            <div className="selector-tipo-reporte">
                <button
                    className={`tipo-btn ${tipoActual === 'cliente' ? 'active' : ''}`}
                    onClick={() => onCambioTipo('cliente')}
                >
                    <Users size={20} />
                    <span>Por Cliente</span>
                </button>
                <button
                    className={`tipo-btn ${tipoActual === 'periodo' ? 'active' : ''}`}
                    onClick={() => onCambioTipo('periodo')}
                >
                    <Calendar size={20} />
                    <span>Por Período</span>
                </button>
                <button
                    className={`tipo-btn ${tipoActual === 'detallado' ? 'active' : ''}`}
                    onClick={() => onCambioTipo('detallado')}
                >
                    <FileText size={20} />
                    <span>Detallado</span>
                </button>
                <button
                    className={`tipo-btn ${tipoActual === 'top' ? 'active' : ''}`}
                    onClick={() => onCambioTipo('top')}
                >
                    <TrendingUp size={20} />
                    <span>Top 10</span>
                </button>
            </div>
        </div>
    );
};

export default SelectorTipoReporte;

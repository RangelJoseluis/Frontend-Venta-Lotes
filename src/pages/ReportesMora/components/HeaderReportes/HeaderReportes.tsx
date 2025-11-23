import React from 'react';
import { ArrowLeft, FileText, RefreshCw, Download } from 'lucide-react';
import type { HeaderReportesProps } from '../../types';
import './HeaderReportes.css';

const HeaderReportes: React.FC<HeaderReportesProps> = ({
    onVolver,
    onActualizar,
    onExportar,
    isLoading
}) => {
    return (
        <div className="mora-header">
            <button onClick={onVolver} className="back-button">
                <ArrowLeft size={18} />
                Volver
            </button>
            <div className="header-content">
                <div className="header-icon">
                    <FileText size={32} />
                </div>
                <div>
                    <h1 className="header-title">Reportes de Mora</h1>
                    <p className="header-subtitle">Análisis integral y exportación de datos de mora</p>
                </div>
            </div>
            <div className="header-actions">
                <button onClick={onActualizar} className="btn-action" disabled={isLoading}>
                    <RefreshCw size={18} className={isLoading ? 'spinning' : ''} />
                    Actualizar
                </button>
                <button onClick={onExportar} className="btn-export">
                    <Download size={18} />
                    Exportar CSV
                </button>
            </div>
        </div>
    );
};

export default HeaderReportes;

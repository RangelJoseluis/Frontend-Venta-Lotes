import React from 'react';
import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import GraficasMora from '../../../../components/GraficasMora';
import type { TablaReportePeriodoProps } from '../../types';
import { formatCurrency, formatPorcentaje } from '../../utils';
import './TablaReportePeriodo.css';

const TablaReportePeriodo: React.FC<TablaReportePeriodoProps> = ({
    datos,
    mostrarGraficas,
    onToggleGraficas
}) => {
    return (
        <>
            <button onClick={onToggleGraficas} className="btn-toggle-graficas">
                <BarChart3 size={18} />
                <span>{mostrarGraficas ? 'Ocultar' : 'Ver'} Análisis Gráfico</span>
                {mostrarGraficas ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {mostrarGraficas && (
                <div className="graficas-container">
                    <div className="graficas-horizontales">
                        <GraficasMora reportePeriodo={datos} tipo="tendencia" />
                        <GraficasMora reportePeriodo={datos} tipo="efectividad" />
                    </div>
                </div>
            )}

            <div className="tabla-container">
                <h3>Reporte de Mora por Período ({datos.length} meses)</h3>
                <div className="tabla-wrapper">
                    <table className="tabla-mora">
                        <thead>
                            <tr>
                                <th>Período</th>
                                <th>Cuotas Vencidas</th>
                                <th>Con Mora</th>
                                <th>Mora Generada</th>
                                <th>Mora Pagada</th>
                                <th>Efectividad</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((periodo) => (
                                <tr key={periodo.periodo}>
                                    <td>{periodo.periodo}</td>
                                    <td>{periodo.totalCuotasVencidas}</td>
                                    <td>{periodo.cuotasConMora}</td>
                                    <td>{formatCurrency(periodo.moraGenerada)}</td>
                                    <td>{formatCurrency(periodo.moraPagada)}</td>
                                    <td>
                                        <span className="badge badge-pendiente">
                                            {formatPorcentaje(periodo.porcentajeMoraCobrada)}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TablaReportePeriodo;

import React from 'react';
import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import GraficasMora from '../../../../components/GraficasMora';
import type { TablaReporteClientesProps } from '../../types';
import { formatCurrency, redondearDias } from '../../utils';
import './TablaReporteClientes.css';

const TablaReporteClientes: React.FC<TablaReporteClientesProps> = ({
    datos,
    mostrarGraficas,
    onToggleGraficas,
    esTop10 = false
}) => {
    return (
        <>
            {!esTop10 && (
                <button onClick={onToggleGraficas} className="btn-toggle-graficas">
                    <BarChart3 size={18} />
                    <span>{mostrarGraficas ? 'Ocultar' : 'Ver'} Análisis Gráfico</span>
                    {mostrarGraficas ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            )}

            {mostrarGraficas && !esTop10 && (
                <div className="graficas-container">
                    <div className="full-width">
                        <GraficasMora reporteClientes={datos} tipo="clientes" />
                    </div>
                </div>
            )}

            <div className="tabla-container">
                <h3>{esTop10 ? 'Top 10 Clientes con Mayor Mora' : `Reporte de Mora por Cliente (${datos.length})`}</h3>
                <div className="tabla-wrapper">
                    <table className="tabla-mora">
                        <thead>
                            <tr>
                                {esTop10 && <th>#</th>}
                                <th>Cliente</th>
                                <th>Documento</th>
                                <th>Cuotas{esTop10 ? '' : ' con Mora'}</th>
                                {!esTop10 && <th>Mora Acumulada</th>}
                                <th>Mora Pendiente</th>
                                <th>Días Promedio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datos.map((cliente, index) => (
                                <tr key={cliente.clienteUid}>
                                    {esTop10 && <td className="font-bold">#{index + 1}</td>}
                                    <td>{cliente.clienteNombre}</td>
                                    <td>{cliente.clienteDocumento}</td>
                                    <td>{cliente.totalCuotasConMora}</td>
                                    {!esTop10 && (
                                        <td className="text-danger">{formatCurrency(cliente.moraAcumulada)}</td>
                                    )}
                                    <td className={esTop10 ? "text-danger font-bold" : "text-warning"}>
                                        {formatCurrency(cliente.moraPendiente)}
                                    </td>
                                    <td>{redondearDias(cliente.diasPromedioMora)} días</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TablaReporteClientes;

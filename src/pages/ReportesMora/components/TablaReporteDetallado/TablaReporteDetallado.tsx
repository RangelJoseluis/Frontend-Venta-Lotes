import React from 'react';
import type { TablaReporteDetalladoProps } from '../../types';
import { formatCurrency, formatFecha, formatPorcentaje } from '../../utils';
import './TablaReporteDetallado.css';

const TablaReporteDetallado: React.FC<TablaReporteDetalladoProps> = ({ datos }) => {
    return (
        <div className="tabla-container">
            <h3>Reporte Detallado de Mora ({datos.length} cuotas)</h3>
            <div className="tabla-wrapper">
                <table className="tabla-mora">
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Lote</th>
                            <th>Cuota</th>
                            <th>Vencimiento</th>
                            <th>Días Mora</th>
                            <th>Mora Acumulada</th>
                            <th>Mora Pagada</th>
                            <th>Mora Pendiente</th>
                            <th>Tasa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((detalle, index) => (
                            <tr key={index}>
                                <td>{detalle.clienteNombre}</td>
                                <td>{detalle.lotecodigo}</td>
                                <td>#{detalle.numeroCuota}</td>
                                <td>{formatFecha(detalle.fechaVencimiento)}</td>
                                <td>{detalle.diasMora}</td>
                                <td>{formatCurrency(detalle.montoMora)}</td>
                                <td>{formatCurrency(detalle.montoMoraPagado)}</td>
                                <td className="text-danger">{formatCurrency(detalle.moraPendiente)}</td>
                                <td>{formatPorcentaje(detalle.tasaMoraAplicada * 100, 3)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaReporteDetallado;

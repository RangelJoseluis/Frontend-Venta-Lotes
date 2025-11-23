import React from 'react';
import { AlertTriangle, Download, Eye, DollarSign } from 'lucide-react';
import type { TablaCuotasMoraProps } from '../../types';
import { formatFecha, formatPorcentaje } from '../../utils';
import './TablaCuotasMora.css';

const TablaCuotasMora: React.FC<TablaCuotasMoraProps> = ({
    cuotas,
    onVerDetalle,
    onRegistrarPago
}) => {
    return (
        <div className="tabla-container">
            <div className="tabla-header">
                <h3>Cuotas con Mora ({cuotas.length})</h3>
                <button className="btn-export">
                    <Download size={16} />
                    Exportar
                </button>
            </div>

            {cuotas.length === 0 ? (
                <div className="empty-state">
                    <AlertTriangle size={48} />
                    <h3>No hay cuotas con mora</h3>
                    <p>¡Excelente! No hay cuotas vencidas con mora pendiente.</p>
                </div>
            ) : (
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
                                <th>Tasa Aplicada</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cuotas.map((cuota) => (
                                <tr key={cuota.uid}>
                                    <td>{cuota.venta.cliente}</td>
                                    <td>{cuota.venta.lote}</td>
                                    <td>#{cuota.numeroCuota}</td>
                                    <td>{formatFecha(cuota.fechaVencimiento)}</td>
                                    <td>
                                        <span className="badge badge-danger">
                                            {cuota.diasMora} días
                                        </span>
                                    </td>
                                    <td className="text-danger font-bold">
                                        {cuota.montoMoraFormateado}
                                    </td>
                                    <td>{formatPorcentaje(cuota.tasaMoraAplicada * 100)}</td>
                                    <td>
                                        <span className={`badge badge-${cuota.estado}`}>
                                            {cuota.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="acciones-cell">
                                            <button
                                                className="btn-icon"
                                                title="Ver detalle"
                                                onClick={() => onVerDetalle(cuota.uid)}
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                className="btn-icon"
                                                title="Registrar pago"
                                                onClick={onRegistrarPago}
                                            >
                                                <DollarSign size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TablaCuotasMora;

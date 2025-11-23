import React from 'react';
import { Eye, Download, DollarSign, Loader, Receipt } from 'lucide-react';
import type { TablaPagosProps } from '../../types';
import { formatearMoneda, formatearFecha, obtenerNombreMetodo, obtenerClaseMetodo } from '../../utils/formatters';
import './TablaPagos.css';

const TablaPagos: React.FC<TablaPagosProps> = ({
    pagos,
    loading,
    onVerDetalle,
    onPrevisualizarTicket,
    onDescargarTicket
}) => {
    if (loading) {
        return (
            <div className="pagos-tabla-loading">
                <div className="pagos-loading-content">
                    <Loader className="pagos-loading-spinner" size={40} />
                    <h3>Cargando pagos...</h3>
                    <p>Por favor espera un momento</p>
                </div>
            </div>
        );
    }

    if (pagos.length === 0) {
        return (
            <div className="pagos-tabla-empty">
                <div className="pagos-empty-content">
                    <Receipt size={64} className="pagos-empty-icon" />
                    <h3>No hay pagos registrados</h3>
                    <p>Aún no se han encontrado pagos en el sistema</p>
                </div>
            </div>
        );
    }

    return (
        <div className="pagos-tabla-wrapper">
            <div className="pagos-tabla-container">
                <table className="pagos-tabla">
                    <thead className="pagos-tabla-header">
                        <tr>
                            <th className="pagos-th pagos-th-pago">PAGO</th>
                            <th className="pagos-th pagos-th-venta">VENTA</th>
                            <th className="pagos-th pagos-th-monto">MONTO</th>
                            <th className="pagos-th pagos-th-metodo">MÉTODO</th>
                            <th className="pagos-th pagos-th-acciones">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody className="pagos-tabla-body">
                        {pagos.map((pago) => (
                            <tr key={pago.uid} className="pagos-tabla-row">
                                {/* Columna: PAGO (con avatar) */}
                                <td className="pagos-td pagos-td-pago">
                                    <div className="pagos-info-cell">
                                        <div className="pagos-avatar">
                                            <DollarSign size={20} className="pagos-avatar-icon" />
                                        </div>
                                        <div className="pagos-info-text">
                                            <span className="pagos-fecha">{formatearFecha(pago.fechaPago)}</span>
                                            <span className="pagos-referencia">
                                                {pago.referencia ? `Ref: ${pago.referencia}` : 'Sin referencia'}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Columna: VENTA */}
                                <td className="pagos-td pagos-td-venta">
                                    <div className="pagos-venta-cell">
                                        {pago.cuota ? (
                                            <>
                                                <span className="pagos-codigo">
                                                    {pago.cuota.venta?.codigo || `Venta ${pago.cuota.uid.substring(0, 8)}`}
                                                </span>
                                                <span className="pagos-cuota">
                                                    Cuota #{pago.cuota.numeroCuota || '-'}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="pagos-sin-info">Sin información</span>
                                        )}
                                    </div>
                                </td>

                                {/* Columna: MONTO */}
                                <td className="pagos-td pagos-td-monto">
                                    <span className="pagos-monto">{formatearMoneda(pago.monto)}</span>
                                </td>

                                {/* Columna: MÉTODO (badge) */}
                                <td className="pagos-td pagos-td-metodo">
                                    <span className={`pagos-metodo-badge pagos-metodo-${obtenerClaseMetodo(pago.metodoPago)}`}>
                                        {obtenerNombreMetodo(pago.metodoPago)}
                                    </span>
                                </td>

                                {/* Columna: ACCIONES */}
                                <td className="pagos-td pagos-td-acciones">
                                    <div className="pagos-acciones-cell">
                                        <button
                                            className="pagos-btn-accion pagos-btn-ver"
                                            onClick={() => onVerDetalle(pago.uid)}
                                            title="Ver detalles del pago"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            className="pagos-btn-accion pagos-btn-preview"
                                            onClick={() => onPrevisualizarTicket(pago.uid)}
                                            title="Previsualizar ticket"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            className="pagos-btn-accion pagos-btn-download"
                                            onClick={() => onDescargarTicket(pago.uid)}
                                            title="Descargar ticket"
                                        >
                                            <Download size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaPagos;

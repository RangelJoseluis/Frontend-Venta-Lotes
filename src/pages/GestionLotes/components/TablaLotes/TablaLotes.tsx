import React from 'react';
import { Eye, Edit, Trash2, MapPin, Loader, AlertCircle } from 'lucide-react';
import type { TablaLotesProps } from '../../types';
import { formatearPrecio, formatearFecha, formatearSuperficie, obtenerColorEstado, obtenerNombreEstado } from '../../utils';
import './TablaLotes.css';

const TablaLotes: React.FC<TablaLotesProps> = ({
    lotes,
    loading,
    onVer,
    onEditar,
    onEliminar
}) => {
    if (loading) {
        return (
            <div className="lotes-tabla-loading">
                <div className="lotes-loading-content">
                    <Loader className="lotes-loading-spinner" size={40} />
                    <h3>Cargando lotes...</h3>
                    <p>Por favor espera un momento</p>
                </div>
            </div>
        );
    }

    if (lotes.length === 0) {
        return (
            <div className="lotes-tabla-empty">
                <div className="lotes-empty-content">
                    <AlertCircle size={64} className="lotes-empty-icon" />
                    <h3>No hay lotes registrados</h3>
                    <p>Aún no se han encontrado lotes en el sistema</p>
                </div>
            </div>
        );
    }

    return (
        <div className="lotes-tabla-wrapper">
            <div className="lotes-tabla-container">
                <table className="lotes-tabla">
                    <thead className="lotes-tabla-header">
                        <tr>
                            <th className="lotes-th lotes-th-codigo">CÓDIGO</th>
                            <th className="lotes-th lotes-th-ubicacion">UBICACIÓN</th>
                            <th className="lotes-th lotes-th-superficie">SUPERFICIE</th>
                            <th className="lotes-th lotes-th-precio">PRECIO</th>
                            <th className="lotes-th lotes-th-estado">ESTADO</th>
                            <th className="lotes-th lotes-th-modelo">MODELO CASA</th>
                            <th className="lotes-th lotes-th-actualizado">ACTUALIZADO</th>
                            <th className="lotes-th lotes-th-acciones">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody className="lotes-tabla-body">
                        {lotes.map((lote) => (
                            <tr key={lote.uid} className="lotes-tabla-row">
                                {/* Columna: CÓDIGO */}
                                <td className="lotes-td lotes-td-codigo">
                                    <span className="lotes-codigo">{lote.codigo}</span>
                                </td>

                                {/* Columna: UBICACIÓN */}
                                <td className="lotes-td lotes-td-ubicacion">
                                    <div className="lotes-info-cell">
                                        <div className="lotes-avatar">
                                            <MapPin size={20} className="lotes-avatar-icon" />
                                        </div>
                                        <div className="lotes-info-text">
                                            <span className="lotes-direccion">{lote.direccion}</span>
                                            <span className="lotes-manzana">
                                                Mz: {lote.manzana} - Lote: {lote.numeroLote}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Columna: SUPERFICIE */}
                                <td className="lotes-td lotes-td-superficie">
                                    <span className="lotes-superficie">
                                        {formatearSuperficie(lote.superficieM2)}
                                    </span>
                                </td>

                                {/* Columna: PRECIO */}
                                <td className="lotes-td lotes-td-precio">
                                    <span className="lotes-precio">{formatearPrecio(lote.precioLista)}</span>
                                </td>

                                {/* Columna: ESTADO */}
                                <td className="lotes-td lotes-td-estado">
                                    <span
                                        className="lotes-estado-badge"
                                        style={{ backgroundColor: obtenerColorEstado(lote.estado) }}
                                    >
                                        {obtenerNombreEstado(lote.estado)}
                                    </span>
                                </td>

                                {/* Columna: MODELO CASA */}
                                <td className="lotes-td lotes-td-modelo">
                                    {lote.modeloCasa ? (
                                        <span className="lotes-modelo">{lote.modeloCasa.nombre}</span>
                                    ) : (
                                        <span className="lotes-sin-modelo">Sin modelo</span>
                                    )}
                                </td>

                                {/* Columna: ACTUALIZADO */}
                                <td className="lotes-td lotes-td-fecha">
                                    <span className="lotes-fecha">{formatearFecha(lote.actualizadoEn)}</span>
                                </td>

                                {/* Columna: ACCIONES */}
                                <td className="lotes-td lotes-td-acciones">
                                    <div className="lotes-acciones-cell">
                                        <button
                                            onClick={() => onVer(lote.uid)}
                                            className="lotes-btn-accion lotes-btn-ver"
                                            title="Ver detalles"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={() => onEditar(lote.uid)}
                                            className="lotes-btn-accion lotes-btn-editar"
                                            title="Editar"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => onEliminar(lote)}
                                            className="lotes-btn-accion lotes-btn-eliminar"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={16} />
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

export default TablaLotes;

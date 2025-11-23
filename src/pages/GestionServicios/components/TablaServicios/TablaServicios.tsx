import React from 'react';
import { Eye, Edit, Trash2, Settings, Loader } from 'lucide-react';
import type { TablaServiciosProps } from '../../types';
import { CATEGORIAS_SERVICIO, TIPOS_SERVICIO, CLASES_CATEGORIA, CLASES_TIPO, CLASES_ESTADO } from '../../constants';
import './TablaServicios.css';

const TablaServicios: React.FC<TablaServiciosProps> = ({
    servicios,
    loading,
    onEditar,
    onEliminar,
    onVerDetalle
}) => {
    if (loading) {
        return (
            <div className="servicios-tabla-loading">
                <div className="servicios-loading-content">
                    <Loader className="servicios-loading-spinner" size={40} />
                    <h3>Cargando servicios...</h3>
                    <p>Por favor espera un momento</p>
                </div>
            </div>
        );
    }

    if (servicios.length === 0) {
        return (
            <div className="servicios-tabla-empty">
                <div className="servicios-empty-content">
                    <Settings size={64} className="servicios-empty-icon" />
                    <h3>No hay servicios registrados</h3>
                    <p>Aún no se han encontrado servicios en el sistema</p>
                </div>
            </div>
        );
    }

    const formatearCosto = (costo: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(costo);
    };

    return (
        <div className="servicios-tabla-wrapper">
            <div className="servicios-tabla-container">
                <table className="servicios-tabla">
                    <thead className="servicios-tabla-header">
                        <tr>
                            <th className="servicios-th servicios-th-servicio">SERVICIO</th>
                            <th className="servicios-th servicios-th-categoria">CATEGORÍA</th>
                            <th className="servicios-th servicios-th-tipo">TIPO</th>
                            <th className="servicios-th servicios-th-costo">COSTO MENSUAL</th>
                            <th className="servicios-th servicios-th-estado">ESTADO</th>
                            <th className="servicios-th servicios-th-acciones">ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody className="servicios-tabla-body">
                        {servicios.map((servicio) => (
                            <tr key={servicio.uid} className="servicios-tabla-row">
                                {/* Columna: SERVICIO (con avatar) */}
                                <td className="servicios-td servicios-td-servicio">
                                    <div className="servicios-info-cell">
                                        <div className="servicios-avatar">
                                            <Settings size={20} className="servicios-avatar-icon" />
                                        </div>
                                        <div className="servicios-info-text">
                                            <span className="servicios-nombre">{servicio.nombre}</span>
                                            <span className="servicios-descripcion">
                                                {servicio.descripcion.length > 50
                                                    ? `${servicio.descripcion.substring(0, 50)}...`
                                                    : servicio.descripcion}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                {/* Columna: CATEGORÍA */}
                                <td className="servicios-td servicios-td-categoria">
                                    <span className={`servicios-categoria-badge servicios-categoria-${CLASES_CATEGORIA[servicio.categoria]}`}>
                                        {CATEGORIAS_SERVICIO[servicio.categoria]}
                                    </span>
                                </td>

                                {/* Columna: TIPO */}
                                <td className="servicios-td servicios-td-tipo">
                                    <span className={`servicios-tipo-badge servicios-tipo-${CLASES_TIPO[servicio.tipo]}`}>
                                        {TIPOS_SERVICIO[servicio.tipo]}
                                    </span>
                                </td>

                                {/* Columna: COSTO */}
                                <td className="servicios-td servicios-td-costo">
                                    <span className="servicios-costo">
                                        {formatearCosto(servicio.costoMensual || 0)}
                                    </span>
                                </td>

                                {/* Columna: ESTADO */}
                                <td className="servicios-td servicios-td-estado">
                                    <span className={`servicios-estado-badge servicios-estado-${CLASES_ESTADO[servicio.estado]}`}>
                                        {servicio.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                    </span>
                                </td>

                                {/* Columna: ACCIONES */}
                                <td className="servicios-td servicios-td-acciones">
                                    <div className="servicios-acciones-cell">
                                        <button
                                            className="servicios-btn-accion servicios-btn-ver"
                                            onClick={() => onVerDetalle(servicio.uid)}
                                            title="Ver detalles"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            className="servicios-btn-accion servicios-btn-editar"
                                            onClick={() => onEditar(servicio.uid)}
                                            title="Editar servicio"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="servicios-btn-accion servicios-btn-eliminar"
                                            onClick={() => onEliminar(servicio.uid)}
                                            title="Eliminar servicio"
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

export default TablaServicios;

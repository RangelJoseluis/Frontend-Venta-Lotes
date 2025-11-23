import React from 'react';
import { AlertCircle, X, Trash2 } from 'lucide-react';
import type { ModalConfirmacionProps } from '../../types';
import './ModalConfirmacion.css';

const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({
    isOpen,
    lote,
    onConfirmar,
    onCancelar,
    loading
}) => {
    if (!isOpen || !lote) return null;

    return (
        <div className="modal-overlay" onClick={onCancelar}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>
                        <AlertCircle size={24} />
                        Confirmar Eliminación
                    </h3>
                    <button onClick={onCancelar} className="btn-cerrar-modal">
                        <X size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    <p>¿Estás seguro de que deseas eliminar el lote?</p>
                    <div className="lote-info-eliminar">
                        <strong>{lote.codigo}</strong>
                        <span>{lote.direccion}</span>
                        <span className="lote-manzana-info">
                            Manzana: {lote.manzana} - Lote: {lote.numeroLote}
                        </span>
                    </div>
                    <p className="advertencia">
                        Esta acción no se puede deshacer.
                    </p>
                </div>
                <div className="modal-footer">
                    <button
                        onClick={onCancelar}
                        className="btn btn-cancelar"
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirmar}
                        className="btn btn-eliminar-confirmar"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="spinner-small"></div>
                                Eliminando...
                            </>
                        ) : (
                            <>
                                <Trash2 size={16} />
                                Eliminar
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;

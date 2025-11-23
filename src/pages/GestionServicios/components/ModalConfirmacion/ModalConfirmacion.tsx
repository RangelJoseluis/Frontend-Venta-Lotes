import React from 'react';
import { X } from 'lucide-react';
import type { ModalConfirmacionProps } from '../../types';
import './ModalConfirmacion.css';

const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({
    isOpen,
    titulo,
    mensaje,
    onConfirmar,
    onCancelar,
    loading = false
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onCancelar}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{titulo}</h2>
                    <button className="modal-close" onClick={onCancelar} disabled={loading}>
                        <X size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    <p>{mensaje}</p>
                </div>
                <div className="modal-footer">
                    <button
                        className="modal-btn modal-btn-cancelar"
                        onClick={onCancelar}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        className="modal-btn modal-btn-confirmar"
                        onClick={onConfirmar}
                        disabled={loading}
                    >
                        {loading ? 'Procesando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmacion;

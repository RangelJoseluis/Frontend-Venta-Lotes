import React from 'react';
import { AlertTriangle, UserX, RotateCcw, X } from 'lucide-react';
import './ModalConfirmacion.css';

interface ModalConfirmacionProps {
  isOpen: boolean;
  tipo: 'desactivar' | 'reactivar';
  usuario: {
    nombres: string;
    apellidos: string;
    email: string;
  } | null;
  onConfirmar: () => void;
  onCancelar: () => void;
  loading?: boolean;
}

const ModalConfirmacion: React.FC<ModalConfirmacionProps> = ({
  isOpen,
  tipo,
  usuario,
  onConfirmar,
  onCancelar,
  loading = false
}) => {
  if (!isOpen || !usuario) return null;

  const esDesactivar = tipo === 'desactivar';
  
  const config = {
    desactivar: {
      titulo: 'Desactivar Usuario',
      icono: <UserX size={48} className="modal-confirmacion-icon-desactivar" />,
      mensaje: `¿Está seguro de desactivar al usuario "${usuario.nombres} ${usuario.apellidos}"?`,
      descripcion: 'El usuario no podrá acceder al sistema, pero sus datos se conservarán. Esta acción es reversible (se puede reactivar después).',
      botonConfirmar: 'Desactivar Usuario',
      claseBoton: 'modal-confirmacion-btn-desactivar'
    },
    reactivar: {
      titulo: 'Reactivar Usuario',
      icono: <RotateCcw size={48} className="modal-confirmacion-icon-reactivar" />,
      mensaje: `¿Está seguro de reactivar al usuario "${usuario.nombres} ${usuario.apellidos}"?`,
      descripcion: 'El usuario podrá acceder nuevamente al sistema con todos sus permisos restaurados.',
      botonConfirmar: 'Reactivar Usuario',
      claseBoton: 'modal-confirmacion-btn-reactivar'
    }
  };

  const configuracion = config[tipo];

  return (
    <div className="modal-confirmacion-overlay">
      <div className="modal-confirmacion-container">
        {/* Header con botón cerrar */}
        <div className="modal-confirmacion-header">
          <h3 className="modal-confirmacion-titulo">{configuracion.titulo}</h3>
          <button
            className="modal-confirmacion-btn-cerrar"
            onClick={onCancelar}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido principal */}
        <div className="modal-confirmacion-contenido">
          {/* Icono principal */}
          <div className="modal-confirmacion-icono-container">
            {configuracion.icono}
          </div>

          {/* Mensaje principal */}
          <div className="modal-confirmacion-mensaje">
            <p className="modal-confirmacion-pregunta">
              {configuracion.mensaje}
            </p>
            <p className="modal-confirmacion-descripcion">
              {configuracion.descripcion}
            </p>
          </div>

          {/* Información del usuario */}
          <div className="modal-confirmacion-usuario-info">
            <div className="modal-confirmacion-usuario-detalle">
              <span className="modal-confirmacion-label">Email:</span>
              <span className="modal-confirmacion-valor">{usuario.email}</span>
            </div>
          </div>

          {/* Advertencia adicional para desactivar */}
          {esDesactivar && (
            <div className="modal-confirmacion-advertencia">
              <AlertTriangle size={16} />
              <span>Esta acción desactivará tanto el usuario como el cliente asociado</span>
            </div>
          )}
        </div>

        {/* Footer con botones */}
        <div className="modal-confirmacion-footer">
          <button
            className="modal-confirmacion-btn modal-confirmacion-btn-cancelar"
            onClick={onCancelar}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className={`modal-confirmacion-btn ${configuracion.claseBoton}`}
            onClick={onConfirmar}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="modal-confirmacion-spinner"></div>
                Procesando...
              </>
            ) : (
              configuracion.botonConfirmar
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;

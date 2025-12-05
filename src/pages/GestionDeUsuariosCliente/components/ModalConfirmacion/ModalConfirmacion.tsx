import React from 'react';
import { AlertTriangle, UserX, RotateCcw, X, Loader } from 'lucide-react';

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
      icono: <UserX size={48} className="text-red-500" />,
      mensaje: `¿Está seguro de desactivar al usuario "${usuario.nombres} ${usuario.apellidos}"?`,
      descripcion: 'El usuario no podrá acceder al sistema, pero sus datos se conservarán. Esta acción es reversible (se puede reactivar después).',
      botonConfirmar: 'Desactivar Usuario',
      claseBoton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
    },
    reactivar: {
      titulo: 'Reactivar Usuario',
      icono: <RotateCcw size={48} className="text-emerald-500" />,
      mensaje: `¿Está seguro de reactivar al usuario "${usuario.nombres} ${usuario.apellidos}"?`,
      descripcion: 'El usuario podrá acceder nuevamente al sistema con todos sus permisos restaurados.',
      botonConfirmar: 'Reactivar Usuario',
      claseBoton: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
    }
  };

  const configuracion = config[tipo];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header con botón cerrar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{configuracion.titulo}</h3>
          <button
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            onClick={onCancelar}
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido principal */}
        <div className="p-6">
          {/* Icono principal */}
          <div className="flex justify-center mb-6">
            <div className={`p-4 rounded-full ${esDesactivar ? 'bg-red-100 dark:bg-red-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'}`}>
              {configuracion.icono}
            </div>
          </div>

          {/* Mensaje principal */}
          <div className="text-center mb-6">
            <p className="text-lg font-medium text-slate-800 dark:text-white mb-2">
              {configuracion.mensaje}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {configuracion.descripcion}
            </p>
          </div>

          {/* Información del usuario */}
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-slate-500 dark:text-slate-400">Email:</span>
              <span className="font-semibold text-slate-800 dark:text-white">{usuario.email}</span>
            </div>
          </div>

          {/* Advertencia adicional para desactivar */}
          {esDesactivar && (
            <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm border border-amber-200 dark:border-amber-500/30">
              <AlertTriangle size={18} className="shrink-0" />
              <span>Esta acción desactivará tanto el usuario como el cliente asociado</span>
            </div>
          )}
        </div>

        {/* Footer con botones */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
          <button
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            onClick={onCancelar}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${configuracion.claseBoton}`}
            onClick={onConfirmar}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin" size={18} />
                <span>Procesando...</span>
              </div>
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

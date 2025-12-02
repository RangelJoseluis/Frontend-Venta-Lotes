// Componente ListaModelos - Grid con todas las tarjetas de modelos
import { Loader, AlertCircle } from 'lucide-react';
import TarjetaModelo from '../TarjetaModelo/TarjetaModelo';
import { MENSAJES } from '../../constants';
import type { ListaModelosProps } from '../../types';

const ListaModelos = ({
  modelos,
  loading,
  onEditar,
  onEliminar,
  imagenesConError,
  onImagenError
}: ListaModelosProps) => {

  // Estado de carga
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <Loader size={40} className="animate-spin text-blue-600 mb-4" />
        <p className="text-slate-600 dark:text-slate-300 font-medium">{MENSAJES.CARGANDO}</p>
      </div>
    );
  }

  // Sin modelos
  if (modelos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-center p-8">
        <div className="p-4 bg-slate-100 dark:bg-slate-700/50 rounded-full mb-4">
          <AlertCircle size={48} className="text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">No hay modelos registrados</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">
          Comienza creando tu primer modelo de casa para que aparezca aquí.
        </p>
      </div>
    );
  }

  // Lista con modelos
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modelos.map((modelo) => (
        <TarjetaModelo
          key={modelo.uid}
          modelo={modelo}
          onEditar={onEditar}
          onEliminar={onEliminar}
          tieneErrorImagen={imagenesConError.has(modelo.uid)}
          onImagenError={() => onImagenError(modelo.uid)}
        />
      ))}
    </div>
  );
};

export default ListaModelos;

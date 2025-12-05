// Componente TarjetaModelo - Card individual de cada modelo de casa
import { Edit2, Trash2, Building2, Bath, Bed, Layers, Square } from 'lucide-react';
import { formatearPrecio, obtenerColorEstado, obtenerTextoEstado } from '../../utils/formatters';
import type { TarjetaModeloProps } from '../../types';

const TarjetaModelo = ({
  modelo,
  onEditar,
  onEliminar,
  tieneErrorImagen,
  onImagenError
}: TarjetaModeloProps) => {

  const handleEliminar = () => {
    if (window.confirm(`¿Estás seguro de eliminar el modelo "${modelo.nombre}"?`)) {
      onEliminar(modelo.uid, modelo.nombre);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full group">
      {/* Imagen del modelo */}
      <div className="relative h-48 bg-slate-100 dark:bg-slate-700 overflow-hidden">
        {modelo.imagenUrl && !tieneErrorImagen ? (
          <img
            src={modelo.imagenUrl}
            alt={modelo.nombre}
            onError={onImagenError}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
            <Building2 size={48} className="mb-2 opacity-50" />
            <span className="text-sm font-medium">Sin imagen</span>
          </div>
        )}

        {/* Badge de estado */}
        <span
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white shadow-sm backdrop-blur-sm"
          style={{ backgroundColor: obtenerColorEstado(modelo.estado) }}
        >
          {obtenerTextoEstado(modelo.estado)}
        </span>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-5 flex flex-col flex-1">
        {/* Header con nombre y precio */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1 line-clamp-1" title={modelo.nombre}>
            {modelo.nombre}
          </h3>
          <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {formatearPrecio(modelo.precioBase)}
          </p>
        </div>

        {/* Descripción */}
        {modelo.descripcion && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 min-h-[2.5em]">
            {modelo.descripcion}
          </p>
        )}

        {/* Características */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Square size={16} className="text-slate-400" />
            <span>{modelo.metrosCubiertos} m²</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Building2 size={16} className="text-slate-400" />
            <span>{modelo.ambientes} amb</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Bath size={16} className="text-slate-400" />
            <span>{modelo.banos} baños</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Layers size={16} className="text-slate-400" />
            <span>{modelo.pisos} piso{modelo.pisos !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Observaciones */}
        {modelo.observaciones && (
          <p className="text-xs text-slate-500 dark:text-slate-500 mb-4 italic line-clamp-1">
            {modelo.observaciones}
          </p>
        )}

        {/* Espaciador para empujar botones al fondo */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex gap-2">
          <button
            onClick={() => onEditar(modelo)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-colors"
            title="Editar modelo"
          >
            <Edit2 size={16} />
            Editar
          </button>
          <button
            onClick={handleEliminar}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 transition-colors"
            title="Eliminar modelo"
          >
            <Trash2 size={16} />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarjetaModelo;

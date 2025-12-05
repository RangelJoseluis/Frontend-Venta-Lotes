/**
 * Componente SeccionCaracteristicas - Modelo de casa con galería
 * Migrado a Tailwind CSS
 */

import { useState } from 'react';
import { Home, Bed, Bath, Maximize, Car, DoorOpen, Building2, Image, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { formatearPrecio } from '../../utils/formatters';
import type { Lote } from '../../types';

interface SeccionCaracteristicasProps {
  lote: Lote;
}

const SeccionCaracteristicas = ({ lote }: SeccionCaracteristicasProps) => {
  // Si no hay modelo de casa, no mostrar el componente
  if (!lote.modeloCasa) {
    return null;
  }

  const modelo = lote.modeloCasa;

  // Estado para la galería de imágenes
  const [modalAbierto, setModalAbierto] = useState(false);
  const [imagenActual, setImagenActual] = useState(0);

  // Obtener imágenes (soporta múltiples o una sola)
  const imagenes = modelo.imagenesUrls || (modelo.imagenUrl ? [modelo.imagenUrl] : []);
  const tieneImagenes = imagenes.length > 0;

  // Funciones de navegación
  const siguienteImagen = () => {
    setImagenActual((prev) => (prev + 1) % imagenes.length);
  };

  const imagenAnterior = () => {
    setImagenActual((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setImagenActual(0);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
      {/* Header del modelo */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Home size={18} className="text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{modelo.nombre}</h3>
        </div>
        {modelo.estado && (
          <span className={`px-2 py-1 rounded text-xs font-medium ${modelo.estado === 'activo'
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
            : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
            }`}>
            {modelo.estado === 'activo' ? '✓ Activo' : '× Inactivo'}
          </span>
        )}
      </div>

      {/* Precio destacado */}
      {modelo.precioBase && (
        <div className="mb-4 text-2xl font-bold text-green-600 dark:text-green-400">
          {formatearPrecio(modelo.precioBase)}
        </div>
      )}

      {/* Galería de imágenes */}
      {tieneImagenes && (
        <div
          className="relative mb-4 rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setModalAbierto(true)}
        >
          {/* Imagen principal */}
          <div className="aspect-video bg-slate-100 dark:bg-slate-700">
            <img
              src={imagenes[0]}
              alt={`Modelo ${modelo.nombre}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>

          {/* Contador de imágenes */}
          {imagenes.length > 1 && (
            <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded flex items-center gap-1 text-xs">
              <Image size={14} />
              <span>{imagenes.length} fotos</span>
            </div>
          )}

          {/* Overlay al hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex items-center gap-2 text-white">
              <Image size={20} />
              <span className="font-medium">Ver {imagenes.length > 1 ? 'galería' : 'imagen'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Modal de galería fullscreen */}
      {modalAbierto && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          onClick={cerrarModal}
        >
          <button
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            onClick={cerrarModal}
          >
            <X size={24} className="text-white" />
          </button>

          <div className="relative max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={imagenes[imagenActual]}
              alt={`${modelo.nombre} - Imagen ${imagenActual + 1}`}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />

            {/* Navegación si hay múltiples imágenes */}
            {imagenes.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  onClick={imagenAnterior}
                >
                  <ChevronLeft size={32} className="text-white" />
                </button>

                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  onClick={siguienteImagen}
                >
                  <ChevronRight size={32} className="text-white" />
                </button>

                {/* Indicador de posición */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-medium">
                  {imagenActual + 1} / {imagenes.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Características principales */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        {modelo.metrosCubiertos && (
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <Maximize size={16} className="text-blue-600 dark:text-blue-400" />
            <span>{modelo.metrosCubiertos} m²</span>
          </div>
        )}

        {modelo.dormitorios && (
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <Bed size={16} className="text-blue-600 dark:text-blue-400" />
            <span>{modelo.dormitorios} {modelo.dormitorios === 1 ? 'Dormitorio' : 'Dormitorios'}</span>
          </div>
        )}

        {modelo.banos && (
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <Bath size={16} className="text-blue-600 dark:text-blue-400" />
            <span>{modelo.banos} {modelo.banos === 1 ? 'Baño' : 'Baños'}</span>
          </div>
        )}

        {modelo.pisos && (
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <Building2 size={16} className="text-blue-600 dark:text-blue-400" />
            <span>{modelo.pisos} {modelo.pisos === 1 ? 'Piso' : 'Pisos'}</span>
          </div>
        )}

        {modelo.ambientes && (
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <DoorOpen size={16} className="text-blue-600 dark:text-blue-400" />
            <span>{modelo.ambientes} Ambientes</span>
          </div>
        )}

        {modelo.garaje !== undefined && (
          <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <Car size={16} className="text-blue-600 dark:text-blue-400" />
            <span>{modelo.garaje ? 'Con Garaje' : 'Sin Garaje'}</span>
          </div>
        )}
      </div>

      {/* Descripción */}
      {modelo.descripcion && (
        <div className="text-sm text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg">
          <p>{modelo.descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default SeccionCaracteristicas;

// Componente SeccionCaracteristicas - Versión minimalista y compacta con galería
import { useState } from 'react';
import { Home, Bed, Bath, Maximize, Car, DoorOpen, Building2, Image, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { formatearPrecio } from '../../utils/formatters';
import type { Lote } from '../../types';
import './SeccionCaracteristicas.css';

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
    <div className="detalle-card modelo-card-compact">
      <div className="modelo-header">
        <div className="modelo-title">
          <Home size={18} />
          <h3>{modelo.nombre}</h3>
        </div>
        {modelo.estado && (
          <span className={`badge-mini badge-${modelo.estado}`}>
            {modelo.estado === 'activo' ? '✓ Activo' : '× Inactivo'}
          </span>
        )}
      </div>

      {/* Precio destacado */}
      {modelo.precioBase && (
        <div className="modelo-precio-destacado">
          {formatearPrecio(modelo.precioBase)}
        </div>
      )}

      {/* Galería de imágenes tipo álbum */}
      {tieneImagenes && (
        <div 
          className="modelo-album-compacto"
          onClick={() => setModalAbierto(true)}
        >
          {/* Imagen principal */}
          <div className="album-imagen-principal">
            <img 
              src={imagenes[0]} 
              alt={`Modelo ${modelo.nombre}`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          
          {/* Contador de imágenes si hay más de una */}
          {imagenes.length > 1 && (
            <div className="album-contador">
              <Image size={14} />
              <span>{imagenes.length} fotos</span>
            </div>
          )}
          
          {/* Badge de "Ver galería" */}
          <div className="album-overlay">
            <Image size={20} />
            <span>Ver {imagenes.length > 1 ? 'galería' : 'imagen'}</span>
          </div>
        </div>
      )}
      
      {/* Modal de galería fullscreen */}
      {modalAbierto && (
        <div className="galeria-modal" onClick={cerrarModal}>
          <button className="modal-cerrar" onClick={cerrarModal}>
            <X size={24} />
          </button>
          
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <img 
              src={imagenes[imagenActual]} 
              alt={`${modelo.nombre} - Imagen ${imagenActual + 1}`}
              className="modal-imagen"
            />
            
            {/* Navegación si hay múltiples imágenes */}
            {imagenes.length > 1 && (
              <>
                <button 
                  className="modal-nav modal-nav-izq"
                  onClick={imagenAnterior}
                >
                  <ChevronLeft size={32} />
                </button>
                
                <button 
                  className="modal-nav modal-nav-der"
                  onClick={siguienteImagen}
                >
                  <ChevronRight size={32} />
                </button>
                
                {/* Indicador de posición */}
                <div className="modal-indicador">
                  {imagenActual + 1} / {imagenes.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Características principales en formato compacto con iconos */}
      <div className="modelo-caracteristicas-grid">
        {modelo.metrosCubiertos && (
          <div className="caracteristica-item">
            <Maximize size={16} />
            <span>{modelo.metrosCubiertos} m²</span>
          </div>
        )}

        {modelo.dormitorios && (
          <div className="caracteristica-item">
            <Bed size={16} />
            <span>{modelo.dormitorios} {modelo.dormitorios === 1 ? 'Dormitorio' : 'Dormitorios'}</span>
          </div>
        )}

        {modelo.banos && (
          <div className="caracteristica-item">
            <Bath size={16} />
            <span>{modelo.banos} {modelo.banos === 1 ? 'Baño' : 'Baños'}</span>
          </div>
        )}

        {modelo.pisos && (
          <div className="caracteristica-item">
            <Building2 size={16} />
            <span>{modelo.pisos} {modelo.pisos === 1 ? 'Piso' : 'Pisos'}</span>
          </div>
        )}

        {modelo.ambientes && (
          <div className="caracteristica-item">
            <DoorOpen size={16} />
            <span>{modelo.ambientes} Ambientes</span>
          </div>
        )}

        {modelo.garaje !== undefined && (
          <div className="caracteristica-item">
            <Car size={16} />
            <span>{modelo.garaje ? 'Con Garaje' : 'Sin Garaje'}</span>
          </div>
        )}
      </div>

      {/* Descripción compacta */}
      {modelo.descripcion && (
        <div className="modelo-descripcion-compacta">
          <p>{modelo.descripcion}</p>
        </div>
      )}
    </div>
  );
};

export default SeccionCaracteristicas;

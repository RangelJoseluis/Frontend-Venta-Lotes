// Componente TarjetaModelo - Card individual de cada modelo de casa
import { Edit2, Trash2, Building2, Bath, Bed, Layers, Square } from 'lucide-react';
import { formatearPrecio, obtenerColorEstado, obtenerTextoEstado } from '../../utils/formatters';
import { CONFIG_IMAGENES } from '../../constants';
import type { TarjetaModeloProps } from '../../types';
import './TarjetaModelo.css';

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
    <div className="tarjeta-modelo">
      {/* Imagen del modelo */}
      <div className="modelo-imagen">
        {modelo.imagenUrl && !tieneErrorImagen ? (
          <img
            src={modelo.imagenUrl}
            alt={modelo.nombre}
            onError={onImagenError}
            loading="lazy"
          />
        ) : (
          <div className="imagen-placeholder">
            <Building2 size={48} />
            <span>Sin imagen</span>
          </div>
        )}
        
        {/* Badge de estado */}
        <span 
          className="estado-badge"
          style={{ backgroundColor: obtenerColorEstado(modelo.estado) }}
        >
          {obtenerTextoEstado(modelo.estado)}
        </span>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="modelo-contenido">
        {/* Header con nombre y precio */}
        <div className="modelo-header">
          <h3 className="modelo-nombre">{modelo.nombre}</h3>
          <p className="modelo-precio">{formatearPrecio(modelo.precioBase)}</p>
        </div>

        {/* Descripción */}
        {modelo.descripcion && (
          <p className="modelo-descripcion">{modelo.descripcion}</p>
        )}

        {/* Características */}
        <div className="modelo-caracteristicas">
          <div className="caracteristica">
            <Square size={16} />
            <span>{modelo.metrosCubiertos} m²</span>
          </div>
          <div className="caracteristica">
            <Building2 size={16} />
            <span>{modelo.ambientes} amb</span>
          </div>
          <div className="caracteristica">
            <Bath size={16} />
            <span>{modelo.banos} baños</span>
          </div>
          <div className="caracteristica">
            <Layers size={16} />
            <span>{modelo.pisos} piso{modelo.pisos !== 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Observaciones */}
        {modelo.observaciones && (
          <p className="modelo-observaciones">{modelo.observaciones}</p>
        )}

        {/* Acciones */}
        <div className="modelo-acciones">
          <button
            onClick={() => onEditar(modelo)}
            className="btn-editar"
            title="Editar modelo"
          >
            <Edit2 size={16} />
            Editar
          </button>
          <button
            onClick={handleEliminar}
            className="btn-eliminar"
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

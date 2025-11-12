// Componente ListaModelos - Grid con todas las tarjetas de modelos
import { Loader, AlertCircle } from 'lucide-react';
import TarjetaModelo from '../TarjetaModelo/TarjetaModelo';
import { MENSAJES } from '../../constants';
import type { ListaModelosProps } from '../../types';
import './ListaModelos.css';

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
      <div className="lista-modelos-loading">
        <Loader size={48} className="spinner" />
        <p>{MENSAJES.CARGANDO}</p>
      </div>
    );
  }

  // Sin modelos
  if (modelos.length === 0) {
    return (
      <div className="lista-modelos-vacia">
        <AlertCircle size={48} />
        <h3>No hay modelos registrados</h3>
        <p>Comienza creando tu primer modelo de casa</p>
      </div>
    );
  }

  // Lista con modelos
  return (
    <div className="lista-modelos-container">
      <div className="modelos-grid">
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
    </div>
  );
};

export default ListaModelos;

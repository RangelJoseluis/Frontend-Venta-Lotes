import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { FiltrosVentasProps } from '../../types';
import './FiltrosVentas.css';

const FiltrosVentas: React.FC<FiltrosVentasProps> = ({
  searchTerm,
  onSearchChange,
  filtroEstado,
  onFiltroEstadoChange,
  filtroModalidad,
  onFiltroModalidadChange,
  mostrarFiltros,
  onToggleFiltros
}) => {
  return (
    <div className="filtros-container">
      {/* Buscador a la izquierda */}
      <div className="busqueda-wrapper">
        <Search size={20} />
        <input
          type="text"
          placeholder="Buscar por lote, cliente, código..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-busqueda"
        />
      </div>

      {/* Filtros a la derecha */}
      <div className="filtros-acciones">
        <button
          onClick={onToggleFiltros}
          className={`btn-filtros ${mostrarFiltros ? 'active' : ''}`}
        >
          <Filter size={18} />
          Filtros
        </button>

        <select
          value={filtroEstado}
          onChange={(e) => onFiltroEstadoChange(e.target.value)}
          className="select-estado"
        >
          <option value="todos">Todos los estados</option>
          <option value="activa">Activas</option>
          <option value="pendiente">Pendientes</option>
          <option value="cancelada">Canceladas</option>
        </select>

        <select
          value={filtroModalidad}
          onChange={(e) => onFiltroModalidadChange(e.target.value)}
          className="select-modalidad"
        >
          <option value="todos">Todas las modalidades</option>
          <option value="contado">Contado</option>
          <option value="cuotas">Cuotas</option>
        </select>
      </div>
    </div>
  );
};

export default FiltrosVentas;

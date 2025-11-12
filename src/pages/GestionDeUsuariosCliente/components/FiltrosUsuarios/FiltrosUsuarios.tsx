import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { FiltrosUsuariosProps } from '../../types';
import './FiltrosUsuarios.css';

const FiltrosUsuarios: React.FC<FiltrosUsuariosProps> = ({
  searchTerm,
  onSearchChange,
  filtroEstado,
  onFiltroEstadoChange,
  filtroRol,
  onFiltroRolChange,
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
          placeholder="Buscar por nombre, email, cédula..."
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
          <option value="activo">Activos</option>
          <option value="bloqueado">Desactivados</option>
        </select>

        <select
          value={filtroRol}
          onChange={(e) => onFiltroRolChange(e.target.value)}
          className="select-rol"
        >
          <option value="todos">Todos los roles</option>
          <option value="cliente">Clientes</option>
          <option value="admin">Administradores</option>
        </select>
      </div>
    </div>
  );
};

export default FiltrosUsuarios;

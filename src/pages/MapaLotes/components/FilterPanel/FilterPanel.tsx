/**
 * COMPONENTE: FILTER PANEL
 * 
 * Panel lateral con filtros para el mapa:
 * - Búsqueda por código
 * - Filtro de precio (sliders)
 * - Filtro de superficie (sliders)
 * - Filtro de estados (checkboxes para admin)
 * - Botón limpiar filtros
 * - Contador de resultados
 */

import React from 'react';
import { Filter, X, Search, DollarSign, Maximize2 } from 'lucide-react';
import { COLORES_MAPA } from '../../../../types/mapa';
import type { FilterPanelProps } from '../../types';
import './FilterPanel.css';

const FilterPanel: React.FC<FilterPanelProps> = ({
  mostrarFiltros,
  setMostrarFiltros,
  filtros,
  setFiltros,
  limpiarFiltros,
  lotesFiltrados,
  lotes,
  rol
}) => {
  if (!mostrarFiltros) return null;

  return (
    <div className="mapalotes-panel-filtros-overlay" onClick={() => setMostrarFiltros(false)}>
      <div className="mapalotes-panel-filtros" onClick={(e) => e.stopPropagation()}>
        {/* Header del panel */}
        <div className="mapalotes-filtros-header">
          <h3><Filter size={16} /> Filtros</h3>
          <button onClick={() => setMostrarFiltros(false)} className="mapalotes-btn-cerrar-panel">
            <X size={18} />
          </button>
        </div>

        {/* Contenido de filtros */}
        <div className="mapalotes-filtros-content">
          {/* Búsqueda por código */}
          <div className="mapalotes-filtro-grupo">
            <label><Search size={14} /> Buscar por código</label>
            <input
              type="text"
              placeholder="Ej: L001..."
              value={filtros.busqueda}
              onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
              className="mapalotes-input-busqueda"
            />
          </div>

          {/* Filtro de Precio */}
          <div className="mapalotes-filtro-grupo">
            <label><DollarSign size={14} /> Precio</label>
            <div className="mapalotes-rango-valores">
              <span>${(filtros.precioMin / 1000000).toFixed(1)}M</span>
              <span>${(filtros.precioMax / 1000000).toFixed(1)}M</span>
            </div>
            <input
              type="range"
              min="0"
              max="100000000"
              step="1000000"
              value={filtros.precioMin}
              onChange={(e) => setFiltros({ ...filtros, precioMin: Number(e.target.value) })}
              className="mapalotes-slider"
            />
            <input
              type="range"
              min="0"
              max="100000000"
              step="1000000"
              value={filtros.precioMax}
              onChange={(e) => setFiltros({ ...filtros, precioMax: Number(e.target.value) })}
              className="mapalotes-slider"
            />
          </div>

          {/* Filtro de Superficie */}
          <div className="mapalotes-filtro-grupo">
            <label><Maximize2 size={14} /> Superficie</label>
            <div className="mapalotes-rango-valores">
              <span>{filtros.superficieMin} m²</span>
              <span>{filtros.superficieMax} m²</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={filtros.superficieMin}
              onChange={(e) => setFiltros({ ...filtros, superficieMin: Number(e.target.value) })}
              className="mapalotes-slider"
            />
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={filtros.superficieMax}
              onChange={(e) => setFiltros({ ...filtros, superficieMax: Number(e.target.value) })}
              className="mapalotes-slider"
            />
          </div>

          {/* Filtro de Estados - Solo Admin */}
          {rol === 'admin' && (
            <div className="mapalotes-filtro-grupo">
              <label>Estados</label>
              <div className="mapalotes-checkboxes-estados">
                <label className="mapalotes-checkbox-label">
                  <input
                    type="checkbox"
                    checked={filtros.estados.disponible}
                    onChange={(e) => setFiltros({
                      ...filtros,
                      estados: { ...filtros.estados, disponible: e.target.checked }
                    })}
                  />
                  <span style={{ color: COLORES_MAPA.disponible }}>● Disponible</span>
                </label>
                <label className="mapalotes-checkbox-label">
                  <input
                    type="checkbox"
                    checked={filtros.estados.en_cuotas}
                    onChange={(e) => setFiltros({
                      ...filtros,
                      estados: { ...filtros.estados, en_cuotas: e.target.checked }
                    })}
                  />
                  <span style={{ color: COLORES_MAPA.en_cuotas }}>● En Cuotas</span>
                </label>
                <label className="mapalotes-checkbox-label">
                  <input
                    type="checkbox"
                    checked={filtros.estados.vendido}
                    onChange={(e) => setFiltros({
                      ...filtros,
                      estados: { ...filtros.estados, vendido: e.target.checked }
                    })}
                  />
                  <span style={{ color: COLORES_MAPA.vendido }}>● Vendido</span>
                </label>
              </div>
            </div>
          )}

          {/* Botón Limpiar Filtros */}
          <button onClick={limpiarFiltros} className="mapalotes-btn-limpiar-filtros">
            <X size={14} /> Limpiar
          </button>

          {/* Contador de Resultados */}
          <div className="mapalotes-filtros-resultados">
            <strong>{lotesFiltrados.length}</strong> de <strong>{lotes.length}</strong> lotes
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;

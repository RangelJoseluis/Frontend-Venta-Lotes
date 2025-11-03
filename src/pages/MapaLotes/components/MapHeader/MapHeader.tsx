/**
 * COMPONENTE: MAP HEADER
 * 
 * Header del mapa con todos los controles:
 * - Botón volver
 * - Título y badge de rol
 * - Selector de capas
 * - Buscador de clientes
 * - Leyenda dinámica
 * - Botón de filtros
 */

import React from 'react';
import Select from 'react-select';
import { ArrowLeft, MapPin, Map, Satellite, Layers as LayersIcon, Filter } from 'lucide-react';
import { COLORES_MAPA } from '../../../../types/mapa';
import type { MapHeaderProps } from '../../types';
import './MapHeader.css';

const MapHeader: React.FC<MapHeaderProps> = ({
  rol,
  tipoCapa,
  setTipoCapa,
  clienteSeleccionado,
  setClienteSeleccionado,
  clientes,
  cargandoClientes,
  lotesFiltrados,
  mostrarFiltros,
  setMostrarFiltros,
  onVolverDashboard
}) => {
  return (
    <div className="mapalotes-header">
      {/* FILA 1: Botón volver, Título, Selector de capas, Buscador (admin), Botón filtros */}
      <div className="mapalotes-header-row-1">
        {/* Botón Volver */}
        <button onClick={onVolverDashboard} className="mapalotes-btn-back">
          <ArrowLeft size={16} />
          <span>Volver al Panel</span>
        </button>

        {/* Título con Badge de Rol */}
        <div className="mapalotes-title">
          <MapPin />
          <h1>Mapa Lotes</h1>
          <span className={`mapalotes-badge-rol mapalotes-badge-rol-${rol}`}>
            {rol === 'admin' ? '👑 Admin' : rol === 'cliente' ? '👤 Cliente' : '🌐 Invitado'}
          </span>
        </div>

        {/* Selector de Capas */}
        <div className="mapalotes-selector-capas">
          <button
            className={`mapalotes-btn-capa ${tipoCapa === 'mapa' ? 'active' : ''}`}
            onClick={() => setTipoCapa('mapa')}
            title="Vista de Mapa"
          >
            <Map size={18} />
            <span>Mapa</span>
          </button>
          <button
            className={`mapalotes-btn-capa ${tipoCapa === 'satelite' ? 'active' : ''}`}
            onClick={() => setTipoCapa('satelite')}
            title="Vista Satelital"
          >
            <Satellite size={18} />
            <span>Satélite</span>
          </button>
          <button
            className={`mapalotes-btn-capa ${tipoCapa === 'hibrido' ? 'active' : ''}`}
            onClick={() => setTipoCapa('hibrido')}
            title="Vista Híbrida"
          >
            <LayersIcon size={18} />
            <span>Híbrido</span>
          </button>
        </div>

        {/* Botón de Filtros - Después de los selectores */}
        <button
          className={`mapalotes-btn-filtros ${mostrarFiltros ? 'active' : ''}`}
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          title="Mostrar/Ocultar Filtros"
        >
          <Filter size={18} />
          <span>Filtros</span>
        </button>
      </div>

      {/* FILA 2: Leyenda */}
      <div className="mapalotes-header-row-2">
        <div className="mapalotes-leyenda">
          {/* Disponible - Visible para todos */}
          <div className="mapalotes-leyenda-item">
            <span className="mapalotes-leyenda-color" style={{ backgroundColor: COLORES_MAPA.disponible }}></span>
            <span>Disponible ({lotesFiltrados.filter(l => l.estado === 'disponible').length})</span>
          </div>
          
          {/* En Cuotas - Solo admin y cliente */}
          {(rol === 'admin' || rol === 'cliente') && (
            <div className="mapalotes-leyenda-item">
              <span className="mapalotes-leyenda-color" style={{ backgroundColor: COLORES_MAPA.en_cuotas }}></span>
              <span>En Cuotas ({lotesFiltrados.filter(l => l.estado === 'en_cuotas').length})</span>
            </div>
          )}
          
          {/* Vendido - Solo admin */}
          {rol === 'admin' && (
            <div className="mapalotes-leyenda-item">
              <span className="mapalotes-leyenda-color" style={{ backgroundColor: COLORES_MAPA.vendido }}></span>
              <span>Vendido ({lotesFiltrados.filter(l => l.estado === 'vendido').length})</span>
            </div>
          )}
          
          {/* Indicador especial para clientes */}
          {rol === 'cliente' && (
            <div className="mapalotes-leyenda-item mapalotes-leyenda-item-destacado">
              <span className="mapalotes-leyenda-color" style={{ backgroundColor: '#f59e0b' }}>⭐</span>
              <span>Mi Lote</span>
            </div>
          )}
        </div>

        {/* Búsqueda de cliente - Solo admin, junto a la leyenda */}
        {rol === 'admin' && (
          <div className="mapalotes-busqueda-cliente-wrapper">
            <div className="mapalotes-busqueda-cliente-inline">
              <Select
                options={clientes.map(cliente => ({
                  value: cliente.uid,
                  label: `${cliente.nombres} ${cliente.apellidos} - ${cliente.documento}`,
                  cliente: cliente
                }))}
                value={clienteSeleccionado}
                onChange={setClienteSeleccionado}
                isClearable
                isSearchable
                isLoading={cargandoClientes}
                placeholder="Buscar cliente..."
                noOptionsMessage={() => 'Sin resultados'}
                loadingMessage={() => 'Cargando...'}
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: '44px',
                    minWidth: '350px',
                    maxWidth: '450px',
                    borderRadius: '10px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                    backgroundColor: 'white',
                    '&:hover': {
                      borderColor: '#3b82f6',
                      boxShadow: '0 2px 6px rgba(59, 130, 246, 0.15)'
                    }
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: '1px solid #e2e8f0',
                    zIndex: 9999
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#eff6ff' : 'white',
                    color: '#1f2937',
                    cursor: 'pointer',
                    '&:active': {
                      backgroundColor: '#dbeafe'
                    }
                  })
                }}
              />
              <div className={`mapalotes-busqueda-cliente-badge ${clienteSeleccionado ? 'visible' : ''}`}>
                {clienteSeleccionado && (
                  <>{lotesFiltrados.length} lote{lotesFiltrados.length !== 1 ? 's' : ''}</>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapHeader;

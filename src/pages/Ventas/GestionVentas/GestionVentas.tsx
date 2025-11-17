/**
 * PÁGINA: GESTIÓN DE VENTAS - Versión Modular con Patrón Profesional de Clientes
 * Gestión completa de ventas (CRUD) siguiendo el patrón de GestionDeUsuariosCliente
 */

import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import {
  HeaderGestionVentas,
  EstadisticasVentas,
  FiltrosVentas,
  TablaVentas
} from './components';
import { useGestionVentas } from './hooks/useGestionVentas';
import './GestionVentas.css';

const GestionVentas: React.FC = () => {
  // ============================================================================
  // HOOKS PERSONALIZADOS
  // ============================================================================
  
  // Hook para gestión de ventas (CRUD)
  const {
    ventas,
    cargando,
    error,
    estadisticas,
    eliminarVenta,
    previsualizarFactura,
    descargarFactura
  } = useGestionVentas();

  // ============================================================================
  // ESTADOS PARA FILTROS (PATRÓN GESTIONLOTES)
  // ============================================================================
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [filtroModalidad, setFiltroModalidad] = useState<string>('todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // ============================================================================
  // CÁLCULOS Y FILTROS
  // ============================================================================
  
  const ventasFiltradas = ventas.filter(venta => {
    // Filtro por búsqueda
    if (searchTerm) {
      const busqueda = searchTerm.toLowerCase();
      const coincideBusqueda = (
        venta.lote?.codigo?.toLowerCase().includes(busqueda) ||
        venta.cliente?.nombres?.toLowerCase().includes(busqueda) ||
        venta.cliente?.apellidos?.toLowerCase().includes(busqueda) ||
        venta.cliente?.documento?.toLowerCase().includes(busqueda)
      );
      if (!coincideBusqueda) return false;
    }

    // Filtro por estado
    if (filtroEstado !== 'todos') {
      if (venta.estado !== filtroEstado) return false;
    }

    // Filtro por modalidad
    if (filtroModalidad !== 'todos') {
      if (venta.modalidadPago !== filtroModalidad) return false;
    }

    return true;
  });

  // ============================================================================
  // HANDLERS PARA ACCIONES
  // ============================================================================

  /**
   * Manejar nueva venta
   */
  const handleNuevaVenta = (): void => {
    window.location.href = '/ventas/crear';
  };

  // ============================================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================================

  return (
    <div className="gestion-ventas-container">
      <div className="ventas-wrapper">
        {/* Header con navegación y botones */}
        <HeaderGestionVentas
          titulo="Gestión de Ventas"
          subtitulo="Administra todas las ventas de lotes"
          onNuevo={handleNuevaVenta}
          textoBotonNuevo="Nueva Venta"
          totalVentas={ventas.length}
        />

        {/* Error general */}
        {error && (
          <div className="alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Filtros de búsqueda - ARRIBA de las tarjetas (patrón GestionLotes) */}
        <FiltrosVentas
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filtroEstado={filtroEstado}
          onFiltroEstadoChange={setFiltroEstado}
          filtroModalidad={filtroModalidad}
          onFiltroModalidadChange={setFiltroModalidad}
          mostrarFiltros={mostrarFiltros}
          onToggleFiltros={() => setMostrarFiltros(!mostrarFiltros)}
        />

        {/* Estadísticas - DEBAJO del buscador */}
        <EstadisticasVentas
          totalVentas={estadisticas.totalVentas}
          ventasContado={estadisticas.ventasContado}
          ventasCuotas={estadisticas.ventasCuotas}
          ventasPendientes={estadisticas.ventasPendientes}
          montoTotal={estadisticas.montoTotal}
          cargando={cargando}
        />

        {/* Tabla de ventas */}
        <TablaVentas
          ventas={ventasFiltradas}
          cargando={cargando}
          onEliminar={eliminarVenta}
          onPrevisualizarFactura={previsualizarFactura}
          onDescargarFactura={descargarFactura}
        />
      </div>
    </div>
  );
};

export default GestionVentas;

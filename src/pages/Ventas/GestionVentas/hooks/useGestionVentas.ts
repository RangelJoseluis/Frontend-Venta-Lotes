// ============================================================================
// HOOK: GESTIÓN DE VENTAS
// ============================================================================

import { useState, useEffect, useCallback } from 'react';
import { obtenerVentasPaginadas, eliminarVenta } from '../../../../services/ventas.service';
import facturasService from '../../../../services/facturas.service';
import type { VentaResumen, FiltrosVentas, PaginacionVentas } from '../../shared/types';
import { PAGINACION_CONFIG, MENSAJES } from '../../shared/utils/constants';

export const useGestionVentas = () => {
  // Estados principales
  const [ventas, setVentas] = useState<VentaResumen[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de filtros
  const [filtros, setFiltros] = useState<FiltrosVentas>({
    busqueda: '',
    modalidad: '',
    estado: '',
    fechaDesde: '',
    fechaHasta: ''
  });

  // Estados de paginación
  const [paginacion, setPaginacion] = useState<PaginacionVentas>({
    paginaActual: 1,
    totalPaginas: 1,
    limite: PAGINACION_CONFIG.LIMITE_DEFAULT,
    total: 0
  });

  // Cargar ventas
  const cargarVentas = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      
      const response = await obtenerVentasPaginadas(
        paginacion.paginaActual, 
        paginacion.limite
      );
      
      setVentas(response.ventas);
      setPaginacion(prev => ({
        ...prev,
        totalPaginas: response.totalPaginas,
        total: response.total
      }));
    } catch (error) {
      console.error('Error al cargar ventas:', error);
      setError(MENSAJES.ERROR_CARGAR_VENTAS);
    } finally {
      setCargando(false);
    }
  }, [paginacion.paginaActual, paginacion.limite]);

  // Efecto para cargar ventas cuando cambia la paginación
  useEffect(() => {
    cargarVentas();
  }, [cargarVentas]);

  // Filtrar ventas localmente
  const ventasFiltradas = ventas.filter(venta => {
    const cumpleBusqueda = !filtros.busqueda || 
      venta.lote.codigo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      venta.cliente.nombres.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      venta.cliente.apellidos.toLowerCase().includes(filtros.busqueda.toLowerCase());

    const cumpleModalidad = !filtros.modalidad || 
      venta.modalidadPago === filtros.modalidad;

    const cumpleEstado = !filtros.estado || 
      venta.estado === filtros.estado;

    return cumpleBusqueda && cumpleModalidad && cumpleEstado;
  });

  // Calcular estadísticas profesionales (patrón Clientes)
  const estadisticas = {
    totalVentas: ventasFiltradas.length,
    ventasContado: ventasFiltradas.filter(v => v.modalidadPago === 'contado').length,
    ventasCuotas: ventasFiltradas.filter(v => v.modalidadPago === 'cuotas').length,
    ventasPendientes: ventasFiltradas.filter(v => v.montoPendiente > 0).length,
    montoTotal: ventasFiltradas.reduce((total, venta) => total + venta.precioVenta, 0)
  };

  // Cambiar página
  const cambiarPagina = useCallback((nuevaPagina: number) => {
    setPaginacion(prev => ({
      ...prev,
      paginaActual: nuevaPagina
    }));
  }, []);

  // Cambiar filtros
  const cambiarFiltros = useCallback((nuevosFiltros: FiltrosVentas) => {
    setFiltros(nuevosFiltros);
    // Resetear a la primera página cuando cambian los filtros
    setPaginacion(prev => ({
      ...prev,
      paginaActual: 1
    }));
  }, []);

  // Eliminar venta
  const eliminarVentaHandler = useCallback(async (uid: string, codigo: string) => {
    if (!window.confirm(MENSAJES.CONFIRMAR_ELIMINAR(codigo))) {
      return;
    }

    try {
      await eliminarVenta(uid);
      alert(MENSAJES.VENTA_ELIMINADA);
      await cargarVentas();
    } catch (error) {
      console.error('Error al eliminar venta:', error);
      alert(MENSAJES.ERROR_ELIMINAR_VENTA);
    }
  }, [cargarVentas]);

  // Previsualizar factura
  const previsualizarFactura = useCallback(async (uid: string) => {
    try {
      await facturasService.previsualizarFacturaVenta(uid);
    } catch (error) {
      console.error('Error al previsualizar factura:', error);
      alert(MENSAJES.ERROR_PREVISUALIZAR_FACTURA);
    }
  }, []);

  // Descargar factura
  const descargarFactura = useCallback(async (uid: string) => {
    try {
      await facturasService.descargarFacturaVenta(uid);
    } catch (error) {
      console.error('Error al descargar factura:', error);
      alert(MENSAJES.ERROR_DESCARGAR_FACTURA);
    }
  }, []);

  // Recargar datos
  const recargar = useCallback(() => {
    cargarVentas();
  }, [cargarVentas]);

  return {
    // Estados
    ventas: ventasFiltradas,
    cargando,
    error,
    filtros,
    paginacion,
    estadisticas,
    
    // Acciones
    cambiarPagina,
    cambiarFiltros,
    eliminarVenta: eliminarVentaHandler,
    previsualizarFactura,
    descargarFactura,
    recargar
  };
};

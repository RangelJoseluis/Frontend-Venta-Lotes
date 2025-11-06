import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2, Plus, Search, ArrowLeft, Download } from 'lucide-react';
import { obtenerVentasPaginadas, eliminarVenta } from '../services/ventas.service';
import facturasService from '../services/facturas.service';
import type { VentaResumen } from '../types';
import './GestionVentas.css';

const GestionVentas = () => {
  const navigate = useNavigate();
  const [ventas, setVentas] = useState<VentaResumen[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const limite = 20;

  useEffect(() => {
    cargarVentas();
  }, [paginaActual]);

  const cargarVentas = async () => {
    try {
      setCargando(true);
      const response = await obtenerVentasPaginadas(paginaActual, limite);
      setVentas(response.ventas);
      setTotalPaginas(response.totalPaginas);
    } catch (error) {
      console.error('Error al cargar ventas:', error);
      alert('Error al cargar ventas');
    } finally {
      setCargando(false);
    }
  };

  const eliminar = async (uid: string, codigo: string) => {
    if (!window.confirm(`¿Está seguro de eliminar la venta "${codigo}"?`)) {
      return;
    }

    try {
      await eliminarVenta(uid);
      alert('Venta eliminada exitosamente');
      cargarVentas();
    } catch (error) {
      console.error('Error al eliminar venta:', error);
      alert('Error al eliminar venta');
    }
  };

  const previsualizarFactura = async (uid: string) => {
    try {
      await facturasService.previsualizarFacturaVenta(uid);
    } catch (error) {
      console.error('Error al previsualizar factura:', error);
      alert('Error al previsualizar factura');
    }
  };

  const descargarFactura = async (uid: string) => {
    try {
      await facturasService.descargarFacturaVenta(uid);
    } catch (error) {
      console.error('Error al descargar factura:', error);
      alert('Error al descargar factura');
    }
  };

  const ventasFiltradas = ventas.filter(venta =>
    venta.lote.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
    venta.cliente.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
    venta.cliente.apellidos.toLowerCase().includes(busqueda.toLowerCase())
  );

  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO');
  };

  return (
    <div className="gestion-ventas">
      {/* Header */}
      <div className="header">
        <button 
          className="btn-volver"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={20} />
          Volver al Dashboard
        </button>
        <h1>Gestión de Ventas</h1>
        <button 
          className="btn-nuevo"
          onClick={() => navigate('/crear-venta')}
        >
          <Plus size={20} />
          Nueva Venta
        </button>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <div className="filtro-busqueda">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar por lote o cliente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla */}
      {cargando ? (
        <div className="cargando">Cargando ventas...</div>
      ) : (
        <>
          <div className="tabla-container">
            <table className="tabla-ventas">
              <thead>
                <tr>
                  <th>Lote</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Precio Venta</th>
                  <th>Modalidad</th>
                  <th>Estado</th>
                  <th>Pendiente</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {ventasFiltradas.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="sin-datos">
                      No se encontraron ventas
                    </td>
                  </tr>
                ) : (
                  ventasFiltradas.map((venta) => (
                    <tr key={venta.uid}>
                      <td>
                        <strong>{venta.lote.codigo}</strong>
                      </td>
                      <td>
                        <div className="cliente-info">
                          <strong>{venta.cliente.nombres} {venta.cliente.apellidos}</strong>
                          <div className="documento">{venta.cliente.documento}</div>
                        </div>
                      </td>
                      <td>{formatearFecha(venta.fechaVenta)}</td>
                      <td><strong>{formatearMoneda(venta.precioVenta)}</strong></td>
                      <td>
                        <span className={`badge badge-${venta.modalidadPago}`}>
                          {venta.modalidadPago === 'contado' ? 'Contado' : `${venta.cantidadCuotas} Cuotas`}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-estado-${venta.estado}`}>
                          {venta.estado}
                        </span>
                      </td>
                      <td>
                        {venta.montoPendiente > 0 ? (
                          <span className="pendiente">{formatearMoneda(venta.montoPendiente)}</span>
                        ) : (
                          <span className="pagado">Pagado</span>
                        )}
                      </td>
                      <td>
                        <div className="acciones">
                          <button
                            className="btn-accion btn-ver"
                            onClick={() => navigate(`/ventas/${venta.uid}`)}
                            title="Ver detalles"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="btn-accion btn-preview"
                            onClick={() => previsualizarFactura(venta.uid)}
                            title="Previsualizar Factura"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="btn-accion btn-download"
                            onClick={() => descargarFactura(venta.uid)}
                            title="Descargar Factura"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            className="btn-accion btn-eliminar"
                            onClick={() => eliminar(venta.uid, venta.lote.codigo)}
                            title="Eliminar"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="paginacion">
              <button
                onClick={() => setPaginaActual(prev => Math.max(1, prev - 1))}
                disabled={paginaActual === 1}
              >
                Anterior
              </button>
              <span>Página {paginaActual} de {totalPaginas}</span>
              <button
                onClick={() => setPaginaActual(prev => Math.min(totalPaginas, prev + 1))}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      {/* Resumen */}
      <div className="resumen">
        <p>Total de ventas: <strong>{ventasFiltradas.length}</strong></p>
      </div>
    </div>
  );
};

export default GestionVentas;

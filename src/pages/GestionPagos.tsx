import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Plus, Search, ArrowLeft } from 'lucide-react';
import pagosService from '../services/pagos.service';
import type { Pago } from '../types';
import './GestionPagos.css';

const GestionPagos = () => {
  const navigate = useNavigate();
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtroMetodo, setFiltroMetodo] = useState<string>('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const limite = 20;

  useEffect(() => {
    cargarPagos();
  }, [paginaActual, filtroMetodo]);

  const cargarPagos = async () => {
    try {
      setCargando(true);
      const filtros: any = {};
      if (filtroMetodo) filtros.metodoPago = filtroMetodo;

      const response = await pagosService.obtenerPaginados(paginaActual, limite, filtros);
      setPagos(response.pagos);
      setTotalPaginas(response.totalPaginas);
    } catch (error) {
      console.error('Error al cargar pagos:', error);
      alert('Error al cargar pagos');
    } finally {
      setCargando(false);
    }
  };

  const pagosFiltrados = pagos.filter(pago => {
    const busquedaLower = busqueda.toLowerCase();
    return (
      pago.cuota?.numeroCuota?.toString().includes(busquedaLower) ||
      pago.cuota?.venta?.codigo?.toLowerCase().includes(busquedaLower) ||
      pago.referencia?.toLowerCase().includes(busquedaLower)
    );
  });

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

  const obtenerNombreMetodo = (metodo: string) => {
    const metodos: Record<string, string> = {
      efectivo: 'Efectivo',
      transferencia: 'Transferencia',
      cheque: 'Cheque',
      tarjeta: 'Tarjeta'
    };
    return metodos[metodo] || metodo;
  };

  return (
    <div className="gestion-pagos">
      {/* Header */}
      <div className="header">
        <button 
          className="btn-volver"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={20} />
          Volver al Dashboard
        </button>
        <h1>Gestión de Pagos</h1>
        <button 
          className="btn-nuevo"
          onClick={() => navigate('/registrar-pago')}
        >
          <Plus size={20} />
          Registrar Pago
        </button>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <div className="filtro-busqueda">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar por venta, cuota o referencia..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <select 
          value={filtroMetodo} 
          onChange={(e) => setFiltroMetodo(e.target.value)}
        >
          <option value="">Todos los métodos</option>
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="cheque">Cheque</option>
          <option value="tarjeta">Tarjeta</option>
        </select>
      </div>

      {/* Tabla */}
      {cargando ? (
        <div className="cargando">Cargando pagos...</div>
      ) : (
        <>
          <div className="tabla-container">
            <table className="tabla-pagos">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Venta</th>
                  <th>Cuota</th>
                  <th>Monto</th>
                  <th>Método</th>
                  <th>Referencia</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pagosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="sin-datos">
                      No se encontraron pagos
                    </td>
                  </tr>
                ) : (
                  pagosFiltrados.map((pago) => (
                    <tr key={pago.uid}>
                      <td>{formatearFecha(pago.fechaPago)}</td>
                      <td>
                        {pago.cuota?.venta?.codigo ? (
                          <div className="venta-info">
                            <strong>{pago.cuota.venta.codigo}</strong>
                            {pago.cuota.venta.cliente && (
                              <div className="cliente-nombre">
                                {pago.cuota.venta.cliente}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="sin-info">-</span>
                        )}
                      </td>
                      <td>
                        <span className="numero-cuota">
                          Cuota #{pago.cuota?.numeroCuota || '-'}
                        </span>
                      </td>
                      <td>
                        <strong className="monto">{formatearMoneda(pago.monto)}</strong>
                      </td>
                      <td>
                        <span className={`badge badge-${pago.metodoPago}`}>
                          {obtenerNombreMetodo(pago.metodoPago)}
                        </span>
                      </td>
                      <td>
                        {pago.referencia ? (
                          <code className="referencia">{pago.referencia}</code>
                        ) : (
                          <span className="sin-referencia">-</span>
                        )}
                      </td>
                      <td>
                        <div className="acciones">
                          <button
                            className="btn-accion btn-ver"
                            onClick={() => navigate(`/pagos/${pago.uid}`)}
                            title="Ver detalles"
                          >
                            <Eye size={16} />
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
        <p>Total de pagos: <strong>{pagosFiltrados.length}</strong></p>
      </div>
    </div>
  );
};

export default GestionPagos;

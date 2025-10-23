import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, Search, ArrowLeft } from 'lucide-react';
import serviciosService from '../services/servicios.service';
import type { Servicio } from '../types';
import './GestionServicios.css';

const GestionServicios = () => {
  const navigate = useNavigate();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('');

  useEffect(() => {
    cargarServicios();
  }, [filtroEstado, filtroCategoria]);

  const cargarServicios = async () => {
    try {
      setCargando(true);
      const filtros: any = {};
      if (filtroEstado) filtros.estado = filtroEstado;
      if (filtroCategoria) filtros.categoria = filtroCategoria;
      
      const datos = await serviciosService.obtenerTodos(filtros);
      setServicios(datos);
    } catch (error) {
      console.error('Error al cargar servicios:', error);
      alert('Error al cargar servicios');
    } finally {
      setCargando(false);
    }
  };

  const eliminarServicio = async (uid: string, nombre: string) => {
    if (!window.confirm(`¿Está seguro de eliminar el servicio "${nombre}"?`)) {
      return;
    }

    try {
      await serviciosService.eliminar(uid);
      alert('Servicio eliminado exitosamente');
      cargarServicios();
    } catch (error) {
      console.error('Error al eliminar servicio:', error);
      alert('Error al eliminar servicio');
    }
  };

  const cambiarEstado = async (uid: string, estadoActual: string) => {
    const nuevoEstado = estadoActual === 'activo' ? 'inactivo' : 'activo';
    
    try {
      await serviciosService.cambiarEstado(uid, nuevoEstado as 'activo' | 'inactivo');
      alert(`Servicio ${nuevoEstado === 'activo' ? 'activado' : 'desactivado'} exitosamente`);
      cargarServicios();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('Error al cambiar estado del servicio');
    }
  };

  const serviciosFiltrados = servicios.filter(servicio =>
    servicio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    servicio.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  };

  return (
    <div className="gestion-servicios">
      {/* Header */}
      <div className="header">
        <button 
          className="btn-volver"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft size={20} />
          Volver al Dashboard
        </button>
        <h1>Gestión de Servicios</h1>
        <button 
          className="btn-nuevo"
          onClick={() => navigate('/servicios/nuevo')}
        >
          <Plus size={20} />
          Nuevo Servicio
        </button>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <div className="filtro-busqueda">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar servicios..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <select 
          value={filtroEstado} 
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
        </select>

        <select 
          value={filtroCategoria} 
          onChange={(e) => setFiltroCategoria(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          <option value="utilities">Utilities</option>
          <option value="comunicaciones">Comunicaciones</option>
          <option value="seguridad">Seguridad</option>
          <option value="transporte">Transporte</option>
          <option value="recreacion">Recreación</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      {/* Tabla */}
      {cargando ? (
        <div className="cargando">Cargando servicios...</div>
      ) : (
        <div className="tabla-container">
          <table className="tabla-servicios">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Tipo</th>
                <th>Costo Mensual</th>
                <th>Esencial</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {serviciosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="sin-datos">
                    No se encontraron servicios
                  </td>
                </tr>
              ) : (
                serviciosFiltrados.map((servicio) => (
                  <tr key={servicio.uid}>
                    <td>
                      <strong>{servicio.nombre}</strong>
                      {servicio.proveedor && (
                        <div className="proveedor">{servicio.proveedor}</div>
                      )}
                    </td>
                    <td>
                      <span className={`badge badge-${servicio.categoria}`}>
                        {servicio.categoria}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${servicio.tipo}`}>
                        {servicio.tipo}
                      </span>
                    </td>
                    <td>{formatearMoneda(servicio.costoMensual)}</td>
                    <td>
                      <span className={`badge ${servicio.esEsencial ? 'badge-si' : 'badge-no'}`}>
                        {servicio.esEsencial ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td>
                      <button
                        className={`btn-estado ${servicio.estado}`}
                        onClick={() => cambiarEstado(servicio.uid, servicio.estado)}
                      >
                        {servicio.estado}
                      </button>
                    </td>
                    <td>
                      <div className="acciones">
                        <button
                          className="btn-accion btn-editar"
                          onClick={() => navigate(`/servicios/${servicio.uid}/editar`)}
                          title="Editar"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn-accion btn-eliminar"
                          onClick={() => eliminarServicio(servicio.uid, servicio.nombre)}
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
      )}

      {/* Resumen */}
      <div className="resumen">
        <p>Total de servicios: <strong>{serviciosFiltrados.length}</strong></p>
      </div>
    </div>
  );
};

export default GestionServicios;

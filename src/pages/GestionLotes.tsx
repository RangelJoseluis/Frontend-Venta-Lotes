/**
 * PÁGINA: GESTIÓN DE LOTES (CRUD COMPLETO)
 * Lista, búsqueda, filtrado y acciones sobre lotes
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter,
  Eye,
  Edit, 
  Trash2, 
  MapPin,
  Home,
  DollarSign,
  Maximize2,
  AlertCircle,
  CheckCircle,
  X,
  ArrowLeft
} from 'lucide-react';
import { lotesService } from '../services/lotes.service';
import { getErrorMessage } from '../services/http.service';
import './GestionLotes.css';

interface Lote {
  uid: string;
  codigo: string;
  superficieM2: string;
  precioLista: string;
  direccion: string;
  manzana: string;
  numeroLote: string;
  estado: 'disponible' | 'en_cuotas' | 'vendido';
  estadoDocumentacion: string;
  topografia: string;
  amueblado: boolean;
  modeloCasa?: {
    nombre: string;
  };
  creadoEn: string;
  actualizadoEn: string;
}

const GestionLotes = () => {
  const navigate = useNavigate();
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [lotesFiltrados, setLotesFiltrados] = useState<Lote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filtros
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  // Modal de eliminación
  const [loteAEliminar, setLoteAEliminar] = useState<Lote | null>(null);
  const [eliminando, setEliminando] = useState(false);

  // Cargar lotes
  useEffect(() => {
    cargarLotes();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    aplicarFiltros();
  }, [busqueda, filtroEstado, lotes]);

  const cargarLotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await lotesService.obtenerTodos();
      setLotes(data);
      console.log('✅ Lotes cargados:', data.length);
    } catch (err) {
      const mensaje = getErrorMessage(err);
      setError(mensaje);
      console.error('❌ Error al cargar lotes:', err);
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...lotes];

    // Filtro por búsqueda
    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      resultado = resultado.filter(lote =>
        lote.codigo.toLowerCase().includes(busquedaLower) ||
        lote.direccion.toLowerCase().includes(busquedaLower) ||
        lote.manzana.toLowerCase().includes(busquedaLower) ||
        lote.numeroLote.toLowerCase().includes(busquedaLower)
      );
    }

    // Filtro por estado
    if (filtroEstado !== 'todos') {
      resultado = resultado.filter(lote => lote.estado === filtroEstado);
    }

    setLotesFiltrados(resultado);
  };

  const confirmarEliminacion = (lote: Lote) => {
    setLoteAEliminar(lote);
  };

  const cancelarEliminacion = () => {
    setLoteAEliminar(null);
  };

  const eliminarLote = async () => {
    if (!loteAEliminar) return;

    try {
      setEliminando(true);
      await lotesService.eliminar(loteAEliminar.uid);
      console.log('✅ Lote eliminado:', loteAEliminar.codigo);
      
      // Actualizar lista
      setLotes(lotes.filter(l => l.uid !== loteAEliminar.uid));
      setLoteAEliminar(null);
    } catch (err) {
      const mensaje = getErrorMessage(err);
      alert(`Error al eliminar: ${mensaje}`);
      console.error('❌ Error al eliminar lote:', err);
    } finally {
      setEliminando(false);
    }
  };

  const obtenerColorEstado = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return '#10b981';
      case 'en_cuotas':
        return '#f59e0b';
      case 'vendido':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const obtenerTextoEstado = (estado: string) => {
    switch (estado) {
      case 'disponible':
        return 'Disponible';
      case 'en_cuotas':
        return 'En Cuotas';
      case 'vendido':
        return 'Vendido';
      default:
        return estado;
    }
  };

  const formatearPrecio = (precio: string) => {
    const numero = parseFloat(precio);
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(numero);
  };

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="gestion-lotes-container">
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Cargando lotes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gestion-lotes-container">
      {/* Header */}
      <div className="gestion-header">
        <div className="header-left">
          <h1>
            <Home size={28} />
            Gestión de Lotes
          </h1>
          <p className="header-subtitle">
            {lotesFiltrados.length} de {lotes.length} lotes
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-volver-dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              background: 'white',
              color: '#1e293b',
              border: '2px solid #e2e8f0',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f8fafc';
              e.currentTarget.style.borderColor = '#cbd5e1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <ArrowLeft size={20} />
            Volver al Dashboard
          </button>
          <button
            onClick={() => navigate('/lotes/nuevo')}
            className="btn-nuevo-lote"
          >
            <Plus size={20} />
            Nuevo Lote
          </button>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="filtros-container">
        <div className="busqueda-wrapper">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar por código, dirección, manzana..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-busqueda"
          />
        </div>

        <div className="filtros-acciones">
          <button
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
            className={`btn-filtros ${mostrarFiltros ? 'active' : ''}`}
          >
            <Filter size={18} />
            Filtros
          </button>

          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="select-estado"
          >
            <option value="todos">Todos los estados</option>
            <option value="disponible">Disponible</option>
            <option value="en_cuotas">En Cuotas</option>
            <option value="vendido">Vendido</option>
          </select>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="estadisticas-grid">
        <div className="stat-card stat-disponible">
          <div className="stat-icono">
            <CheckCircle size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-valor">
              {lotes.filter(l => l.estado === 'disponible').length}
            </span>
            <span className="stat-label">Disponibles</span>
          </div>
        </div>

        <div className="stat-card stat-cuotas">
          <div className="stat-icono">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-valor">
              {lotes.filter(l => l.estado === 'en_cuotas').length}
            </span>
            <span className="stat-label">En Cuotas</span>
          </div>
        </div>

        <div className="stat-card stat-vendido">
          <div className="stat-icono">
            <Home size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-valor">
              {lotes.filter(l => l.estado === 'vendido').length}
            </span>
            <span className="stat-label">Vendidos</span>
          </div>
        </div>

        <div className="stat-card stat-total">
          <div className="stat-icono">
            <Maximize2 size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-valor">{lotes.length}</span>
            <span className="stat-label">Total Lotes</span>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={cargarLotes} className="btn-reintentar">
            Reintentar
          </button>
        </div>
      )}

      {/* Tabla de lotes */}
      <div className="tabla-container">
        <table className="tabla-lotes">
          <thead>
            <tr>
              <th>Código</th>
              <th>Ubicación</th>
              <th>Superficie</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Modelo Casa</th>
              <th>Actualizado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {lotesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={8} className="tabla-vacia">
                  <AlertCircle size={48} />
                  <p>No se encontraron lotes</p>
                  {busqueda && (
                    <button
                      onClick={() => setBusqueda('')}
                      className="btn-limpiar"
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              lotesFiltrados.map((lote) => (
                <tr key={lote.uid}>
                  <td>
                    <span className="lote-codigo">{lote.codigo}</span>
                  </td>
                  <td>
                    <div className="lote-ubicacion">
                      <MapPin size={14} />
                      <span>{lote.direccion}</span>
                    </div>
                    <div className="lote-manzana">
                      Mz: {lote.manzana} - Lote: {lote.numeroLote}
                    </div>
                  </td>
                  <td>
                    <span className="lote-superficie">
                      {parseFloat(lote.superficieM2).toFixed(2)} m²
                    </span>
                  </td>
                  <td>
                    <span className="lote-precio">
                      {formatearPrecio(lote.precioLista)}
                    </span>
                  </td>
                  <td>
                    <span
                      className="badge-estado"
                      style={{ backgroundColor: obtenerColorEstado(lote.estado) }}
                    >
                      {obtenerTextoEstado(lote.estado)}
                    </span>
                  </td>
                  <td>
                    {lote.modeloCasa ? (
                      <span className="lote-modelo">{lote.modeloCasa.nombre}</span>
                    ) : (
                      <span className="lote-sin-modelo">Sin modelo</span>
                    )}
                  </td>
                  <td>
                    <span className="lote-fecha">
                      {formatearFecha(lote.actualizadoEn)}
                    </span>
                  </td>
                  <td>
                    <div className="acciones-grupo">
                      <button
                        onClick={() => navigate(`/lotes/${lote.uid}`)}
                        className="btn-accion btn-ver"
                        title="Ver detalles"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => navigate(`/lotes/${lote.uid}/editar`)}
                        className="btn-accion btn-editar"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => confirmarEliminacion(lote)}
                        className="btn-accion btn-eliminar"
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

      {/* Modal de confirmación de eliminación */}
      {loteAEliminar && (
        <div className="modal-overlay" onClick={cancelarEliminacion}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <AlertCircle size={24} />
                Confirmar Eliminación
              </h3>
              <button onClick={cancelarEliminacion} className="btn-cerrar-modal">
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el lote?</p>
              <div className="lote-info-eliminar">
                <strong>{loteAEliminar.codigo}</strong>
                <span>{loteAEliminar.direccion}</span>
              </div>
              <p className="advertencia">
                Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="modal-footer">
              <button
                onClick={cancelarEliminacion}
                className="btn btn-cancelar"
                disabled={eliminando}
              >
                Cancelar
              </button>
              <button
                onClick={eliminarLote}
                className="btn btn-eliminar-confirmar"
                disabled={eliminando}
              >
                {eliminando ? (
                  <>
                    <div className="spinner-small"></div>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} />
                    Eliminar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionLotes;

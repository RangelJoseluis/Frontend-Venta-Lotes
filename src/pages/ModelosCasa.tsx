import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Plus, Edit2, Trash2, X, Save, Building2, Bath, Bed, Layers, DollarSign, Square, ArrowLeft } from 'lucide-react';
import modelosCasaService from '../services/modelos-casa.service';
import type { ModeloCasa, CrearModeloCasaDto, ActualizarModeloCasaDto } from '../types';
import './ModelosCasa.css';

const ModelosCasa = () => {
  const navigate = useNavigate();
  const [modelos, setModelos] = useState<ModeloCasa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modeloEditando, setModeloEditando] = useState<ModeloCasa | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [imagenesConError, setImagenesConError] = useState<Set<string>>(new Set());

  const [formulario, setFormulario] = useState<CrearModeloCasaDto>({
    nombre: '',
    descripcion: '',
    amueblado: false,
    metrosCubiertos: 0,
    ambientes: 1,
    banos: 1,
    pisos: 1,
    estado: 'activo',
    precioBase: 0,
    imagenUrl: '',
    observaciones: ''
  });

  // Estado para el precio formateado
  const [precioFormateado, setPrecioFormateado] = useState('');

  useEffect(() => {
    cargarModelos();
  }, []);

  const cargarModelos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await modelosCasaService.obtenerTodos();
      setModelos(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar modelos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormulario(prev => {
      if (type === 'checkbox') {
        return { ...prev, [name]: (e.target as HTMLInputElement).checked };
      }
      
      if (type === 'number') {
        // Campos que deben ser enteros (sin decimales)
        const camposEnteros = ['ambientes', 'banos', 'pisos'];
        
        if (camposEnteros.includes(name)) {
          // Convertir a entero, o 0 si está vacío
          return { ...prev, [name]: value === '' ? 0 : parseInt(value, 10) || 0 };
        } else {
          // Para metrosCubiertos (permite decimales)
          return { ...prev, [name]: value === '' ? 0 : parseFloat(value) || 0 };
        }
      }
      
      // Para campos de texto
      return { ...prev, [name]: value };
    });
  };

  /**
   * Manejar cambio en el input de precio con formato
   */
  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    
    // Remover todo excepto números
    const soloNumeros = valor.replace(/\D/g, '');
    
    // Formatear con puntos como separadores de miles
    const formateado = soloNumeros ? new Intl.NumberFormat('es-CO').format(parseInt(soloNumeros, 10)) : '';
    setPrecioFormateado(formateado);
    
    // Actualizar el valor numérico real en el formulario
    const valorNumerico = soloNumeros ? parseInt(soloNumeros, 10) : 0;
    setFormulario(prev => ({ ...prev, precioBase: valorNumerico }));
  };

  const handleCrear = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await modelosCasaService.crear(formulario);
      resetFormulario();
      await cargarModelos();
    } catch (err: any) {
      setError(err.response?.data?.message || 'No se pudo crear el modelo');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleActualizar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!modeloEditando) return;

    try {
      setLoading(true);
      const datos: ActualizarModeloCasaDto = { ...formulario };
      await modelosCasaService.actualizar(modeloEditando.uid, datos);
      resetFormulario();
      await cargarModelos();
    } catch (err: any) {
      setError(err.response?.data?.message || 'No se pudo actualizar el modelo');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (uid: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar el modelo "${nombre}"?`)) return;

    try {
      setLoading(true);
      await modelosCasaService.eliminar(uid);
      await cargarModelos();
    } catch (err: any) {
      setError(err.response?.data?.message || 'No se pudo eliminar el modelo');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const prepararEdicion = (modelo: ModeloCasa) => {
    setModeloEditando(modelo);
    setModoEdicion(true);
    setMostrarFormulario(true);
    setFormulario({
      nombre: modelo.nombre,
      descripcion: modelo.descripcion,
      amueblado: modelo.amueblado,
      metrosCubiertos: modelo.metrosCubiertos,
      ambientes: modelo.ambientes,
      banos: modelo.banos,
      pisos: modelo.pisos,
      estado: modelo.estado,
      precioBase: modelo.precioBase,
      imagenUrl: modelo.imagenUrl || '',
      observaciones: modelo.observaciones || ''
    });
    // Formatear precio para edición
    setPrecioFormateado(modelo.precioBase ? new Intl.NumberFormat('es-CO').format(modelo.precioBase) : '');
  };

  const resetFormulario = () => {
    setFormulario({
      nombre: '',
      descripcion: '',
      amueblado: false,
      metrosCubiertos: 0,
      ambientes: 1,
      banos: 1,
      pisos: 1,
      estado: 'activo',
      precioBase: 0,
      imagenUrl: '',
      observaciones: ''
    });
    setPrecioFormateado(''); // Limpiar precio formateado
    setModoEdicion(false);
    setModeloEditando(null);
    setMostrarFormulario(false);
    setError(null);
  };

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const handleImageError = (uid: string, url: string) => {
    console.error(`❌ Error al cargar imagen para modelo ${uid}:`, url);
    setImagenesConError(prev => new Set(prev).add(uid));
  };

  return (
    <div className="modelos-container">
      <div className="modelos-wrapper">

        {/* Botón Volver */}
        <button 
          onClick={() => navigate('/dashboard')} 
          className="btn-back"
        >
          <ArrowLeft />
          <span>Volver al Dashboard</span>
        </button>

        {/* Header */}
        <div className="modelos-header">
          <div className="header-content">
            <div className="header-icon">
              <Home />
            </div>
            <div className="header-text">
              <h1>Modelos de Casa</h1>
              <p>Gestiona el catálogo de modelos disponibles</p>
            </div>
          </div>

          {!mostrarFormulario && (
            <button onClick={() => setMostrarFormulario(true)} className="btn-primary">
              <Plus />
              <span>Nuevo Modelo</span>
            </button>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert-error">
            <div className="alert-error-icon">
              <X />
            </div>
            <div className="alert-error-text">{error}</div>
            <button onClick={() => setError(null)} className="alert-close">
              <X />
            </button>
          </div>
        )}

        {/* Formulario */}
        {mostrarFormulario && (
          <div className="form-card">
            <div className="form-header">
              <div className="form-header-content">
                {modoEdicion ? <Edit2 /> : <Plus />}
                <h2>{modoEdicion ? 'Editar Modelo' : 'Crear Nuevo Modelo'}</h2>
              </div>
              <button onClick={resetFormulario} className="form-close-btn">
                <X />
              </button>
            </div>

            <form onSubmit={modoEdicion ? handleActualizar : handleCrear} className="form-body">
              <div className="form-grid">

                {/* Nombre */}
                <div className="form-group form-group-full">
                  <label className="form-label">Nombre del Modelo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Ej: Casa Campestre Premium"
                  />
                </div>

                {/* Precio Base - Input formateado */}
                <div className="form-group">
                  <label className="form-label">
                    <div className="label-with-icon">
                      <DollarSign />
                      <span>Precio Base (COP)</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={precioFormateado}
                    onChange={handlePrecioChange}
                    className="form-input"
                    placeholder="Ej: 150.000.000"
                  />
                  {precioFormateado && (
                    <small style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block', fontWeight: 600 }}>
                      ✅ Valor: ${precioFormateado} COP
                    </small>
                  )}
                  {!precioFormateado && (
                    <small style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>
                      Ingresa el precio con separadores: 150.000.000
                    </small>
                  )}
                </div>

                {/* Metros Cubiertos */}
                <div className="form-group">
                  <label className="form-label">
                    <div className="label-with-icon">
                      <Square />
                      <span>Metros Cubiertos (m²)</span>
                    </div>
                  </label>
                  <input
                    type="number"
                    name="metrosCubiertos"
                    value={formulario.metrosCubiertos || ''}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="form-input"
                    placeholder="120.50"
                  />
                </div>

                {/* Ambientes */}
                <div className="form-group">
                  <label className="form-label">
                    <div className="label-with-icon">
                      <Bed />
                      <span>Ambientes</span>
                    </div>
                  </label>
                  <input
                    type="number"
                    name="ambientes"
                    value={formulario.ambientes || ''}
                    onChange={handleChange}
                    min="1"
                    max="20"
                    step="1"
                    className="form-input"
                    placeholder="3"
                  />
                </div>

                {/* Baños */}
                <div className="form-group">
                  <label className="form-label">
                    <div className="label-with-icon">
                      <Bath />
                      <span>Baños</span>
                    </div>
                  </label>
                  <input
                    type="number"
                    name="banos"
                    value={formulario.banos || ''}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    step="1"
                    className="form-input"
                    placeholder="2"
                  />
                </div>

                {/* Pisos */}
                <div className="form-group">
                  <label className="form-label">
                    <div className="label-with-icon">
                      <Layers />
                      <span>Pisos</span>
                    </div>
                  </label>
                  <input
                    type="number"
                    name="pisos"
                    value={formulario.pisos || ''}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    step="1"
                    className="form-input"
                    placeholder="2"
                  />
                </div>

                {/* Estado */}
                <div className="form-group">
                  <label className="form-label">Estado</label>
                  <select
                    name="estado"
                    value={formulario.estado}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="activo">Activo</option>
                    <option value="inactivo">Inactivo</option>
                  </select>
                </div>

                {/* Amueblado */}
                <div className="form-group">
                  <div className="form-checkbox-group">
                    <input
                      type="checkbox"
                      name="amueblado"
                      checked={formulario.amueblado}
                      onChange={handleChange}
                      className="form-checkbox"
                    />
                    <label className="form-label" style={{ margin: 0 }}>Amueblado</label>
                  </div>
                </div>

                {/* Descripción */}
                <div className="form-group form-group-full">
                  <label className="form-label">Descripción *</label>
                  <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="form-textarea"
                    placeholder="Describe las características principales del modelo..."
                  />
                </div>

                {/* Imagen URL */}
                <div className="form-group form-group-full">
                  <label className="form-label">URL de Imagen</label>
                  <input
                    type="text"
                    name="imagenUrl"
                    value={formulario.imagenUrl}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                {/* Observaciones */}
                <div className="form-group form-group-full">
                  <label className="form-label">Observaciones</label>
                  <textarea
                    name="observaciones"
                    value={formulario.observaciones}
                    onChange={handleChange}
                    rows={2}
                    className="form-textarea"
                    placeholder="Notas adicionales (opcional)..."
                  />
                </div>
              </div>

              {/* Botones */}
              <div className="form-actions">
                <button type="button" onClick={resetFormulario} className="btn-secondary">
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-submit ${modoEdicion ? 'btn-update' : 'btn-create'}`}
                >
                  <Save />
                  <span>{loading ? 'Procesando...' : modoEdicion ? 'Actualizar' : 'Crear'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loading State */}
        {loading && !mostrarFormulario && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p className="loading-text">Cargando modelos...</p>
          </div>
        )}

        {/* Lista de Modelos - Cards Grid */}
        {!loading && modelos.length > 0 && (
          <div className="modelos-grid">
            {modelos.map((modelo) => (
              <div key={modelo.uid} className="modelo-card">
                {/* Imagen */}
                <div className="card-image">
                  {modelo.imagenUrl && !imagenesConError.has(modelo.uid) ? (
                    <img 
                      src={modelo.imagenUrl} 
                      alt={modelo.nombre}
                      onError={() => handleImageError(modelo.uid, modelo.imagenUrl || '')}
                      onLoad={() => console.log(`✅ Imagen cargada correctamente: ${modelo.nombre}`)}
                    />
                  ) : (
                    <div className="card-image-placeholder">
                      <Building2 />
                      {imagenesConError.has(modelo.uid) && (
                        <p className="image-error-text">Error al cargar imagen</p>
                      )}
                    </div>
                  )}
                  <div className={`card-badge ${modelo.estado === 'activo' ? 'badge-activo' : 'badge-inactivo'}`}>
                    {modelo.estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </div>
                </div>

                {/* Contenido */}
                <div className="card-content">
                  <h3 className="card-title">{modelo.nombre}</h3>
                  <p className="card-description">{modelo.descripcion}</p>

                  {/* Precio */}
                  <div className="card-price-section">
                    <div className="card-price">
                      <DollarSign />
                      <span className="card-price-value">{formatearPrecio(modelo.precioBase)}</span>
                    </div>
                  </div>

                  {/* Características */}
                  <div className="card-features">
                    <div className="feature-item">
                      <Square />
                      <span className="feature-text">{modelo.metrosCubiertos} m²</span>
                    </div>
                    <div className="feature-item">
                      <Bed />
                      <span className="feature-text">{modelo.ambientes} Amb.</span>
                    </div>
                    <div className="feature-item">
                      <Bath />
                      <span className="feature-text">{modelo.banos} Baños</span>
                    </div>
                    <div className="feature-item">
                      <Layers />
                      <span className="feature-text">{modelo.pisos} Pisos</span>
                    </div>
                  </div>

                  {/* Amueblado Badge */}
                  {modelo.amueblado && (
                    <div className="card-tags">
                      <span className="tag-amueblado">Amueblado</span>
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="card-actions">
                    <button onClick={() => prepararEdicion(modelo)} className="btn-edit">
                      <Edit2 />
                      <span>Editar</span>
                    </button>
                    <button onClick={() => handleEliminar(modelo.uid, modelo.nombre)} className="btn-delete">
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && modelos.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <Home />
            </div>
            <h3 className="empty-title">No hay modelos registrados</h3>
            <p className="empty-text">Comienza creando tu primer modelo de casa</p>
            <button onClick={() => setMostrarFormulario(true)} className="btn-primary">
              <Plus />
              <span>Crear Primer Modelo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelosCasa;

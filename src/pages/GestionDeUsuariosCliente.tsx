import { useState, useEffect } from 'react';
import { Users, UserPlus, Search, Edit2, Trash2, X, Save, AlertCircle, CheckCircle, Loader, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import usuariosService from '../services/usuarios.service';
import type { Usuario, CrearUsuarioDto, ActualizarUsuarioDto } from '../services/usuarios.service';
import './GestionDeUsuariosCliente.css';

// ============================================================================
// INTERFACES
// ============================================================================

interface FormData {
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  telefono: string;
  direccion: string;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

function GestionDeUsuariosCliente() {
  // ============================================================================
  // HOOKS
  // ============================================================================
  const navigate = useNavigate();

  // ============================================================================
  // ESTADO
  // ============================================================================
  const [activeView, setActiveView] = useState<'list' | 'create' | 'edit'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    nombres: '',
    apellidos: '',
    cedula: '',
    telefono: '',
    direccion: ''
  });

  // ============================================================================
  // EFECTOS
  // ============================================================================
  
  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // ============================================================================
  // FUNCIONES DE CARGA
  // ============================================================================

  /**
   * Cargar todos los usuarios desde el backend
   */
  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar si hay token
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('⚠️ No estás autenticado. Por favor, inicia sesión primero.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }
      
      const data = await usuariosService.obtenerTodos();
      setUsuarios(data);
      console.log('✅ Usuarios cargados:', data.length);
    } catch (err: any) {
      console.error('❌ Error al cargar usuarios:', err);
      
      // Manejo específico de errores de autenticación
      if (err.response?.status === 401) {
        setError('🔒 Tu sesión ha expirado. Redirigiendo al login...');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(err.response?.data?.message || 'Error al cargar usuarios');
      }
    } finally {
      setLoading(false);
    }
  };

  // ============================================================================
  // FUNCIONES DE FILTRADO
  // ============================================================================

  const filteredUsuarios = usuarios.filter(user =>
    user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cedula.includes(searchTerm)
  );

  const totalClientes = usuarios.filter(u => u.roles.includes('cliente') && !u.roles.includes('admin')).length;
  const totalAdmins = usuarios.filter(u => u.roles.includes('admin')).length;

  // ============================================================================
  // FUNCIONES DE CRUD
  // ============================================================================

  const handleCreate = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const nuevoUsuario: CrearUsuarioDto = {
        email: formData.email,
        password: formData.password,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        cedula: formData.cedula,
        telefono: formData.telefono,
      };

      await usuariosService.crear(nuevoUsuario);
      
      setSuccess('✅ Usuario creado exitosamente');
      setActiveView('list');
      resetForm();
      await cargarUsuarios();
    } catch (err: any) {
      console.error('❌ Error al crear usuario:', err);
      setError(err.response?.data?.message || 'Error al crear usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: Usuario) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      password: '',
      nombres: user.nombres,
      apellidos: user.apellidos,
      cedula: user.cedula,
      telefono: user.telefono,
      direccion: ''
    });
    setActiveView('edit');
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);
      setError(null);

      const datosActualizar: ActualizarUsuarioDto = {
        email: formData.email,
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        cedula: formData.cedula,
        telefono: formData.telefono,
      };

      await usuariosService.actualizar(selectedUser.uid, datosActualizar);
      
      setSuccess('✅ Usuario actualizado exitosamente');
      setActiveView('list');
      setSelectedUser(null);
      resetForm();
      await cargarUsuarios();
    } catch (err: any) {
      console.error('❌ Error al actualizar usuario:', err);
      setError(err.response?.data?.message || 'Error al actualizar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (uid: string) => {
    const usuario = usuarios.find(u => u.uid === uid);
    if (!usuario) return;

    const confirmacion = window.confirm(
      `¿Está seguro de eliminar al usuario "${usuario.nombres} ${usuario.apellidos}"?\n\n` +
      `Esta acción no se puede deshacer.`
    );

    if (!confirmacion) return;

    try {
      setLoading(true);
      setError(null);

      await usuariosService.eliminar(uid);
      
      setSuccess('✅ Usuario eliminado exitosamente');
      await cargarUsuarios();
    } catch (err: any) {
      console.error('❌ Error al eliminar usuario:', err);
      setError(err.response?.data?.message || 'Error al eliminar usuario');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      nombres: '',
      apellidos: '',
      cedula: '',
      telefono: '',
      direccion: ''
    });
  };

  const handleCancel = () => {
    setActiveView('list');
    setSelectedUser(null);
    resetForm();
    setError(null);
  };

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <div className="gestion-usuarios-container">
      {/* Mensajes de éxito/error */}
      {success && (
        <div className="alert alert-success">
          <CheckCircle size={20} />
          <span>{success}</span>
          <button onClick={() => setSuccess(null)} className="alert-close">
            <X size={16} />
          </button>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={() => setError(null)} className="alert-close">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="content-header">
        <div>
          <button 
            className="btn-back" 
            onClick={() => navigate('/dashboard')}
            title="Volver al Dashboard"
          >
            <ArrowLeft size={20} />
            Volver al Dashboard
          </button>
          <h2 className="page-title">
            <Users size={28} />
            Gestión de Usuarios/Clientes
          </h2>
          <p className="page-subtitle">Administra los usuarios y clientes del sistema</p>
        </div>
        {activeView === 'list' && (
          <button className="btn-primary" onClick={() => setActiveView('create')} disabled={loading}>
            <UserPlus size={20} />
            Nuevo Usuario
          </button>
        )}
      </div>

      {/* Vista de Lista */}
      {activeView === 'list' && (
        <div className="content-body">
          {/* Estadísticas */}
          <div className="stats-grid">
            <div className="stat-card stat-primary">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Usuarios</p>
                <p className="stat-value">{usuarios.length}</p>
              </div>
            </div>

            <div className="stat-card stat-success">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Clientes</p>
                <p className="stat-value">{totalClientes}</p>
              </div>
            </div>

            <div className="stat-card stat-warning">
              <div className="stat-icon">
                <Users size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">Administradores</p>
                <p className="stat-value">{totalAdmins}</p>
              </div>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="search-section">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre, email o cédula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tabla */}
          {loading ? (
            <div className="loading-container">
              <Loader className="spinner" size={48} />
              <p>Cargando usuarios...</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nombre Completo</th>
                    <th>Email</th>
                    <th>Cédula</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsuarios.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="no-data">
                        {searchTerm ? 'No se encontraron usuarios' : 'No hay usuarios registrados'}
                      </td>
                    </tr>
                  ) : (
                    filteredUsuarios.map((user) => (
                      <tr key={user.uid}>
                        <td>
                          <div className="user-cell">
                            <div className="user-avatar-small">
                              {user.nombres.charAt(0)}{user.apellidos.charAt(0)}
                            </div>
                            <span>{user.nombres} {user.apellidos}</span>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.cedula}</td>
                        <td>{user.telefono}</td>
                        <td>
                          <span className={`badge ${user.roles.includes('admin') ? 'badge-warning' : 'badge-primary'}`}>
                            {user.roles[0]}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${user.estado === 'activo' ? 'badge-success' : 'badge-danger'}`}>
                            {user.estado}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="btn-icon btn-icon-edit" 
                              onClick={() => handleEdit(user)}
                              title="Editar usuario"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              className="btn-icon btn-icon-delete" 
                              onClick={() => handleDelete(user.uid)}
                              title="Eliminar usuario"
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
        </div>
      )}

      {/* Vista de Crear/Editar */}
      {(activeView === 'create' || activeView === 'edit') && (
        <div className="content-body">
          <div className="form-container">
            <div className="form-header">
              <h3 className="form-title">
                {activeView === 'create' ? '➕ Crear Nuevo Usuario' : '✏️ Editar Usuario'}
              </h3>
              <button className="btn-icon" onClick={handleCancel}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => { 
              e.preventDefault(); 
              activeView === 'create' ? handleCreate() : handleUpdate(); 
            }}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombres *</label>
                  <input
                    type="text"
                    value={formData.nombres}
                    onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                    placeholder="Ingrese los nombres"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Apellidos *</label>
                  <input
                    type="text"
                    value={formData.apellidos}
                    onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                    placeholder="Ingrese los apellidos"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="correo@ejemplo.com"
                    required
                    disabled={loading}
                  />
                </div>

                {activeView === 'create' && (
                  <div className="form-group">
                    <label>Contraseña *</label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Mínimo 8 caracteres"
                      required
                      minLength={8}
                      disabled={loading}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Cédula *</label>
                  <input
                    type="text"
                    value={formData.cedula}
                    onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                    placeholder="1234567890"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono *</label>
                  <input
                    type="text"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="+57 300 123 4567"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-group form-group-full">
                  <label>Dirección (Opcional)</label>
                  <input
                    type="text"
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                    placeholder="Calle 123 #45-67"
                    disabled={loading}
                  />
                </div>
              </div>

              {activeView === 'create' && (
                <div className="form-info">
                  <AlertCircle size={16} />
                  <span>Al crear el usuario, automáticamente se creará como cliente en el sistema.</span>
                </div>
              )}

              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  <X size={20} />
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="spinner" size={20} />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      {activeView === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionDeUsuariosCliente;

import { useState } from 'react';
import { Users, UserPlus, Search, Edit2, Trash2, X, Save } from 'lucide-react';
import './App.css';

interface Usuario {
  uid: string;
  email: string;
  cedula: string;
  telefono: string;
  roles: string[];
  nombres: string;
  apellidos: string;
  estado: string;
  creadoEn: string;
  ultimoAcceso: string | null;
}

interface FormData {
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  telefono: string;
  direccion: string;
}

function App() {
  const [activeView, setActiveView] = useState<'list' | 'create' | 'edit'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    nombres: '',
    apellidos: '',
    cedula: '',
    telefono: '',
    direccion: ''
  });

  const mockUsuarios: Usuario[] = [
    {
      uid: "2e595317-cd85-44a9-93d8-fbbf6a2f0224",
      email: "prueba@gmail.com",
      cedula: "1234567891",
      telefono: "+57 300 234 2342",
      roles: ["cliente"],
      nombres: "prueba",
      apellidos: "prueba2",
      estado: "activo",
      creadoEn: "2025-10-17T23:12:12.868Z",
      ultimoAcceso: null
    },
    {
      uid: "53197d53-4f4c-47b2-99c5-78e2dbbf373f",
      email: "rivera@ejemplo.com",
      cedula: "3302345",
      telefono: "+57 300 123 4589",
      roles: ["cliente"],
      nombres: "Rivera",
      apellidos: "Delgado",
      estado: "activo",
      creadoEn: "2025-10-09T17:34:34.832Z",
      ultimoAcceso: null
    },
    {
      uid: "166730bf-c10b-429a-9288-adea8a6725fa",
      email: "agustin@ejemplo.com",
      cedula: "12345678325",
      telefono: "+57 300 123 4587",
      roles: ["cliente"],
      nombres: "Agustinn",
      apellidos: "hernandezz",
      estado: "activo",
      creadoEn: "2025-10-08T05:07:37.921Z",
      ultimoAcceso: null
    },
    {
      uid: "dfe012c0-16e2-44ec-973d-277f3d59fa56",
      email: "admin@ventadelotes.com",
      cedula: "ADMIN-00000000",
      telefono: "+57 300 111 4543",
      roles: ["admin"],
      nombres: "Jose Luis ADMIN",
      apellidos: "Sistema",
      estado: "activo",
      creadoEn: "2025-09-30T04:35:54.827Z",
      ultimoAcceso: "2025-10-19T20:35:45.782Z"
    }
  ];

  const filteredUsuarios = mockUsuarios.filter(user =>
    user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cedula.includes(searchTerm)
  );

  const handleCreate = () => {
    console.log('Crear usuario:', formData);
    setActiveView('list');
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

  const handleUpdate = () => {
    console.log('Actualizar usuario:', selectedUser?.uid, formData);
    setActiveView('list');
    setSelectedUser(null);
  };

  const handleDelete = (uid: string) => {
    if (window.confirm('¿Está seguro de eliminar este usuario?')) {
      console.log('Eliminar usuario:', uid);
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">VL</div>
          <h1 className="sidebar-title">Panel de control</h1>
          <p className="sidebar-subtitle">Gestión de Venta de Lotes</p>
        </div>

        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <div className="nav-icon-dashboard"></div>
            <span>Dashboard</span>
          </a>
          <a href="#" className="nav-item active">
            <Users size={20} />
            <span>Usuarios</span>
          </a>
          <a href="#" className="nav-item">
            <div className="nav-icon-lots"></div>
            <span>Lotes</span>
          </a>
          <a href="#" className="nav-item">
            <div className="nav-icon-sales"></div>
            <span>Ventas</span>
          </a>
          <a href="#" className="nav-item">
            <div className="nav-icon-payments"></div>
            <span>Pagos</span>
          </a>
        </nav>

        <div className="user-badge">
          <div className="user-avatar">U</div>
          <span>Usuario</span>
        </div>
      </aside>

      <main className="main-content">
        <div className="content-header">
          <div>
            <h2 className="page-title">Gestión de Usuarios/Clientes</h2>
            <p className="page-subtitle">Administra los usuarios y clientes del sistema</p>
          </div>
          {activeView === 'list' && (
            <button className="btn-primary" onClick={() => setActiveView('create')}>
              <UserPlus size={20} />
              Nuevo Usuario
            </button>
          )}
        </div>

        {activeView === 'list' && (
          <div className="content-body">
            <div className="stats-grid">
              <div className="stat-card stat-primary">
                <div className="stat-icon">
                  <Users size={24} />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Total Usuarios</p>
                  <p className="stat-value">{mockUsuarios.length}</p>
                </div>
              </div>

              <div className="stat-card stat-success">
                <div className="stat-icon">
                  <Users size={24} />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Clientes</p>
                  <p className="stat-value">{mockUsuarios.filter(u => u.roles.includes('cliente')).length}</p>
                </div>
              </div>

              <div className="stat-card stat-warning">
                <div className="stat-icon">
                  <Users size={24} />
                </div>
                <div className="stat-content">
                  <p className="stat-label">Administradores</p>
                  <p className="stat-value">{mockUsuarios.filter(u => u.roles.includes('admin')).length}</p>
                </div>
              </div>
            </div>

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
                  {filteredUsuarios.map((user) => (
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
                        <span className="badge badge-success">{user.estado}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-icon btn-icon-edit" onClick={() => handleEdit(user)}>
                            <Edit2 size={16} />
                          </button>
                          <button className="btn-icon btn-icon-delete" onClick={() => handleDelete(user.uid)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {(activeView === 'create' || activeView === 'edit') && (
          <div className="content-body">
            <div className="form-container">
              <div className="form-header">
                <h3 className="form-title">
                  {activeView === 'create' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
                </h3>
                <button className="btn-icon" onClick={() => setActiveView('list')}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); activeView === 'create' ? handleCreate() : handleUpdate(); }}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nombres *</label>
                    <input
                      type="text"
                      value={formData.nombres}
                      onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                      placeholder="Ingrese los nombres"
                      required
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
                    />
                  </div>

                  {activeView === 'create' && (
                    <div className="form-group">
                      <label>Contraseña *</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Ingrese una contraseña segura"
                        required
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
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <label>Dirección</label>
                    <input
                      type="text"
                      value={formData.direccion}
                      onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                      placeholder="Calle 123 #45-67"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setActiveView('list')}>
                    <X size={20} />
                    Cancelar
                  </button>
                  <button type="submit" className="btn-primary">
                    <Save size={20} />
                    {activeView === 'create' ? 'Crear Usuario' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

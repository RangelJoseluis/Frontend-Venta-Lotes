import React from 'react';
import { Edit, Trash2, RotateCcw, Eye, Loader, User, Shield } from 'lucide-react';
import type { Usuario } from '../../types';
import './TablaUsuarios.css';

interface TablaUsuariosProps {
  usuarios: Usuario[];
  loading: boolean;
  onEditar: (usuario: Usuario) => void;
  onEliminar: (usuario: Usuario) => void; // Ahora es desactivar
  onReactivar?: (usuario: Usuario) => void; // Nueva prop para reactivar
  onVer: (usuario: Usuario) => void;
}

const TablaUsuarios: React.FC<TablaUsuariosProps> = ({
  usuarios,
  loading,
  onEditar,
  onEliminar,
  onReactivar,
  onVer
}) => {
  if (loading) {
    return (
      <div className="usuarios-tabla-loading">
        <div className="usuarios-loading-content">
          <Loader className="usuarios-loading-spinner" size={40} />
          <h3>Cargando usuarios...</h3>
          <p>Por favor espera un momento</p>
        </div>
      </div>
    );
  }

  if (usuarios.length === 0) {
    return (
      <div className="usuarios-tabla-empty">
        <div className="usuarios-empty-content">
          <User size={64} className="usuarios-empty-icon" />
          <h3>No hay usuarios registrados</h3>
          <p>Aún no se han encontrado usuarios en el sistema</p>
        </div>
      </div>
    );
  }

  return (
    <div className="usuarios-tabla-wrapper">
      <div className="usuarios-tabla-container">
        <table className="usuarios-tabla">
          <thead className="usuarios-tabla-header">
            <tr>
              <th className="usuarios-th usuarios-th-usuario">Usuario</th>
              <th className="usuarios-th usuarios-th-contacto">Contacto</th>
              <th className="usuarios-th usuarios-th-rol">Rol</th>
              <th className="usuarios-th usuarios-th-estado">Estado</th>
              <th className="usuarios-th usuarios-th-acciones">Acciones</th>
            </tr>
          </thead>
          <tbody className="usuarios-tabla-body">
            {usuarios.map((usuario) => (
              <tr key={usuario.uid} className="usuarios-tabla-row">
                <td className="usuarios-td usuarios-td-usuario">
                  <div className="usuarios-info-cell">
                    <div className="usuarios-avatar">
                      {usuario.roles.includes('admin') ? (
                        <Shield size={20} className="usuarios-avatar-icon" />
                      ) : (
                        <User size={20} className="usuarios-avatar-icon" />
                      )}
                    </div>
                    <div className="usuarios-info-text">
                      <span className="usuarios-nombre">{usuario.nombres} {usuario.apellidos}</span>
                      <span className="usuarios-cedula">CC: {usuario.cedula}</span>
                    </div>
                  </div>
                </td>
                <td className="usuarios-td usuarios-td-contacto">
                  <div className="usuarios-contacto-cell">
                    <span className="usuarios-email">{usuario.email}</span>
                    <span className="usuarios-telefono">{usuario.telefono}</span>
                  </div>
                </td>
                <td className="usuarios-td usuarios-td-rol">
                  <span className={`usuarios-rol-badge usuarios-rol-${usuario.roles.includes('admin') ? 'admin' : 'cliente'}`}>
                    {usuario.roles.includes('admin') ? 'Administrador' : 'Cliente'}
                  </span>
                </td>
                <td className="usuarios-td usuarios-td-estado">
                  <span className={`usuarios-estado-badge usuarios-estado-${usuario.estado === 'activo' ? 'activo' : 'inactivo'}`}>
                    <span className="usuarios-estado-dot"></span>
                    {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="usuarios-td usuarios-td-acciones">
                  <div className="usuarios-acciones-cell">
                    <button
                      className="usuarios-btn-accion usuarios-btn-ver"
                      onClick={() => onVer(usuario)}
                      title="Ver detalles del usuario"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="usuarios-btn-accion usuarios-btn-editar"
                      onClick={() => onEditar(usuario)}
                      title="Editar usuario"
                    >
                      <Edit size={16} />
                    </button>
                    {/* Botón dinámico según el estado del usuario */}
                    {usuario.estado === 'activo' ? (
                      <button
                        className="usuarios-btn-accion usuarios-btn-desactivar btn-accion btn-eliminar"
                        onClick={() => onEliminar(usuario)}
                        title="Eliminar / desactivar usuario"
                        style={{
                          width: 32,
                          height: 32,
                          minWidth: 32,
                          padding: 0,
                          lineHeight: 0,
                          border: 'none',
                          borderRadius: 6,
                          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                          color: '#ffffff',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : (
                      onReactivar && (
                        <button
                          className="usuarios-btn-accion usuarios-btn-reactivar"
                          onClick={() => onReactivar(usuario)}
                          title="Reactivar usuario"
                        >
                          <RotateCcw size={16} />
                        </button>
                      )
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaUsuarios;

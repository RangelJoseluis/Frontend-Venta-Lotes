import React from 'react';
import { Users, UserCheck, Shield, Loader } from 'lucide-react';
import type { EstadisticasUsuariosProps } from '../../types';
import './EstadisticasUsuarios.css';

const EstadisticasUsuarios: React.FC<EstadisticasUsuariosProps> = ({
  totalUsuarios,
  totalClientes,
  totalAdmins,
  loading
}) => {
  if (loading) {
    return (
      <div className="clientes-estadisticas-grid">
        <div className="clientes-stat-card clientes-stat-loading">
          <Loader className="spinner" size={24} />
          <p>Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="clientes-estadisticas-grid">
      {/* Total Usuarios */}
      <div className="clientes-stat-card clientes-stat-total">
        <div className="clientes-stat-icono">
          <Users size={20} />
        </div>
        <div className="clientes-stat-content">
          <span className="clientes-stat-valor">{totalUsuarios}</span>
          <span className="clientes-stat-label">Total Usuarios</span>
        </div>
      </div>

      {/* Clientes */}
      <div className="clientes-stat-card clientes-stat-clientes">
        <div className="clientes-stat-icono">
          <UserCheck size={20} />
        </div>
        <div className="clientes-stat-content">
          <span className="clientes-stat-valor">{totalClientes}</span>
          <span className="clientes-stat-label">Clientes</span>
        </div>
      </div>

      {/* Administradores */}
      <div className="clientes-stat-card clientes-stat-admins">
        <div className="clientes-stat-icono">
          <Shield size={20} />
        </div>
        <div className="clientes-stat-content">
          <span className="clientes-stat-valor">{totalAdmins}</span>
          <span className="clientes-stat-label">Administradores</span>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasUsuarios;

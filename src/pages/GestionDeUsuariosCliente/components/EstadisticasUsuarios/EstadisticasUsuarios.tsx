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
      <div className="estadisticas-grid">
        <div className="stat-card stat-loading">
          <Loader className="spinner" size={24} />
          <p>Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="estadisticas-grid">
      {/* Total Usuarios */}
      <div className="stat-card stat-total">
        <div className="stat-icono">
          <Users size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-valor">{totalUsuarios}</span>
          <span className="stat-label">Total Usuarios</span>
        </div>
      </div>

      {/* Clientes */}
      <div className="stat-card stat-clientes">
        <div className="stat-icono">
          <UserCheck size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-valor">{totalClientes}</span>
          <span className="stat-label">Clientes</span>
        </div>
      </div>

      {/* Administradores */}
      <div className="stat-card stat-admins">
        <div className="stat-icono">
          <Shield size={24} />
        </div>
        <div className="stat-info">
          <span className="stat-valor">{totalAdmins}</span>
          <span className="stat-label">Administradores</span>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasUsuarios;

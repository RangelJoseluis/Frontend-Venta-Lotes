import React from 'react';
import { Users, UserCheck, Shield } from 'lucide-react';
import type { EstadisticasUsuariosProps } from '../../types';

const EstadisticasUsuarios: React.FC<EstadisticasUsuariosProps> = ({
  totalUsuarios,
  totalClientes,
  totalAdmins,
  loading
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  const estadisticas = [
    {
      icon: <Users size={24} />,
      label: 'Total Usuarios',
      value: totalUsuarios,
      borderColor: 'border-blue-500',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-500'
    },
    {
      icon: <UserCheck size={24} />,
      label: 'Clientes',
      value: totalClientes,
      borderColor: 'border-emerald-500',
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-500'
    },
    {
      icon: <Shield size={24} />,
      label: 'Administradores',
      value: totalAdmins,
      borderColor: 'border-purple-500',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {estadisticas.map((stat, index) => (
        <div
          key={index}
          className={`bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border-l-4 ${stat.borderColor} flex items-center gap-4 transition-transform hover:-translate-y-0.5 hover:shadow-md`}
        >
          <div className={`flex items-center justify-center w-12 h-12 rounded-lg shrink-0 ${stat.iconBg} ${stat.iconColor}`}>
            {stat.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EstadisticasUsuarios;

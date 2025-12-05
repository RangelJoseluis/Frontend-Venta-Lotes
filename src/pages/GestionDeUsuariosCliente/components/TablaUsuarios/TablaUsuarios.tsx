import React from 'react';
import { Edit, Trash2, RotateCcw, Eye, Loader, User, Shield } from 'lucide-react';
import type { Usuario } from '../../types';

interface TablaUsuariosProps {
  usuarios: Usuario[];
  loading: boolean;
  onEditar: (usuario: Usuario) => void;
  onEliminar: (usuario: Usuario) => void;
  onReactivar?: (usuario: Usuario) => void;
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
      <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
        <Loader className="animate-spin mb-3 text-blue-500" size={40} />
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">Cargando usuarios...</h3>
        <p className="text-sm">Por favor espera un momento</p>
      </div>
    );
  }

  if (usuarios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <User size={64} className="mb-4 text-slate-300 dark:text-slate-600" />
        <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">No hay usuarios registrados</h3>
        <p className="text-sm">Aún no se han encontrado usuarios en el sistema</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left table-fixed">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider w-[30%]">Usuario</th>
              <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider w-[25%]">Contacto</th>
              <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider w-[15%]">Rol</th>
              <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider w-[15%]">Estado</th>
              <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 whitespace-nowrap text-xs uppercase tracking-wider w-[15%] text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {usuarios.map((usuario) => (
              <tr key={usuario.uid} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4 align-middle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 shrink-0">
                      {usuario.roles.includes('admin') ? (
                        <Shield size={20} className="text-purple-500" />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {usuario.nombres} {usuario.apellidos}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        CC: {usuario.cedula}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="flex flex-col">
                    <span className="text-slate-700 dark:text-slate-300">{usuario.email}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{usuario.telefono}</span>
                  </div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${usuario.roles.includes('admin')
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/30'
                      : 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30'
                    }`}>
                    {usuario.roles.includes('admin') ? 'Administrador' : 'Cliente'}
                  </span>
                </td>
                <td className="px-6 py-4 align-middle">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${usuario.estado === 'activo'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30'
                      : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${usuario.estado === 'activo' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}></span>
                    {usuario.estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 align-middle text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onVer(usuario)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                      title="Ver detalles"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => onEditar(usuario)}
                      className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-amber-500 hover:bg-amber-600 text-white shadow-sm"
                      title="Editar"
                    >
                      <Edit size={16} />
                    </button>
                    {usuario.estado === 'activo' ? (
                      <button
                        onClick={() => onEliminar(usuario)}
                        className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-red-500 hover:bg-red-600 text-white shadow-sm"
                        title="Desactivar"
                      >
                        <Trash2 size={16} />
                      </button>
                    ) : (
                      onReactivar && (
                        <button
                          onClick={() => onReactivar(usuario)}
                          className="flex items-center justify-center w-8 h-8 rounded-lg transition-colors bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
                          title="Reactivar"
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

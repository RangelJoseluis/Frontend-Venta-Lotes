import { useState, useMemo } from 'react';
import type { Usuario, UseFiltrosUsuariosReturn } from '../types';

/**
 * Hook personalizado para gestionar filtros de usuarios
 * Maneja la búsqueda y filtrado de usuarios por diferentes criterios
 */
export const useFiltrosUsuarios = (usuarios: Usuario[]): UseFiltrosUsuariosReturn => {
  // Estado del término de búsqueda
  const [searchTerm, setSearchTerm] = useState('');

  // Usuarios filtrados (memoizado para optimizar rendimiento)
  const usuariosFiltrados = useMemo(() => {
    return usuarios
      .filter(user => !user.roles.includes('admin')) // Excluir administradores
      .filter(user => {
        if (!searchTerm.trim()) return true;
        
        const termino = searchTerm.toLowerCase().trim();
        
        return (
          user.nombres.toLowerCase().includes(termino) ||
          user.apellidos.toLowerCase().includes(termino) ||
          user.email.toLowerCase().includes(termino) ||
          user.cedula.includes(searchTerm.trim()) ||
          `${user.nombres} ${user.apellidos}`.toLowerCase().includes(termino)
        );
      });
  }, [usuarios, searchTerm]);

  // Estadísticas calculadas (memoizadas)
  const totalClientes = useMemo(() => {
    return usuarios.filter(u => u.roles.includes('cliente') && !u.roles.includes('admin')).length;
  }, [usuarios]);

  const totalAdmins = useMemo(() => {
    return usuarios.filter(u => u.roles.includes('admin')).length;
  }, [usuarios]);

  return {
    searchTerm,
    setSearchTerm,
    usuariosFiltrados,
    totalClientes,
    totalAdmins
  };
};

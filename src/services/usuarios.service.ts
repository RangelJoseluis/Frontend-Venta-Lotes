import axios from 'axios';

const API_URL = 'http://localhost:3000';

// ============================================================================
// INTERFACES
// ============================================================================

export interface Usuario {
  uid: string;
  email: string;
  cedula: string;
  telefono: string;
  roles: string[];
  nombres: string;
  apellidos: string;
  estado: 'activo' | 'inactivo';
  creadoEn: string;
  ultimoAcceso: string | null;
}

export interface CrearUsuarioDto {
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  telefono: string;
}

export interface ActualizarUsuarioDto {
  email?: string;
  nombres?: string;
  apellidos?: string;
  cedula?: string;
  telefono?: string;
  estado?: 'activo' | 'inactivo';
}

// ============================================================================
// SERVICIO DE USUARIOS
// ============================================================================

class UsuariosService {
  /**
   * Obtener todos los usuarios (admin y clientes)
   */
  async obtenerTodos(): Promise<Usuario[]> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Usuarios obtenidos:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener usuarios:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Obtener un usuario por UID
   */
  async obtenerPorUid(uid: string): Promise<Usuario> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${API_URL}/usuarios/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Usuario obtenido:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al obtener usuario:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Crear un nuevo usuario
   * IMPORTANTE: Automáticamente se crea como cliente también
   */
  async crear(datos: CrearUsuarioDto): Promise<Usuario> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(`${API_URL}/usuarios`, datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Usuario creado:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al crear usuario:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Actualizar un usuario existente
   */
  async actualizar(uid: string, datos: ActualizarUsuarioDto): Promise<Usuario> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.patch(`${API_URL}/usuarios/${uid}`, datos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Usuario actualizado:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error al actualizar usuario:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Eliminar un usuario
   */
  async eliminar(uid: string): Promise<void> {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${API_URL}/usuarios/${uid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('✅ Usuario eliminado');
    } catch (error: any) {
      console.error('❌ Error al eliminar usuario:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Filtrar usuarios solo clientes (excluir admins)
   */
  filtrarSoloClientes(usuarios: Usuario[]): Usuario[] {
    return usuarios.filter(u => u.roles.includes('cliente') && !u.roles.includes('admin'));
  }

  /**
   * Filtrar usuarios solo admins
   */
  filtrarSoloAdmins(usuarios: Usuario[]): Usuario[] {
    return usuarios.filter(u => u.roles.includes('admin'));
  }
}

export default new UsuariosService();

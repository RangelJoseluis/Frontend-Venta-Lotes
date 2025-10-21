/**
 * SERVICIO DE AUTENTICACIÓN
 * 
 * Maneja todas las operaciones relacionadas con autenticación:
 * - Login
 * - Logout
 * - Verificación de token
 * - Obtención de usuario actual
 */

import httpClient from './http.service';
import API_CONFIG from '../config/api.config';
import type { LoginCredentials, AuthResponse, Usuario } from '../types';

/**
 * SERVICIO DE AUTENTICACIÓN
 */
export const authService = {
  /**
   * Iniciar sesión
   * @param credentials - Email y contraseña
   * @returns Token de acceso y datos del usuario
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponse>(
      API_CONFIG.ENDPOINTS.LOGIN,
      credentials
    );
    
    console.log('🔐 Respuesta del login:', response.data);
    
    // El backend devuelve el usuario directamente en response.data, no en response.data.usuario
    // Extraer el usuario (todos los campos excepto accessToken)
    const { accessToken, ...usuarioData } = response.data as any;
    
    console.log('👤 Usuario extraído:', usuarioData);
    console.log('🎫 Token recibido:', accessToken ? 'Sí' : 'No');
    
    // Guardar token y usuario en localStorage
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      
      if (usuarioData && usuarioData.uid) {
        const userStr = JSON.stringify(usuarioData);
        localStorage.setItem('user', userStr);
        console.log('✅ Usuario guardado en localStorage:', userStr);
      } else {
        console.error('❌ No se pudo extraer el usuario de la respuesta');
      }
    }
    
    // Devolver en el formato esperado por el authStore
    return {
      accessToken,
      usuario: usuarioData as Usuario
    };
  },

  /**
   * Cerrar sesión
   * Limpia el token y datos del usuario
   */
  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  /**
   * Obtener el token actual
   */
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  },

  /**
   * Obtener el usuario actual desde localStorage
   */
  getCurrentUser(): Usuario | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as Usuario;
    } catch {
      return null;
    }
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /**
   * Verificar si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.roles?.includes(role) || false;
  },

  /**
   * Verificar si el usuario es administrador
   */
  isAdmin(): boolean {
    return this.hasRole('admin');
  },
};

export default authService;

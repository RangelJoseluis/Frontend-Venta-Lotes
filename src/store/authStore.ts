/**
 * STORE DE AUTENTICACIÓN CON ZUSTAND
 * 
 * Gestiona el estado global de autenticación:
 * - Usuario actual
 * - Token JWT
 * - Estado de carga
 * - Acciones (login, logout)
 */

import { create } from 'zustand';
import { authService } from '../services/auth.service';
import type { Usuario, LoginCredentials } from '../types';

/**
 * Estado de autenticación
 */
interface AuthState {
  // Estado
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Acciones
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  clearError: () => void;
}

/**
 * Store de autenticación
 */
export const useAuthStore = create<AuthState>((set) => ({
  // Estado inicial
  user: authService.getCurrentUser(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  /**
   * Iniciar sesión
   */
  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.login(credentials);
      
      set({
        user: response.usuario,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al iniciar sesión';
      
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: errorMessage,
      });
      
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  logout: () => {
    authService.logout();
    
    set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  },

  /**
   * Verificar autenticación al cargar la app
   */
  checkAuth: () => {
    const user = authService.getCurrentUser();
    const isAuthenticated = authService.isAuthenticated();
    
    set({
      user,
      isAuthenticated,
    });
  },

  /**
   * Limpiar error
   */
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;

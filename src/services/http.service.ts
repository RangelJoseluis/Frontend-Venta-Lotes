/**
 * SERVICIO HTTP CON AXIOS
 * 
 * Cliente HTTP configurado con:
 * - Base URL del backend
 * - Interceptores para JWT
 * - Manejo de errores centralizado
 * - Timeout configurado
 */

import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import API_CONFIG from '../config/api.config';

/**
 * Instancia de Axios configurada
 */
const httpClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * INTERCEPTOR DE REQUEST
 * Agrega el token JWT a todas las peticiones si existe
 */
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * INTERCEPTOR DE RESPONSE
 * Maneja errores de autenticación (401, 404 con mensaje de auth) y otros errores comunes
 */
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Si el token expiró o es inválido (401), redirigir al login
    // EXCEPTO si el error viene del endpoint de login (credenciales incorrectas)
    if (error.response?.status === 401) {
      const isLoginEndpoint = error.config?.url?.includes('/auth/login');

      if (!isLoginEndpoint) {
        console.warn('🔒 Token inválido o expirado (401). Redirigiendo al login...');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      // Si es el endpoint de login, dejar que el error se propague normalmente
    }

    // Si es 404 pero parece ser un problema de autenticación (backend protege rutas)
    if (error.response?.status === 404 && localStorage.getItem('accessToken')) {
      const errorMessage = (error.response?.data as any)?.message || '';
      const errorString = (error.response?.data as any)?.error || '';

      // Si el mensaje indica problema de autenticación o acceso denegado
      if (
        errorMessage.toLowerCase().includes('unauthorized') ||
        errorMessage.toLowerCase().includes('forbidden') ||
        errorString.toLowerCase().includes('unauthorized') ||
        errorString.toLowerCase().includes('forbidden') ||
        errorMessage.toLowerCase().includes('token') ||
        // O si es un endpoint protegido (estadisticas, admin, etc)
        error.config?.url?.includes('estadisticas') ||
        error.config?.url?.includes('admin')
      ) {
        console.warn('🔒 Posible problema de autenticación (404 en ruta protegida). Token inválido para este servidor.');
        console.warn('💡 Limpiando localStorage y redirigiendo al login...');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    // Si hay error de red
    if (!error.response) {
      console.error('Error de red: No se pudo conectar con el servidor');
    }

    return Promise.reject(error);
  }
);

/**
 * Tipo para errores de API
 */
export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

/**
 * Helper para extraer mensaje de error
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    return apiError?.message || error.message || 'Error desconocido';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Error desconocido';
};

export default httpClient;

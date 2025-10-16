/**
 * CONFIGURACIÓN DE LA API
 * 
 * Centraliza las URLs y configuraciones de la API del backend
 */

export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  ENDPOINTS: {
    // Autenticación
    LOGIN: '/auth/login',
    
    // Usuarios
    USUARIOS: '/usuarios',
    
    // Lotes
    LOTES: '/lotes',
    LOTES_VISIBLES: '/lotes/visibles',
    LOTES_ESTADISTICAS: '/lotes/estadisticas',
    
    // Ventas
    VENTAS: '/ventas',
    
    // Cuotas
    CUOTAS: '/cuotas',
    CUOTAS_VENCIDAS: '/cuotas/consultas/vencidas',
    CUOTAS_PROXIMAS_VENCER: '/cuotas/consultas/proximas-vencer',
    
    // Pagos
    PAGOS: '/pagos',
    PAGOS_ESTADISTICAS: '/pagos/consultas/estadisticas',
  },
  TIMEOUT: 10000, // 10 segundos
};

export default API_CONFIG;

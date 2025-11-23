// Tipos y constantes para Gestión de Servicios

import type { CategoriaServicio, TipoServicio, EstadoServicio, Servicio } from '../../types';

// ============================================================================
// TIPOS DE SERVICIO
// ============================================================================

export type { CategoriaServicio, TipoServicio, EstadoServicio, Servicio };

// ============================================================================
// FILTROS
// ============================================================================

export interface FiltrosServicios {
    busqueda: string;
    categoria?: CategoriaServicio;
    tipo?: TipoServicio;
    estado?: EstadoServicio;
}

// ============================================================================
// PROPS DE COMPONENTES
// ============================================================================

export interface HeaderGestionProps {
    totalServicios: number;
    serviciosFiltrados: number;
    onNuevoServicio: () => void;
    onVolverDashboard: () => void;
}

export interface AlertasEstadoProps {
    error: string | null;
    success: string | null;
    onLimpiarError: () => void;
    onLimpiarSuccess: () => void;
}

export interface EstadisticasServiciosProps {
    totalServicios: number;
    serviciosActivos: number;
    serviciosInactivos: number;
    serviciosEsenciales: number;
    costoPromedioMensual: number;
}

export interface FiltrosServiciosProps {
    filtros: FiltrosServicios;
    onBusquedaChange: (busqueda: string) => void;
    onCategoriaChange: (categoria: CategoriaServicio | undefined) => void;
    onTipoChange: (tipo: TipoServicio | undefined) => void;
    onEstadoChange: (estado: EstadoServicio | undefined) => void;
}

export interface TablaServiciosProps {
    servicios: Servicio[];
    loading: boolean;
    onEditar: (uid: string) => void;
    onEliminar: (uid: string) => void;
    onVerDetalle: (uid: string) => void;
}

export interface FormularioServicioProps {
    servicioUid?: string;
    onGuardar: () => void;
    onCancelar: () => void;
}

export interface ModalConfirmacionProps {
    isOpen: boolean;
    titulo: string;
    mensaje: string;
    onConfirmar: () => void;
    onCancelar: () => void;
    loading?: boolean;
}

export interface PaginacionProps {
    paginaActual: number;
    totalPaginas: number;
    onCambioPagina: (pagina: number) => void;
}

// ============================================================================
// HOOKS RETURN TYPES
// ============================================================================

export interface UseServiciosReturn {
    servicios: Servicio[];
    loading: boolean;
    error: string | null;
    success: string | null;
    paginaActual: number;
    totalPaginas: number;
    cargarServicios: (filtros?: FiltrosServicios) => Promise<void>;
    eliminarServicio: (uid: string) => Promise<void>;
    cambiarPagina: (pagina: number) => void;
    limpiarMensajes: () => void;
}

export interface UseFiltrosServiciosReturn {
    filtros: FiltrosServicios;
    actualizarFiltro: <K extends keyof FiltrosServicios>(campo: K, valor: FiltrosServicios[K]) => void;
    limpiarFiltros: () => void;
}

export interface UseFormularioServicioReturn {
    formData: any;
    loading: boolean;
    guardando: boolean;
    error: string | null;
    actualizarCampo: (campo: string, valor: any) => void;
    cargarServicio: (uid: string) => Promise<void>;
    guardarServicio: () => Promise<void>;
    resetearFormulario: () => void;
}

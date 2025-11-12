// Tipos específicos para GestionDeUsuariosCliente
import type { Usuario, CrearUsuarioDto, ActualizarUsuarioDto } from '../../services/usuarios.service';

// Re-exportar tipos principales
export type { Usuario, CrearUsuarioDto, ActualizarUsuarioDto };

// Tipos de vista
export type VistaActiva = 'list' | 'create' | 'edit' | 'view';

// Estado del formulario
export interface FormularioUsuarioData {
  email: string;
  password: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  telefono: string;
  direccion: string;
}

// Estado del formulario con validaciones
export interface EstadoFormulario {
  datos: FormularioUsuarioData;
  errores: Record<string, string>;
  tocado: Record<string, boolean>;
}

// Props para componentes
export interface HeaderGestionProps {
  onNuevoUsuario: () => void;
  onVolver: () => void;
  totalUsuarios: number;
}

export interface EstadisticasUsuariosProps {
  totalUsuarios: number;
  totalClientes: number;
  totalAdmins: number;
  loading: boolean;
}

export interface FiltrosUsuariosProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filtroEstado: string;
  onFiltroEstadoChange: (estado: string) => void;
  filtroRol: string;
  onFiltroRolChange: (rol: string) => void;
  mostrarFiltros: boolean;
  onToggleFiltros: () => void;
}

export interface TablaUsuariosProps {
  usuarios: Usuario[];
  loading: boolean;
  onEditar: (usuario: Usuario) => void;
  onEliminar: (uid: string, nombre: string) => void;
}

export interface FormularioUsuarioProps {
  formulario: EstadoFormulario;
  modoEdicion: boolean;
  soloLectura?: boolean; // Nuevo: para modo "Ver" sin edición
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancelar: () => void;
  onCambioFormulario: (campo: keyof FormularioUsuarioData, valor: string) => void;
  errorFormulario?: string | null;
  onLimpiarError?: () => void;
}

export interface AlertasEstadoProps {
  error: string | null;
  success: string | null;
  onLimpiarError?: () => void;
  onLimpiarSuccess?: () => void;
}

// Hooks return types
export interface UseUsuariosReturn {
  usuarios: Usuario[];
  loading: boolean;
  error: string | null;
  success: string | null;
  cargarUsuarios: () => Promise<void>;
  crearUsuario: (datos: CrearUsuarioDto) => Promise<void>;
  actualizarUsuario: (uid: string, datos: ActualizarUsuarioDto) => Promise<void>;
  eliminarUsuario: (uid: string) => Promise<void>;
  desactivarUsuario: (uid: string) => Promise<void>;
  reactivarUsuario: (uid: string) => Promise<void>;
  limpiarMensajes: () => void;
}

export interface UseFormularioUsuarioReturn {
  formulario: EstadoFormulario;
  vistaActiva: VistaActiva;
  usuarioEditando: Usuario | null;
  iniciarCreacion: () => void;
  iniciarEdicion: (usuario: Usuario) => void;
  iniciarVisualizacion: (usuario: Usuario) => void;
  cancelarFormulario: () => void;
  actualizarCampo: (campo: keyof FormularioUsuarioData, valor: string) => void;
  validarFormulario: () => boolean;
  resetFormulario: () => void;
}

export interface UseFiltrosUsuariosReturn {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  usuariosFiltrados: Usuario[];
  totalClientes: number;
  totalAdmins: number;
}

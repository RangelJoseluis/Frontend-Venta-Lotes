// Tipos específicos para ModelosCasa
import type { ModeloCasa, CrearModeloCasaDto, ActualizarModeloCasaDto } from '../../types';

// Re-exportar tipos principales
export type { ModeloCasa, CrearModeloCasaDto, ActualizarModeloCasaDto };

// Estados del componente
export type ModoVista = 'lista' | 'crear' | 'editar';

// Estado del formulario
export interface FormularioEstado {
  datos: CrearModeloCasaDto;
  errores: Record<string, string>;
  tocado: Record<string, boolean>;
}

// Props para componentes
export interface HeaderModelosCasaProps {
  onNuevoModelo: () => void;
  onVolver: () => void;
  totalModelos: number;
}

export interface ListaModelosProps {
  modelos: ModeloCasa[];
  loading: boolean;
  onEditar: (modelo: ModeloCasa) => void;
  onEliminar: (uid: string, nombre: string) => void;
  imagenesConError: Set<string>;
  onImagenError: (uid: string) => void;
}

export interface TarjetaModeloProps {
  modelo: ModeloCasa;
  onEditar: (modelo: ModeloCasa) => void;
  onEliminar: (uid: string, nombre: string) => void;
  tieneErrorImagen: boolean;
  onImagenError: () => void;
}

export interface FormularioModeloProps {
  formulario: FormularioEstado;
  modoEdicion: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onCancelar: () => void;
  onCambioFormulario: (campo: keyof CrearModeloCasaDto, valor: any) => void;
  onCambioPrecio: (precio: number) => void;
  errorFormulario?: string | null;
  onLimpiarError?: () => void;
}

export interface GestorImagenesProps {
  imagenUrl: string;
  onCambioImagen: (url: string) => void;
  disabled?: boolean;
}

export interface InputPrecioProps {
  valor: number;
  onChange: (valor: number) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

// Hooks return types
export interface UseModelosCasaReturn {
  modelos: ModeloCasa[];
  loading: boolean;
  error: string | null;
  cargarModelos: () => Promise<void>;
  crearModelo: (datos: CrearModeloCasaDto) => Promise<void>;
  actualizarModelo: (uid: string, datos: ActualizarModeloCasaDto) => Promise<void>;
  eliminarModelo: (uid: string) => Promise<void>;
}

export interface UseFormularioModeloReturn {
  formulario: FormularioEstado;
  modoEdicion: boolean;
  modeloEditando: ModeloCasa | null;
  iniciarCreacion: () => void;
  iniciarEdicion: (modelo: ModeloCasa) => void;
  cancelarFormulario: () => void;
  actualizarCampo: (campo: keyof CrearModeloCasaDto, valor: any) => void;
  actualizarPrecio: (precio: number) => void;
  validarFormulario: () => boolean;
  resetFormulario: () => void;
}

export interface UseImagenesReturn {
  imagenesConError: Set<string>;
  marcarImagenConError: (uid: string) => void;
  limpiarErroresImagenes: () => void;
  validarImagen: (url: string) => boolean;
}

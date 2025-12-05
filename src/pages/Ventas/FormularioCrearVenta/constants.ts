// Constantes para FormularioCrearVenta
// Centraliza valores por defecto, opciones y configuraciones

export const FORM_DEFAULTS = {
  modalidadPago: 'cuotas' as const,
  cantidadCuotas: '24',
  montoInicial: '',
  observaciones: '',
  precioVenta: '',
  loteUid: '',
  clienteUid: '',
};

export const MODALIDADES_PAGO = [
  { value: 'contado', label: 'Contado' },
  { value: 'cuotas', label: 'Cuotas' },
] as const;

export const OPCIONES_CUOTAS = [
  { value: '6', label: '6 cuotas' },
  { value: '12', label: '12 cuotas' },
  { value: '18', label: '18 cuotas' },
  { value: '24', label: '24 cuotas' },
  { value: '36', label: '36 cuotas' },
  { value: '48', label: '48 cuotas' },
];

// Función para obtener estilos de react-select dinámicamente según el tema actual
export const getReactSelectStyles = () => {
  const isDark = document.documentElement.classList.contains('dark');

  return {
    control: (base: any, state: any) => ({
      ...base,
      minHeight: '42px',
      fontSize: '14px',
      backgroundColor: isDark ? '#0f172a' : 'white',
      borderColor: state.isFocused
        ? '#3b82f6'
        : (isDark ? '#475569' : '#e2e8f0'),
      color: isDark ? 'white' : '#1e293b',
      '&:hover': {
        borderColor: '#3b82f6',
      },
      boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: isDark ? '#1e293b' : 'white',
      border: `1px solid ${isDark ? '#475569' : '#e2e8f0'}`,
    }),
    option: (base: any, state: any) => ({
      ...base,
      fontSize: '14px',
      backgroundColor: state.isSelected
        ? '#3b82f6'
        : state.isFocused
          ? (isDark ? '#334155' : '#f1f5f9')
          : (isDark ? '#1e293b' : 'white'),
      color: state.isSelected ? 'white' : (isDark ? '#f1f5f9' : '#1e293b'),
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#3b82f6',
      },
    }),
    singleValue: (base: any) => ({
      ...base,
      color: isDark ? 'white' : '#1e293b',
    }),
    input: (base: any) => ({
      ...base,
      color: isDark ? 'white' : '#1e293b',
    }),
    placeholder: (base: any) => ({
      ...base,
      color: isDark ? '#94a3b8' : '#94a3b8',
    }),
  };
};

// Mantener compatibilidad con código existente
export const REACT_SELECT_STYLES = getReactSelectStyles();

export const MESSAGES = {
  LOADING: 'Cargando datos...',
  ERROR_CARGAR_DATOS: 'Error al cargar lotes y clientes. Por favor, recargue la página.',
  ERROR_CREAR_VENTA: 'Error al crear la venta. Por favor, intente nuevamente.',
  SUCCESS_CREAR_VENTA: '¡Venta registrada exitosamente! Redirigiendo al dashboard...',
  REQUIRED_FIELDS: 'Todos los campos marcados con * son obligatorios',
};

export const VALIDATION_MESSAGES = {
  CLIENTE_REQUIRED: 'Debe seleccionar un cliente',
  LOTE_REQUIRED: 'Debe seleccionar un lote',
  PRECIO_REQUIRED: 'El precio de venta es obligatorio',
  PRECIO_INVALID: 'El precio debe ser un número válido mayor a 0',
  CUOTAS_REQUIRED: 'La cantidad de cuotas es obligatoria',
  INICIAL_REQUIRED: 'El monto inicial es obligatorio para ventas a cuotas',
  INICIAL_INVALID: 'El monto inicial debe ser menor al precio total',
};

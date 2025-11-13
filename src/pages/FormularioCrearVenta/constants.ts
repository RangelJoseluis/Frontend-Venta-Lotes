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

export const REACT_SELECT_STYLES = {
  control: (base: any) => ({
    ...base,
    minHeight: '42px',
    fontSize: '14px',
    borderColor: '#e2e8f0',
    '&:hover': {
      borderColor: '#3b82f6',
    },
  }),
  option: (base: any, state: any) => ({
    ...base,
    fontSize: '14px',
    backgroundColor: state.isSelected ? '#3b82f6' : state.isFocused ? '#f1f5f9' : 'white',
    color: state.isSelected ? 'white' : '#1e293b',
  }),
};

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

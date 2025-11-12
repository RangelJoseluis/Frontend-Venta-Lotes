// Utilidades de formato para ModelosCasa

/**
 * Formatea un precio como moneda colombiana
 * @param precio - Valor numérico a formatear
 * @returns String formateado como moneda (ej: "$1.234.567")
 */
export const formatearPrecio = (precio: number): string => {
  if (isNaN(precio) || precio === 0) return '$0';
  
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio);
};

/**
 * Formatea un número con separadores de miles para input
 * @param valor - Valor a formatear
 * @returns String con formato de miles (ej: "1.234.567")
 */
export const formatearNumeroConMiles = (valor: number | string): string => {
  // Convertir a número preservando decimales
  const numero = typeof valor === 'string' ? parseFloat(valor) : valor;
  
  if (isNaN(numero) || numero === 0) return '';
  
  // Formatear sin decimales para mostrar en el input
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numero);
};

/**
 * Convierte un string con formato de miles a número
 * @param valorFormateado - String con formato (ej: "1.234.567")
 * @returns Número sin formato
 */
export const parsearNumeroConMiles = (valorFormateado: string): number => {
  // Eliminar solo los separadores de miles (puntos), mantener números
  const numeroLimpio = valorFormateado.replace(/\./g, '');
  const numero = parseInt(numeroLimpio, 10);
  
  return isNaN(numero) ? 0 : numero;
};

/**
 * Valida si una URL de imagen es válida
 * @param url - URL a validar
 * @returns true si es válida, false si no
 */
export const validarUrlImagen = (url: string): boolean => {
  if (!url || url.trim() === '') return false;
  
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(url);
  } catch {
    return false;
  }
};

/**
 * Obtiene el color asociado a un estado de modelo
 * @param estado - Estado del modelo
 * @returns Color hexadecimal
 */
export const obtenerColorEstado = (estado: string): string => {
  const colores: Record<string, string> = {
    activo: '#10b981',
    inactivo: '#6b7280',
  };
  return colores[estado] || '#6b7280';
};

/**
 * Obtiene el texto legible de un estado de modelo
 * @param estado - Estado del modelo
 * @returns Texto descriptivo
 */
export const obtenerTextoEstado = (estado: string): string => {
  const textos: Record<string, string> = {
    activo: 'Activo',
    inactivo: 'Inactivo',
  };
  return textos[estado] || estado;
};

/**
 * Valida los datos del formulario
 * @param datos - Datos del formulario a validar
 * @returns Objeto con errores encontrados
 */
export const validarFormulario = (datos: any): Record<string, string> => {
  const errores: Record<string, string> = {};

  // Validar nombre
  if (!datos.nombre || datos.nombre.trim().length < 2) {
    errores.nombre = 'El nombre debe tener al menos 2 caracteres';
  } else if (datos.nombre.length > 100) {
    errores.nombre = 'El nombre no puede exceder 100 caracteres';
  }

  // Validar precio base
  if (!datos.precioBase || datos.precioBase <= 0) {
    errores.precioBase = 'El precio base debe ser mayor a 0';
  } else if (datos.precioBase > 10000000000) {
    errores.precioBase = 'El precio base es demasiado alto';
  }

  // Validar metros cubiertos
  if (!datos.metrosCubiertos || datos.metrosCubiertos <= 0) {
    errores.metrosCubiertos = 'Los metros cubiertos deben ser mayor a 0';
  } else if (datos.metrosCubiertos > 10000) {
    errores.metrosCubiertos = 'Los metros cubiertos son demasiado altos';
  }

  // Validar ambientes
  if (!datos.ambientes || datos.ambientes < 1) {
    errores.ambientes = 'Debe tener al menos 1 ambiente';
  } else if (datos.ambientes > 20) {
    errores.ambientes = 'No puede tener más de 20 ambientes';
  }

  // Validar baños
  if (!datos.banos || datos.banos < 1) {
    errores.banos = 'Debe tener al menos 1 baño';
  } else if (datos.banos > 10) {
    errores.banos = 'No puede tener más de 10 baños';
  }

  // Validar pisos
  if (!datos.pisos || datos.pisos < 1) {
    errores.pisos = 'Debe tener al menos 1 piso';
  } else if (datos.pisos > 5) {
    errores.pisos = 'No puede tener más de 5 pisos';
  }

  // Validar URL de imagen (opcional)
  if (datos.imagenUrl && !validarUrlImagen(datos.imagenUrl)) {
    errores.imagenUrl = 'La URL de la imagen no es válida';
  }

  return errores;
};

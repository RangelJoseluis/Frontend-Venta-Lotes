// Hook para gestión del formulario de modelo de casa
import { useState } from 'react';
import { FORMULARIO_INICIAL } from '../constants';
import { validarFormulario as validarFormularioModelo } from '../utils/formatters';
import type { ModeloCasa, CrearModeloCasaDto } from '../types';
import type { UseFormularioModeloReturn, FormularioEstado } from '../types';

export const useFormularioModelo = (): UseFormularioModeloReturn => {
  const [formulario, setFormulario] = useState<FormularioEstado>({
    datos: { ...FORMULARIO_INICIAL },
    errores: {},
    tocado: {},
  });
  
  const [modoEdicion, setModoEdicion] = useState(false);
  const [modeloEditando, setModeloEditando] = useState<ModeloCasa | null>(null);

  /**
   * Inicia el modo de creación de un nuevo modelo
   */
  const iniciarCreacion = (): void => {
    setModoEdicion(false);
    setModeloEditando(null);
    setFormulario({
      datos: { ...FORMULARIO_INICIAL },
      errores: {},
      tocado: {},
    });
  };

  /**
   * Inicia el modo de edición con los datos de un modelo existente
   * @param modelo - Modelo a editar
   */
  const iniciarEdicion = (modelo: ModeloCasa): void => {

    
    setModoEdicion(true);
    setModeloEditando(modelo);
    
    const datosFormulario: CrearModeloCasaDto = {
      nombre: modelo.nombre,
      descripcion: modelo.descripcion,
      amueblado: modelo.amueblado,
      metrosCubiertos: typeof modelo.metrosCubiertos === 'string' ? parseFloat(modelo.metrosCubiertos) : modelo.metrosCubiertos,
      ambientes: modelo.ambientes,
      banos: modelo.banos,
      pisos: modelo.pisos,
      estado: modelo.estado,
      precioBase: typeof modelo.precioBase === 'string' ? parseFloat(modelo.precioBase) : modelo.precioBase,
      imagenUrl: modelo.imagenUrl || '',
      observaciones: modelo.observaciones || '',
    };



    setFormulario({
      datos: datosFormulario,
      errores: {},
      tocado: {},
    });
  };

  /**
   * Cancela el formulario y vuelve al estado inicial
   */
  const cancelarFormulario = (): void => {
    setModoEdicion(false);
    setModeloEditando(null);
    setFormulario({
      datos: { ...FORMULARIO_INICIAL },
      errores: {},
      tocado: {},
    });
  };

  /**
   * Actualiza un campo del formulario
   * @param campo - Campo a actualizar
   * @param valor - Nuevo valor
   */
  const actualizarCampo = (campo: keyof CrearModeloCasaDto, valor: any): void => {
    setFormulario(prev => ({
      ...prev,
      datos: {
        ...prev.datos,
        [campo]: valor,
      },
      tocado: {
        ...prev.tocado,
        [campo]: true,
      },
    }));

    // Limpiar error del campo si existe
    if (formulario.errores[campo]) {
      setFormulario(prev => ({
        ...prev,
        errores: {
          ...prev.errores,
          [campo]: '',
        },
      }));
    }
  };

  /**
   * Actualiza el precio directamente con valor numérico
   * @param precio - Precio como número
   */
  const actualizarPrecio = (precio: number): void => {
    setFormulario(prev => ({
      ...prev,
      datos: {
        ...prev.datos,
        precioBase: precio,
      },
      tocado: {
        ...prev.tocado,
        precioBase: true,
      },
    }));

    // Limpiar error del precio si existe
    if (formulario.errores.precioBase) {
      setFormulario(prev => ({
        ...prev,
        errores: {
          ...prev.errores,
          precioBase: '',
        },
      }));
    }
  };

  /**
   * Valida todo el formulario
   * @returns true si es válido, false si tiene errores
   */
  const validarFormulario = (): boolean => {
    const errores = validarFormularioModelo(formulario.datos);
    
    setFormulario(prev => ({
      ...prev,
      errores,
      tocado: Object.keys(prev.datos).reduce((acc, key) => ({
        ...acc,
        [key]: true,
      }), {}),
    }));

    return Object.keys(errores).length === 0;
  };

  /**
   * Resetea el formulario al estado inicial
   */
  const resetFormulario = (): void => {
    cancelarFormulario();
  };

  return {
    formulario,
    modoEdicion,
    modeloEditando,
    iniciarCreacion,
    iniciarEdicion,
    cancelarFormulario,
    actualizarCampo,
    actualizarPrecio,
    validarFormulario,
    resetFormulario,
  };
};

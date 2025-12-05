// Hook principal para manejar el estado y lógica del formulario de venta
// Centraliza toda la lógica de estado, validaciones y envío

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearVenta } from '../../../../services/ventas.service';
import { getErrorMessage } from '../../../../services/http.service';
import type { VentaFormData, FormularioState, Lote } from '../types';
import type { CrearVentaDto } from '../../../../types';
import { FORM_DEFAULTS, MESSAGES } from '../constants';
import { validateFormularioVenta } from '../utils/validaciones';
import { parsePrecio } from '../utils/formatters';

interface UseFormularioVentaProps {
  lotes: Lote[];
}

interface UseFormularioVentaReturn {
  formData: VentaFormData;
  state: FormularioState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleCurrencyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: keyof VentaFormData, value: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleLimpiar: () => void;
  loteSeleccionado: Lote | null;
}

export const useFormularioVenta = ({ lotes }: UseFormularioVentaProps): UseFormularioVentaReturn => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<VentaFormData>(FORM_DEFAULTS);
  const [state, setState] = useState<FormularioState>({
    isLoading: false,
    isSubmitting: false,
    error: null,
    success: false
  });

  // Obtener lote seleccionado
  const loteSeleccionado = formData.loteUid 
    ? lotes.find(l => l.uid === formData.loteUid) || null 
    : null;

  // Autocompletar precio cuando se selecciona un lote
  useEffect(() => {
    if (formData.loteUid && loteSeleccionado && !formData.precioVenta) {
      const precioRedondeado = parsePrecio(loteSeleccionado.precioLista);
      
      console.log('💰 Precio autocompletado:', precioRedondeado.toLocaleString('es-CO'));
      
      setFormData(prev => ({
        ...prev,
        precioVenta: precioRedondeado.toString()
      }));
    }
  }, [formData.loteUid, loteSeleccionado, formData.precioVenta]);

  // Manejar cambios en inputs normales
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar errores cuando el usuario empiece a corregir
    if (state.error) {
      setState(prev => ({ ...prev, error: null }));
    }
  };

  // Manejar cambios en inputs de moneda
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/[^\d]/g, '');
    
    setFormData(prev => ({
      ...prev,
      [name]: cleanValue
    }));

    // Limpiar errores cuando el usuario empiece a corregir
    if (state.error) {
      setState(prev => ({ ...prev, error: null }));
    }
  };

  // Manejar cambios en selects de react-select
  const handleSelectChange = (field: keyof VentaFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Limpiar errores cuando el usuario empiece a corregir
    if (state.error) {
      setState(prev => ({ ...prev, error: null }));
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario
    const validation = validateFormularioVenta(formData);
    if (!validation.isValid) {
      setState(prev => ({
        ...prev,
        error: validation.errors[0] // Mostrar el primer error
      }));
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true, error: null }));

    try {
      // Preparar datos para envío
      const ventaData: CrearVentaDto = {
        loteUid: formData.loteUid,
        clienteUid: formData.clienteUid,
        precioVenta: Number(formData.precioVenta),
        modalidadPago: formData.modalidadPago,
        cantidadCuotas: formData.modalidadPago === 'cuotas' ? Number(formData.cantidadCuotas) : 0,
        montoInicial: formData.modalidadPago === 'cuotas' ? Number(formData.montoInicial) : 0,
        observaciones: formData.observaciones || undefined,
      };

      console.log('📤 Enviando venta:', ventaData);

      const response = await crearVenta(ventaData);
      
      console.log('✅ Venta creada exitosamente:', response);

      setState(prev => ({ ...prev, success: true }));

      // Redirigir después de 2 segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('❌ Error al crear venta:', error);
      setState(prev => ({
        ...prev,
        error: getErrorMessage(error) || MESSAGES.ERROR_CREAR_VENTA
      }));
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  // Limpiar formulario
  const handleLimpiar = () => {
    setFormData(FORM_DEFAULTS);
    setState(prev => ({ ...prev, error: null, success: false }));
  };

  return {
    formData,
    state,
    handleChange,
    handleCurrencyChange,
    handleSelectChange,
    handleSubmit,
    handleLimpiar,
    loteSeleccionado
  };
};

/**
 * PÁGINA: REGISTRO DE PAGOS (MODULARIZADA)
 * 
 * Componente principal orquestador que integra todos los módulos
 * Permite registrar pagos a cuotas de ventas activas
 * 
 * ESTRUCTURA:
 * - Header: Encabezado con botón volver
 * - SeccionVenta: Selector de venta
 * - SeccionCuota: Selector de cuota
 * - SeccionPago: Inputs del pago
 * - PantallaExito: Vista de confirmación
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, DollarSign } from 'lucide-react';
import { useVentas } from './hooks/useVentas';
import { useCuotas } from './hooks/useCuotas';
import { usePagoForm } from './hooks/usePagoForm';
import Header from './components/Header/Header';
import SeccionVenta from './components/SeccionVenta/SeccionVenta';
import SeccionCuota from './components/SeccionCuota/SeccionCuota';
import SeccionPago from './components/SeccionPago/SeccionPago';
import PantallaExito from './components/PantallaExito/PantallaExito';

export default function RegistroPagos() {
  const navigate = useNavigate();

  // Hooks personalizados
  const { ventas, isLoading: isLoadingVentas, error: errorVentas } = useVentas();
  const { cuotas } = useCuotas(null); // Se cargará dinámicamente
  const {
    formData,
    setFormData,
    handleChange,
    updateField,
    autocompletarMonto,
    handleSubmit,
    resetForm,
    isSubmitting,
    error,
    success,
    pagoResponse,
  } = usePagoForm();

  // Estado local para cuotas y cuota seleccionada
  const [cuotasActuales, setCuotasActuales] = useState(cuotas);
  const [cuotaSeleccionada, setCuotaSeleccionada] = useState<any>(null);

  // Hook personalizado para cargar cuotas cuando cambia la venta
  const { cuotas: cuotasDinamicas, isLoading: isLoadingCuotasDinamicas } = useCuotas(
    formData.ventaUid || null
  );

  // Actualizar cuotas cuando se cargan
  useEffect(() => {
    setCuotasActuales(cuotasDinamicas);
  }, [cuotasDinamicas]);

  // Actualizar cuota seleccionada cuando cambia la selección
  useEffect(() => {
    if (formData.cuotaUid && cuotasActuales.length > 0) {
      const cuota = cuotasActuales.find(c => c.uid === formData.cuotaUid);
      setCuotaSeleccionada(cuota || null);
    } else {
      setCuotaSeleccionada(null);
    }
  }, [formData.cuotaUid, cuotasActuales]);

  // Handlers
  const handleVentaChange = (ventaUid: string) => {
    setFormData(prev => ({
      ...prev,
      ventaUid,
      cuotaUid: '',
      monto: ''
    }));
    setCuotaSeleccionada(null);
  };

  const handleCuotaChange = (cuotaUid: string) => {
    updateField('cuotaUid', cuotaUid);
  };

  const handleAutocompletar = () => {
    autocompletarMonto(cuotaSeleccionada);
  };

  const handleNuevoPago = () => {
    resetForm();
    setCuotaSeleccionada(null);
  };

  const handleVolver = () => {
    navigate('/dashboard');
  };

  // Si hay éxito, mostrar pantalla de confirmación
  if (success && pagoResponse) {
    return (
      <PantallaExito
        pagoResponse={pagoResponse}
        onNuevoPago={handleNuevoPago}
        onVolver={handleVolver}
      />
    );
  }

  // Renderizar formulario principal
  return (
    <div className="w-full">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <Header onBack={handleVolver} />

        {/* Formulario */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-8">
            {/* Sección: Selección de Venta */}
            <SeccionVenta
              ventas={ventas}
              selectedVentaUid={formData.ventaUid}
              onChange={handleVentaChange}
              isLoading={isLoadingVentas}
              isDisabled={isSubmitting}
            />

            {/* Sección: Selección de Cuota */}
            {formData.ventaUid && (
              <SeccionCuota
                cuotas={cuotasActuales}
                selectedCuotaUid={formData.cuotaUid}
                cuotaSeleccionada={cuotaSeleccionada}
                onChange={handleCuotaChange}
                isLoading={isLoadingCuotasDinamicas}
                isDisabled={isSubmitting}
              />
            )}

            {/* Sección: Información del Pago */}
            {formData.cuotaUid && (
              <SeccionPago
                formData={formData}
                cuotaSeleccionada={cuotaSeleccionada}
                onChange={handleChange}
                onAutocompletarMonto={handleAutocompletar}
              />
            )}

            {/* Mensajes de Error */}
            {(error || errorVentas) && (
              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                <AlertCircle size={20} className="flex-shrink-0" />
                <div>
                  <strong className="block text-sm font-semibold">Error al procesar el pago</strong>
                  <p className="text-sm">{error || errorVentas}</p>
                </div>
              </div>
            )}

            {/* Botones de Acción */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
              <button
                type="button"
                onClick={handleVolver}
                className="px-6 py-2.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.cuotaUid || !formData.monto}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <DollarSign size={20} />
                    Registrar Pago
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

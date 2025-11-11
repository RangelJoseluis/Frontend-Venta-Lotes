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
import './RegistroPagos.css';

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
    <div className="pago-container">
      <div className="pago-wrapper">
        {/* Header */}
        <Header onBack={handleVolver} />

        {/* Formulario */}
        <div className="pago-card">
          <form onSubmit={handleSubmit} className="pago-form">
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
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <div>
                  <strong>Error al procesar el pago</strong>
                  <p>{error || errorVentas}</p>
                </div>
              </div>
            )}

            {/* Botones de Acción */}
            <div className="form-actions">
              <button
                type="button"
                onClick={handleVolver}
                className="btn btn-cancel"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.cuotaUid || !formData.monto}
                className="btn btn-submit"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner" />
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

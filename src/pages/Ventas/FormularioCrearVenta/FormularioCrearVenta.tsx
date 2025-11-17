// FormularioCrearVenta - Componente principal modularizado
// Orquesta todos los componentes y hooks para crear una nueva venta

import { HeaderFormulario } from './components/HeaderFormulario';
import { SeccionCliente } from './components/SeccionCliente';
import { SeccionLote } from './components/SeccionLote';
import { SeccionPago } from './components/SeccionPago';
import { SeccionObservaciones } from './components/SeccionObservaciones';
import { ResumenVenta } from './components/ResumenVenta';
import { BotonesAccion } from './components/BotonesAccion';
import { MensajesEstado } from './components/MensajesEstado';

import { useCargarDatos } from './hooks/useCargarDatos';
import { useFormularioVenta } from './hooks/useFormularioVenta';

import { MESSAGES } from './constants';
import './FormularioCrearVenta.css';

export default function FormularioCrearVenta() {
  // Hook para cargar datos iniciales
  const {
    lotes,
    clientes,
    lotesOptions,
    clientesOptions,
    isLoading: isLoadingData,
    error: errorData
  } = useCargarDatos();

  // Hook principal del formulario
  const {
    formData,
    state,
    handleChange,
    handleCurrencyChange,
    handleSelectChange,
    handleSubmit,
    handleLimpiar,
    loteSeleccionado
  } = useFormularioVenta({ lotes });

  // Estado combinado para mostrar loading inicial
  const combinedState = {
    ...state,
    isLoading: isLoadingData || state.isLoading,
    error: errorData || state.error
  };

  return (
    <div className="formulario-crear-venta">
      <div className="formulario-container">
        {/* Header con título y navegación */}
        <HeaderFormulario />

        {/* Mensajes de estado global */}
        <MensajesEstado state={combinedState} />

        {/* Formulario principal */}
        <form onSubmit={handleSubmit} className="formulario-form">
          {/* Sección Cliente */}
          <SeccionCliente
            clienteSeleccionado={formData.clienteUid}
            clientesOptions={clientesOptions}
            onClienteChange={(value) => handleSelectChange('clienteUid', value)}
            isLoading={isLoadingData}
          />

          {/* Sección Lote */}
          <SeccionLote
            loteSeleccionado={formData.loteUid}
            lotesOptions={lotesOptions}
            onLoteChange={(value) => handleSelectChange('loteUid', value)}
            isLoading={isLoadingData}
          />

          {/* Sección Pago */}
          <SeccionPago
            formData={formData}
            onInputChange={handleChange}
            onCurrencyChange={handleCurrencyChange}
          />

          {/* Sección Observaciones */}
          <SeccionObservaciones
            observaciones={formData.observaciones}
            onObservacionesChange={handleChange}
          />

          {/* Resumen de la Venta */}
          <ResumenVenta formData={formData} />

          {/* Botones de Acción */}
          <BotonesAccion
            state={combinedState}
            onLimpiar={handleLimpiar}
            onSubmit={handleSubmit}
          />
        </form>

        {/* Footer */}
        <div className="formulario-footer">
          <p>{MESSAGES.REQUIRED_FIELDS}</p>
        </div>
      </div>
    </div>
  );
}

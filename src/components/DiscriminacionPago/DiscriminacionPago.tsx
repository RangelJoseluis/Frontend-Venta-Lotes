import React from 'react';
import './DiscriminacionPago.css';

interface DiscriminacionPagoProps {
  montoTotal: number;
  montoTotalFormateado: string;
  montoAplicadoMora?: number;
  montoAplicadoCapital?: number;
  montoAplicadoMoraFormateado?: string;
  montoAplicadoCapitalFormateado?: string;
  compacto?: boolean;
  mostrarIconos?: boolean;
}

/**
 * COMPONENTE: DISCRIMINACIÓN DE PAGO
 * 
 * Muestra la distribución del pago entre mora y capital de forma visual.
 * 
 * CARACTERÍSTICAS:
 * - Diseño claro y profesional
 * - Modo compacto para usar en tablas
 * - Colores diferenciados (mora = rojo, capital = verde)
 * - Porcentajes visuales
 * - Iconos opcionales
 * 
 * USO:
 * <DiscriminacionPago 
 *   montoTotal={50000}
 *   montoTotalFormateado="$ 50.000"
 *   montoAplicadoMora={3000}
 *   montoAplicadoCapital={47000}
 *   montoAplicadoMoraFormateado="$ 3.000"
 *   montoAplicadoCapitalFormateado="$ 47.000"
 * />
 */
const DiscriminacionPago: React.FC<DiscriminacionPagoProps> = ({
  montoTotal,
  montoTotalFormateado,
  montoAplicadoMora,
  montoAplicadoCapital,
  montoAplicadoMoraFormateado,
  montoAplicadoCapitalFormateado,
  compacto = false,
  mostrarIconos = true,
}) => {
  // Si no hay discriminación, mostrar solo el monto total
  const tieneMora = montoAplicadoMora && montoAplicadoMora > 0;
  const tieneCapital = montoAplicadoCapital && montoAplicadoCapital > 0;
  const hayDiscriminacion = tieneMora || tieneCapital;

  if (!hayDiscriminacion) {
    return (
      <div className="discriminacion-pago sin-discriminacion">
        <div className="monto-total">
          <span className="label">Monto pagado:</span>
          <span className="valor">{montoTotalFormateado}</span>
        </div>
      </div>
    );
  }

  // Calcular porcentajes para la barra visual
  const porcentajeMora = tieneMora ? (montoAplicadoMora / montoTotal) * 100 : 0;
  const porcentajeCapital = tieneCapital ? (montoAplicadoCapital / montoTotal) * 100 : 0;

  if (compacto) {
    return (
      <div className="discriminacion-pago compacto">
        {tieneMora && (
          <div className="item-discriminacion mora">
            <span className="icono">⚠️</span>
            <span className="valor">{montoAplicadoMoraFormateado}</span>
          </div>
        )}
        {tieneCapital && (
          <div className="item-discriminacion capital">
            <span className="icono">✓</span>
            <span className="valor">{montoAplicadoCapitalFormateado}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="discriminacion-pago">
      <div className="encabezado">
        <h4>Distribución del Pago</h4>
        <span className="monto-total-badge">{montoTotalFormateado}</span>
      </div>

      {/* Barra visual de distribución */}
      <div className="barra-distribucion">
        {tieneMora && (
          <div 
            className="segmento mora" 
            style={{ width: `${porcentajeMora}%` }}
            title={`Mora: ${porcentajeMora.toFixed(1)}%`}
          />
        )}
        {tieneCapital && (
          <div 
            className="segmento capital" 
            style={{ width: `${porcentajeCapital}%` }}
            title={`Capital: ${porcentajeCapital.toFixed(1)}%`}
          />
        )}
      </div>

      {/* Detalle de montos */}
      <div className="detalle-discriminacion">
        {tieneMora && (
          <div className="item-detalle mora">
            <div className="icono-wrapper">
              {mostrarIconos && <span className="icono">⚠️</span>}
              <span className="label">Mora pagada</span>
            </div>
            <div className="valores">
              <span className="monto">{montoAplicadoMoraFormateado}</span>
              <span className="porcentaje">{porcentajeMora.toFixed(1)}%</span>
            </div>
          </div>
        )}

        {tieneCapital && (
          <div className="item-detalle capital">
            <div className="icono-wrapper">
              {mostrarIconos && <span className="icono">✓</span>}
              <span className="label">Capital pagado</span>
            </div>
            <div className="valores">
              <span className="monto">{montoAplicadoCapitalFormateado}</span>
              <span className="porcentaje">{porcentajeCapital.toFixed(1)}%</span>
            </div>
          </div>
        )}
      </div>

      {/* Nota informativa */}
      {tieneMora && (
        <div className="nota-info">
          <span className="icono-info">ℹ️</span>
          <span className="texto">
            Este pago incluye mora por cuota vencida. El sistema aplicó primero el monto a la mora pendiente.
          </span>
        </div>
      )}
    </div>
  );
};

export default DiscriminacionPago;

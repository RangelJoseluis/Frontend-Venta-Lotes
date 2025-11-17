// Componente ResumenVenta - Muestra el resumen de cálculos de la venta
// Calcula y muestra precio total, inicial y saldo a financiar

import { DollarSign } from 'lucide-react';
import type { VentaFormData } from '../../types';
import { calcularResumenVenta } from '../../utils/calculosFinancieros';
import { formatCurrency } from '../../utils/formatters';
import './ResumenVenta.css';

interface ResumenVentaProps {
  formData: VentaFormData;
}

export const ResumenVenta: React.FC<ResumenVentaProps> = ({ formData }) => {
  // Solo mostrar resumen si hay datos suficientes para cuotas
  const shouldShowResumen = 
    formData.precioVenta && 
    formData.modalidadPago === 'cuotas' && 
    formData.montoInicial;

  if (!shouldShowResumen) {
    return null;
  }

  const resumen = calcularResumenVenta(
    formData.precioVenta,
    formData.montoInicial,
    formData.cantidadCuotas
  );

  return (
    <div className="formulario-summary">
      <h4 className="formulario-summary-title">
        <DollarSign className="formulario-summary-icon" />
        Resumen de la Venta
      </h4>
      
      <div className="formulario-summary-grid">
        <div className="formulario-summary-item">
          <p className="formulario-summary-label">Precio Total</p>
          <p className="formulario-summary-value">
            ${formatCurrency(resumen.precioTotal)}
          </p>
        </div>
        
        <div className="formulario-summary-item">
          <p className="formulario-summary-label">Inicial</p>
          <p className="formulario-summary-value">
            ${formatCurrency(resumen.montoInicial)}
          </p>
        </div>
        
        <div className="formulario-summary-item">
          <p className="formulario-summary-label">Saldo a Financiar</p>
          <p className="formulario-summary-value">
            ${formatCurrency(resumen.saldoAFinanciar)}
          </p>
        </div>

        {resumen.valorCuota && resumen.cantidadCuotas && (
          <div className="formulario-summary-item formulario-summary-highlight">
            <p className="formulario-summary-label">
              Valor por Cuota ({resumen.cantidadCuotas} cuotas)
            </p>
            <p className="formulario-summary-value">
              ${formatCurrency(resumen.valorCuota)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

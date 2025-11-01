/**
 * PAYMENT METHOD CARD - Tarjeta de Método de Pago
 * Completamente aislado para evitar interferencias CSS
 */

import './PaymentMethodCard.css';

interface PaymentMethodCardProps {
  method: 'efectivo' | 'transferencia' | 'cheque' | 'tarjeta';
  icon: string;
  title: string;
  quantity: number;
  totalAmount: number;
  average: number;
  formatCurrency: (value: number) => string;
}

export default function PaymentMethodCard({
  method,
  icon,
  title,
  quantity,
  totalAmount,
  average,
  formatCurrency
}: PaymentMethodCardProps) {
  return (
    <div className={`rep-payment-card rep-payment-${method}`}>
      <div className="rep-payment-header">
        <span className="rep-payment-icon">{icon}</span>
        <h4 className="rep-payment-title">{title}</h4>
      </div>
      <div className="rep-payment-body">
        <div className="rep-payment-row">
          <span className="rep-payment-label">Cantidad:</span>
          <span className="rep-payment-value">{quantity} {quantity === 1 ? 'pago' : 'pagos'}</span>
        </div>
        <div className="rep-payment-row">
          <span className="rep-payment-label">Monto Total:</span>
          <span className="rep-payment-value">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="rep-payment-row">
          <span className="rep-payment-label">Promedio:</span>
          <span className="rep-payment-value">{formatCurrency(average)}</span>
        </div>
      </div>
    </div>
  );
}

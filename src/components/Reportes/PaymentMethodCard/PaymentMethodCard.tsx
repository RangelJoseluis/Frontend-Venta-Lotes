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

const PaymentMethodCard = ({
  method,
  icon,
  title,
  quantity,
  totalAmount,
  average,
  formatCurrency
}: PaymentMethodCardProps) => {
  return (
    <div className={`payment-method-card payment-method-${method}`}>
      <div className="payment-method-header">
        <div className="payment-method-icon">{icon}</div>
        <h4 className="payment-method-title">{title}</h4>
      </div>
      <div className="payment-method-stats">
        <div className="payment-stat-item">
          <span className="payment-stat-label">Cantidad:</span>
          <span className="payment-stat-value">{quantity} {quantity === 1 ? 'pago' : 'pagos'}</span>
        </div>
        <div className="payment-stat-item">
          <span className="payment-stat-label">Monto Total:</span>
          <span className="payment-stat-value">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="payment-stat-item">
          <span className="payment-stat-label">Promedio:</span>
          <span className="payment-stat-value">{formatCurrency(average)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;

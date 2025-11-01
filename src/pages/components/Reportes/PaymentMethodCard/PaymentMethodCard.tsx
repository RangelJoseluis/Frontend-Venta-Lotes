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
    <div className={`reportes-payment-method-card reportes-payment-method-${method}`}>
      <div className="reportes-payment-method-header">
        <div className="reportes-payment-method-icon">{icon}</div>
        <h4 className="reportes-payment-method-title">{title}</h4>
      </div>
      <div className="reportes-payment-method-stats">
        <div className="reportes-payment-stat-item">
          <span className="reportes-payment-stat-label">Cantidad:</span>
          <span className="reportes-payment-stat-value">{quantity} {quantity === 1 ? 'pago' : 'pagos'}</span>
        </div>
        <div className="reportes-payment-stat-item">
          <span className="reportes-payment-stat-label">Monto Total:</span>
          <span className="reportes-payment-stat-value">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="reportes-payment-stat-item">
          <span className="reportes-payment-stat-label">Promedio:</span>
          <span className="reportes-payment-stat-value">{formatCurrency(average)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodCard;

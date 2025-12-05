/**
 * PAYMENT METHOD CARD - Tarjeta de Método de Pago
 * Migrado a Tailwind CSS con soporte para dark mode
 */

interface PaymentMethodCardProps {
  method: 'efectivo' | 'transferencia' | 'cheque' | 'tarjeta';
  icon: string;
  title: string;
  quantity: number;
  totalAmount: number;
  average: number;
  formatCurrency: (value: number) => string;
}

const methodColors = {
  efectivo: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-500/30',
    text: 'text-emerald-700 dark:text-emerald-400'
  },
  transferencia: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-500/30',
    text: 'text-blue-700 dark:text-blue-400'
  },
  cheque: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-500/30',
    text: 'text-amber-700 dark:text-amber-400'
  },
  tarjeta: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-500/30',
    text: 'text-purple-700 dark:text-purple-400'
  }
};

export default function PaymentMethodCard({
  method,
  icon,
  title,
  quantity,
  totalAmount,
  average,
  formatCurrency
}: PaymentMethodCardProps) {
  const colors = methodColors[method];

  return (
    <div className={`${colors.bg} ${colors.border} border rounded-xl p-6 transition-all hover:shadow-md`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h4 className={`text-lg font-bold ${colors.text}`}>{title}</h4>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Cantidad:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {quantity} {quantity === 1 ? 'pago' : 'pagos'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Monto Total:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {formatCurrency(totalAmount)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Promedio:</span>
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {formatCurrency(average)}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * STATS CARD - Componente de Tarjeta de Estadísticas
 * Migrado a Tailwind CSS - Siempre expandido
 */

interface StatRow {
  label: string;
  value: string | number;
}

interface StatsCardProps {
  title: string;
  icon: string;
  rows: StatRow[];
  variant: 'ventas' | 'cuotas' | 'pagos' | 'lotes';
}

const variantStyles = {
  ventas: {
    header: 'bg-gradient-to-br from-blue-500 to-blue-600',
    border: 'border-l-4 border-blue-500'
  },
  cuotas: {
    header: 'bg-gradient-to-br from-emerald-500 to-emerald-600',
    border: 'border-l-4 border-emerald-500'
  },
  pagos: {
    header: 'bg-gradient-to-br from-amber-500 to-amber-600',
    border: 'border-l-4 border-amber-500'
  },
  lotes: {
    header: 'bg-gradient-to-br from-purple-500 to-purple-600',
    border: 'border-l-4 border-purple-500'
  }
};

export default function StatsCard({ title, icon, rows, variant }: StatsCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md ${styles.border}`}>
      {/* Header */}
      <div className={`${styles.header} px-5 py-4 flex items-center justify-center gap-3 min-h-[80px]`}>
        <span className="text-3xl flex-shrink-0">{icon}</span>
        <h3 className="text-base font-bold text-white text-center leading-tight">{title}</h3>
      </div>

      {/* Body - Siempre visible */}
      <div className="p-4 space-y-2">
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-3 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              {row.label}
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white tabular-nums">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

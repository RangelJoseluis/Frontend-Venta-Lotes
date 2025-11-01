import './StatsCard.css';

interface StatRow {
  label: string;
  value: string | number;
  className?: string;
}

interface StatsCardProps {
  title: string;
  icon?: string;
  rows: StatRow[];
  variant?: 'ventas' | 'cuotas' | 'pagos' | 'lotes';
}

const StatsCard = ({ title, icon, rows, variant = 'ventas' }: StatsCardProps) => {
  return (
    <div className={`stats-card stats-card-${variant}`}>
      <div className="stats-card-header">
        <h3>{icon && <span className="stats-card-icon">{icon}</span>}{title}</h3>
      </div>
      <div className="stats-card-body">
        {rows.map((row, index) => (
          <div key={index} className={`stats-card-row ${row.className || ''}`}>
            <span className="stats-label">{row.label}</span>
            <strong className="stats-value">{row.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;

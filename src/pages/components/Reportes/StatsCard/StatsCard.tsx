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
    <div className={`reportes-stats-card reportes-stats-card-${variant}`}>
      <div className="reportes-stats-card-header">
        <h3>{icon && <span className="reportes-stats-card-icon">{icon}</span>}{title}</h3>
      </div>
      <div className="reportes-stats-card-body">
        {rows.map((row, index) => (
          <div key={index} className={`reportes-stats-card-row ${row.className || ''}`}>
            <span className="reportes-stats-label">{row.label}</span>
            <strong className="reportes-stats-value">{row.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;

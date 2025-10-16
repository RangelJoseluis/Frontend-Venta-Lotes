import type { LucideIcon } from 'lucide-react';
import './StatCard.css';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  subtitle: string;
  percentage?: number;
  color: 'slate' | 'emerald' | 'amber' | 'blue';
}

const StatCard = ({ icon: Icon, title, value, subtitle, percentage, color }: StatCardProps) => {
  const colorClasses = {
    slate: { icon: 'bg-slate-100 text-slate-600', value: 'text-slate-800', percentage: 'text-slate-600' },
    emerald: { icon: 'bg-emerald-50 text-emerald-600', value: 'text-emerald-600', percentage: 'text-emerald-600' },
    amber: { icon: 'bg-amber-50 text-amber-600', value: 'text-amber-600', percentage: 'text-amber-600' },
    blue: { icon: 'bg-blue-50 text-blue-600', value: 'text-blue-600', percentage: 'text-blue-600' }
  };

  const currentColor = colorClasses[color];

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className={`stat-icon ${currentColor.icon}`}>
          <Icon className="stat-icon-svg" />
        </div>
        <span className="stat-card-title">{title}</span>
      </div>
      <p className={`stat-value ${currentColor.value}`}>{value}</p>
      <div className="stat-card-footer">
        <span className="stat-card-subtitle">{subtitle}</span>
        {percentage !== undefined && (
          <span className={`stat-percentage ${currentColor.percentage}`}>
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;

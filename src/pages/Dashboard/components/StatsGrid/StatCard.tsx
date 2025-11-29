import type { LucideIcon } from 'lucide-react';

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
    slate: {
      icon: 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600',
      value: 'text-slate-800',
      percentage: 'text-slate-600'
    },
    emerald: {
      icon: 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600',
      value: 'text-emerald-600',
      percentage: 'text-emerald-600'
    },
    amber: {
      icon: 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600',
      value: 'text-amber-600',
      percentage: 'text-amber-600'
    },
    blue: {
      icon: 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600',
      value: 'text-blue-600',
      percentage: 'text-blue-600'
    }
  };

  const currentColor = colorClasses[color];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 transition-all duration-200 ease-in-out hover:shadow-xl hover:-translate-y-0.5 flex flex-col items-center text-center h-full">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 shadow-sm ${currentColor.icon}`}>
        <Icon className="w-5 h-5" strokeWidth={2.5} />
      </div>

      <p className={`text-3xl md:text-4xl font-bold mb-1 tracking-tight ${currentColor.value}`}>
        {value}
      </p>

      <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
        {title}
      </span>

      <div className="mt-auto flex items-center justify-center gap-2 text-xs md:text-sm font-medium text-slate-600">
        <span>{subtitle}</span>
        {percentage !== undefined && (
          <span className={`${currentColor.percentage} bg-slate-50 px-1.5 py-0.5 rounded-md text-[10px] md:text-xs`}>
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;

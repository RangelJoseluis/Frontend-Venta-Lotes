/**
 * COMPONENTE: InfoPanel
 * 
 * Panel reutilizable para mostrar información en formato clave-valor
 * Diseño moderno con Tailwind CSS
 */

import React from 'react';

// Tipo para iconos de lucide-react
type IconComponent = React.ComponentType<{ size?: number | string; className?: string }>

interface InfoItem {
  icon?: IconComponent;
  label: string;
  value: string | React.ReactNode;
  valueClass?: string;
}

interface InfoPanelProps {
  items: InfoItem[];
  alert?: {
    icon: IconComponent;
    message: string;
    type?: 'warning' | 'error' | 'info';
  };
  className?: string;
}

export default function InfoPanel({ items, alert, className = '' }: InfoPanelProps) {
  const getAlertStyles = (type: string = 'warning') => {
    switch (type) {
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'warning':
      default:
        return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
              {Icon && (
                <div className="p-2 bg-white dark:bg-slate-800 rounded-md shadow-sm text-slate-500 dark:text-slate-400">
                  <Icon size={16} />
                </div>
              )}
              <div>
                <span className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5">
                  {item.label}
                </span>
                <span className={`block text-sm font-semibold text-slate-900 dark:text-white ${item.valueClass || ''}`}>
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {alert && (
        <div className={`flex items-center gap-2 p-3 rounded-lg border text-sm ${getAlertStyles(alert.type)}`}>
          <alert.icon size={16} className="flex-shrink-0" />
          <span>{alert.message}</span>
        </div>
      )}
    </div>
  );
}

/**
 * COMPONENTE: InfoPanel
 * 
 * Panel reutilizable para mostrar información en formato clave-valor
 * Usado para mostrar info de ventas, cuotas, etc.
 */

import React from 'react';
import './InfoPanel.css';

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
  return (
    <div className={`info-panel ${className}`}>
      <div className="info-grid">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="info-item">
              {Icon && (
                <div className="info-icon">
                  <Icon size={16} />
                </div>
              )}
              <div className="info-content">
                <span className="info-label">{item.label}</span>
                <span className={`info-value ${item.valueClass || ''}`}>
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {alert && (
        <div className={`info-alert alert-${alert.type || 'warning'}`}>
          <alert.icon size={16} />
          <span>{alert.message}</span>
        </div>
      )}
    </div>
  );
}

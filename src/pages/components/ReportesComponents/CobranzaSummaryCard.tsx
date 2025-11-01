/**
 * COBRANZA SUMMARY CARD - Tarjeta de Resumen de Cobranza
 * Componente para mostrar Estado de Cuotas y Montos
 */

import './CobranzaSummaryCard.css';

interface SummaryItem {
  label: string;
  value: string | number;
  variant?: 'success' | 'warning' | 'danger' | 'primary' | 'default';
}

interface CobranzaSummaryCardProps {
  title: string;
  icon: string;
  items: SummaryItem[];
}

export default function CobranzaSummaryCard({ title, icon, items }: CobranzaSummaryCardProps) {
  return (
    <div className="rep-cobranza-card">
      <div className="rep-cobranza-header">
        <span className="rep-cobranza-icon">{icon}</span>
        <h4 className="rep-cobranza-title">{title}</h4>
      </div>
      <div className="rep-cobranza-body">
        {items.map((item, index) => (
          <div key={index} className="rep-cobranza-row">
            <span className="rep-cobranza-label">{item.label}</span>
            <span className={`rep-cobranza-value ${item.variant ? `rep-cobranza-${item.variant}` : ''}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

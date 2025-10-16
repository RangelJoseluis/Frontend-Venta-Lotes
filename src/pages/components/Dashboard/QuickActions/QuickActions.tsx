import { Plus, FileText, Wallet } from 'lucide-react';
import './QuickActions.css';

const QuickActions = () => {
  const actions = [
    {
      icon: Plus,
      title: 'Nuevo Lote',
      description: 'Agregar al inventario',
      color: 'slate'
    },
    {
      icon: FileText,
      title: 'Nueva Venta',
      description: 'Registrar venta',
      color: 'emerald'
    },
    {
      icon: Wallet,
      title: 'Registrar Pago',
      description: 'Aplicar a cuota',
      color: 'amber'
    }
  ];

  const colorClasses = {
    slate: { icon: 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600' },
    emerald: { icon: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100' },
    amber: { icon: 'bg-amber-50 text-amber-600 group-hover:bg-amber-100' }
  };

  return (
    <div className="quick-actions-container">
      <h3 className="quick-actions-title">Acciones Rápidas</h3>
      <div className="quick-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;
          const currentColor = colorClasses[action.color as keyof typeof colorClasses];

          return (
            <button key={action.title} className="quick-action-button group">
              <div className={`quick-action-icon ${currentColor.icon}`}>
                <Icon className="quick-action-icon-svg" />
              </div>
              <div className="quick-action-content">
                <p className="quick-action-title">{action.title}</p>
                <p className="quick-action-description">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

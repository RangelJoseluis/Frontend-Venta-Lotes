import { Plus, FileText, Wallet, AlertTriangle, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: Plus,
      title: 'Nuevo Lote',
      description: 'Agregar al inventario',
      color: 'slate',
      onClick: () => navigate('/lotes/nuevo')
    },
    {
      icon: FileText,
      title: 'Nueva Venta',
      description: 'Registrar venta',
      color: 'emerald',
      onClick: () => navigate('/ventas/crear')
    },
    {
      icon: Wallet,
      title: 'Registrar Pago',
      description: 'Aplicar a cuota',
      color: 'amber',
      onClick: () => navigate('/registrar-pago')
    },
    {
      icon: AlertTriangle,
      title: 'Gestión de Mora',
      description: 'Cuotas vencidas',
      color: 'red',
      onClick: () => navigate('/gestion-mora')
    },
    {
      icon: BarChart3,
      title: 'Reportes de Mora',
      description: 'Análisis y gráficas',
      color: 'blue',
      onClick: () => navigate('/reportes-mora')
    }
  ];

  const colorClasses = {
    slate: { icon: 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600' },
    emerald: { icon: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100' },
    amber: { icon: 'bg-amber-50 text-amber-600 group-hover:bg-amber-100' },
    red: { icon: 'bg-red-50 text-red-600 group-hover:bg-red-100' },
    blue: { icon: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100' }
  };

  return (
    <div className="w-full">
      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">Acciones Rápidas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          const currentColor = colorClasses[action.color as keyof typeof colorClasses];

          return (
            <button
              key={action.title}
              className="group bg-white border border-slate-200 rounded-xl p-4 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-300 text-left"
              onClick={action.onClick}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-all duration-200 ${currentColor.icon}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-slate-900 text-sm leading-tight">{action.title}</p>
                <p className="text-xs text-slate-600 leading-tight">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;

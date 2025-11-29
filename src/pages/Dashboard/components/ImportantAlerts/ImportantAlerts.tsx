import { AlertTriangle, Calendar, CheckCircle } from 'lucide-react';

interface Alerta {
  id: string;
  tipo: 'warning' | 'danger' | 'success' | 'info';
  titulo: string;
  descripcion: string;
  cantidad?: number;
}

interface ImportantAlertsProps {
  cuotasVencidas?: number;
  cuotasProximasVencer?: number;
  lotesDisponibles?: number;
  ventasActivas?: number;
}

const ImportantAlerts = ({
  cuotasVencidas = 0,
  cuotasProximasVencer = 0,
  lotesDisponibles = 30,
  ventasActivas = 18
}: ImportantAlertsProps) => {
  const alertas: Alerta[] = [];

  // Alerta de cuotas vencidas
  if (cuotasVencidas > 0) {
    alertas.push({
      id: 'cuotas-vencidas',
      tipo: 'danger',
      titulo: 'Cuotas Vencidas',
      descripcion: `Hay ${cuotasVencidas} cuota${cuotasVencidas > 1 ? 's' : ''} vencida${cuotasVencidas > 1 ? 's' : ''} que requieren atención inmediata`,
      cantidad: cuotasVencidas
    });
  }

  // Alerta de cuotas próximas a vencer
  if (cuotasProximasVencer > 0) {
    alertas.push({
      id: 'cuotas-proximas',
      tipo: 'warning',
      titulo: 'Cuotas Próximas a Vencer',
      descripcion: `${cuotasProximasVencer} cuota${cuotasProximasVencer > 1 ? 's' : ''} vence${cuotasProximasVencer > 1 ? 'n' : ''} en los próximos 7 días`,
      cantidad: cuotasProximasVencer
    });
  }

  // Información de lotes disponibles
  if (lotesDisponibles > 0) {
    alertas.push({
      id: 'lotes-disponibles',
      tipo: 'success',
      titulo: 'Lotes Disponibles',
      descripcion: `Hay ${lotesDisponibles} lote${lotesDisponibles > 1 ? 's' : ''} disponible${lotesDisponibles > 1 ? 's' : ''} para la venta`,
      cantidad: lotesDisponibles
    });
  }

  // Información de ventas activas
  if (ventasActivas > 0) {
    alertas.push({
      id: 'ventas-activas',
      tipo: 'info',
      titulo: 'Ventas Activas',
      descripcion: `${ventasActivas} venta${ventasActivas > 1 ? 's' : ''} activa${ventasActivas > 1 ? 's' : ''} en proceso de pago`,
      cantidad: ventasActivas
    });
  }

  const getIcono = (tipo: string) => {
    switch (tipo) {
      case 'danger':
      case 'warning':
        return <AlertTriangle size={24} />;
      case 'success':
        return <CheckCircle size={24} />;
      case 'info':
        return <Calendar size={24} />;
      default:
        return <AlertTriangle size={24} />;
    }
  };

  const getAlertStyles = (tipo: string) => {
    switch (tipo) {
      case 'danger':
        return {
          container: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/10 border-l-4 border-red-600 dark:border-red-500',
          icon: 'text-red-600 dark:text-red-400'
        };
      case 'warning':
        return {
          container: 'bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-900/10 border-l-4 border-amber-600 dark:border-amber-500',
          icon: 'text-amber-600 dark:text-amber-400'
        };
      case 'success':
        return {
          container: 'bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-900/10 border-l-4 border-emerald-600 dark:border-emerald-500',
          icon: 'text-emerald-600 dark:text-emerald-400'
        };
      case 'info':
        return {
          container: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 border-l-4 border-blue-600 dark:border-blue-500',
          icon: 'text-blue-600 dark:text-blue-400'
        };
      default:
        return {
          container: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10 border-l-4 border-blue-600 dark:border-blue-500',
          icon: 'text-blue-600 dark:text-blue-400'
        };
    }
  };

  if (alertas.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden w-full transition-colors duration-200">
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center gap-3 flex-wrap">
          <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white flex items-center gap-3 m-0">
            <CheckCircle size={24} />
            Estado del Sistema
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center p-12 sm:p-16 text-emerald-600 dark:text-emerald-500">
          <CheckCircle size={48} className="mb-4 opacity-70" />
          <p className="m-0 mb-2 text-base font-semibold text-slate-800 dark:text-white">Todo está en orden</p>
          <span className="m-0 text-sm text-slate-500 dark:text-slate-400">No hay alertas importantes en este momento</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden w-full h-full transition-colors duration-200 flex flex-col">
      <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center gap-3 flex-wrap">
        <h3 className="text-base md:text-lg font-bold text-slate-800 dark:text-white flex items-center gap-3 m-0">
          <AlertTriangle size={24} />
          Alertas Importantes
        </h3>
        <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap">
          {alertas.length} alerta{alertas.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="p-4 md:p-6 space-y-3">
        {alertas.map((alerta) => {
          const styles = getAlertStyles(alerta.tipo);
          return (
            <div
              key={alerta.id}
              className={`flex gap-3 md:gap-4 p-3.5 md:p-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${styles.container}`}
            >
              <div className={`flex-shrink-0 flex items-center justify-center ${styles.icon}`}>
                {getIcono(alerta.tipo)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1.5 gap-2 flex-col sm:flex-row sm:items-center">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white m-0">{alerta.titulo}</h4>
                  {alerta.cantidad !== undefined && (
                    <span className="bg-black/10 dark:bg-white/10 text-slate-800 dark:text-white px-2.5 py-0.5 rounded-xl text-xs font-bold">
                      {alerta.cantidad}
                    </span>
                  )}
                </div>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 m-0 leading-relaxed">{alerta.descripcion}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImportantAlerts;

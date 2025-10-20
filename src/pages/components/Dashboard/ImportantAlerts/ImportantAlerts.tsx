import { AlertTriangle, Calendar, CheckCircle } from 'lucide-react';
import './ImportantAlerts.css';

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

  const getColorClase = (tipo: string) => {
    switch (tipo) {
      case 'danger':
        return 'alert-danger';
      case 'warning':
        return 'alert-warning';
      case 'success':
        return 'alert-success';
      case 'info':
        return 'alert-info';
      default:
        return 'alert-info';
    }
  };

  if (alertas.length === 0) {
    return (
      <div className="important-alerts-card">
        <div className="important-alerts-header">
          <h3 className="important-alerts-title">
            <CheckCircle size={24} />
            Estado del Sistema
          </h3>
        </div>
        <div className="alerts-empty">
          <CheckCircle size={48} />
          <p>Todo está en orden</p>
          <span>No hay alertas importantes en este momento</span>
        </div>
      </div>
    );
  }

  return (
    <div className="important-alerts-card">
      <div className="important-alerts-header">
        <h3 className="important-alerts-title">
          <AlertTriangle size={24} />
          Alertas Importantes
        </h3>
        <span className="alerts-badge">
          {alertas.length} alerta{alertas.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="alerts-list">
        {alertas.map((alerta) => (
          <div key={alerta.id} className={`alert-item ${getColorClase(alerta.tipo)}`}>
            <div className="alert-icon">
              {getIcono(alerta.tipo)}
            </div>
            <div className="alert-content">
              <div className="alert-header-row">
                <h4 className="alert-title">{alerta.titulo}</h4>
                {alerta.cantidad !== undefined && (
                  <span className="alert-count">{alerta.cantidad}</span>
                )}
              </div>
              <p className="alert-description">{alerta.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImportantAlerts;

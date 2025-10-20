import { Clock, TrendingUp, AlertCircle } from 'lucide-react';
import './RecentActivity.css';

interface ActividadReciente {
  id: string;
  tipo: 'venta' | 'pago' | 'lote' | 'alerta';
  titulo: string;
  descripcion: string;
  fecha: string;
  icono: 'venta' | 'pago' | 'lote' | 'alerta';
}

interface RecentActivityProps {
  actividades?: ActividadReciente[];
}

const RecentActivity = ({ actividades = [] }: RecentActivityProps) => {
  // Actividades de ejemplo si no se proporcionan
  const actividadesDefault: ActividadReciente[] = [
    {
      id: '1',
      tipo: 'venta',
      titulo: 'Nueva venta registrada',
      descripcion: 'Venta VTA-018 - Lote L004',
      fecha: 'Hace 2 horas',
      icono: 'venta'
    },
    {
      id: '2',
      tipo: 'pago',
      titulo: 'Pago recibido',
      descripcion: 'Cuota 1/24 - Cliente Rivera Delgado',
      fecha: 'Hace 5 horas',
      icono: 'pago'
    },
    {
      id: '3',
      tipo: 'lote',
      titulo: 'Lote actualizado',
      descripcion: 'L004 cambió a estado "en_cuotas"',
      fecha: 'Hace 1 día',
      icono: 'lote'
    },
    {
      id: '4',
      tipo: 'alerta',
      titulo: 'Cuota próxima a vencer',
      descripcion: 'Cuota 2/24 vence en 3 días',
      fecha: 'Hace 2 días',
      icono: 'alerta'
    },
    {
      id: '5',
      tipo: 'venta',
      titulo: 'Nueva venta registrada',
      descripcion: 'Venta VTA-017 - Lote L003',
      fecha: 'Hace 3 días',
      icono: 'venta'
    }
  ];

  const actividadesMostrar = actividades.length > 0 ? actividades : actividadesDefault;

  const getIcono = (tipo: string) => {
    switch (tipo) {
      case 'venta':
        return <TrendingUp size={20} />;
      case 'pago':
        return <Clock size={20} />;
      case 'lote':
        return <TrendingUp size={20} />;
      case 'alerta':
        return <AlertCircle size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  const getColorClase = (tipo: string) => {
    switch (tipo) {
      case 'venta':
        return 'activity-icon-success';
      case 'pago':
        return 'activity-icon-primary';
      case 'lote':
        return 'activity-icon-warning';
      case 'alerta':
        return 'activity-icon-danger';
      default:
        return 'activity-icon-primary';
    }
  };

  return (
    <div className="recent-activity-card">
      <div className="recent-activity-header">
        <h3 className="recent-activity-title">
          <Clock size={24} />
          Actividad Reciente
        </h3>
        <span className="recent-activity-badge">
          {actividadesMostrar.length} eventos
        </span>
      </div>

      <div className="recent-activity-list">
        {actividadesMostrar.map((actividad) => (
          <div key={actividad.id} className="activity-item">
            <div className={`activity-icon ${getColorClase(actividad.tipo)}`}>
              {getIcono(actividad.tipo)}
            </div>
            <div className="activity-content">
              <h4 className="activity-title">{actividad.titulo}</h4>
              <p className="activity-description">{actividad.descripcion}</p>
              <span className="activity-time">{actividad.fecha}</span>
            </div>
          </div>
        ))}
      </div>

      {actividadesMostrar.length === 0 && (
        <div className="activity-empty">
          <Clock size={48} />
          <p>No hay actividad reciente</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;

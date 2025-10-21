import { useState, useEffect } from 'react';
import { Clock, TrendingUp, AlertCircle, DollarSign, User } from 'lucide-react';
import actividadesService from '../../../../services/actividades.service';
import type { ActividadReciente } from '../../../../types';
import './RecentActivity.css';

/**
 * COMPONENTE DE ACTIVIDADES RECIENTES
 * 
 * Muestra las últimas actividades del sistema (ventas, pagos, clientes)
 * obtenidas del backend en tiempo real.
 * 
 * CARACTERÍSTICAS:
 * - Consulta actividades reales del backend
 * - Actualiza automáticamente al montar el componente
 * - Muestra iconos y colores según el tipo de actividad
 * - Formatea fechas de forma legible
 */

const RecentActivity = () => {
  const [actividades, setActividades] = useState<ActividadReciente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Cargar actividades recientes del backend
   */
  useEffect(() => {
    const cargarActividades = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Obtener últimas 10 actividades
        const data = await actividadesService.obtenerActividadesRecientes(10);
        setActividades(data);
        
        console.log('✅ Actividades cargadas:', data);
      } catch (err) {
        console.error('❌ Error al cargar actividades:', err);
        setError('No se pudieron cargar las actividades');
        setActividades([]); // Array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    cargarActividades();
  }, []);

  /**
   * Formatear fecha a texto legible (ej: "Hace 2 horas")
   */
  const formatearFecha = (fechaISO: string): string => {
    const fecha = new Date(fechaISO);
    const ahora = new Date();
    const diferencia = ahora.getTime() - fecha.getTime();
    
    const minutos = Math.floor(diferencia / 60000);
    const horas = Math.floor(diferencia / 3600000);
    const dias = Math.floor(diferencia / 86400000);
    
    if (minutos < 1) return 'Hace un momento';
    if (minutos < 60) return `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    if (horas < 24) return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
    if (dias < 7) return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
    
    return fecha.toLocaleDateString('es-CO', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  /**
   * Obtener icono según el tipo de actividad
   */
  const getIcono = (tipo: string) => {
    switch (tipo) {
      case 'venta':
        return <TrendingUp size={20} />;
      case 'pago':
        return <DollarSign size={20} />;
      case 'cliente':
        return <User size={20} />;
      case 'lote':
        return <TrendingUp size={20} />;
      case 'cuota':
        return <AlertCircle size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  /**
   * Obtener clase de color según el tipo de actividad
   */
  const getColorClase = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'activity-icon-primary';
      case 'green':
        return 'activity-icon-success';
      case 'yellow':
        return 'activity-icon-warning';
      case 'red':
        return 'activity-icon-danger';
      case 'purple':
        return 'activity-icon-info';
      default:
        return 'activity-icon-primary';
    }
  };

  // Mostrar loading
  if (loading) {
    return (
      <div className="recent-activity-card">
        <div className="recent-activity-header">
          <h3 className="recent-activity-title">
            <Clock size={24} />
            Actividad Reciente
          </h3>
        </div>
        <div className="activity-loading">
          <Clock size={48} className="animate-spin" />
          <p>Cargando actividades...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="recent-activity-card">
        <div className="recent-activity-header">
          <h3 className="recent-activity-title">
            <Clock size={24} />
            Actividad Reciente
          </h3>
        </div>
        <div className="activity-error">
          <AlertCircle size={48} />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recent-activity-card">
      <div className="recent-activity-header">
        <h3 className="recent-activity-title">
          <Clock size={24} />
          Actividad Reciente
        </h3>
        <span className="recent-activity-badge">
          {actividades.length} eventos
        </span>
      </div>

      <div className="recent-activity-list">
        {actividades.map((actividad, index) => (
          <div key={`${actividad.tipo}-${index}`} className="activity-item">
            <div className={`activity-icon ${getColorClase(actividad.color)}`}>
              {actividad.icono ? (
                <span className="activity-emoji">{actividad.icono}</span>
              ) : (
                getIcono(actividad.tipo)
              )}
            </div>
            <div className="activity-content">
              <p className="activity-description">{actividad.descripcion}</p>
              <span className="activity-time">{formatearFecha(actividad.fecha)}</span>
            </div>
          </div>
        ))}
      </div>

      {actividades.length === 0 && (
        <div className="activity-empty">
          <Clock size={48} />
          <p>No hay actividad reciente</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;

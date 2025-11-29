import { useState, useEffect } from 'react';
import { Clock, TrendingUp, AlertCircle, DollarSign, User } from 'lucide-react';
import actividadesService from '../../../../services/actividades.service';
import type { ActividadReciente } from '../../../../types';

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
   * Obtener clases de color según el color de actividad
   */
  const getColorClasses = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-600';
      case 'green':
        return 'bg-emerald-100 text-emerald-600';
      case 'yellow':
        return 'bg-amber-100 text-amber-600';
      case 'red':
        return 'bg-red-100 text-red-600';
      case 'purple':
        return 'bg-purple-100 text-purple-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  };

  // Mostrar loading
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center gap-3 flex-wrap">
          <h3 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-3 m-0">
            <Clock size={24} />
            Actividad Reciente
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center p-12 sm:p-16 text-slate-600">
          <Clock size={48} className="mb-4 opacity-70 animate-spin" />
          <p className="text-sm text-slate-500">Cargando actividades...</p>
        </div>
      </div>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center gap-3 flex-wrap">
          <h3 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-3 m-0">
            <Clock size={24} />
            Actividad Reciente
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center p-12 sm:p-16 text-red-600">
          <AlertCircle size={48} className="mb-4 opacity-70" />
          <p className="text-sm text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center gap-3 flex-wrap">
        <h3 className="text-base md:text-lg font-bold text-slate-800 flex items-center gap-3 m-0">
          <Clock size={24} />
          Actividad Reciente
        </h3>
        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap">
          {actividades.length} eventos
        </span>
      </div>

      <div className="p-4 md:p-6">
        {actividades.length > 0 ? (
          <div className="space-y-3">
            {actividades.map((actividad, index) => (
              <div key={`${actividad.tipo}-${index}`} className="flex gap-3 items-start p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(actividad.color)}`}>
                  {actividad.icono ? (
                    <span className="text-xl">{actividad.icono}</span>
                  ) : (
                    getIcono(actividad.tipo)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 font-medium leading-tight mb-1">
                    {actividad.descripcion}
                  </p>
                  <span className="text-xs text-slate-500">
                    {formatearFecha(actividad.fecha)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-slate-500">
            <Clock size={48} className="mb-4 opacity-50" />
            <p className="text-sm">No hay actividad reciente</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;

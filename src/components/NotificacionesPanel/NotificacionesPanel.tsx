/**
 * COMPONENTE: PANEL DE NOTIFICACIONES
 * 
 * Dropdown de notificaciones para el header
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, X, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';
import { notificacionesService } from '../../services/notificaciones.service';
import type { Notificacion } from '../../services/notificaciones.service';

export default function NotificacionesPanel() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([]);
  const [contador, setContador] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar contador inicial
  useEffect(() => {
    cargarContador();
    // Actualizar cada 60 segundos
    const interval = setInterval(cargarContador, 60000);
    return () => clearInterval(interval);
  }, []);

  // Cargar notificaciones cuando se abre el panel
  useEffect(() => {
    if (isOpen) {
      cargarNotificaciones();
    }
  }, [isOpen]);

  const cargarContador = async () => {
    try {
      const count = await notificacionesService.contarNoLeidas();
      setContador(count);
    } catch (err) {
      console.error('Error al cargar contador:', err);
    }
  };

  const cargarNotificaciones = async () => {
    try {
      setIsLoading(true);
      const data = await notificacionesService.obtenerTodas();
      setNotificaciones(data.slice(0, 10)); // Mostrar solo las 10 más recientes
    } catch (err) {
      console.error('Error al cargar notificaciones:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getIconByTipo = (tipo: Notificacion['tipo']) => {
    switch (tipo) {
      case 'cuota_vencida':
        return <AlertTriangle size={18} />;
      case 'cuota_proxima_vencer':
        return <Calendar size={18} />;
      case 'mora_acumulada':
        return <TrendingUp size={18} />;
      default:
        return <Bell size={18} />;
    }
  };

  const getColorClasses = (prioridad: Notificacion['prioridad']) => {
    switch (prioridad) {
      case 'urgente':
        return 'bg-red-100 text-red-600';
      case 'media':
        return 'bg-amber-100 text-amber-600';
      case 'baja':
        return 'bg-blue-100 text-blue-600';
      default:
        return 'bg-amber-100 text-amber-600';
    }
  };

  const handleClickNotificacion = () => {
    // Navegar a la gestión de mora
    navigate('/gestion-mora');
    setIsOpen(false);
  };

  const formatearTiempo = (fecha: string) => {
    const ahora = new Date();
    const fechaNotif = new Date(fecha);
    const diffMs = ahora.getTime() - fechaNotif.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHoras = Math.floor(diffMins / 60);
    const diffDias = Math.floor(diffHoras / 24);

    if (diffMins < 60) {
      return `Hace ${diffMins} min`;
    } else if (diffHoras < 24) {
      return `Hace ${diffHoras}h`;
    } else {
      return `Hace ${diffDias}d`;
    }
  };

  return (
    <div className="relative">
      {/* Botón de notificaciones */}
      <button
        className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notificaciones"
      >
        <Bell size={20} />
        {contador > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm animate-pulse">
            {contador > 99 ? '99+' : contador}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Panel */}
          <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden flex flex-col max-h-[600px]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Notificaciones</h3>
              <button
                className="p-1 rounded-md hover:bg-slate-200 text-slate-500 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            {/* Lista de notificaciones */}
            <div className="flex-1 overflow-y-auto max-h-[400px]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-500 gap-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm">Cargando...</p>
                </div>
              ) : notificaciones.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-3">
                  <Bell size={40} className="opacity-50" />
                  <p className="text-sm">No hay notificaciones</p>
                </div>
              ) : (
                notificaciones.map((notif) => (
                  <div
                    key={notif.uid}
                    className={`flex gap-3 px-4 py-3 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 relative ${notif.leida ? 'opacity-60' : ''
                      }`}
                    onClick={handleClickNotificacion}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(notif.prioridad)}`}>
                      {getIconByTipo(notif.tipo)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-800 mb-1">{notif.titulo}</div>
                      <div className="text-xs text-slate-600 leading-snug mb-2 line-clamp-2">{notif.mensaje}</div>
                      <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400">
                        <span className="font-medium truncate">{notif.clienteNombre}</span>
                        <span className="flex-shrink-0">{formatearTiempo(notif.fechaCreacion)}</span>
                      </div>
                    </div>
                    {!notif.leida && (
                      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notificaciones.length > 0 && (
              <div className="p-3 border-t border-slate-100 bg-slate-50">
                <button
                  className="w-full py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100"
                  onClick={() => {
                    navigate('/gestion-mora');
                    setIsOpen(false);
                  }}
                >
                  Ver todas las notificaciones
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

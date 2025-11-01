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
import './NotificacionesPanel.css';

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

  const getColorByPrioridad = (prioridad: Notificacion['prioridad']) => {
    switch (prioridad) {
      case 'urgente':
        return 'urgente';
      case 'media':
        return 'media';
      case 'baja':
        return 'baja';
      default:
        return 'media';
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
    <div className="notificaciones-panel">
      {/* Botón de notificaciones */}
      <button
        className="notif-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notificaciones"
      >
        <Bell size={20} />
        {contador > 0 && (
          <span className="notif-badge">{contador > 99 ? '99+' : contador}</span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="notif-overlay" onClick={() => setIsOpen(false)} />

          {/* Panel */}
          <div className="notif-dropdown">
            {/* Header */}
            <div className="notif-header">
              <h3>Notificaciones</h3>
              <button className="notif-close" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>
            </div>

            {/* Lista de notificaciones */}
            <div className="notif-lista">
              {isLoading ? (
                <div className="notif-loading">
                  <div className="spinner-small"></div>
                  <p>Cargando...</p>
                </div>
              ) : notificaciones.length === 0 ? (
                <div className="notif-vacio">
                  <Bell size={48} className="bell-empty" />
                  <p>No hay notificaciones</p>
                </div>
              ) : (
                notificaciones.map((notif) => (
                  <div
                    key={notif.uid}
                    className={`notif-item ${getColorByPrioridad(notif.prioridad)} ${
                      notif.leida ? 'leida' : ''
                    }`}
                    onClick={handleClickNotificacion}
                  >
                    <div className={`notif-icon ${getColorByPrioridad(notif.prioridad)}`}>
                      {getIconByTipo(notif.tipo)}
                    </div>
                    <div className="notif-content">
                      <div className="notif-titulo">{notif.titulo}</div>
                      <div className="notif-mensaje">{notif.mensaje}</div>
                      <div className="notif-footer">
                        <span className="notif-cliente">{notif.clienteNombre}</span>
                        <span className="notif-tiempo">{formatearTiempo(notif.fechaCreacion)}</span>
                      </div>
                    </div>
                    {!notif.leida && <div className="notif-dot"></div>}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notificaciones.length > 0 && (
              <div className="notif-footer-panel">
                <button
                  className="notif-ver-todas"
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

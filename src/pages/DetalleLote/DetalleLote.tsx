/**
 * PÁGINA: DETALLE DE LOTE - Versión Modular
 * Vista completa de un lote con toda su información
 * Incluye: datos básicos, mapa, cuotas, pagos, galería
 */

import { useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import HeaderDetalleLote from './components/HeaderDetalleLote/HeaderDetalleLote';
import InfoBasica from './components/InfoBasica/InfoBasica';
import MapaUbicacion from './components/MapaUbicacion/MapaUbicacion';
import SeccionCaracteristicas from './components/SeccionCaracteristicas/SeccionCaracteristicas';
import SeccionServicios from './components/SeccionServicios/SeccionServicios';
import SeccionVenta from './components/SeccionVenta/SeccionVenta';
import TablaCuotas from './components/TablaCuotas/TablaCuotas';
import { useDetalleLote } from './hooks/useDetalleLote';
import { MENSAJES } from './constants';
import './DetalleLote.css';

const DetalleLote = () => {
  const { uid } = useParams<{ uid: string }>();
  
  // Hook personalizado que carga todos los datos del lote
  const {
    lote,
    venta,
    cuotas,
    loading,
    loadingCuotas,
    error,
    puntosPoligono,
    centroMapa,
  } = useDetalleLote(uid);

  // ============================================================================
  // ESTADOS DE CARGA Y ERROR
  // ============================================================================
  
  if (loading) {
    return (
      <div className="detalle-lote-container">
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>{MENSAJES.CARGANDO}</p>
        </div>
      </div>
    );
  }

  if (error || !lote) {
    return (
      <div className="detalle-lote-container">
        <div className="error-state">
          <AlertCircle size={48} color="#ef4444" />
          <h2>{MENSAJES.ERROR}</h2>
          <p>{error || MENSAJES.NO_ENCONTRADO}</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================================

  return (
    <div className="detalle-lote-container">
      {/* Header con título, estado y botones de acción */}
      <HeaderDetalleLote lote={lote} venta={venta} />

      {/* Contenido principal */}
      <div className="detalle-content">
        {/* Columna izquierda - Información principal */}
        <div className="detalle-main">
          {/* Información básica del lote */}
          <InfoBasica lote={lote} />

          {/* Modelo de casa (si existe) - Movido arriba */}
          <SeccionCaracteristicas lote={lote} />

          {/* Mapa con ubicación y polígono */}
          {centroMapa && (
            <MapaUbicacion
              lote={lote}
              centroMapa={centroMapa}
              puntosPoligono={puntosPoligono}
            />
          )}

          {/* Servicios disponibles (si existen) */}
          <SeccionServicios lote={lote} />
        </div>

        {/* Columna derecha - Información de venta y cuotas */}
        <div className="detalle-sidebar">
          {/* Información de venta (si el lote está vendido/en cuotas) */}
          {venta && <SeccionVenta venta={venta} />}

          {/* Tabla de cuotas (si existen) */}
          {!loadingCuotas && cuotas.length > 0 && (
            <TablaCuotas cuotas={cuotas} />
          )}

          {/* Mensaje si no hay venta */}
          {(lote.estado === 'en_cuotas' || lote.estado === 'vendido') && !venta && !loadingCuotas && (
            <div className="detalle-card">
              <div className="info-alert">
                <AlertCircle size={16} />
                <p>{MENSAJES.SIN_VENTA}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalleLote;

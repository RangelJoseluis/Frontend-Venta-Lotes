/**
 * PÁGINA: DETALLE DE LOTE - Migrado a Tailwind CSS
 * Vista completa de un lote con toda su información
 * Incluye: datos básicos, mapa, cuotas, pagos, galería
 */

import { useParams } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';
import HeaderDetalleLote from './components/HeaderDetalleLote/HeaderDetalleLote';
import InfoBasica from './components/InfoBasica/InfoBasica';
import MapaUbicacion from './components/MapaUbicacion/MapaUbicacion';
import SeccionCaracteristicas from './components/SeccionCaracteristicas/SeccionCaracteristicas';
import SeccionServicios from './components/SeccionServicios/SeccionServicios';
import SeccionVenta from './components/SeccionVenta/SeccionVenta';
import TablaCuotas from './components/TablaCuotas/TablaCuotas';
import { useDetalleLote } from './hooks/useDetalleLote';
import { MENSAJES } from './constants';

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
      <div className="min-h-screen bg-fondo-pagina dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 size={48} className="text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">{MENSAJES.CARGANDO}</p>
        </div>
      </div>
    );
  }

  if (error || !lote) {
    return (
      <div className="min-h-screen bg-fondo-pagina dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle size={48} className="text-red-600 dark:text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{MENSAJES.ERROR}</h2>
          <p className="text-slate-600 dark:text-slate-400">{error || MENSAJES.NO_ENCONTRADO}</p>
        </div>
      </div>
    );
  }

  // ============================================================================
  // RENDERIZADO PRINCIPAL
  // ============================================================================

  return (
    <div className="min-h-screen bg-fondo-pagina dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header con título, estado y botones de acción */}
        <HeaderDetalleLote lote={lote} venta={venta} />

        {/* Contenido principal */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna izquierda - Información principal (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información básica del lote */}
            <InfoBasica lote={lote} />

            {/* Características y modelo de casa */}
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

          {/* Columna derecha - Información de venta y cuotas (1/3) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Información de venta (si el lote está vendido/en cuotas) */}
            {venta && <SeccionVenta venta={venta} />}

            {/* Tabla de cuotas (si existen) */}
            {!loadingCuotas && cuotas.length > 0 && (
              <TablaCuotas cuotas={cuotas} />
            )}

            {/* Mensaje si no hay venta */}
            {(lote.estado === 'en_cuotas' || lote.estado === 'vendido') && !venta && !loadingCuotas && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <AlertCircle size={16} />
                  <p className="text-sm">{MENSAJES.SIN_VENTA}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleLote;

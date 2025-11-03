/**
 * COMPONENTE: LOTE DETAILS PANEL
 * 
 * Panel lateral que muestra los detalles completos de un lote seleccionado:
 * - Header con código y badge
 * - Estado del lote
 * - Información general (superficie, precio, ubicación, etc.)
 * - Modelo de casa
 * - Imágenes
 * - Fechas
 * - Botones de acción (ver detalles, editar)
 */

import React from 'react';
import { X, Maximize2, DollarSign, MapPin, Home, Edit } from 'lucide-react';
import { COLORES_MAPA } from '../../../../types/mapa';
import { formatearPrecio } from '../../utils/formatters';
import type { LoteDetailsPanelProps } from '../../types';
import './LoteDetailsPanel.css';

const LoteDetailsPanel: React.FC<LoteDetailsPanelProps> = ({
  loteSeleccionado,
  setLoteSeleccionado,
  rol,
  onNavigate
}) => {
  if (!loteSeleccionado) return null;

  return (
    <div className="mapalotes-panel-detalles-overlay" onClick={() => setLoteSeleccionado(null)}>
      <div className="mapalotes-panel-detalles" onClick={(e) => e.stopPropagation()}>
        {/* Header del panel */}
        <div className="mapalotes-detalles-header">
          <div className="mapalotes-detalles-titulo">
            <h2>{loteSeleccionado.codigo}</h2>
            {loteSeleccionado.esDelCliente && (
              <span className="mapalotes-badge-mi-lote">⭐ Mi Lote</span>
            )}
          </div>
          <button onClick={() => setLoteSeleccionado(null)} className="mapalotes-btn-cerrar-panel">
            <X size={20} />
          </button>
        </div>

        {/* Contenido del panel */}
        <div className="mapalotes-detalles-content">
          {/* Estado del lote */}
          <div className="mapalotes-detalles-seccion">
            <div className="mapalotes-detalles-estado">
              <span 
                className="mapalotes-badge-estado-grande"
                style={{ 
                  backgroundColor: COLORES_MAPA[loteSeleccionado.estado],
                  color: 'white'
                }}
              >
                {loteSeleccionado.estado.replace('_', ' ').toUpperCase()}
              </span>
            </div>
          </div>

          {/* Información principal */}
          <div className="mapalotes-detalles-seccion">
            <h3>Información General</h3>
            <div className="mapalotes-detalles-grid">
              <div className="mapalotes-detalle-item">
                <div className="mapalotes-detalle-icono">
                  <Maximize2 size={20} />
                </div>
                <div className="mapalotes-detalle-info">
                  <span className="mapalotes-detalle-label">Superficie</span>
                  <span className="mapalotes-detalle-valor">{loteSeleccionado.superficie} m²</span>
                </div>
              </div>

              <div className="mapalotes-detalle-item">
                <div className="mapalotes-detalle-icono">
                  <DollarSign size={20} />
                </div>
                <div className="mapalotes-detalle-info">
                  <span className="mapalotes-detalle-label">Precio</span>
                  <span className="mapalotes-detalle-valor">{formatearPrecio(loteSeleccionado.precio)}</span>
                </div>
              </div>

              <div className="mapalotes-detalle-item">
                <div className="mapalotes-detalle-icono">
                  <MapPin size={20} />
                </div>
                <div className="mapalotes-detalle-info">
                  <span className="mapalotes-detalle-label">Ubicación</span>
                  <span className="mapalotes-detalle-valor">{loteSeleccionado.ubicacion}</span>
                </div>
              </div>

              {loteSeleccionado.topografia && (
                <div className="mapalotes-detalle-item">
                  <div className="mapalotes-detalle-icono">
                    <Home size={20} />
                  </div>
                  <div className="mapalotes-detalle-info">
                    <span className="mapalotes-detalle-label">Topografía</span>
                    <span className="mapalotes-detalle-valor">{loteSeleccionado.topografia}</span>
                  </div>
                </div>
              )}

              {loteSeleccionado.estadoDocumentacion && (
                <div className="mapalotes-detalle-item">
                  <div className="mapalotes-detalle-icono">
                    <Home size={20} />
                  </div>
                  <div className="mapalotes-detalle-info">
                    <span className="mapalotes-detalle-label">Documentación</span>
                    <span className="mapalotes-detalle-valor">{loteSeleccionado.estadoDocumentacion}</span>
                  </div>
                </div>
              )}

              <div className="mapalotes-detalle-item">
                <div className="mapalotes-detalle-icono">
                  <Home size={20} />
                </div>
                <div className="mapalotes-detalle-info">
                  <span className="mapalotes-detalle-label">Amueblado</span>
                  <span className="mapalotes-detalle-valor">{loteSeleccionado.amueblado ? 'Sí' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Modelo de casa */}
          {loteSeleccionado.modeloCasa && (
            <div className="mapalotes-detalles-seccion">
              <h3>Modelo de Casa</h3>
              <div className="mapalotes-modelo-casa-card">
                <h4>{loteSeleccionado.modeloCasa.nombre}</h4>
                <p className="mapalotes-modelo-precio">
                  Precio base: {formatearPrecio(loteSeleccionado.modeloCasa.precioBase)}
                </p>
                {loteSeleccionado.modeloCasa.descripcion && (
                  <p className="mapalotes-modelo-descripcion">{loteSeleccionado.modeloCasa.descripcion}</p>
                )}
              </div>
            </div>
          )}

          {/* Imágenes */}
          {loteSeleccionado.imagenesUrls && (
            (() => {
              // Parsear imagenesUrls (puede ser string separado por comas o array)
              const imagenesValue = loteSeleccionado.imagenesUrls as any;
              const urls: string[] = typeof imagenesValue === 'string'
                ? imagenesValue.split(',').map((url: string) => url.trim()).filter((url: string) => url.length > 0)
                : Array.isArray(imagenesValue)
                ? imagenesValue
                : [];
              
              return urls.length > 0 ? (
                <div className="mapalotes-detalles-seccion">
                  <h3>Imágenes</h3>
                  <div className="mapalotes-imagenes-grid">
                    {urls.map((url: string, index: number) => (
                      <img 
                        key={index} 
                        src={url} 
                        alt={`${loteSeleccionado.codigo} - Imagen ${index + 1}`}
                        className="mapalotes-lote-imagen"
                      />
                    ))}
                  </div>
                </div>
              ) : null;
            })()
          )}

          {/* Fechas */}
          <div className="mapalotes-detalles-seccion">
            <h3>Información Adicional</h3>
            <div className="mapalotes-detalles-fechas">
              <div className="mapalotes-fecha-item">
                <span className="mapalotes-fecha-label">Creado:</span>
                <span className="mapalotes-fecha-valor">
                  {new Date(loteSeleccionado.creadoEn).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="mapalotes-fecha-item">
                <span className="mapalotes-fecha-label">Actualizado:</span>
                <span className="mapalotes-fecha-valor">
                  {new Date(loteSeleccionado.actualizadoEn).toLocaleDateString('es-CO', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="mapalotes-detalles-acciones">
            <button 
              className="mapalotes-btn-ver-detalles"
              onClick={() => onNavigate(`/lotes/${loteSeleccionado.uid}`)}
            >
              <Home size={16} />
              Ver Detalles Completos
            </button>
            {rol === 'admin' && (
              <button 
                className="mapalotes-btn-editar-lote"
                onClick={() => onNavigate(`/lotes/${loteSeleccionado.uid}/editar`)}
              >
                <Edit size={16} />
                Editar Lote
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoteDetailsPanel;

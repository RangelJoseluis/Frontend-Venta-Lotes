// Componente TabHistorial - Muestra el historial de cambios de estado de lotes
import { useState } from 'react';
import { Search, History } from 'lucide-react';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import type { Lote, CambioEstadoLote } from '../../types';
import './TabHistorial.css';

interface TabHistorialProps {
  lotes: Lote[];
  loteSeleccionado: string;
  historialLote: CambioEstadoLote[];
  loadingHistorial: boolean;
  onLoteChange: (loteUid: string) => void;
}

const TabHistorial = ({
  lotes,
  loteSeleccionado,
  historialLote,
  loadingHistorial,
  onLoteChange,
}: TabHistorialProps) => {
  const [busquedaLote, setBusquedaLote] = useState('');

  // Filtrar lotes por búsqueda
  const lotesFiltrados = lotes.filter((lote) =>
    lote.codigo?.toLowerCase().includes(busquedaLote.toLowerCase())
  );

  // Obtener información del lote seleccionado
  const loteInfo = lotes.find((l) => l.uid === loteSeleccionado);

  return (
    <div className="historial-section">
      <h2 className="section-title">Historial de Cambios de Lote</h2>

      {/* Selector de Lote */}
      <div className="historial-selector-container">
        <div className="selector-header">
          <h3 className="selector-title">
            <Search size={20} />
            Seleccionar Lote
          </h3>
          <p className="selector-subtitle">
            Busca y selecciona un lote para ver su historial de cambios
          </p>
        </div>

        <div className="selector-content">
          {/* Buscador */}
          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por código de lote..."
              value={busquedaLote}
              onChange={(e) => setBusquedaLote(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Selector de Lote */}
          <div className="lote-select-wrapper">
            <select
              value={loteSeleccionado}
              onChange={(e) => onLoteChange(e.target.value)}
              className="lote-select"
            >
              <option value="">-- Selecciona un lote --</option>
              {lotesFiltrados.map((lote) => {
                const precio = (lote as any).precioLista || lote.precio || 0;
                return (
                  <option key={lote.uid} value={lote.uid}>
                    {lote.codigo} - {lote.estado} - {formatCurrency(precio)}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Información del lote seleccionado */}
          {loteSeleccionado && loteInfo && (
            <div className="lote-info-card">
              <div className="lote-info-item">
                <span className="label">Código:</span>
                <span className="value">{loteInfo.codigo}</span>
              </div>
              <div className="lote-info-item">
                <span className="label">Estado:</span>
                <span className={`badge badge-${loteInfo.estado.toLowerCase()}`}>
                  {loteInfo.estado}
                </span>
              </div>
              <div className="lote-info-item">
                <span className="label">Superficie:</span>
                <span className="value">
                  {(loteInfo as any)?.superficieM2 || loteInfo?.superficie || 0} m²
                </span>
              </div>
              <div className="lote-info-item">
                <span className="label">Precio:</span>
                <span className="value">
                  {formatCurrency((loteInfo as any)?.precioLista || loteInfo?.precio || 0)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabla de Historial */}
      {loteSeleccionado && (
        <div className="historial-tabla-container">
          <div className="tabla-header">
            <h3 className="tabla-title">
              <History size={24} />
              Historial de Cambios ({historialLote.length})
            </h3>
          </div>

          {loadingHistorial ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Cargando historial...</p>
            </div>
          ) : historialLote.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h4>Sin cambios registrados</h4>
              <p>Este lote no tiene cambios de estado registrados en el sistema</p>
            </div>
          ) : (
            <div className="tabla-scroll">
              <table className="historial-tabla">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Estado Anterior</th>
                    <th>Estado Nuevo</th>
                    <th>Motivo</th>
                    <th>Usuario</th>
                    <th>Observaciones</th>
                    <th>Requiere Aprobación</th>
                  </tr>
                </thead>
                <tbody>
                  {historialLote.map((cambio) => (
                    <tr key={cambio.uid}>
                      <td>
                        <div className="fecha-info">
                          <strong>{formatDateTime(cambio.fechaCambio).split(',')[0]}</strong>
                          <span className="hora">{formatDateTime(cambio.fechaCambio).split(',')[1]}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge badge-${cambio.estadoAnterior?.toLowerCase()}`}>
                          {cambio.estadoAnterior || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge badge-${cambio.estadoNuevo?.toLowerCase()}`}>
                          {cambio.estadoNuevo || 'N/A'}
                        </span>
                      </td>
                      <td>{cambio.motivo || '-'}</td>
                      <td>{cambio.usuario || 'Sistema'}</td>
                      <td className="observaciones-cell">
                        {cambio.observaciones || '-'}
                      </td>
                      <td>
                        <span className={`badge ${cambio.requiereAprobacion ? 'badge-warning' : 'badge-success'}`}>
                          {cambio.requiereAprobacion ? 'Sí' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TabHistorial;

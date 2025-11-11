// Componente InfoBasica - Información básica del lote
import { FileText, CheckCircle } from 'lucide-react';
import { formatearPrecio } from '../../utils/formatters';
import type { Lote } from '../../types';
import './InfoBasica.css';

interface InfoBasicaProps {
  lote: Lote;
}

const InfoBasica = ({ lote }: InfoBasicaProps) => {
  return (
    <div className="detalle-card">
      <h2 className="card-title">
        <FileText size={20} />
        Información Básica
      </h2>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Código</span>
          <span className="info-value">{lote.codigo}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Precio de Lista</span>
          <span className="info-value precio">{formatearPrecio(lote.precioLista)}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Superficie</span>
          <span className="info-value">{parseFloat(lote.superficieM2).toFixed(2)} m²</span>
        </div>
        <div className="info-item">
          <span className="info-label">Dimensiones</span>
          <span className="info-value">
            {parseFloat(lote.anchoM).toFixed(2)}m × {parseFloat(lote.largoM).toFixed(2)}m
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Dirección</span>
          <span className="info-value">{lote.direccion}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Manzana</span>
          <span className="info-value">{lote.manzana}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Número de Lote</span>
          <span className="info-value">{lote.numeroLote}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Topografía</span>
          <span className="info-value">{lote.topografia}</span>
        </div>
        {lote.orientacion && (
          <div className="info-item">
            <span className="info-label">Orientación</span>
            <span className="info-value">{lote.orientacion}</span>
          </div>
        )}
        {lote.vista && (
          <div className="info-item">
            <span className="info-label">Vista</span>
            <span className="info-value">{lote.vista}</span>
          </div>
        )}
        <div className="info-item">
          <span className="info-label">Amueblado</span>
          <span className="info-value">
            {lote.amueblado ? (
              <span style={{ color: '#10b981' }}>
                <CheckCircle size={16} style={{ display: 'inline', marginRight: '0.25rem' }} />
                Sí
              </span>
            ) : (
              <span style={{ color: '#64748b' }}>No</span>
            )}
          </span>
        </div>
        {lote.observaciones && (
          <div className="info-item full-width">
            <span className="info-label">Observaciones</span>
            <span className="info-value">{lote.observaciones}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoBasica;

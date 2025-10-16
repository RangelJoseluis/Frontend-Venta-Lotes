/**
 * PÁGINA: NUEVO LOTE
 * Formulario para crear un nuevo lote en el sistema
 * Diseño limpio sin sidebar para mejor experiencia de usuario
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Save, 
  AlertCircle, 
  CheckCircle, 
  Home, 
  FileText, 
  Ruler, 
  MapPin, 
  Settings,
  MessageSquare 
} from 'lucide-react';
import { lotesService } from '../services/lotes.service';
import { getErrorMessage } from '../services/http.service';
import type { CrearLoteDto } from '../types';
import './NuevoLote.css';

// Esquema de validación con Zod
const loteSchema = z.object({
  codigo: z.string().min(1, 'El código es requerido').max(20, 'Máximo 20 caracteres'),
  anchoM: z.number().min(1, 'El ancho debe ser mayor a 0'),
  largoM: z.number().min(1, 'El largo debe ser mayor a 0'),
  superficieM2: z.number().min(1, 'La superficie debe ser mayor a 0'),
  precioLista: z.number().min(1, 'El precio debe ser mayor a 0'),
  direccion: z.string().min(1, 'La dirección es requerida'),
  manzana: z.string().min(1, 'La manzana es requerida'),
  numeroLote: z.string().min(1, 'El número de lote es requerido'),
  topografia: z.enum(['plano', 'inclinado', 'irregular']),
  orientacion: z.enum(['norte', 'sur', 'este', 'oeste', 'noreste', 'noroeste', 'sureste', 'suroeste']).optional(),
  vista: z.enum(['ciudad', 'montaña', 'mar', 'parque', 'calle', 'interior']).optional(),
  estadoDocumentacion: z.enum(['pendiente', 'en_proceso', 'completa', 'observaciones']),
  estado: z.enum(['disponible', 'en_cuotas', 'vendido']),
  amueblado: z.boolean(),
  imagenesUrls: z.string().optional(),
  observaciones: z.string().optional(),
});

type LoteFormData = z.infer<typeof loteSchema>;

const NuevoLote = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<LoteFormData>({
    resolver: zodResolver(loteSchema),
    defaultValues: {
      estado: 'disponible',
      estadoDocumentacion: 'pendiente',
      topografia: 'plano',
      amueblado: false,
    },
  });

  // Calcular superficie automáticamente
  const anchoM = watch('anchoM');
  const largoM = watch('largoM');

  const calcularSuperficie = () => {
    if (anchoM && largoM) {
      setValue('superficieM2', Number((anchoM * largoM).toFixed(2)));
    }
  };

  const onSubmit = async (data: LoteFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const loteData: CrearLoteDto = {
        ...data,
        anchoM: Number(data.anchoM),
        largoM: Number(data.largoM),
        superficieM2: Number(data.superficieM2),
        precioLista: Number(data.precioLista),
      };

      await lotesService.crear(loteData);
      setSuccess(true);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="nuevo-lote-container">
        <div className="nuevo-lote-wrapper">
          <div className="success-container">
            <div className="success-card">
              <div className="success-icon">
                <CheckCircle />
              </div>
              <h2 className="success-title">¡Lote creado exitosamente!</h2>
              <p className="success-message">Redirigiendo al dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="nuevo-lote-container">
      <div className="nuevo-lote-wrapper">
        {/* Header */}
        <div className="nuevo-lote-header">
          <div className="nuevo-lote-breadcrumb">
            <button onClick={() => navigate('/dashboard')}>
              <Home size={16} />
              <span>Dashboard</span>
            </button>
            <span>/</span>
            <span style={{ color: '#1e293b', fontWeight: 600 }}>Nuevo Lote</span>
          </div>
          <h1 className="nuevo-lote-title">Nuevo Lote</h1>
          <p className="nuevo-lote-subtitle">Complete los datos del nuevo lote</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <AlertCircle className="error-message-icon" size={20} />
            <div className="error-message-content">
              <h3>Error al crear el lote</h3>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="nuevo-lote-form">
          {/* Información Básica */}
          <div className="form-section">
            <h2 className="form-section-title">
              <FileText size={20} />
              Información Básica
            </h2>
            <div className="form-grid form-grid-2">
              <div className="form-field">
                <label className="form-label form-label-required">Código del Lote</label>
                <input
                  {...register('codigo')}
                  type="text"
                  placeholder="L001"
                  className={`form-input ${errors.codigo ? 'error' : ''}`}
                />
                {errors.codigo && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.codigo.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Precio de Lista</label>
                <input
                  {...register('precioLista', { valueAsNumber: true })}
                  type="number"
                  placeholder="95000000"
                  className={`form-input ${errors.precioLista ? 'error' : ''}`}
                />
                {errors.precioLista && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.precioLista.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Dimensiones */}
          <div className="form-section">
            <h2 className="form-section-title">
              <Ruler size={20} />
              Dimensiones
            </h2>
            <div className="form-grid form-grid-3">
              <div className="form-field">
                <label className="form-label form-label-required">Ancho (m)</label>
                <input
                  {...register('anchoM', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  placeholder="18"
                  onBlur={calcularSuperficie}
                  className={`form-input ${errors.anchoM ? 'error' : ''}`}
                />
                {errors.anchoM && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.anchoM.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Largo (m)</label>
                <input
                  {...register('largoM', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  placeholder="25"
                  onBlur={calcularSuperficie}
                  className={`form-input ${errors.largoM ? 'error' : ''}`}
                />
                {errors.largoM && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.largoM.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Superficie (m²)</label>
                <input
                  {...register('superficieM2', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  placeholder="450"
                  className={`form-input calculated ${errors.superficieM2 ? 'error' : ''}`}
                  readOnly
                />
                {errors.superficieM2 && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.superficieM2.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Ubicación */}
          <div className="form-section">
            <h2 className="form-section-title">
              <MapPin size={20} />
              Ubicación
            </h2>
            <div className="form-grid form-grid-3">
              <div className="form-field">
                <label className="form-label form-label-required">Manzana</label>
                <input
                  {...register('manzana')}
                  type="text"
                  placeholder="A"
                  className={`form-input ${errors.manzana ? 'error' : ''}`}
                />
                {errors.manzana && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.manzana.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Número de Lote</label>
                <input
                  {...register('numeroLote')}
                  type="text"
                  placeholder="001"
                  className={`form-input ${errors.numeroLote ? 'error' : ''}`}
                />
                {errors.numeroLote && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.numeroLote.message}
                  </span>
                )}
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Topografía</label>
                <select
                  {...register('topografia')}
                  className={`form-select ${errors.topografia ? 'error' : ''}`}
                >
                  <option value="plano">Plano</option>
                  <option value="inclinado">Inclinado</option>
                  <option value="irregular">Irregular</option>
                </select>
              </div>
            </div>

            <div className="form-grid" style={{ marginTop: '1.5rem' }}>
              <div className="form-field">
                <label className="form-label form-label-required">Dirección</label>
                <input
                  {...register('direccion')}
                  type="text"
                  placeholder="Manzana A, Lote 1"
                  className={`form-input ${errors.direccion ? 'error' : ''}`}
                />
                {errors.direccion && (
                  <span className="form-error">
                    <AlertCircle size={12} />
                    {errors.direccion.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="form-section">
            <h2 className="form-section-title">
              <Settings size={20} />
              Características
            </h2>
            <div className="form-grid form-grid-2">
              <div className="form-field">
                <label className="form-label">Orientación</label>
                <select {...register('orientacion')} className="form-select">
                  <option value="">Seleccionar...</option>
                  <option value="norte">Norte</option>
                  <option value="sur">Sur</option>
                  <option value="este">Este</option>
                  <option value="oeste">Oeste</option>
                  <option value="noreste">Noreste</option>
                  <option value="noroeste">Noroeste</option>
                  <option value="sureste">Sureste</option>
                  <option value="suroeste">Suroeste</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label">Vista</label>
                <select {...register('vista')} className="form-select">
                  <option value="">Seleccionar...</option>
                  <option value="ciudad">Ciudad</option>
                  <option value="montaña">Montaña</option>
                  <option value="mar">Mar</option>
                  <option value="parque">Parque</option>
                  <option value="calle">Calle</option>
                  <option value="interior">Interior</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Estado</label>
                <select {...register('estado')} className="form-select">
                  <option value="disponible">Disponible</option>
                  <option value="en_cuotas">En Cuotas</option>
                  <option value="vendido">Vendido</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-label form-label-required">Estado Documentación</label>
                <select {...register('estadoDocumentacion')} className="form-select">
                  <option value="pendiente">Pendiente</option>
                  <option value="en_proceso">En Proceso</option>
                  <option value="completa">Completa</option>
                  <option value="observaciones">Con Observaciones</option>
                </select>
              </div>
            </div>

            <div className="form-checkbox-wrapper" style={{ marginTop: '1.5rem' }}>
              <input
                {...register('amueblado')}
                type="checkbox"
                id="amueblado"
                className="form-checkbox"
              />
              <label htmlFor="amueblado" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>
                Amueblado
              </label>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="form-section">
            <h2 className="form-section-title">
              <MessageSquare size={20} />
              Información Adicional
            </h2>
            <div className="form-field">
              <label className="form-label">Observaciones</label>
              <textarea
                {...register('observaciones')}
                placeholder="Información adicional sobre el lote..."
                className="form-textarea"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-cancel"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-submit"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner" />
                  Creando...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Crear Lote
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoLote;

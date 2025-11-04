/**
 * PÁGINA: NUEVO LOTE (MODULARIZADA)
 * Formulario para crear un nuevo lote en el sistema
 * Reutiliza componentes de EditarLote
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, AlertCircle, CheckCircle, ArrowLeft, MessageSquare } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Services
import { lotesService } from '../../services/lotes.service';
import serviciosService from '../../services/servicios.service';
import modelosCasaService from '../../services/modelos-casa.service';
import { getErrorMessage } from '../../services/http.service';

// Types
import type { ModeloCasa, Servicio } from '../../types';
import { loteSchema, type LoteFormData } from './types';

// Components de EditarLote (reutilizados)
import FormularioBasico from '../EditarLote/components/FormularioBasico/FormularioBasico';
import FormularioUbicacion from '../EditarLote/components/FormularioUbicacion/FormularioUbicacion';
import FormularioCaracteristicas from '../EditarLote/components/FormularioCaracteristicas/FormularioCaracteristicas';
import SelectorServicios from '../EditarLote/components/SelectorServicios/SelectorServicios';
import SelectorModeloCasa from '../EditarLote/components/SelectorModeloCasa/SelectorModeloCasa';
import MapaEditor from '../EditarLote/components/MapaEditor/MapaEditor';

// Utils de EditarLote (reutilizados)
import { calcularSuperficie } from '../EditarLote/utils/calculosLote';
import { crearGeoJsonDesdePoligono, calcularCentroPoligono } from '../EditarLote/utils/geoJsonHelper';

// CSS
import './NuevoLote.css';

// Configurar iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const NuevoLote = () => {
  const navigate = useNavigate();
  
  // Estados generales
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [codigoLote, setCodigoLote] = useState<string>('');

  // Estados de servicios y modelos
  const [serviciosDisponibles, setServiciosDisponibles] = useState<Servicio[]>([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>([]);
  const [modelosCasaDisponibles, setModelosCasaDisponibles] = useState<ModeloCasa[]>([]);
  const [modeloCasaSeleccionado, setModeloCasaSeleccionado] = useState<string>('');

  // Estados del mapa y polígono
  const [modoDibujo, setModoDibujo] = useState(false);
  const [puntosPoligono, setPuntosPoligono] = useState<[number, number][]>([]);
  const [ubicacionX, setUbicacionX] = useState<number | undefined>(undefined);
  const [ubicacionY, setUbicacionY] = useState<number | undefined>(undefined);

  // Hook de formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<LoteFormData>({
    resolver: zodResolver(loteSchema),
    defaultValues: {
      codigo: '',
      topografia: 'plano',
      estadoDocumentacion: 'pendiente',
      estado: 'disponible',
      amueblado: false,
    },
  });

  // Calcular superficie automáticamente
  const anchoM = watch('anchoM');
  const largoM = watch('largoM');
  const superficieM2 = watch('superficieM2');
  const precioLista = watch('precioLista');

  useEffect(() => {
    if (anchoM && largoM) {
      const superficie = calcularSuperficie(anchoM, largoM);
      setValue('superficieM2', superficie);
    }
  }, [anchoM, largoM, setValue]);

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Obtener el próximo código
        const proximoCodigo = await lotesService.obtenerProximoCodigo();
        setCodigoLote(proximoCodigo);
        setValue('codigo', proximoCodigo);

        // Cargar servicios disponibles
        const servicios = await serviciosService.obtenerActivos();
        setServiciosDisponibles(servicios);

        // Cargar modelos de casa disponibles
        const modelos = await modelosCasaService.obtenerActivos();
        setModelosCasaDisponibles(modelos);

      } catch (err) {
        const mensaje = getErrorMessage(err);
        setError(mensaje);
        console.error('❌ Error al cargar datos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
  }, [setValue]);

  // Funciones del mapa
  const iniciarDibujo = () => {
    setModoDibujo(true);
    setPuntosPoligono([]);
  };

  const agregarPunto = (latlng: L.LatLng) => {
    setPuntosPoligono(prev => [...prev, [latlng.lat, latlng.lng]]);
  };

  const finalizarDibujo = () => {
    if (puntosPoligono.length >= 3) {
      setModoDibujo(false);
      
      // Calcular centro del polígono
      const centro = calcularCentroPoligono(puntosPoligono);
      if (centro) {
        setUbicacionX(centro[1]); // lng
        setUbicacionY(centro[0]); // lat
      }
      
      // Guardar GeoJSON
      const geojson = crearGeoJsonDesdePoligono(puntosPoligono);
      setValue('geojson', geojson);
      setValue('ubicacionX', centro?.[1]); // lng
      setValue('ubicacionY', centro?.[0]); // lat
      
      console.log('✅ Polígono finalizado - Centro:', { lat: centro?.[0], lng: centro?.[1] });
    }
  };

  const cancelarDibujo = () => {
    setModoDibujo(false);
  };

  const limpiarPoligono = () => {
    setPuntosPoligono([]);
    setValue('geojson', undefined);
  };

  const eliminarUltimoPunto = () => {
    setPuntosPoligono(prev => prev.slice(0, -1));
  };

  // Toggle de servicios
  const toggleServicio = (servicioUid: string) => {
    setServiciosSeleccionados(prev =>
      prev.includes(servicioUid)
        ? prev.filter(uid => uid !== servicioUid)
        : [...prev, servicioUid]
    );
  };

  // Submit del formulario
  const onSubmit = async (data: LoteFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);

      const loteData: any = {
        ...data,
        anchoM: Number(data.anchoM),
        largoM: Number(data.largoM),
        superficieM2: Number(data.superficieM2),
        precioLista: Number(data.precioLista),
        serviciosIds: serviciosSeleccionados,
        modeloCasaUid: modeloCasaSeleccionado || undefined,
        ubicacionX: ubicacionX,
        ubicacionY: ubicacionY,
        geojson: puntosPoligono.length >= 3 ? crearGeoJsonDesdePoligono(puntosPoligono) : undefined,
      };

      console.log('📤 Creando lote:', loteData);

      await lotesService.crear(loteData);

      console.log('✅ Lote creado exitosamente');
      setSuccess(true);

      setTimeout(() => {
        navigate('/lotes');
      }, 2000);

    } catch (err) {
      const mensaje = getErrorMessage(err);
      setError(mensaje);
      console.error('❌ Error al crear lote:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estados de carga
  if (isLoading) {
    return (
      <div className="nuevo-lote-container">
        <div className="loading-overlay">
          <div className="loading-spinner">
            <div className="spinner-icon" />
            <p>Cargando datos iniciales...</p>
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
          <nav className="nuevo-lote-breadcrumb">
            <button onClick={() => navigate('/lotes')}>
              <ArrowLeft size={16} />
              Gestión de Lotes
            </button>
            <span>/</span>
            <span>Nuevo Lote</span>
          </nav>
          <h1 className="nuevo-lote-title">Crear Nuevo Lote</h1>
          <p className="nuevo-lote-subtitle">Completa la información del lote</p>
        </div>

        {/* Mensajes */}
        {error && (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <CheckCircle size={20} />
            <span>¡Lote creado exitosamente! Redirigiendo...</span>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="nuevo-lote-form">
          <FormularioBasico
            register={register}
            errors={errors}
            superficieM2={superficieM2}
            setValue={setValue}
            precioLista={precioLista}
          />

          <FormularioUbicacion
            register={register}
            errors={errors}
          />

          <FormularioCaracteristicas
            register={register}
            errors={errors}
          />

          <SelectorServicios
            serviciosDisponibles={serviciosDisponibles}
            serviciosSeleccionados={serviciosSeleccionados}
            onToggleServicio={toggleServicio}
          />

          <SelectorModeloCasa
            modelosCasaDisponibles={modelosCasaDisponibles}
            modeloCasaSeleccionado={modeloCasaSeleccionado}
            onChangeModelo={setModeloCasaSeleccionado}
          />

          <MapaEditor
            modoDibujo={modoDibujo}
            puntosPoligono={puntosPoligono}
            ubicacionX={ubicacionX}
            ubicacionY={ubicacionY}
            onIniciarDibujo={iniciarDibujo}
            onFinalizarDibujo={finalizarDibujo}
            onCancelarDibujo={cancelarDibujo}
            onLimpiarPoligono={limpiarPoligono}
            onEliminarUltimoPunto={eliminarUltimoPunto}
            onAgregarPunto={agregarPunto}
          />

          {/* Observaciones */}
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
              onClick={() => navigate('/lotes')}
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

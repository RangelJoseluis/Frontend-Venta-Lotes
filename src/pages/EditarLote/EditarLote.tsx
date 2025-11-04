/**
 * PÁGINA: EDITAR LOTE (MODULARIZADA)
 * Formulario para editar un lote existente en el sistema
 * Carga los datos del lote y permite actualizarlos
 */

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, AlertCircle, CheckCircle, ArrowLeft, Loader, MessageSquare } from 'lucide-react';
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

// Components
import FormularioBasico from './components/FormularioBasico/FormularioBasico';
import FormularioUbicacion from './components/FormularioUbicacion/FormularioUbicacion';
import FormularioCaracteristicas from './components/FormularioCaracteristicas/FormularioCaracteristicas';
import SelectorServicios from './components/SelectorServicios/SelectorServicios';
import SelectorModeloCasa from './components/SelectorModeloCasa/SelectorModeloCasa';
import MapaEditor from './components/MapaEditor/MapaEditor';

// Utils
import { calcularSuperficie } from './utils/calculosLote';
import { parsearGeoJson, crearGeoJsonDesdePoligono, calcularCentroPoligono } from './utils/geoJsonHelper';

// CSS
import '../NuevoLote.css';

const EditarLote = () => {
  const navigate = useNavigate();
  const { uid } = useParams<{ uid: string }>();
  
  // Estados generales
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

  // Cargar datos del lote
  useEffect(() => {
    const cargarDatosLote = async () => {
      if (!uid) {
        setError('UID del lote no proporcionado');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const lote = await lotesService.obtenerPorUid(uid);
        console.log('✅ Lote cargado:', lote);

        // Mapear datos al formulario
        reset({
          codigo: lote.codigo,
          anchoM: parseFloat(lote.anchoM),
          largoM: parseFloat(lote.largoM),
          superficieM2: parseFloat(lote.superficieM2),
          precioLista: parseFloat(lote.precioLista),
          direccion: lote.direccion,
          manzana: lote.manzana,
          numeroLote: lote.numeroLote,
          topografia: lote.topografia as 'plano' | 'inclinado' | 'irregular',
          orientacion: lote.orientacion as any,
          vista: lote.vista as any,
          estadoDocumentacion: lote.estadoDocumentacion as any,
          estado: lote.estado as 'disponible' | 'en_cuotas' | 'vendido',
          amueblado: lote.amueblado,
          imagenesUrls: lote.imagenesUrls || '',
          observaciones: lote.observaciones || '',
          modeloCasa: lote.modeloCasa?.id,
          ubicacionX: lote.ubicacionX ? parseFloat(lote.ubicacionX) : undefined,
          ubicacionY: lote.ubicacionY ? parseFloat(lote.ubicacionY) : undefined,
          geojson: lote.geojson || '',
        });

        // Cargar servicios disponibles
        const servicios = await serviciosService.obtenerActivos();
        setServiciosDisponibles(servicios);

        // Cargar servicios del lote (si existen)
        if (lote.servicios && lote.servicios.length > 0) {
          const serviciosUids = lote.servicios.map((s: any) => s.uid);
          setServiciosSeleccionados(serviciosUids);
        }

        // Cargar modelos de casa disponibles
        const modelos = await modelosCasaService.obtenerActivos();
        setModelosCasaDisponibles(modelos);

        // Establecer modelo de casa seleccionado
        if (lote.modeloCasa) {
          setModeloCasaSeleccionado(lote.modeloCasa.uid);
        }

        // Cargar polígono si existe
        if (lote.geojson) {
          try {
            const puntos = parsearGeoJson(lote.geojson);
            setPuntosPoligono(puntos);
            console.log('✅ Polígono cargado:', puntos.length, 'puntos');
          } catch (error) {
            console.error('❌ Error al parsear GeoJSON:', error);
          }
        }

        // Establecer coordenadas del centro
        if (lote.ubicacionX && lote.ubicacionY) {
          setUbicacionX(parseFloat(lote.ubicacionX));
          setUbicacionY(parseFloat(lote.ubicacionY));
        }

      } catch (err) {
        const mensaje = getErrorMessage(err);
        setError(mensaje);
        console.error('❌ Error al cargar lote:', err);
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatosLote();
  }, [uid, reset]);

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
      // calcularCentroPoligono devuelve [lat, lng]
      // Backend espera: ubicacionX = lng, ubicacionY = lat
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
    if (!uid) {
      setError('UID del lote no proporcionado');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const updateData: any = {
        ...data,
        anchoM: data.anchoM,
        largoM: data.largoM,
        superficieM2: data.superficieM2,
        precioLista: data.precioLista,
        serviciosIds: serviciosSeleccionados, // Backend espera serviciosIds, no servicios
        modeloCasaUid: modeloCasaSeleccionado || undefined, // Backend espera modeloCasaUid (string UID), no modeloCasa (número)
        ubicacionX: ubicacionX,
        ubicacionY: ubicacionY,
        geojson: puntosPoligono.length >= 3 ? crearGeoJsonDesdePoligono(puntosPoligono) : undefined,
      };

      console.log('📤 Actualizando lote:', updateData);

      await lotesService.actualizar(uid, updateData);

      console.log('✅ Lote actualizado exitosamente');
      setSuccess(true);

      setTimeout(() => {
        navigate('/lotes');
      }, 2000);

    } catch (err) {
      const mensaje = getErrorMessage(err);
      setError(mensaje);
      console.error('❌ Error al actualizar lote:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Estados de carga y error
  if (isLoading) {
    return (
      <div className="nuevo-lote-container">
        <div className="loading-overlay">
          <div className="loading-spinner">
            <Loader size={48} className="spinner-icon" />
            <p>Cargando datos del lote...</p>
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
            <span>Editar Lote</span>
          </nav>
          <h1 className="nuevo-lote-title">Editar Lote</h1>
          <p className="nuevo-lote-subtitle">Actualiza la información del lote existente</p>
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
            <span>¡Lote actualizado exitosamente! Redirigiendo...</span>
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
                  Actualizando...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarLote;

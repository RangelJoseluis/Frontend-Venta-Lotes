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
      <div className="flex flex-col items-center justify-center py-16">
        <Loader size={48} className="animate-spin text-blue-600 dark:text-blue-400" />
        <p className="mt-4 text-slate-500 dark:text-slate-400">Cargando datos del lote...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Compacto */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => navigate('/lotes')}
            className="p-2 -ml-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
            title="Volver a Gestión de Lotes"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white leading-none">
              Editar Lote
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Gestión de Lotes / Actualizar Información
            </p>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      {error && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400">
          <CheckCircle size={20} className="flex-shrink-0" />
          <span>¡Lote actualizado exitosamente! Redirigiendo...</span>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white mb-4">
            <MessageSquare size={20} className="text-blue-600 dark:text-blue-400" />
            Información Adicional
          </h2>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Observaciones
            </label>
            <textarea
              {...register('observaciones')}
              placeholder="Información adicional sobre el lote..."
              rows={4}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors resize-none"
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => navigate('/lotes')}
            className="px-6 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader size={20} className="animate-spin" />
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
  );
};

export default EditarLote;

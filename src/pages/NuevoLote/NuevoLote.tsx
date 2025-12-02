/**
 * PÁGINA: NUEVO LOTE (MODULARIZADA)
 * Formulario para crear un nuevo lote en el sistema
 * Reutiliza componentes de EditarLote
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Save, AlertCircle, CheckCircle, ArrowLeft, MessageSquare, Loader } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center py-16">
        <Loader size={48} className="animate-spin text-blue-600 dark:text-blue-400" />
        <p className="mt-4 text-slate-500 dark:text-slate-400">Cargando datos iniciales...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
          <button
            onClick={() => navigate('/lotes')}
            className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft size={16} />
            Gestión de Lotes
          </button>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300">Nuevo Lote</span>
        </nav>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">
          Crear Nuevo Lote
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Completa la información del lote
        </p>
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
          <span>¡Lote creado exitosamente! Redirigiendo...</span>
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
  );
};

export default NuevoLote;

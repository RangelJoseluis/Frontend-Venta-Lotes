import { MapPin, Save } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useConfiguracionZona } from './hooks/useConfiguracionZona';
import MensajeConfig from '../shared/components/MensajeConfig';
import FormularioZona from './components/FormularioZona';
import VistaPreviaMapa from './components/VistaPreviaMapa';
import AyudaCoordenadas from './components/AyudaCoordenadas';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ConfiguracionZona = () => {
  const { zona, setZona, guardando, mensaje, handleMapClick, handleGuardar } = useConfiguracionZona();

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        🗺️ Configuración de Zona y Mapa
      </h2>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
        Define el área geográfica donde se encuentran tus lotes. Esta configuración se aplicará a todos los mapas del sistema.
      </p>

      {mensaje && <MensajeConfig mensaje={mensaje} />}

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b-2 border-slate-100 dark:border-slate-700">
          <MapPin size={24} className="text-purple-600 dark:text-purple-400" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            Zona Predeterminada del Mapa
          </h2>
        </div>

        <FormularioZona zona={zona} setZona={setZona} />

        <VistaPreviaMapa zona={zona} onMapClick={handleMapClick} />

        <div className="flex justify-end mt-8">
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl font-bold text-base transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <Save size={20} />
            {guardando ? 'Guardando...' : 'Guardar Configuración'}
          </button>
        </div>

        <AyudaCoordenadas />
      </div>
    </div>
  );
};

export default ConfiguracionZona;

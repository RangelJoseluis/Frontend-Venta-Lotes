import { MapPin, Save } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useConfiguracionZona } from './hooks/useConfiguracionZona';
import MensajeConfig from '../shared/components/MensajeConfig';
import FormularioZona from './components/FormularioZona';
import VistaPreviaMapa from './components/VistaPreviaMapa';
import AyudaCoordenadas from './components/AyudaCoordenadas';
import './ConfiguracionZona.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ConfiguracionZona = () => {
  const { zona, setZona, guardando, mensaje, handleMapClick, handleGuardar } = useConfiguracionZona();

  return (
    <div className="config-contenido">
      <h2 className="config-titulo">🗺️ Configuración de Zona y Mapa</h2>
      <p className="config-descripcion">
        Define el área geográfica donde se encuentran tus lotes. Esta configuración se aplicará a todos los mapas del sistema.
      </p>

      {mensaje && <MensajeConfig mensaje={mensaje} />}

      <div className="config-seccion">
        <div className="config-seccion-header">
          <MapPin size={24} style={{ color: '#7c3aed' }} />
          <h2>Zona Predeterminada del Mapa</h2>
        </div>

        <FormularioZona zona={zona} setZona={setZona} />

        <VistaPreviaMapa zona={zona} onMapClick={handleMapClick} />

        <div className="config-actions">
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="btn-guardar"
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

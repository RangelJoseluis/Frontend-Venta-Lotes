import { Save } from 'lucide-react';
import { useConfiguracionMora } from './hooks/useConfiguracionMora';
import MensajeConfig from '../shared/components/MensajeConfig';
import FormularioMora from './components/FormularioMora';
import EjemploCalculo from './components/EjemploCalculo';
import './ConfiguracionMora.css';

const ConfiguracionMora = () => {
  const { config, setConfig, guardando, mensaje, handleGuardar } = useConfiguracionMora();

  return (
    <div className="config-contenido">
      <h2 className="config-titulo">⚠️ Configuración de Mora</h2>
      <p className="config-descripcion">
        Administra los parámetros del sistema de cálculo de mora por cuotas vencidas.
      </p>

      {mensaje && <MensajeConfig mensaje={mensaje} />}

      <FormularioMora config={config} setConfig={setConfig} />

      <EjemploCalculo config={config} />

      <div className="config-actions">
        <button
          onClick={handleGuardar}
          disabled={guardando || !config.moraHabilitada}
          className="btn-guardar"
        >
          <Save size={20} />
          {guardando ? 'Guardando...' : 'Guardar Configuración'}
        </button>
      </div>
    </div>
  );
};

export default ConfiguracionMora;

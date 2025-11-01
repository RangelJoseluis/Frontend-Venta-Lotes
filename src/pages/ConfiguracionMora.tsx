/**
 * PÁGINA: CONFIGURACIÓN DE MORA
 * Permite configurar parámetros del sistema de mora
 */

import { useState } from 'react';
import { Save, AlertCircle, CheckCircle, Info } from 'lucide-react';
import './Configuraciones.css';

interface ConfigMora {
  moraHabilitada: boolean;
  tasaMoraDiaria: number;
  tasaMoraMensual: number;
  diasGracia: number;
  calculoMora: 'diario' | 'mensual';
  moraMaximaPorCuotaPorcentaje: number;
  tasaMoraMaximaLegal: number;
}

const ConfiguracionMora = () => {
  const [config, setConfig] = useState<ConfigMora>({
    moraHabilitada: true,
    tasaMoraDiaria: 0.05, // 0.05%
    tasaMoraMensual: 1.5, // 1.5%
    diasGracia: 3,
    calculoMora: 'diario',
    moraMaximaPorCuotaPorcentaje: 200,
    tasaMoraMaximaLegal: 3.0,
  });
  
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      // TODO: Llamar al endpoint del backend para actualizar configuración
      // await httpClient.put('/configuracion', config);
      
      setMensaje({ tipo: 'success', texto: '✅ Configuración de mora guardada exitosamente' });
      setTimeout(() => setMensaje(null), 3000);
    } catch (error) {
      setMensaje({ tipo: 'error', texto: '❌ Error al guardar la configuración de mora' });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="config-contenido">
      <h2 className="config-titulo">⚠️ Configuración de Mora</h2>
      <p className="config-descripcion">
        Administra los parámetros del sistema de cálculo de mora por cuotas vencidas.
      </p>

      {/* Mensaje de éxito/error */}
      {mensaje && (
        <div className={`mensaje-config ${mensaje.tipo}`}>
          {mensaje.tipo === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{mensaje.texto}</span>
        </div>
      )}

      {/* Habilitar/Deshabilitar Mora */}
      <div className="config-seccion">
        <div className="config-seccion-header-small">
          <h3>Estado del Sistema</h3>
        </div>
        
        <div className="form-field">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={config.moraHabilitada}
              onChange={(e) => setConfig({ ...config, moraHabilitada: e.target.checked })}
              className="toggle-input"
            />
            <span className="toggle-slider"></span>
            <span className="toggle-text">
              {config.moraHabilitada ? 'Mora Habilitada' : 'Mora Deshabilitada'}
            </span>
          </label>
          <p className="form-hint">
            {config.moraHabilitada 
              ? 'El sistema calculará mora automáticamente para cuotas vencidas'
              : 'No se calculará mora en las cuotas vencidas'}
          </p>
        </div>
      </div>

      {/* Tasas de Mora */}
      <div className="config-seccion">
        <div className="config-seccion-header-small">
          <h3>Tasas de Mora</h3>
        </div>

        <div className="form-row form-row-2">
          <div className="form-field">
            <label className="form-label">Tasa Diaria (%)</label>
            <input
              type="number"
              step="0.01"
              value={config.tasaMoraDiaria}
              onChange={(e) => setConfig({ ...config, tasaMoraDiaria: parseFloat(e.target.value) })}
              disabled={!config.moraHabilitada}
              className="form-input"
            />
            <p className="form-hint">Ejemplo: 0.05% diario = 1.5% mensual aprox.</p>
          </div>

          <div className="form-field">
            <label className="form-label">Tasa Mensual (%)</label>
            <input
              type="number"
              step="0.1"
              value={config.tasaMoraMensual}
              onChange={(e) => setConfig({ ...config, tasaMoraMensual: parseFloat(e.target.value) })}
              disabled={!config.moraHabilitada}
              className="form-input"
            />
            <p className="form-hint">Tasa equivalente mensual</p>
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">Método de Cálculo</label>
          <select
            value={config.calculoMora}
            onChange={(e) => setConfig({ ...config, calculoMora: e.target.value as 'diario' | 'mensual' })}
            disabled={!config.moraHabilitada}
            className="form-input"
          >
            <option value="diario">Cálculo Diario</option>
            <option value="mensual">Cálculo Mensual</option>
          </select>
          <p className="form-hint">
            {config.calculoMora === 'diario' 
              ? 'Se calcula mora por cada día de retraso' 
              : 'Se calcula mora por mes completo de retraso'}
          </p>
        </div>
      </div>

      {/* Parámetros Adicionales */}
      <div className="config-seccion">
        <div className="config-seccion-header-small">
          <h3>Parámetros Adicionales</h3>
        </div>

        <div className="form-row form-row-3">
          <div className="form-field">
            <label className="form-label">Días de Gracia</label>
            <input
              type="number"
              min="0"
              value={config.diasGracia}
              onChange={(e) => setConfig({ ...config, diasGracia: parseInt(e.target.value) })}
              disabled={!config.moraHabilitada}
              className="form-input"
            />
            <p className="form-hint">Días sin mora después del vencimiento</p>
          </div>

          <div className="form-field">
            <label className="form-label">Mora Máxima (%)</label>
            <input
              type="number"
              min="0"
              value={config.moraMaximaPorCuotaPorcentaje}
              onChange={(e) => setConfig({ ...config, moraMaximaPorCuotaPorcentaje: parseInt(e.target.value) })}
              disabled={!config.moraHabilitada}
              className="form-input"
            />
            <p className="form-hint">% máximo de mora sobre el valor de la cuota</p>
          </div>

          <div className="form-field">
            <label className="form-label">Tasa Legal Máxima (%)</label>
            <input
              type="number"
              step="0.1"
              value={config.tasaMoraMaximaLegal}
              onChange={(e) => setConfig({ ...config, tasaMoraMaximaLegal: parseFloat(e.target.value) })}
              disabled={!config.moraHabilitada}
              className="form-input"
            />
            <p className="form-hint">Límite legal mensual (Colombia: 3%)</p>
          </div>
        </div>
      </div>

      {/* Ejemplo de Cálculo */}
      <div className="config-ayuda">
        <div className="ayuda-header">
          <Info size={20} />
          <h4>Ejemplo de Cálculo</h4>
        </div>
        <div className="ejemplo-calculo">
          <p><strong>Cuota:</strong> $750,000</p>
          <p><strong>Días de retraso:</strong> 30 días (después de los {config.diasGracia} días de gracia)</p>
          <p><strong>Método:</strong> {config.calculoMora === 'diario' ? 'Diario' : 'Mensual'}</p>
          <hr />
          {config.calculoMora === 'diario' ? (
            <>
              <p><strong>Cálculo:</strong> $750,000 × {config.tasaMoraDiaria}% × 30 días</p>
              <p className="resultado">
                <strong>Mora:</strong> ${(750000 * (config.tasaMoraDiaria / 100) * 30).toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </>
          ) : (
            <>
              <p><strong>Cálculo:</strong> $750,000 × {config.tasaMoraMensual}% × 1 mes</p>
              <p className="resultado">
                <strong>Mora:</strong> ${(750000 * (config.tasaMoraMensual / 100)).toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Botón Guardar */}
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

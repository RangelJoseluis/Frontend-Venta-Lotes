import type { ConfigMora } from '../../shared/types';

interface FormularioMoraProps {
  config: ConfigMora;
  setConfig: (config: ConfigMora) => void;
}

const FormularioMora = ({ config, setConfig }: FormularioMoraProps) => {
  return (
    <>
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
    </>
  );
};

export default FormularioMora;

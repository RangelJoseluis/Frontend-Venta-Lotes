import { Save, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { useConfiguracionSistema } from './hooks/useConfiguracionSistema';
import FormularioNegocio from './components/FormularioNegocio';
import FormularioTickets from './components/FormularioTickets';
import './ConfiguracionSistema.css';

const ConfiguracionSistema = () => {
  const {
    loading,
    saving,
    error,
    success,
    config,
    formData,
    handleSubmit,
    handleRestaurar,
    handleChange
  } = useConfiguracionSistema();

  if (loading) {
    return (
      <div className="config-loading">
        <div className="spinner"></div>
        <p>Cargando configuración...</p>
      </div>
    );
  }

  return (
    <div className="config-contenido">
      <div className="config-sistema-header">
        <div>
          <h2 className="config-titulo">🏢 Configuración del Negocio</h2>
          <p className="config-descripcion">Gestiona la información global del negocio</p>
        </div>
        <button
          onClick={handleRestaurar}
          className="btn-restaurar"
          disabled={saving}
        >
          <RefreshCw size={20} />
          Restaurar Valores
        </button>
      </div>

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <CheckCircle size={20} />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="config-form-sistema">
        <FormularioNegocio formData={formData} handleChange={handleChange} />

        <FormularioTickets formData={formData} config={config} handleChange={handleChange} />

        <div className="form-actions">
          <button
            type="submit"
            className="btn-guardar"
            disabled={saving}
          >
            {saving ? (
              <>
                <div className="spinner-small"></div>
                Guardando...
              </>
            ) : (
              <>
                <Save size={20} />
                Guardar Configuración
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfiguracionSistema;

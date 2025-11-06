/**
 * PÁGINA: CONFIGURACIÓN DEL SISTEMA
 * Gestión de configuración global: negocio, mora y tickets
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Save, 
  ArrowLeft, 
  Building2, 
  Mail, 
  Phone, 
  MapPin,
  Ticket,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import configuracionService, { 
  type ConfiguracionSistema, 
  type ActualizarConfiguracionDto 
} from '../services/configuracion.service';
import { getErrorMessage } from '../services/http.service';
import './ConfiguracionSistema.css';

const ConfiguracionSistemaPage = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [config, setConfig] = useState<ConfiguracionSistema | null>(null);
  
  // Estados del formulario
  const [formData, setFormData] = useState<ActualizarConfiguracionDto>({
    nombreNegocio: '',
    direccionNegocio: '',
    telefonoNegocio: '',
    emailNegocio: '',
    prefijoTicket: 'TKT',
    mensajeFinalTicket: 'Gracias por su pago, vuelva pronto',
  });

  // Cargar configuración al montar
  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await configuracionService.obtenerConfiguracion();
      setConfig(data);
      
      // Actualizar formulario con datos cargados
      setFormData({
        nombreNegocio: data.nombreNegocio,
        direccionNegocio: data.direccionNegocio,
        telefonoNegocio: data.telefonoNegocio,
        emailNegocio: data.emailNegocio,
        prefijoTicket: data.prefijoTicket,
        mensajeFinalTicket: data.mensajeFinalTicket,
      });
      
      console.log('✅ Configuración cargada:', data);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(`Error al cargar configuración: ${message}`);
      console.error('❌ Error al cargar configuración:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      const updated = await configuracionService.actualizarConfiguracion(formData);
      setConfig(updated);
      setSuccess('✅ Configuración actualizada exitosamente');
      
      // Limpiar mensaje de éxito después de 3 segundos
      setTimeout(() => setSuccess(null), 3000);
      
      console.log('✅ Configuración actualizada:', updated);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(`Error al guardar configuración: ${message}`);
      console.error('❌ Error al guardar configuración:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleRestaurar = async () => {
    if (!window.confirm('¿Está seguro de restaurar la configuración a valores por defecto?')) {
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      const restored = await configuracionService.restaurarConfiguracionDefecto();
      setConfig(restored);
      
      // Actualizar formulario con valores restaurados
      setFormData({
        nombreNegocio: restored.nombreNegocio,
        direccionNegocio: restored.direccionNegocio,
        telefonoNegocio: restored.telefonoNegocio,
        emailNegocio: restored.emailNegocio,
        prefijoTicket: restored.prefijoTicket,
        mensajeFinalTicket: restored.mensajeFinalTicket,
      });
      
      setSuccess('✅ Configuración restaurada a valores por defecto');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(`Error al restaurar configuración: ${message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : type === 'number' 
        ? parseFloat(value) 
        : value,
    }));
  };

  if (loading) {
    return (
      <div className="config-container">
        <div className="config-loading">
          <div className="spinner"></div>
          <p>Cargando configuración...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="config-container">
      {/* Header */}
      <div className="config-header">
        <div className="header-left">
          <button onClick={() => navigate('/dashboard')} className="btn-back">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>⚙️ Configuración del Sistema</h1>
            <p className="header-subtitle">Gestiona la configuración global del negocio</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            onClick={handleRestaurar}
            className="btn-restaurar"
            disabled={saving}
          >
            <RefreshCw size={20} />
            Restaurar Valores
          </button>
        </div>
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
          <span>{success}</span>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="config-form">
        {/* Sección: Datos del Negocio */}
        <div className="config-section">
          <div className="section-header">
            <Building2 size={24} />
            <h2>Datos del Negocio</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="nombreNegocio">
                <Building2 size={16} />
                Nombre del Negocio *
              </label>
              <input
                type="text"
                id="nombreNegocio"
                name="nombreNegocio"
                value={formData.nombreNegocio}
                onChange={handleChange}
                required
                placeholder="Ej: Venta de Lotes Premium"
              />
            </div>

            <div className="form-field">
              <label htmlFor="emailNegocio">
                <Mail size={16} />
                Email de Contacto *
              </label>
              <input
                type="email"
                id="emailNegocio"
                name="emailNegocio"
                value={formData.emailNegocio}
                onChange={handleChange}
                required
                placeholder="contacto@empresa.com"
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="direccionNegocio">
                <MapPin size={16} />
                Dirección *
              </label>
              <input
                type="text"
                id="direccionNegocio"
                name="direccionNegocio"
                value={formData.direccionNegocio}
                onChange={handleChange}
                required
                placeholder="Calle Principal #123, Ciudad"
              />
            </div>

            <div className="form-field">
              <label htmlFor="telefonoNegocio">
                <Phone size={16} />
                Teléfono *
              </label>
              <input
                type="tel"
                id="telefonoNegocio"
                name="telefonoNegocio"
                value={formData.telefonoNegocio}
                onChange={handleChange}
                required
                placeholder="+57 300 123 4567"
              />
            </div>
          </div>
        </div>

        {/* Sección: Configuración de Tickets */}
        <div className="config-section">
          <div className="section-header">
            <Ticket size={24} />
            <h2>Configuración de Tickets</h2>
          </div>
          
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="prefijoTicket">
                <Ticket size={16} />
                Prefijo de Ticket
              </label>
              <input
                type="text"
                id="prefijoTicket"
                name="prefijoTicket"
                value={formData.prefijoTicket}
                onChange={handleChange}
                maxLength={10}
                placeholder="TKT"
              />
              <small>Contador actual: {config?.contadorTicket || 0}</small>
            </div>

            <div className="form-field full-width">
              <label htmlFor="mensajeFinalTicket">
                <MessageSquare size={16} />
                Mensaje Final del Ticket
              </label>
              <textarea
                id="mensajeFinalTicket"
                name="mensajeFinalTicket"
                value={formData.mensajeFinalTicket}
                onChange={handleChange}
                rows={3}
                maxLength={200}
                placeholder="Gracias por su pago, vuelva pronto"
              />
            </div>
          </div>
        </div>

        {/* Botón Guardar */}
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

export default ConfiguracionSistemaPage;

import { useState, useEffect } from 'react';
import configuracionService, {
  type ConfiguracionSistema,
  type ActualizarConfiguracionDto
} from '../../../../services/configuracion.service';
import { getErrorMessage } from '../../../../services/http.service';

export const useConfiguracionSistema = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [config, setConfig] = useState<ConfiguracionSistema | null>(null);

  const [formData, setFormData] = useState<ActualizarConfiguracionDto>({
    nombreNegocio: '',
    direccionNegocio: '',
    telefonoNegocio: '',
    emailNegocio: '',
    prefijoTicket: 'TKT',
    mensajeFinalTicket: 'Gracias por su pago, vuelva pronto',
  });

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await configuracionService.obtenerConfiguracion();
      setConfig(data);

      setFormData({
        nombreNegocio: data.nombreNegocio,
        direccionNegocio: data.direccionNegocio,
        telefonoNegocio: data.telefonoNegocio,
        emailNegocio: data.emailNegocio,
        prefijoTicket: data.prefijoTicket,
        mensajeFinalTicket: data.mensajeFinalTicket,
      });
    } catch (err) {
      const message = getErrorMessage(err);
      setError(`Error al cargar configuración: ${message}`);
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

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(`Error al guardar configuración: ${message}`);
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

  return {
    loading,
    saving,
    error,
    success,
    config,
    formData,
    handleSubmit,
    handleRestaurar,
    handleChange
  };
};

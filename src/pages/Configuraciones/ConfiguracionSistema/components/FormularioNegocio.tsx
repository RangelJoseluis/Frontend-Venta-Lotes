import { Building2, Mail, MapPin, Phone } from 'lucide-react';
import type { ActualizarConfiguracionDto } from '../../../../services/configuracion.service';

interface FormularioNegocioProps {
  formData: ActualizarConfiguracionDto;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormularioNegocio = ({ formData, handleChange }: FormularioNegocioProps) => {
  return (
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
  );
};

export default FormularioNegocio;

import { Ticket, MessageSquare } from 'lucide-react';
import type { ActualizarConfiguracionDto, ConfiguracionSistema } from '../../../../services/configuracion.service';

interface FormularioTicketsProps {
  formData: ActualizarConfiguracionDto;
  config: ConfiguracionSistema | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormularioTickets = ({ formData, config, handleChange }: FormularioTicketsProps) => {
  return (
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
  );
};

export default FormularioTickets;

import { useState } from 'react';
import { DollarSign, Calendar, FileText, User, Home } from 'lucide-react';
import './FormularioCrearVenta.css';

interface VentaFormData {
  loteUid: string;
  clienteUid: string;
  precioVenta: string;
  modalidadPago: string;
  cantidadCuotas: string;
  montoInicial: string;
  observaciones: string;
}

export default function FormularioCrearVenta() {
  const [formData, setFormData] = useState<VentaFormData>({
    loteUid: '',
    clienteUid: '',
    precioVenta: '',
    modalidadPago: 'cuotas',
    cantidadCuotas: '',
    montoInicial: '',
    observaciones: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      loteUid: formData.loteUid,
      clienteUid: formData.clienteUid,
      precioVenta: Number(formData.precioVenta),
      modalidadPago: formData.modalidadPago,
      cantidadCuotas: Number(formData.cantidadCuotas),
      montoInicial: Number(formData.montoInicial),
      observaciones: formData.observaciones,
    };

    console.log('Datos de venta:', payload);
    alert('Venta registrada exitosamente');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (value: string) => {
    const number = value.replace(/\D/g, '');
    return new Intl.NumberFormat('es-CO').format(Number(number));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, '');
    setFormData(prev => ({ ...prev, [name]: numericValue }));
  };

  return (
    <div className="formulario-container">
      <div className="formulario-wrapper">
        <div className="formulario-header">
          <div className="formulario-icon-wrapper">
            <div className="formulario-icon-bg">
              <Home className="formulario-icon" />
            </div>
          </div>
          <h1 className="formulario-title">Registro de Venta de Lote</h1>
          <p className="formulario-subtitle">Gestión de Venta de Lotes</p>
        </div>

        <div className="formulario-card">
          <div className="formulario-card-header">
            <h2 className="formulario-card-title">Información de la Venta</h2>
            <p className="formulario-card-subtitle">Complete todos los campos requeridos</p>
          </div>

          <form onSubmit={handleSubmit} className="formulario-form">
            <div className="formulario-section">
              <h3 className="formulario-section-title">
                <User className="formulario-section-icon" />
                Identificadores
              </h3>

              <div className="formulario-grid">
                <div className="formulario-field">
                  <label htmlFor="loteUid" className="formulario-label">
                    ID del Lote <span className="formulario-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="loteUid"
                    name="loteUid"
                    value={formData.loteUid}
                    onChange={handleChange}
                    placeholder="b8351632-ead8-4a61-a498-7701a9d4ba7b"
                    className="formulario-input"
                    required
                  />
                </div>

                <div className="formulario-field">
                  <label htmlFor="clienteUid" className="formulario-label">
                    ID del Cliente <span className="formulario-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="clienteUid"
                    name="clienteUid"
                    value={formData.clienteUid}
                    onChange={handleChange}
                    placeholder="01dfba3c-e996-4c63-8419-d4b2cf94e52b"
                    className="formulario-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="formulario-section">
              <h3 className="formulario-section-title">
                <DollarSign className="formulario-section-icon formulario-icon-green" />
                Información Financiera
              </h3>

              <div className="formulario-grid">
                <div className="formulario-field">
                  <label htmlFor="precioVenta" className="formulario-label">
                    Precio de Venta <span className="formulario-required">*</span>
                  </label>
                  <div className="formulario-input-currency">
                    <span className="formulario-currency-symbol">$</span>
                    <input
                      type="text"
                      id="precioVenta"
                      name="precioVenta"
                      value={formatCurrency(formData.precioVenta)}
                      onChange={handleCurrencyChange}
                      placeholder="75,000,000"
                      className="formulario-input formulario-input-with-symbol"
                      required
                    />
                  </div>
                </div>

                <div className="formulario-field">
                  <label htmlFor="modalidadPago" className="formulario-label">
                    Modalidad de Pago <span className="formulario-required">*</span>
                  </label>
                  <select
                    id="modalidadPago"
                    name="modalidadPago"
                    value={formData.modalidadPago}
                    onChange={handleChange}
                    className="formulario-input"
                    required
                  >
                    <option value="cuotas">Cuotas</option>
                    <option value="contado">Contado</option>
                  </select>
                </div>
              </div>

              {formData.modalidadPago === 'cuotas' && (
                <div className="formulario-grid formulario-grid-animate">
                  <div className="formulario-field">
                    <label htmlFor="cantidadCuotas" className="formulario-label">
                      Cantidad de Cuotas <span className="formulario-required">*</span>
                    </label>
                    <div className="formulario-input-icon">
                      <Calendar className="formulario-input-icon-left" />
                      <input
                        type="number"
                        id="cantidadCuotas"
                        name="cantidadCuotas"
                        value={formData.cantidadCuotas}
                        onChange={handleChange}
                        placeholder="24"
                        min="1"
                        className="formulario-input formulario-input-with-icon"
                        required={formData.modalidadPago === 'cuotas'}
                      />
                    </div>
                  </div>

                  <div className="formulario-field">
                    <label htmlFor="montoInicial" className="formulario-label">
                      Monto Inicial <span className="formulario-required">*</span>
                    </label>
                    <div className="formulario-input-currency">
                      <span className="formulario-currency-symbol">$</span>
                      <input
                        type="text"
                        id="montoInicial"
                        name="montoInicial"
                        value={formatCurrency(formData.montoInicial)}
                        onChange={handleCurrencyChange}
                        placeholder="15,000,000"
                        className="formulario-input formulario-input-with-symbol"
                        required={formData.modalidadPago === 'cuotas'}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="formulario-section">
              <h3 className="formulario-section-title">
                <FileText className="formulario-section-icon formulario-icon-orange" />
                Observaciones
              </h3>

              <div className="formulario-field">
                <label htmlFor="observaciones" className="formulario-label">
                  Notas y Comentarios
                </label>
                <textarea
                  id="observaciones"
                  name="observaciones"
                  value={formData.observaciones}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Venta con plan de financiación a 2 años, cliente aprobado por crédito"
                  className="formulario-textarea"
                />
              </div>
            </div>

            {formData.precioVenta && formData.modalidadPago === 'cuotas' && formData.montoInicial && (
              <div className="formulario-summary">
                <h4 className="formulario-summary-title">
                  <DollarSign className="formulario-summary-icon" />
                  Resumen de la Venta
                </h4>
                <div className="formulario-summary-grid">
                  <div className="formulario-summary-item">
                    <p className="formulario-summary-label">Precio Total</p>
                    <p className="formulario-summary-value">${formatCurrency(formData.precioVenta)}</p>
                  </div>
                  <div className="formulario-summary-item">
                    <p className="formulario-summary-label">Inicial</p>
                    <p className="formulario-summary-value">${formatCurrency(formData.montoInicial)}</p>
                  </div>
                  <div className="formulario-summary-item">
                    <p className="formulario-summary-label">Saldo a Financiar</p>
                    <p className="formulario-summary-value">
                      ${formatCurrency(String(Number(formData.precioVenta) - Number(formData.montoInicial)))}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="formulario-actions">
              <button
                type="button"
                onClick={() => setFormData({
                  loteUid: '',
                  clienteUid: '',
                  precioVenta: '',
                  modalidadPago: 'cuotas',
                  cantidadCuotas: '',
                  montoInicial: '',
                  observaciones: '',
                })}
                className="formulario-btn formulario-btn-secondary"
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="formulario-btn formulario-btn-primary"
              >
                Registrar Venta
              </button>
            </div>
          </form>
        </div>

        <div className="formulario-footer">
          <p>Todos los campos marcados con <span className="formulario-required">*</span> son obligatorios</p>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { DollarSign, Calendar, FileText, User, Home, CheckCircle, AlertCircle } from 'lucide-react';
import { crearVenta } from '../services/ventas.service';
import { obtenerClientes } from '../services/clientes.service';
import { lotesService } from '../services/lotes.service';
import { getErrorMessage } from '../services/http.service';
import type { CrearVentaDto, Cliente } from '../types';
import './FormularioCrearVenta.css';

interface Lote {
  uid: string;
  codigo: string;
  precioLista: number | string; // Puede venir como string del backend
  estado: string;
  direccion?: string;
  manzana?: string;
  numeroLote?: string;
}

interface VentaFormData {
  loteUid: string;
  clienteUid: string;
  precioVenta: string;
  modalidadPago: 'contado' | 'cuotas';
  cantidadCuotas: string;
  montoInicial: string;
  observaciones: string;
}

export default function FormularioCrearVenta() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<VentaFormData>({
    loteUid: '',
    clienteUid: '',
    precioVenta: '',
    modalidadPago: 'cuotas',
    cantidadCuotas: '24',
    montoInicial: '',
    observaciones: '',
  });

  const [lotes, setLotes] = useState<Lote[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Opciones formateadas para react-select
  const lotesOptions = lotes.map(lote => {
    // Parsear precio a número (puede venir como string del backend)
    const precio = typeof lote.precioLista === 'string' 
      ? parseFloat(lote.precioLista) 
      : lote.precioLista;
    
    return {
      value: lote.uid,
      label: `${lote.codigo} - ${lote.manzana ? `Manzana ${lote.manzana}` : ''} ${lote.numeroLote ? `#${lote.numeroLote}` : ''} - $${Math.round(precio).toLocaleString('es-CO')}`
    };
  });

  const clientesOptions = clientes.map(cliente => ({
    value: cliente.uid,
    label: `${cliente.nombres} ${cliente.apellidos} - Doc: ${cliente.documento} - Tel: ${cliente.telefono}`
  }));

  // Cargar lotes y clientes al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setIsLoading(true);
        
        const [lotesData, clientesData] = await Promise.all([
          lotesService.obtenerLotesDisponibles(), // Usar endpoint específico de lotes disponibles
          obtenerClientes()
        ]);

        // Ya no necesitamos filtrar, el backend devuelve solo disponibles
        setLotes(lotesData);
        setClientes(clientesData);

        console.log('✅ Lotes disponibles cargados:', lotesData.length);
        console.log('✅ Clientes cargados:', clientesData.length);
      } catch (err) {
        console.error('❌ Error al cargar datos:', err);
        setError('Error al cargar lotes y clientes. Por favor, recargue la página.');
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // Actualizar precio de venta cuando se selecciona un lote
  useEffect(() => {
    if (formData.loteUid) {
      const loteSeleccionado = lotes.find(l => l.uid === formData.loteUid);
      if (loteSeleccionado && !formData.precioVenta) {
        // Parsear explícitamente a número (puede venir como string del backend)
        const precioNumerico = typeof loteSeleccionado.precioLista === 'string' 
          ? parseFloat(loteSeleccionado.precioLista)
          : loteSeleccionado.precioLista;
        
        // Redondear para eliminar decimales
        const precioRedondeado = Math.round(precioNumerico);
        
        console.log('💰 Precio autocompletado:', precioRedondeado.toLocaleString('es-CO'));
        
        setFormData(prev => ({
          ...prev,
          precioVenta: precioRedondeado.toString()
        }));
      }
    }
  }, [formData.loteUid, lotes]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);

      const ventaData: CrearVentaDto = {
        loteUid: formData.loteUid,
        clienteUid: formData.clienteUid,
        precioVenta: Number(formData.precioVenta),
        modalidadPago: formData.modalidadPago,
        cantidadCuotas: formData.modalidadPago === 'cuotas' ? Number(formData.cantidadCuotas) : undefined,
        montoInicial: Number(formData.montoInicial),
        observaciones: formData.observaciones || undefined,
      };

      console.log('📤 Enviando datos de venta:', ventaData);

      const ventaCreada = await crearVenta(ventaData);
      
      console.log('✅ Venta creada exitosamente:', ventaCreada);
      setSuccess(true);

      // Redirigir al dashboard después de 2 segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err: any) {
      console.error('❌ Error al crear venta:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
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
                    Lote <span className="formulario-required">*</span>
                  </label>
                  <Select
                    id="loteUid"
                    name="loteUid"
                    options={lotesOptions}
                    value={lotesOptions.find(option => option.value === formData.loteUid) || null}
                    onChange={(selectedOption) => {
                      const value = selectedOption?.value || '';
                      setFormData(prev => ({ ...prev, loteUid: value }));
                    }}
                    placeholder="Seleccione un lote"
                    isLoading={isLoading}
                    isDisabled={isSubmitting}
                    isClearable
                    isSearchable
                    noOptionsMessage={() => 'No hay lotes disponibles'}
                    loadingMessage={() => 'Cargando lotes...'}
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '44px',
                        borderColor: '#e2e8f0',
                        '&:hover': { borderColor: '#cbd5e1' }
                      })
                    }}
                  />
                </div>

                <div className="formulario-field">
                  <label htmlFor="clienteUid" className="formulario-label">
                    Cliente <span className="formulario-required">*</span>
                  </label>
                  <Select
                    id="clienteUid"
                    name="clienteUid"
                    options={clientesOptions}
                    value={clientesOptions.find(option => option.value === formData.clienteUid) || null}
                    onChange={(selectedOption) => {
                      const value = selectedOption?.value || '';
                      setFormData(prev => ({ ...prev, clienteUid: value }));
                    }}
                    placeholder="Seleccione un cliente"
                    isLoading={isLoading}
                    isDisabled={isSubmitting}
                    isClearable
                    isSearchable
                    noOptionsMessage={() => 'No hay clientes disponibles'}
                    loadingMessage={() => 'Cargando clientes...'}
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: '44px',
                        borderColor: '#e2e8f0',
                        '&:hover': { borderColor: '#cbd5e1' }
                      })
                    }}
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

            {/* Mensajes de error y éxito */}
            {error && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#fee',
                border: '1px solid #fcc',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#c00'
              }}>
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div style={{
                padding: '1rem',
                backgroundColor: '#efe',
                border: '1px solid #cfc',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#0a0'
              }}>
                <CheckCircle size={20} />
                <span>¡Venta registrada exitosamente! Redirigiendo al dashboard...</span>
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
                  cantidadCuotas: '24',
                  montoInicial: '',
                  observaciones: '',
                })}
                className="formulario-btn formulario-btn-secondary"
                disabled={isSubmitting}
              >
                Limpiar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
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

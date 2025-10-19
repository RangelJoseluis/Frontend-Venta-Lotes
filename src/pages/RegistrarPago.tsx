/**
 * FORMULARIO DE REGISTRO DE PAGOS
 * 
 * Permite registrar pagos a cuotas de ventas activas
 * Incluye selector de ventas, cuotas, validación y confirmación
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { 
  DollarSign, 
  Calendar, 
  CreditCard, 
  FileText, 
  AlertCircle, 
  CheckCircle,
  Home,
  User,
  TrendingUp,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { obtenerVentasPaginadas } from '../services/ventas.service';
import { cuotasService } from '../services/cuotas.service';
import { pagosService } from '../services/pagos.service';
import { getErrorMessage } from '../services/http.service';
import type { VentaResumen, Cuota, CrearPagoDto, CrearPagoResponse, MetodoPago } from '../types';
import './RegistrarPago.css';

interface PagoFormData {
  ventaUid: string;
  cuotaUid: string;
  monto: string;
  fechaPago: string;
  metodoPago: MetodoPago;
  referencia: string;
  observaciones: string;
}

const metodoPagoOptions = [
  { value: 'efectivo' as MetodoPago, label: 'Efectivo 💵', icon: DollarSign },
  { value: 'transferencia' as MetodoPago, label: 'Transferencia Bancaria 🏦', icon: CreditCard },
  { value: 'cheque' as MetodoPago, label: 'Cheque 📝', icon: FileText },
  { value: 'tarjeta' as MetodoPago, label: 'Tarjeta de Crédito/Débito 💳', icon: CreditCard },
];

export default function RegistrarPago() {
  const navigate = useNavigate();
  
  // Estados principales
  const [ventas, setVentas] = useState<VentaResumen[]>([]);
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [cuotaSeleccionada, setCuotaSeleccionada] = useState<Cuota | null>(null);
  const [isLoadingVentas, setIsLoadingVentas] = useState(true);
  const [isLoadingCuotas, setIsLoadingCuotas] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pagoResponse, setPagoResponse] = useState<CrearPagoResponse | null>(null);

  const [formData, setFormData] = useState<PagoFormData>({
    ventaUid: '',
    cuotaUid: '',
    monto: '',
    fechaPago: new Date().toISOString().split('T')[0],
    metodoPago: 'transferencia',
    referencia: '',
    observaciones: '',
  });

  // Cargar ventas al montar el componente
  useEffect(() => {
    const cargarVentas = async () => {
      try {
        setIsLoadingVentas(true);
        const response = await obtenerVentasPaginadas(1, 100);
        // Filtrar solo ventas activas y a cuotas
        const ventasActivas = response.ventas.filter(
          v => v.estado === 'activa' && v.modalidadPago === 'cuotas'
        );
        setVentas(ventasActivas);
        console.log('✅ Ventas activas cargadas:', ventasActivas.length);
      } catch (err) {
        console.error('❌ Error al cargar ventas:', err);
        setError('Error al cargar las ventas. Por favor, recargue la página.');
      } finally {
        setIsLoadingVentas(false);
      }
    };

    cargarVentas();
  }, []);

  // Cargar cuotas cuando se selecciona una venta
  useEffect(() => {
    const cargarCuotas = async () => {
      if (!formData.ventaUid) {
        setCuotas([]);
        return;
      }

      try {
        setIsLoadingCuotas(true);
        const cuotasData = await cuotasService.obtenerPorVenta(formData.ventaUid);
        // Filtrar solo cuotas pendientes (no pagadas completamente)
        const cuotasPendientes = cuotasData.filter(c => !c.estaPagada);
        setCuotas(cuotasPendientes);
        console.log('✅ Cuotas pendientes cargadas:', cuotasPendientes.length);
      } catch (err) {
        console.error('❌ Error al cargar cuotas:', err);
        setError('Error al cargar las cuotas de la venta.');
      } finally {
        setIsLoadingCuotas(false);
      }
    };

    cargarCuotas();
  }, [formData.ventaUid]);

  // Actualizar cuota seleccionada y autocompletar monto
  useEffect(() => {
    if (formData.cuotaUid) {
      const cuota = cuotas.find(c => c.uid === formData.cuotaUid);
      setCuotaSeleccionada(cuota || null);
      
      // Autocompletar con el monto pendiente
      if (cuota && !formData.monto) {
        setFormData(prev => ({
          ...prev,
          monto: cuota.montoPendiente.toString()
        }));
      }
    } else {
      setCuotaSeleccionada(null);
    }
  }, [formData.cuotaUid, cuotas]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);

      const pagoData: CrearPagoDto = {
        cuotaUid: formData.cuotaUid,
        monto: parseFloat(formData.monto),
        fechaPago: formData.fechaPago,
        metodoPago: formData.metodoPago,
        referencia: formData.referencia || undefined,
        observaciones: formData.observaciones || undefined,
      };

      console.log('📤 Enviando datos de pago:', pagoData);

      const response = await pagosService.crear(pagoData);
      
      console.log('✅ Pago registrado exitosamente:', response);
      setPagoResponse(response);
      setSuccess(true);

      // Limpiar formulario
      setFormData({
        ventaUid: '',
        cuotaUid: '',
        monto: '',
        fechaPago: new Date().toISOString().split('T')[0],
        metodoPago: 'transferencia',
        referencia: '',
        observaciones: '',
      });
      setCuotas([]);
      setCuotaSeleccionada(null);

    } catch (err: any) {
      console.error('❌ Error al registrar pago:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Opciones para react-select
  const ventasOptions = ventas.map(venta => ({
    value: venta.uid,
    label: `${venta.lote.codigo} - ${venta.cliente.nombres} ${venta.cliente.apellidos} - ${formatCurrency(venta.montoPendiente)} pendiente`
  }));

  const cuotasOptions = cuotas.map(cuota => ({
    value: cuota.uid,
    label: `Cuota #${cuota.numeroCuota} - ${formatCurrency(cuota.montoPendiente)} pendiente - Vence: ${new Date(cuota.fechaVencimiento).toLocaleDateString('es-CO')}`
  }));

  if (success && pagoResponse) {
    return (
      <div className="pago-container">
        <div className="pago-wrapper">
          <div className="success-container">
            <div className="success-card">
              <div className="success-icon">
                <CheckCircle />
              </div>
              <h2 className="success-title">¡Pago registrado exitosamente!</h2>
              <p className="success-message">{pagoResponse.mensaje}</p>

              <div className="success-details">
                <div className="detail-row">
                  <span className="detail-label">Monto:</span>
                  <span className="detail-value text-green-600 font-bold">
                    {pagoResponse.pago.montoFormateado}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Método:</span>
                  <span className="detail-value">{pagoResponse.pago.metodoPagoFormateado}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Referencia:</span>
                  <span className="detail-value font-mono">{pagoResponse.pago.referencia}</span>
                </div>
                {pagoResponse.excedente > 0 && (
                  <div className="detail-row">
                    <span className="detail-label">Excedente:</span>
                    <span className="detail-value text-orange-600">
                      {formatCurrency(pagoResponse.excedente)}
                    </span>
                  </div>
                )}
              </div>

              <div className="success-actions">
                <button
                  onClick={() => {
                    setSuccess(false);
                    setPagoResponse(null);
                  }}
                  className="btn btn-primary"
                >
                  Registrar otro pago
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn btn-secondary"
                >
                  Volver al Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pago-container">
      <div className="pago-wrapper">
        {/* Header */}
        <div className="pago-header">
          <button onClick={() => navigate('/dashboard')} className="back-button">
            <ArrowLeft size={20} />
            Volver
          </button>
          <div className="header-content">
            <div className="header-icon">
              <DollarSign />
            </div>
            <div>
              <h1 className="header-title">Registrar Pago de Cuota</h1>
              <p className="header-subtitle">Complete el formulario para registrar un nuevo pago</p>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="pago-card">
          <form onSubmit={handleSubmit} className="pago-form">
            {/* Sección: Selección de Venta */}
            <div className="form-section">
              <h3 className="section-title">
                <Home className="section-icon" />
                Seleccionar Venta
              </h3>

              <div className="form-field">
                <label htmlFor="ventaUid" className="form-label">
                  Venta <span className="required">*</span>
                </label>
                <Select
                  id="ventaUid"
                  name="ventaUid"
                  options={ventasOptions}
                  value={ventasOptions.find(option => option.value === formData.ventaUid) || null}
                  onChange={(selectedOption) => {
                    const value = selectedOption?.value || '';
                    setFormData(prev => ({ ...prev, ventaUid: value, cuotaUid: '', monto: '' }));
                  }}
                  placeholder="Seleccione una venta..."
                  isLoading={isLoadingVentas}
                  isDisabled={isSubmitting}
                  isClearable
                  isSearchable
                  noOptionsMessage={() => 'No hay ventas activas con cuotas pendientes'}
                  loadingMessage={() => 'Cargando ventas...'}
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

              {formData.ventaUid && (
                <div className="venta-info">
                  {ventas.find(v => v.uid === formData.ventaUid) && (() => {
                    const venta = ventas.find(v => v.uid === formData.ventaUid)!;
                    return (
                      <>
                        <div className="info-row">
                          <User size={16} />
                          <span>Cliente: {venta.cliente.nombres} {venta.cliente.apellidos}</span>
                        </div>
                        <div className="info-row">
                          <Home size={16} />
                          <span>Lote: {venta.lote.codigo}</span>
                        </div>
                        <div className="info-row">
                          <TrendingUp size={16} />
                          <span>Pendiente: {formatCurrency(venta.montoPendiente)}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Sección: Selección de Cuota */}
            {formData.ventaUid && (
              <div className="form-section">
                <h3 className="section-title">
                  <FileText className="section-icon" />
                  Seleccionar Cuota
                </h3>

                <div className="form-field">
                  <label htmlFor="cuotaUid" className="form-label">
                    Cuota <span className="required">*</span>
                  </label>
                  <Select
                    id="cuotaUid"
                    name="cuotaUid"
                    options={cuotasOptions}
                    value={cuotasOptions.find(option => option.value === formData.cuotaUid) || null}
                    onChange={(selectedOption) => {
                      const value = selectedOption?.value || '';
                      setFormData(prev => ({ ...prev, cuotaUid: value }));
                    }}
                    placeholder="Seleccione una cuota..."
                    isLoading={isLoadingCuotas}
                    isDisabled={isSubmitting || isLoadingCuotas}
                    isClearable
                    isSearchable
                    noOptionsMessage={() => 'No hay cuotas pendientes'}
                    loadingMessage={() => 'Cargando cuotas...'}
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

                {cuotaSeleccionada && (
                  <div className="cuota-info">
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Valor Total:</span>
                        <span className="info-value">{formatCurrency(cuotaSeleccionada.valor)}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Pagado:</span>
                        <span className="info-value text-green-600">
                          {formatCurrency(cuotaSeleccionada.montoPagado)}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Pendiente:</span>
                        <span className="info-value text-orange-600">
                          {formatCurrency(cuotaSeleccionada.montoPendiente)}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Vencimiento:</span>
                        <span className="info-value">
                          {new Date(cuotaSeleccionada.fechaVencimiento).toLocaleDateString('es-CO')}
                        </span>
                      </div>
                    </div>
                    {cuotaSeleccionada.estaVencida && (
                      <div className="alert alert-warning">
                        <Clock size={16} />
                        <span>Esta cuota está vencida ({cuotaSeleccionada.diasVencimiento} días)</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Sección: Información del Pago */}
            {formData.cuotaUid && (
              <div className="form-section">
                <h3 className="section-title">
                  <DollarSign className="section-icon" />
                  Información del Pago
                </h3>

                <div className="form-grid">
                  <div className="form-field">
                    <label htmlFor="monto" className="form-label">
                      Monto <span className="required">*</span>
                    </label>
                    <div className="input-currency">
                      <span className="currency-symbol">$</span>
                      <input
                        type="number"
                        id="monto"
                        name="monto"
                        value={formData.monto}
                        onChange={handleChange}
                        placeholder="0"
                        step="0.01"
                        min="0"
                        className="form-input input-with-symbol"
                        required
                      />
                    </div>
                    <p className="field-hint">
                      Monto pendiente: {cuotaSeleccionada ? formatCurrency(cuotaSeleccionada.montoPendiente) : '$0'}
                    </p>
                  </div>

                  <div className="form-field">
                    <label htmlFor="fechaPago" className="form-label">
                      Fecha de Pago <span className="required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Calendar className="input-icon" />
                      <input
                        type="date"
                        id="fechaPago"
                        name="fechaPago"
                        value={formData.fechaPago}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="metodoPago" className="form-label">
                      Método de Pago <span className="required">*</span>
                    </label>
                    <select
                      id="metodoPago"
                      name="metodoPago"
                      value={formData.metodoPago}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      {metodoPagoOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="referencia" className="form-label">
                      Referencia
                    </label>
                    <input
                      type="text"
                      id="referencia"
                      name="referencia"
                      value={formData.referencia}
                      onChange={handleChange}
                      placeholder="Ej: TRANS-2025-001"
                      className="form-input"
                    />
                    <p className="field-hint">
                      Opcional. Se genera automáticamente si no se especifica.
                    </p>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="observaciones" className="form-label">
                    Observaciones
                  </label>
                  <textarea
                    id="observaciones"
                    name="observaciones"
                    value={formData.observaciones}
                    onChange={handleChange}
                    placeholder="Información adicional sobre el pago..."
                    className="form-textarea"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Mensajes de Error */}
            {error && (
              <div className="alert alert-error">
                <AlertCircle size={20} />
                <div>
                  <strong>Error al procesar el pago</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* Botones de Acción */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn btn-cancel"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !formData.cuotaUid || !formData.monto}
                className="btn btn-submit"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <DollarSign size={20} />
                    Registrar Pago
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

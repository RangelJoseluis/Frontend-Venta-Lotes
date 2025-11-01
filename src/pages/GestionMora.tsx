/**
 * PÁGINA: GESTIÓN DE MORA
 * 
 * Permite visualizar y gestionar todas las cuotas con mora pendiente
 * Incluye estadísticas, filtros y acciones rápidas
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  DollarSign,
  Users,
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Calculator,
  ArrowLeft
} from 'lucide-react';
import { getErrorMessage } from '../services/http.service';
import { moraService } from '../services/mora.service';
import type { CuotaConMora, EstadisticasMora } from '../services/mora.service';
import './GestionMora.css';



export default function GestionMora() {
  const navigate = useNavigate();

  // Estados
  const [cuotas, setCuotas] = useState<CuotaConMora[]>([]);
  const [estadisticas, setEstadisticas] = useState<EstadisticasMora | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroLote, setFiltroLote] = useState('');

  // Cargar datos al montar
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Obtener estadísticas de mora usando el servicio
      const stats = await moraService.obtenerEstadisticas();
      setEstadisticas(stats);

      // Obtener cuotas con mora
      const cuotasConMora = await moraService.obtenerCuotasConMora();
      setCuotas(cuotasConMora);

      console.log('✅ Datos de mora cargados exitosamente');
      console.log(`✅ Estadísticas:`, stats);
      console.log(`✅ Cuotas con mora: ${cuotasConMora.length}`);
    } catch (err) {
      console.error('❌ Error al cargar datos de mora:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const calcularMoraMasiva = async () => {
    try {
      setIsLoading(true);
      const result = await moraService.calcularMoraMasiva();
      
      alert(
        `✅ Mora calculada exitosamente\n\n` +
        `Cuotas actualizadas: ${result.cuotasActualizadas}\n` +
        `Cuotas omitidas: ${result.cuotasOmitidas}\n` +
        `Mora acumulada: ${formatCurrency(result.moraAcumulada)}`
      );
      
      // Recargar datos
      await cargarDatos();
    } catch (err) {
      console.error('❌ Error al calcular mora:', err);
      alert(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const cuotasFiltradas = cuotas.filter(cuota => {
    const matchCliente = filtroCliente === '' || 
      cuota.venta.cliente.toLowerCase().includes(filtroCliente.toLowerCase());
    const matchLote = filtroLote === '' || 
      cuota.venta.lote.toLowerCase().includes(filtroLote.toLowerCase());
    return matchCliente && matchLote;
  });

  if (isLoading && !estadisticas) {
    return (
      <div className="mora-container">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <p>Cargando información de mora...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mora-container">
      {/* Header */}
      <div className="mora-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          <ArrowLeft size={20} />
          Volver
        </button>
        <div className="header-content">
          <div className="header-icon">
            <AlertTriangle size={32} />
          </div>
          <div>
            <h1 className="header-title">Gestión de Mora</h1>
            <p className="header-subtitle">Administración de cuotas vencidas y mora acumulada</p>
          </div>
        </div>
        <button onClick={calcularMoraMasiva} className="btn-action" disabled={isLoading}>
          <Calculator size={20} />
          Calcular Mora Masiva
        </button>
      </div>

      {/* Estadísticas */}
      {estadisticas && (
        <div className="estadisticas-grid">
          <div className="mora-stat-card primary">
            <div className="mora-stat-icon-box">
              <AlertTriangle />
            </div>
            <div className="mora-stat-content">
              <h3 className="mora-stat-label">Total Cuotas con Mora</h3>
              <p className="mora-stat-value">{estadisticas.totalCuotasConMora}</p>
            </div>
          </div>

          <div className="mora-stat-card danger">
            <div className="mora-stat-icon-box">
              <DollarSign />
            </div>
            <div className="mora-stat-content">
              <h3 className="mora-stat-label">Mora Acumulada Total</h3>
              <p className="mora-stat-value">{formatCurrency(estadisticas.moraAcumuladaTotal)}</p>
            </div>
          </div>

          <div className="mora-stat-card warning">
            <div className="mora-stat-icon-box">
              <TrendingUp />
            </div>
            <div className="mora-stat-content">
              <h3 className="mora-stat-label">Mora Pendiente de Pago</h3>
              <p className="mora-stat-value">{formatCurrency(estadisticas.moraPendientePago)}</p>
            </div>
          </div>

          <div className="mora-stat-card info">
            <div className="mora-stat-icon-box">
              <Users />
            </div>
            <div className="mora-stat-content">
              <h3 className="mora-stat-label">Promedio por Cuota</h3>
              <p className="mora-stat-value">{formatCurrency(estadisticas.promedioMoraPorCuota)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="filtros-container">
        <div className="filtros-header">
          <Filter size={20} />
          <h3>Filtros</h3>
        </div>
        <div className="filtros-grid">
          <div className="filtro-field">
            <label>Cliente</label>
            <input
              type="text"
              placeholder="Buscar por cliente..."
              value={filtroCliente}
              onChange={(e) => setFiltroCliente(e.target.value)}
              className="filtro-input"
            />
          </div>
          <div className="filtro-field">
            <label>Lote</label>
            <input
              type="text"
              placeholder="Buscar por lote..."
              value={filtroLote}
              onChange={(e) => setFiltroLote(e.target.value)}
              className="filtro-input"
            />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-error">
          <AlertTriangle size={20} />
          <div>
            <strong>Error al cargar datos</strong>
            <p>{error}</p>
          </div>
          <button onClick={cargarDatos} className="btn-retry">
            <RefreshCw size={16} />
            Reintentar
          </button>
        </div>
      )}

      {/* Tabla de cuotas */}
      <div className="tabla-container">
        <div className="tabla-header">
          <h3>Cuotas con Mora ({cuotasFiltradas.length})</h3>
          <button className="btn-export">
            <Download size={16} />
            Exportar
          </button>
        </div>

        {cuotasFiltradas.length === 0 ? (
          <div className="empty-state">
            <AlertTriangle size={48} />
            <h3>No hay cuotas con mora</h3>
            <p>¡Excelente! No hay cuotas vencidas con mora pendiente.</p>
          </div>
        ) : (
          <div className="tabla-wrapper">
            <table className="tabla-mora">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Lote</th>
                  <th>Cuota</th>
                  <th>Vencimiento</th>
                  <th>Días Mora</th>
                  <th>Mora Acumulada</th>
                  <th>Tasa Aplicada</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cuotasFiltradas.map((cuota) => (
                  <tr key={cuota.uid}>
                    <td>{cuota.venta.cliente}</td>
                    <td>{cuota.venta.lote}</td>
                    <td>#{cuota.numeroCuota}</td>
                    <td>{new Date(cuota.fechaVencimiento).toLocaleDateString('es-CO')}</td>
                    <td>
                      <span className="badge badge-danger">
                        {cuota.diasMora} días
                      </span>
                    </td>
                    <td className="text-danger font-bold">
                      {cuota.montoMoraFormateado}
                    </td>
                    <td>{(cuota.tasaMoraAplicada * 100).toFixed(3)}%</td>
                    <td>
                      <span className={`badge badge-${cuota.estado}`}>
                        {cuota.estado}
                      </span>
                    </td>
                    <td>
                      <div className="acciones-cell">
                        <button 
                          className="btn-icon" 
                          title="Ver detalle"
                          onClick={() => navigate(`/cuotas/${cuota.uid}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="btn-icon" 
                          title="Registrar pago"
                          onClick={() => navigate('/registrar-pago')}
                        >
                          <DollarSign size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

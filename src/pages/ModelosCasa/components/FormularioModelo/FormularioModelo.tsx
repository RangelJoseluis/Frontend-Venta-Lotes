// Componente FormularioModelo - Formulario de creación/edición de modelos
import { X, Save, Building2, Bath, Layers, Square, AlertCircle } from 'lucide-react';
import InputPrecio from '../InputPrecio/InputPrecio';
import { ESTADOS_MODELO } from '../../constants';
import type { FormularioModeloProps } from '../../types';
import './FormularioModelo.css';

const FormularioModelo = ({ 
  formulario, 
  modoEdicion, 
  loading, 
  onSubmit, 
  onCancelar, 
  onCambioFormulario, 
  onCambioPrecio,
  errorFormulario,
  onLimpiarError
}: FormularioModeloProps) => {

  const { datos, precioFormateado, errores, tocado } = formulario;

  const handleInputChange = (campo: keyof typeof datos, valor: any) => {
    onCambioFormulario(campo, valor);
  };

  return (
    <div className="formulario-overlay">
      <div className="formulario-modal">
        {/* Header del formulario */}
        <div className="formulario-header">
          <h2>
            <Building2 size={24} />
            {modoEdicion ? 'Editar Modelo' : 'Nuevo Modelo'}
          </h2>
          <button onClick={onCancelar} className="btn-cerrar">
            <X size={20} />
          </button>
        </div>

        {/* Error del formulario */}
        {errorFormulario && (
          <div className="formulario-error">
            <AlertCircle size={16} />
            <span>{errorFormulario}</span>
            <button type="button" onClick={onLimpiarError} className="btn-cerrar-error">
              ×
            </button>
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={onSubmit} className="formulario-contenido">
          {/* Información básica */}
          <div className="seccion-formulario">
            <h3>Información Básica</h3>
            
            <div className="campo-grupo">
              <label htmlFor="nombre">Nombre del Modelo *</label>
              <input
                id="nombre"
                type="text"
                value={datos.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                placeholder="Ej: Casa Moderna 120m²"
                className={errores.nombre && tocado.nombre ? 'error' : ''}
                disabled={loading}
              />
              {errores.nombre && tocado.nombre && (
                <span className="error-mensaje">{errores.nombre}</span>
              )}
            </div>

            <div className="campo-grupo">
              <label htmlFor="descripcion">Descripción</label>
              <textarea
                id="descripcion"
                value={datos.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                placeholder="Descripción del modelo de casa..."
                rows={3}
                disabled={loading}
              />
            </div>

            <div className="campo-grupo">
              <label htmlFor="precioBase">Precio Base *</label>
              <InputPrecio
                valor={precioFormateado}
                onChange={onCambioPrecio}
                placeholder="Ingrese el precio base"
                disabled={loading}
                error={errores.precioBase && tocado.precioBase ? errores.precioBase : undefined}
              />
            </div>
          </div>

          {/* Características */}
          <div className="seccion-formulario">
            <h3>Características</h3>
            
            <div className="campos-fila">
              <div className="campo-grupo">
                <label htmlFor="metrosCubiertos">
                  <Square size={16} />
                  Metros Cubiertos *
                </label>
                <input
                  id="metrosCubiertos"
                  type="number"
                  value={datos.metrosCubiertos}
                  onChange={(e) => handleInputChange('metrosCubiertos', parseInt(e.target.value) || 0)}
                  min="1"
                  max="10000"
                  className={errores.metrosCubiertos && tocado.metrosCubiertos ? 'error' : ''}
                  disabled={loading}
                />
                {errores.metrosCubiertos && tocado.metrosCubiertos && (
                  <span className="error-mensaje">{errores.metrosCubiertos}</span>
                )}
              </div>

              <div className="campo-grupo">
                <label htmlFor="ambientes">
                  <Building2 size={16} />
                  Ambientes *
                </label>
                <input
                  id="ambientes"
                  type="number"
                  value={datos.ambientes}
                  onChange={(e) => handleInputChange('ambientes', parseInt(e.target.value) || 1)}
                  min="1"
                  max="20"
                  className={errores.ambientes && tocado.ambientes ? 'error' : ''}
                  disabled={loading}
                />
                {errores.ambientes && tocado.ambientes && (
                  <span className="error-mensaje">{errores.ambientes}</span>
                )}
              </div>
            </div>

            <div className="campos-fila">
              <div className="campo-grupo">
                <label htmlFor="banos">
                  <Bath size={16} />
                  Baños *
                </label>
                <input
                  id="banos"
                  type="number"
                  value={datos.banos}
                  onChange={(e) => handleInputChange('banos', parseInt(e.target.value) || 1)}
                  min="1"
                  max="10"
                  className={errores.banos && tocado.banos ? 'error' : ''}
                  disabled={loading}
                />
                {errores.banos && tocado.banos && (
                  <span className="error-mensaje">{errores.banos}</span>
                )}
              </div>

              <div className="campo-grupo">
                <label htmlFor="pisos">
                  <Layers size={16} />
                  Pisos *
                </label>
                <input
                  id="pisos"
                  type="number"
                  value={datos.pisos}
                  onChange={(e) => handleInputChange('pisos', parseInt(e.target.value) || 1)}
                  min="1"
                  max="5"
                  className={errores.pisos && tocado.pisos ? 'error' : ''}
                  disabled={loading}
                />
                {errores.pisos && tocado.pisos && (
                  <span className="error-mensaje">{errores.pisos}</span>
                )}
              </div>
            </div>

            <div className="campos-fila">
              <div className="campo-grupo">
                <label htmlFor="amueblado" className="checkbox-label">
                  <input
                    id="amueblado"
                    type="checkbox"
                    checked={datos.amueblado}
                    onChange={(e) => handleInputChange('amueblado', e.target.checked)}
                    disabled={loading}
                  />
                  Amueblado
                </label>
              </div>

              <div className="campo-grupo">
                <label htmlFor="estado">Estado</label>
                <select
                  id="estado"
                  value={datos.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  disabled={loading}
                >
                  <option value={ESTADOS_MODELO.ACTIVO}>Activo</option>
                  <option value={ESTADOS_MODELO.INACTIVO}>Inactivo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Imagen y observaciones */}
          <div className="seccion-formulario">
            <h3>Adicional</h3>
            
            <div className="campo-grupo">
              <label htmlFor="imagenUrl">URL de Imagen</label>
              <input
                id="imagenUrl"
                type="url"
                value={datos.imagenUrl}
                onChange={(e) => handleInputChange('imagenUrl', e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                className={errores.imagenUrl && tocado.imagenUrl ? 'error' : ''}
                disabled={loading}
              />
              {errores.imagenUrl && tocado.imagenUrl && (
                <span className="error-mensaje">{errores.imagenUrl}</span>
              )}
            </div>

            <div className="campo-grupo">
              <label htmlFor="observaciones">Observaciones</label>
              <textarea
                id="observaciones"
                value={datos.observaciones}
                onChange={(e) => handleInputChange('observaciones', e.target.value)}
                placeholder="Observaciones adicionales..."
                rows={2}
                disabled={loading}
              />
            </div>
          </div>

          {/* Botones */}
          <div className="formulario-acciones">
            <button
              type="button"
              onClick={onCancelar}
              className="btn-cancelar"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-guardar"
              disabled={loading}
            >
              <Save size={16} />
              {loading ? 'Guardando...' : (modoEdicion ? 'Actualizar' : 'Crear')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioModelo;

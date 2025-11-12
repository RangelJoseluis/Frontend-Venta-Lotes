import React from 'react';
import { X, Save, Loader, AlertCircle } from 'lucide-react';
import type { FormularioUsuarioProps } from '../../types';
import { formatearInputCedula, formatearInputTelefono, capitalizarPalabras } from '../../utils/formatters';
import './FormularioUsuario.css';

const FormularioUsuario: React.FC<FormularioUsuarioProps> = ({
  formulario,
  modoEdicion,
  soloLectura = false,
  loading,
  onSubmit,
  onCancelar,
  onCambioFormulario,
  errorFormulario,
  onLimpiarError
}) => {
  const { datos, errores, tocado } = formulario;

  const handleInputChange = (campo: keyof typeof datos, valor: string) => {
    let valorProcesado = valor;

    switch (campo) {
      case 'cedula':
        valorProcesado = formatearInputCedula(valor);
        break;
      case 'telefono':
        valorProcesado = formatearInputTelefono(valor);
        break;
      case 'nombres':
      case 'apellidos':
        valorProcesado = capitalizarPalabras(valor);
        break;
      case 'email':
        valorProcesado = valor.toLowerCase().trim();
        break;
    }

    onCambioFormulario(campo, valorProcesado);
  };

  const getInputClassName = (campo: keyof typeof datos): string => {
    const baseClass = 'form-input';
    if (tocado[campo] && errores[campo]) {
      return `${baseClass} form-input-error`;
    }
    if (tocado[campo] && !errores[campo] && datos[campo]) {
      return `${baseClass} form-input-success`;
    }
    return baseClass;
  };

  return (
    <div className="formulario-overlay">
      <div className="form-container">
        <div className="form-header">
          <h3 className="form-title">
            {modoEdicion ? '✏️ Editar Usuario' : '➕ Crear Nuevo Usuario'}
          </h3>
          <button className="btn-icon" onClick={onCancelar} disabled={loading}>
            <X size={20} />
          </button>
        </div>

        {errorFormulario && (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{errorFormulario}</span>
            {onLimpiarError && (
              <button onClick={onLimpiarError} className="alert-close">
                <X size={16} />
              </button>
            )}
          </div>
        )}

        <div className="form-content">
          <form onSubmit={onSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  Nombres *
                  {tocado.nombres && errores.nombres && (
                    <span className="label-error">({errores.nombres})</span>
                  )}
                </label>
                <input
                  type="text"
                  value={datos.nombres}
                  onChange={(e) => handleInputChange('nombres', e.target.value)}
                  placeholder="Ingrese los nombres"
                  className={getInputClassName('nombres')}
                  disabled={loading || soloLectura}
                  maxLength={50}
                  readOnly={soloLectura}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Apellidos *
                  {tocado.apellidos && errores.apellidos && (
                    <span className="label-error">({errores.apellidos})</span>
                  )}
                </label>
                <input
                  type="text"
                  value={datos.apellidos}
                  onChange={(e) => handleInputChange('apellidos', e.target.value)}
                  placeholder="Ingrese los apellidos"
                  className={getInputClassName('apellidos')}
                  disabled={loading || soloLectura}
                  maxLength={50}
                  readOnly={soloLectura}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Email *
                  {tocado.email && errores.email && (
                    <span className="label-error">({errores.email})</span>
                  )}
                </label>
                <input
                  type="email"
                  value={datos.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  className={getInputClassName('email')}
                  disabled={loading || modoEdicion || soloLectura}
                  maxLength={100}
                  readOnly={soloLectura}
                />
              </div>

              {!modoEdicion && (
                <div className="form-group">
                  <label className="form-label">
                    Contraseña *
                    {tocado.password && errores.password && (
                      <span className="label-error">({errores.password})</span>
                    )}
                  </label>
                  <input
                    type="password"
                    value={datos.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className={getInputClassName('password')}
                    disabled={loading || soloLectura}
                    minLength={6}
                    maxLength={50}
                    readOnly={soloLectura}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">
                  Cédula *
                  {tocado.cedula && errores.cedula && (
                    <span className="label-error">({errores.cedula})</span>
                  )}
                </label>
                <input
                  type="text"
                  value={datos.cedula}
                  onChange={(e) => handleInputChange('cedula', e.target.value)}
                  placeholder="1234567890"
                  className={getInputClassName('cedula')}
                  disabled={loading || soloLectura}
                  maxLength={12}
                  readOnly={soloLectura}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Teléfono *
                  {tocado.telefono && errores.telefono && (
                    <span className="label-error">({errores.telefono})</span>
                  )}
                </label>
                <input
                  type="text"
                  value={datos.telefono}
                  onChange={(e) => handleInputChange('telefono', e.target.value)}
                  placeholder="3001234567"
                  className={getInputClassName('telefono')}
                  disabled={loading || soloLectura}
                  maxLength={10}
                  readOnly={soloLectura}
                />
              </div>

              <div className="form-group form-group-full">
                <label className="form-label">
                  Dirección (Opcional)
                  {tocado.direccion && errores.direccion && (
                    <span className="label-error">({errores.direccion})</span>
                  )}
                </label>
                <input
                  type="text"
                  value={datos.direccion}
                  onChange={(e) => handleInputChange('direccion', e.target.value)}
                  placeholder="Calle 123 #45-67"
                  className={getInputClassName('direccion')}
                  disabled={loading || soloLectura}
                  maxLength={200}
                  readOnly={soloLectura}
                />
              </div>
            </div>

            {!modoEdicion && (
              <div className="form-info">
                <AlertCircle size={16} />
                <span>Al crear el usuario, automáticamente se creará como cliente en el sistema.</span>
              </div>
            )}
          </form>
        </div>

        {/* Solo mostrar botones si NO es modo solo lectura */}
        {!soloLectura && (
          <div className="form-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancelar}
              disabled={loading}
            >
              <X size={20} />
              <span>Cancelar</span>
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              onClick={onSubmit}
            >
              {loading ? (
                <>
                  <Loader className="spinner" size={20} />
                  <span>Procesando...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>{modoEdicion ? 'Actualizar Usuario' : 'Crear Usuario'}</span>
                </>
              )}
            </button>
          </div>
        )}
        
        {/* Botón de cerrar para modo solo lectura */}
        {soloLectura && (
          <div className="form-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancelar}
            >
              <X size={20} />
              <span>Cerrar</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormularioUsuario;

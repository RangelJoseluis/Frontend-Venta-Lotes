import React from 'react';
import { X, Save, Loader, AlertCircle } from 'lucide-react';
import type { FormularioUsuarioProps } from '../../types';
import { formatearInputCedula, formatearInputTelefono, capitalizarPalabras } from '../../utils/formatters';

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
    const baseClass = 'w-full px-3 py-2 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-400 bg-white dark:bg-slate-800 text-slate-900 dark:text-white';

    if (tocado[campo] && errores[campo]) {
      return `${baseClass} border-red-300 dark:border-red-500/50 focus:border-red-500`;
    }
    if (tocado[campo] && !errores[campo] && datos[campo]) {
      return `${baseClass} border-emerald-300 dark:border-emerald-500/50 focus:border-emerald-500`;
    }
    return `${baseClass} border-slate-200 dark:border-slate-700 focus:border-blue-500`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            {modoEdicion ? '✏️ Editar Usuario' : '➕ Crear Nuevo Usuario'}
          </h3>
          <button
            onClick={onCancelar}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {errorFormulario && (
          <div className="mx-6 mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-lg flex items-start gap-3 text-red-700 dark:text-red-400">
            <AlertCircle size={20} className="shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">{errorFormulario}</div>
            {onLimpiarError && (
              <button onClick={onLimpiarError} className="text-red-500 hover:text-red-700 dark:hover:text-red-300">
                <X size={16} />
              </button>
            )}
          </div>
        )}

        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Nombres *
                  {tocado.nombres && errores.nombres && (
                    <span className="ml-2 text-red-500 normal-case tracking-normal">({errores.nombres})</span>
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

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Apellidos *
                  {tocado.apellidos && errores.apellidos && (
                    <span className="ml-2 text-red-500 normal-case tracking-normal">({errores.apellidos})</span>
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

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Email *
                  {tocado.email && errores.email && (
                    <span className="ml-2 text-red-500 normal-case tracking-normal">({errores.email})</span>
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
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Contraseña *
                    {tocado.password && errores.password && (
                      <span className="ml-2 text-red-500 normal-case tracking-normal">({errores.password})</span>
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

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Cédula *
                  {tocado.cedula && errores.cedula && (
                    <span className="ml-2 text-red-500 normal-case tracking-normal">({errores.cedula})</span>
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

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Teléfono *
                  {tocado.telefono && errores.telefono && (
                    <span className="ml-2 text-red-500 normal-case tracking-normal">({errores.telefono})</span>
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

              <div className="space-y-1.5 md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Dirección (Opcional)
                  {tocado.direccion && errores.direccion && (
                    <span className="ml-2 text-red-500 normal-case tracking-normal">({errores.direccion})</span>
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
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg flex items-center gap-3 text-sm">
                <AlertCircle size={18} className="shrink-0" />
                <span>Al crear el usuario, automáticamente se creará como cliente en el sistema.</span>
              </div>
            )}
          </form>
        </div>

        {/* Solo mostrar botones si NO es modo solo lectura */}
        {!soloLectura && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              onClick={onCancelar}
              disabled={loading}
            >
              <div className="flex items-center gap-2">
                <X size={18} />
                <span>Cancelar</span>
              </div>
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={onSubmit}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin" size={18} />
                  <span>Procesando...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save size={18} />
                  <span>{modoEdicion ? 'Actualizar Usuario' : 'Crear Usuario'}</span>
                </div>
              )}
            </button>
          </div>
        )}

        {/* Botón de cerrar para modo solo lectura */}
        {soloLectura && (
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              onClick={onCancelar}
            >
              <div className="flex items-center gap-2">
                <X size={18} />
                <span>Cerrar</span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormularioUsuario;

// Componente FormularioModelo - Formulario de creación/edición de modelos
import { X, Save, Building2, Bath, Layers, Square, AlertCircle } from 'lucide-react';
import InputPrecio from '../InputPrecio/InputPrecio';
import { ESTADOS_MODELO } from '../../constants';
import type { FormularioModeloProps } from '../../types';

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

  const { datos, errores, tocado } = formulario;

  const handleInputChange = (campo: keyof typeof datos, valor: any) => {
    onCambioFormulario(campo, valor);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header del formulario */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Building2 size={24} className="text-blue-600 dark:text-blue-400" />
            {modoEdicion ? 'Editar Modelo' : 'Nuevo Modelo'}
          </h2>
          <button
            onClick={onCancelar}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Error del formulario */}
        {errorFormulario && (
          <div className="mx-6 mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between text-red-700 dark:text-red-400">
            <div className="flex items-center gap-3">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{errorFormulario}</span>
            </div>
            <button
              type="button"
              onClick={onLimpiarError}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-300"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Formulario Scrollable */}
        <form onSubmit={onSubmit} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Información básica */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">
              Información Básica
            </h3>

            <div className="space-y-2">
              <label htmlFor="nombre" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Nombre del Modelo <span className="text-red-500">*</span>
              </label>
              <input
                id="nombre"
                type="text"
                value={datos.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                placeholder="Ej: Casa Moderna 120m²"
                className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errores.nombre && tocado.nombre
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 dark:border-slate-600'
                  }`}
                disabled={loading}
              />
              {errores.nombre && tocado.nombre && (
                <p className="text-xs text-red-500 mt-1">{errores.nombre}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="descripcion" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Descripción
              </label>
              <textarea
                id="descripcion"
                value={datos.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                placeholder="Descripción del modelo de casa..."
                rows={3}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="precioBase" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Precio Base <span className="text-red-500">*</span>
              </label>
              <InputPrecio
                valor={datos.precioBase || 0}
                onChange={onCambioPrecio}
                placeholder="Ingrese el precio base"
                disabled={loading}
                error={errores.precioBase && tocado.precioBase ? errores.precioBase : undefined}
              />
            </div>
          </div>

          {/* Características */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">
              Características
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="metrosCubiertos" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Square size={16} className="text-slate-400" />
                  Metros Cubiertos <span className="text-red-500">*</span>
                </label>
                <input
                  id="metrosCubiertos"
                  type="number"
                  value={datos.metrosCubiertos}
                  onChange={(e) => handleInputChange('metrosCubiertos', parseInt(e.target.value) || 0)}
                  min="1"
                  max="10000"
                  className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errores.metrosCubiertos && tocado.metrosCubiertos
                      ? 'border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                    }`}
                  disabled={loading}
                />
                {errores.metrosCubiertos && tocado.metrosCubiertos && (
                  <p className="text-xs text-red-500 mt-1">{errores.metrosCubiertos}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="ambientes" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Building2 size={16} className="text-slate-400" />
                  Ambientes <span className="text-red-500">*</span>
                </label>
                <input
                  id="ambientes"
                  type="number"
                  value={datos.ambientes}
                  onChange={(e) => handleInputChange('ambientes', parseInt(e.target.value) || 1)}
                  min="1"
                  max="20"
                  className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errores.ambientes && tocado.ambientes
                      ? 'border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                    }`}
                  disabled={loading}
                />
                {errores.ambientes && tocado.ambientes && (
                  <p className="text-xs text-red-500 mt-1">{errores.ambientes}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="banos" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Bath size={16} className="text-slate-400" />
                  Baños <span className="text-red-500">*</span>
                </label>
                <input
                  id="banos"
                  type="number"
                  value={datos.banos}
                  onChange={(e) => handleInputChange('banos', parseInt(e.target.value) || 1)}
                  min="1"
                  max="10"
                  className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errores.banos && tocado.banos
                      ? 'border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                    }`}
                  disabled={loading}
                />
                {errores.banos && tocado.banos && (
                  <p className="text-xs text-red-500 mt-1">{errores.banos}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="pisos" className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Layers size={16} className="text-slate-400" />
                  Pisos <span className="text-red-500">*</span>
                </label>
                <input
                  id="pisos"
                  type="number"
                  value={datos.pisos}
                  onChange={(e) => handleInputChange('pisos', parseInt(e.target.value) || 1)}
                  min="1"
                  max="5"
                  className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errores.pisos && tocado.pisos
                      ? 'border-red-500'
                      : 'border-slate-300 dark:border-slate-600'
                    }`}
                  disabled={loading}
                />
                {errores.pisos && tocado.pisos && (
                  <p className="text-xs text-red-500 mt-1">{errores.pisos}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center h-full pt-6">
                <label htmlFor="amueblado" className="flex items-center gap-2 cursor-pointer group">
                  <input
                    id="amueblado"
                    type="checkbox"
                    checked={datos.amueblado}
                    onChange={(e) => handleInputChange('amueblado', e.target.checked)}
                    disabled={loading}
                    className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-600"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Amueblado
                  </span>
                </label>
              </div>

              <div className="space-y-2">
                <label htmlFor="estado" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Estado
                </label>
                <select
                  id="estado"
                  value={datos.estado}
                  onChange={(e) => handleInputChange('estado', e.target.value)}
                  disabled={loading}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value={ESTADOS_MODELO.ACTIVO}>Activo</option>
                  <option value={ESTADOS_MODELO.INACTIVO}>Inactivo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Imagen y observaciones */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700 pb-2">
              Adicional
            </h3>

            <div className="space-y-2">
              <label htmlFor="imagenUrl" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                URL de Imagen
              </label>
              <input
                id="imagenUrl"
                type="url"
                value={datos.imagenUrl}
                onChange={(e) => handleInputChange('imagenUrl', e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                className={`w-full px-3 py-2 bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errores.imagenUrl && tocado.imagenUrl
                    ? 'border-red-500'
                    : 'border-slate-300 dark:border-slate-600'
                  }`}
                disabled={loading}
              />
              {errores.imagenUrl && tocado.imagenUrl && (
                <p className="text-xs text-red-500 mt-1">{errores.imagenUrl}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="observaciones" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Observaciones
              </label>
              <textarea
                id="observaciones"
                value={datos.observaciones}
                onChange={(e) => handleInputChange('observaciones', e.target.value)}
                placeholder="Observaciones adicionales..."
                rows={2}
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                disabled={loading}
              />
            </div>
          </div>
        </form>

        {/* Footer con Botones */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 sticky bottom-0 z-10">
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={(e) => onSubmit(e as any)}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <Save size={18} />
            {loading ? 'Guardando...' : (modoEdicion ? 'Actualizar' : 'Crear')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioModelo;

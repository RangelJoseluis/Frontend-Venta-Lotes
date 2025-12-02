/**
 * COMPONENTE: FORMULARIO SERVICIO
 * 
 * Formulario para crear y editar servicios
 * Migrado a Tailwind CSS con diseño moderno
 */

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  FileText,
  Tag,
  DollarSign,
  Building2,
  Layers,
  Shield,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';
import serviciosService from '../../../../services/servicios.service';
import type { CrearServicioDto, Servicio } from '../../../../types';

interface FormularioServicioProps {
  servicioUid?: string;
  onGuardar: () => void;
  onCancelar: () => void;
}

const FormularioServicio: React.FC<FormularioServicioProps> = ({
  servicioUid,
  onGuardar,
  onCancelar
}) => {
  const esEdicion = !!servicioUid;

  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState<string>('');
  const [exito, setExito] = useState(false);
  const [formData, setFormData] = useState<CrearServicioDto>({
    nombre: '',
    descripcion: '',
    categoria: 'utilities',
    tipo: 'publico',
    costoMensualBase: 0,
    esencial: false,
    proveedor: ''
  });

  useEffect(() => {
    if (esEdicion && servicioUid) {
      cargarServicio(servicioUid);
    }
  }, [servicioUid, esEdicion]);

  const cargarServicio = async (uid: string) => {
    try {
      setCargando(true);
      setError('');
      const servicio: Servicio = await serviciosService.obtenerPorUid(uid);
      setFormData({
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        categoria: servicio.categoria,
        tipo: servicio.tipo,
        costoMensualBase: servicio.costoMensual || 0,
        esencial: servicio.esEsencial || false,
        proveedor: servicio.proveedor || ''
      });
    } catch (error) {
      console.error('Error al cargar servicio:', error);
      setError('Error al cargar el servicio');
      setTimeout(() => onCancelar(), 2000);
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!formData.descripcion || formData.descripcion.trim().length < 10) {
      setError('La descripción debe tener al menos 10 caracteres');
      return;
    }

    if (formData.costoMensualBase && formData.costoMensualBase < 0) {
      setError('El costo mensual no puede ser negativo');
      return;
    }

    try {
      setGuardando(true);

      if (esEdicion && servicioUid) {
        await serviciosService.actualizar(servicioUid, formData);
      } else {
        await serviciosService.crear(formData);
      }

      setExito(true);
      setTimeout(() => {
        onGuardar();
      }, 1500);

    } catch (error: any) {
      console.error('Error al guardar servicio:', error);
      setError(error.response?.data?.message || 'Error al guardar el servicio');
    } finally {
      setGuardando(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : type === 'number'
          ? parseFloat(value) || 0
          : value
    }));
  };

  if (cargando) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader size={48} className="animate-spin text-blue-600 dark:text-blue-400" />
        <p className="mt-4 text-slate-500 dark:text-slate-400">Cargando servicio...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header Compacto */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <button
            type="button"
            onClick={onCancelar}
            className="p-2 -ml-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all"
            title="Volver a Gestión de Servicios"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white leading-none">
              {esEdicion ? 'Editar Servicio' : 'Nuevo Servicio'}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Gestión de Servicios / {esEdicion ? 'Editar' : 'Crear'}
            </p>
          </div>
        </div>
      </div>

      {/* Mensajes */}
      {error && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {exito && (
        <div className="flex items-center gap-3 p-4 mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-700 dark:text-green-400">
          <CheckCircle size={20} className="flex-shrink-0" />
          <span>{esEdicion ? 'Servicio actualizado exitosamente' : 'Servicio creado exitosamente'}</span>
        </div>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sección: Información Básica */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FileText size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Información Básica
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Datos principales del servicio
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Tag size={16} className="text-slate-400" />
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: Agua potable"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Proveedor */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Building2 size={16} className="text-slate-400" />
                Proveedor
              </label>
              <input
                type="text"
                name="proveedor"
                value={formData.proveedor}
                onChange={handleChange}
                placeholder="Ej: Empresa XYZ"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Descripción - Full width */}
            <div className="md:col-span-2 space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FileText size={16} className="text-slate-400" />
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                required
                minLength={10}
                placeholder="Descripción del servicio (mínimo 10 caracteres)"
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formData.descripcion.length}/10 caracteres mínimos
              </p>
            </div>
          </div>
        </div>

        {/* Sección: Clasificación */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Layers size={20} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Clasificación y Costos
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Categorización y valores del servicio
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Categoría */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Layers size={16} className="text-slate-400" />
                Categoría <span className="text-red-500">*</span>
              </label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="utilities">Utilities</option>
                <option value="comunicaciones">Comunicaciones</option>
                <option value="seguridad">Seguridad</option>
                <option value="transporte">Transporte</option>
                <option value="recreacion">Recreación</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            {/* Tipo */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Shield size={16} className="text-slate-400" />
                Tipo <span className="text-red-500">*</span>
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="publico">Público</option>
                <option value="privado">Privado</option>
                <option value="opcional">Opcional</option>
                <option value="basico">Básico</option>
              </select>
            </div>

            {/* Costo Mensual */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <DollarSign size={16} className="text-slate-400" />
                Costo Mensual Base
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">$</span>
                <input
                  type="number"
                  name="costoMensualBase"
                  value={formData.costoMensualBase || 0}
                  onChange={handleChange}
                  min="0"
                  step="1000"
                  placeholder="0"
                  className="w-full pl-8 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Checkbox Esencial */}
            <div className="flex items-center h-full pt-6">
              <label className="relative flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer w-full transition-colors">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    name="esencial"
                    checked={formData.esencial || false}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <Shield size={18} className="text-slate-400" />
                  <span>Servicio esencial</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onCancelar}
            disabled={guardando}
            className="px-6 py-2.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {guardando ? (
              <>
                <Loader size={20} className="animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save size={20} />
                {esEdicion ? 'Actualizar' : 'Crear Servicio'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioServicio;

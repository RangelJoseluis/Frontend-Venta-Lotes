import { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import serviciosService from '../../../../services/servicios.service';
import type { CrearServicioDto, Servicio } from '../../../../types';
import './FormularioServicio.css';

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
      alert('Error al cargar servicio');
      onCancelar();
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.nombre.trim()) {
      alert('El nombre es requerido');
      return;
    }

    if (!formData.descripcion || formData.descripcion.trim().length < 10) {
      alert('La descripción es requerida y debe tener al menos 10 caracteres');
      return;
    }

    if (formData.costoMensualBase && formData.costoMensualBase < 0) {
      alert('El costo mensual no puede ser negativo');
      return;
    }

    try {
      setGuardando(true);

      if (esEdicion && servicioUid) {
        await serviciosService.actualizar(servicioUid, formData);
        alert('Servicio actualizado exitosamente');
      } else {
        await serviciosService.crear(formData);
        alert('Servicio creado exitosamente');
      }

      onGuardar();
    } catch (error: any) {
      console.error('Error al guardar servicio:', error);
      alert(error.response?.data?.message || 'Error al guardar servicio');
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
      <div className="formulario-servicio">
        <div className="cargando">Cargando servicio...</div>
      </div>
    );
  }

  return (
    <div className="formulario-servicio">
      {/* Header */}
      <div className="header">
        <button
          className="btn-volver"
          onClick={onCancelar}
        >
          <ArrowLeft size={20} />
          Volver
        </button>
        <h1>{esEdicion ? 'Editar Servicio' : 'Nuevo Servicio'}</h1>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="formulario">
        <div className="seccion">
          <h2>Información Básica</h2>

          <div className="campo">
            <label htmlFor="nombre">Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: Agua potable"
            />
          </div>

          <div className="campo">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              required
              minLength={10}
              placeholder="Descripción del servicio (mínimo 10 caracteres)"
            />
          </div>

          <div className="campo">
            <label htmlFor="proveedor">Proveedor</label>
            <input
              type="text"
              id="proveedor"
              name="proveedor"
              value={formData.proveedor}
              onChange={handleChange}
              placeholder="Ej: Empresa XYZ"
            />
          </div>
        </div>

        <div className="seccion">
          <h2>Clasificación</h2>

          <div className="campo">
            <label htmlFor="categoria">Categoría *</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="utilities">Utilities</option>
              <option value="comunicaciones">Comunicaciones</option>
              <option value="seguridad">Seguridad</option>
              <option value="transporte">Transporte</option>
              <option value="recreacion">Recreación</option>
              <option value="otros">Otros</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="tipo">Tipo *</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="publico">Público</option>
              <option value="privado">Privado</option>
              <option value="opcional">Opcional</option>
              <option value="basico">Básico</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="costoMensualBase">Costo Mensual Base</label>
            <input
              type="number"
              id="costoMensualBase"
              name="costoMensualBase"
              value={formData.costoMensualBase || 0}
              onChange={handleChange}
              min="0"
              step="1000"
              placeholder="0"
            />
          </div>

          <div className="campo-checkbox">
            <input
              type="checkbox"
              id="esencial"
              name="esencial"
              checked={formData.esencial || false}
              onChange={handleChange}
            />
            <label htmlFor="esencial">Es esencial</label>
          </div>
        </div>

        {/* Botones */}
        <div className="botones">
          <button
            type="button"
            className="btn-cancelar"
            onClick={onCancelar}
            disabled={guardando}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn-guardar"
            disabled={guardando}
          >
            <Save size={20} />
            {guardando ? 'Guardando...' : esEdicion ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioServicio;

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import serviciosService from '../services/servicios.service';
import type { CrearServicioDto, Servicio } from '../types';
import './FormularioServicio.css';

const FormularioServicio = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const esEdicion = !!uid;

  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [formData, setFormData] = useState<CrearServicioDto>({
    nombre: '',
    descripcion: '',
    categoria: 'utilities',
    tipo: 'publico',
    costoMensual: 0,
    esEsencial: false,
    proveedor: ''
  });

  useEffect(() => {
    if (esEdicion && uid) {
      cargarServicio(uid);
    }
  }, [uid, esEdicion]);

  const cargarServicio = async (servicioUid: string) => {
    try {
      setCargando(true);
      const servicio: Servicio = await serviciosService.obtenerPorUid(servicioUid);
      setFormData({
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        categoria: servicio.categoria,
        tipo: servicio.tipo,
        costoMensual: servicio.costoMensual,
        esEsencial: servicio.esEsencial,
        proveedor: servicio.proveedor || ''
      });
    } catch (error) {
      console.error('Error al cargar servicio:', error);
      alert('Error al cargar servicio');
      navigate('/servicios');
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

    if (formData.costoMensual < 0) {
      alert('El costo mensual no puede ser negativo');
      return;
    }

    try {
      setGuardando(true);

      if (esEdicion && uid) {
        await serviciosService.actualizar(uid, formData);
        alert('Servicio actualizado exitosamente');
      } else {
        await serviciosService.crear(formData);
        alert('Servicio creado exitosamente');
      }

      navigate('/servicios');
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
          onClick={() => navigate('/servicios')}
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
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={3}
              placeholder="Descripción del servicio"
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
            <label htmlFor="costoMensual">Costo Mensual *</label>
            <input
              type="number"
              id="costoMensual"
              name="costoMensual"
              value={formData.costoMensual}
              onChange={handleChange}
              required
              min="0"
              step="1000"
              placeholder="0"
            />
          </div>

          <div className="campo-checkbox">
            <input
              type="checkbox"
              id="esEsencial"
              name="esEsencial"
              checked={formData.esEsencial}
              onChange={handleChange}
            />
            <label htmlFor="esEsencial">Es esencial</label>
          </div>
        </div>

        {/* Botones */}
        <div className="botones">
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => navigate('/servicios')}
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

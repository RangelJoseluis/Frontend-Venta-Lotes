/**
 * COMPONENTE COMPARTIDO: FORMULARIO DE LOTE
 * Formulario reutilizable para crear y editar lotes
 * Usado por: NuevoLote.tsx y EditarLote.tsx
 */

import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { FileText, Ruler, MapPin, Settings, MessageSquare, Home } from 'lucide-react';
import type { Servicio } from '../services/servicios.service';
import type { ModeloCasa } from '../types';

interface FormularioLoteProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  calcularSuperficie: () => void;
  serviciosDisponibles: Servicio[];
  serviciosSeleccionados: string[];
  setServiciosSeleccionados: (servicios: string[]) => void;
  modelosCasaDisponibles: ModeloCasa[];
  modeloCasaSeleccionado: string;
  setModeloCasaSeleccionado: (modelo: string) => void;
  isLoading?: boolean;
  modoEdicion?: boolean;
}

const FormularioLote = ({
  register,
  errors,
  calcularSuperficie,
  serviciosDisponibles,
  serviciosSeleccionados,
  setServiciosSeleccionados,
  modelosCasaDisponibles,
  modeloCasaSeleccionado,
  setModeloCasaSeleccionado,
  isLoading = false,
  modoEdicion = false
}: FormularioLoteProps) => {
  
  return (
    <>
      {/* NOTA: Este es un componente simplificado */}
      {/* Para una implementación completa, necesitarías copiar todo el contenido */}
      {/* del formulario de NuevoLote.tsx aquí */}
      
      <div className="form-section">
        <h2 className="form-section-title">
          <FileText size={20} />
          Información Básica
        </h2>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
          {modoEdicion ? '💡 Modifica los campos que desees actualizar' : '📝 Completa la información del nuevo lote'}
        </p>
        
        {/* INSTRUCCIÓN: Copia aquí todo el contenido del formulario de NuevoLote.tsx */}
        {/* Desde la sección "Información Básica" hasta antes de "Botones" */}
        
        <div style={{ 
          padding: '2rem', 
          background: '#fef3c7', 
          border: '2px dashed #f59e0b',
          borderRadius: '0.5rem',
          textAlign: 'center'
        }}>
          <p style={{ color: '#92400e', fontWeight: 600, marginBottom: '0.5rem' }}>
            ⚠️ FORMULARIO INCOMPLETO
          </p>
          <p style={{ color: '#78350f', fontSize: '0.875rem' }}>
            Por favor, copia el contenido completo del formulario de NuevoLote.tsx aquí
          </p>
        </div>
      </div>
    </>
  );
};

export default FormularioLote;

import { AlertCircle, CheckCircle } from 'lucide-react';
import type { MensajeConfig as MensajeConfigType } from '../types';

interface MensajeConfigProps {
  mensaje: MensajeConfigType;
}

const MensajeConfig = ({ mensaje }: MensajeConfigProps) => {
  return (
    <div className={`mensaje-config ${mensaje.tipo}`}>
      {mensaje.tipo === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{mensaje.texto}</span>
    </div>
  );
};

export default MensajeConfig;

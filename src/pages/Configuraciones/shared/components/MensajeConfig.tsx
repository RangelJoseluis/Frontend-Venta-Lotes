import { AlertCircle, CheckCircle } from 'lucide-react';
import type { MensajeConfig as MensajeConfigType } from '../types';

interface MensajeConfigProps {
  mensaje: MensajeConfigType;
}

const MensajeConfig = ({ mensaje }: MensajeConfigProps) => {
  const isSuccess = mensaje.tipo === 'success';

  return (
    <div className={`
      flex items-center gap-3 px-6 py-4 rounded-xl mb-8 font-semibold animate-in slide-in-from-top-5 fade-in duration-300
      ${isSuccess
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500 dark:border-green-600 text-green-800 dark:text-green-300'
        : 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-2 border-red-500 dark:border-red-600 text-red-800 dark:text-red-300'
      }
    `}>
      {isSuccess ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span>{mensaje.texto}</span>
    </div>
  );
};

export default MensajeConfig;

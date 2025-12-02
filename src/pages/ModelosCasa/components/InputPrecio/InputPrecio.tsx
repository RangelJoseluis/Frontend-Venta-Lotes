// Componente InputPrecio - Input con formato de miles (reutilizable)
import { DollarSign } from 'lucide-react';
import { formatearNumeroConMiles, parsearNumeroConMiles } from '../../utils/formatters';
import type { InputPrecioProps } from '../../types';

const InputPrecio = ({
  valor,
  onChange,
  placeholder = "Ingrese el precio",
  disabled = false,
  error
}: InputPrecioProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Permitir solo números y puntos
    const valorLimpio = inputValue.replace(/[^\d.]/g, '');

    // Convertir a número
    const numero = parsearNumeroConMiles(valorLimpio);

    // ✅ CORREGIDO: Devolver el número, no el string formateado
    onChange(numero);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Permitir: backspace, delete, tab, escape, enter
    if ([8, 9, 27, 13, 46].indexOf(e.keyCode) !== -1 ||
      // Permitir: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
      (e.keyCode === 65 && e.ctrlKey === true) ||
      (e.keyCode === 67 && e.ctrlKey === true) ||
      (e.keyCode === 86 && e.ctrlKey === true) ||
      (e.keyCode === 88 && e.ctrlKey === true) ||
      // Permitir: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)) {
      return;
    }

    // Asegurar que es un número
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
      e.preventDefault();
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <DollarSign size={18} />
        </div>
        <input
          type="text"
          value={valor > 0 ? formatearNumeroConMiles(valor) : ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-300 dark:border-slate-600'
            }`}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default InputPrecio;

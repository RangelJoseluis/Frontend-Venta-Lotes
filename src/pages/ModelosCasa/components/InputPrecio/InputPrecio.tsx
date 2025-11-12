// Componente InputPrecio - Input con formato de miles (reutilizable)
import { DollarSign } from 'lucide-react';
import { formatearNumeroConMiles, parsearNumeroConMiles } from '../../utils/formatters';
import type { InputPrecioProps } from '../../types';
import './InputPrecio.css';

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
    <div className={`input-precio-container ${error ? 'has-error' : ''}`}>
      <div className="input-precio-wrapper">
        <div className="input-precio-icon">
          <DollarSign size={20} />
        </div>
        <input
          type="text"
          value={valor > 0 ? formatearNumeroConMiles(valor) : ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="input-precio"
        />
      </div>
      {error && (
        <span className="input-precio-error">{error}</span>
      )}
    </div>
  );
};

export default InputPrecio;

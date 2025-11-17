import { AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import './FormInput.css';

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  icon: LucideIcon;
  placeholder: string;
  autoComplete?: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export const FormInput = ({
  id,
  label,
  type,
  icon: Icon,
  placeholder,
  autoComplete,
  error,
  register,
}: FormInputProps) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        <Icon className="label-icon" />
        {label}
      </label>
      <div className="input-wrapper">
        <input
          {...register}
          id={id}
          type={type}
          autoComplete={autoComplete}
          className={`form-input ${error ? 'input-error' : ''}`}
          placeholder={placeholder}
        />
        <div className="input-border-glow"></div>
      </div>
      {error && (
        <p className="form-error">
          <AlertCircle className="error-icon-small" />
          {error}
        </p>
      )}
    </div>
  );
};

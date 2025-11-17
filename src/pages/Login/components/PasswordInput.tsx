import { useState } from 'react';
import { AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import './PasswordInput.css';

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
  error?: string;
  register: UseFormRegisterReturn;
}

export const PasswordInput = ({
  id,
  label,
  placeholder,
  autoComplete,
  error,
  register,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        <Lock className="label-icon" />
        {label}
      </label>
      <div className="input-wrapper">
        <input
          {...register}
          id={id}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          className={`form-input password-input ${error ? 'input-error' : ''}`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="password-toggle"
        >
          {showPassword ? (
            <EyeOff className="toggle-icon" />
          ) : (
            <Eye className="toggle-icon" />
          )}
        </button>
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

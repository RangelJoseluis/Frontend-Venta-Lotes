import { useState } from 'react';
import { AlertCircle, Lock, Eye, EyeOff } from 'lucide-react';
import type { UseFormRegisterReturn } from 'react-hook-form';

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
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
        <Lock className="w-3.5 h-3.5 text-blue-600" />
        {label}
      </label>
      <div className="relative group">
        <input
          {...register}
          id={id}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          className={`w-full px-3 py-2.5 pr-10 bg-white border-2 rounded-xl text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-4 text-sm ${error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
              : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-slate-300'
            }`}
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
        {!error && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity pointer-events-none" />
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-600 animate-in slide-in-from-top-1 fade-in duration-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

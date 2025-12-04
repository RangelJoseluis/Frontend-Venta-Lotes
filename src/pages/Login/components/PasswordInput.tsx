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
      <label htmlFor={id} className="flex items-center gap-2 text-xs font-semibold text-slate-300">
        <Lock className="w-3.5 h-3.5 text-indigo-400" />
        {label}
      </label>
      <div className="relative group">
        <input
          {...register}
          id={id}
          type={showPassword ? 'text' : 'password'}
          autoComplete={autoComplete}
          className={`w-full px-3 py-2.5 pr-10 bg-slate-700/50 border-2 rounded-xl text-white placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-4 text-sm autofill:bg-slate-700/50 autofill:text-white ${error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
              : 'border-slate-600 focus:border-indigo-400 focus:ring-indigo-500/15 hover:border-slate-500'
            }`}
          placeholder={placeholder}
          style={{
            colorScheme: 'dark'
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-indigo-400 transition-colors rounded-lg hover:bg-slate-600/50"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
        {!error && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-focus-within:opacity-10 blur-xl transition-opacity pointer-events-none" />
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400 animate-in slide-in-from-top-1 fade-in duration-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import type { LoginCredentials } from '../types';
import './Login.css';

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data as LoginCredentials);
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="bg-orb bg-orb-1"></div>
        <div className="bg-orb bg-orb-2"></div>
        <div className="bg-orb bg-orb-3"></div>
        <div className="bg-grid"></div>
      </div>

      <div className="login-content">
        <div className="login-header">
          <div className="logo-container">
            {/* ============================================
                ESPACIO PARA TU LOGO
                Coloca tu imagen aquí usando un tag <img>
                Ejemplo: <img src="/ruta/a/tu/logo.png" alt="Logo" className="logo-image" />
                El tamaño recomendado es 120x120px
            ============================================ */}
            <div className="logo-placeholder">
              <Shield className="logo-icon" />
            </div>
          </div>

          <h1 className="login-title">
            Venta de Lotes
          </h1>
          <p className="login-subtitle">
            <Shield className="subtitle-icon" />
            Sistema de Gestión Profesional
          </p>
        </div>

        <div className="login-card">
          <div className="card-header">
            <div className="card-title-wrapper">
              <div className="card-icon-decorator"></div>
              <h2 className="card-title">Iniciar Sesión</h2>
            </div>
          </div>

          {error && (
            <div className="error-alert">
              <AlertCircle className="error-icon" />
              <div className="error-content">
                <p className="error-title">Error al iniciar sesión</p>
                <p className="error-message">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <Mail className="label-icon" />
                Correo Electrónico
              </label>
              <div className="input-wrapper">
                <input
                  {...register('email')}
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="admin@dominio.com"
                />
                <div className="input-border-glow"></div>
              </div>
              {errors.email && (
                <p className="form-error">
                  <AlertCircle className="error-icon-small" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <Lock className="label-icon" />
                Contraseña
              </label>
              <div className="input-wrapper">
                <input
                  {...register('password')}
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  className={`form-input password-input ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
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
              {errors.password && (
                <p className="form-error">
                  <AlertCircle className="error-icon-small" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              <div className="button-content">
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="button-icon" />
                    <span>Iniciar Sesión</span>
                  </>
                )}
              </div>
              <div className="button-shine"></div>
            </button>
          </form>

          <div className="demo-credentials">
            <div className="credentials-header">
              <Shield className="credentials-icon" />
              <p className="credentials-title">Credenciales de prueba</p>
            </div>
            <div className="credentials-list">
              <div className="credential-item">
                <Mail className="credential-icon" />
                <span className="credential-label">Email:</span>
                <span className="credential-value">admin@dominio.com</span>
              </div>
              <div className="credential-item">
                <Lock className="credential-icon" />
                <span className="credential-label">Contraseña:</span>
                <span className="credential-value">Admin123!</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="login-footer">
          © 2025 Venta de Lotes. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Login;

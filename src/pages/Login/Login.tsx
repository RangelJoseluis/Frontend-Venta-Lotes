import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import type { LoginCredentials } from '../../types';
import { useLoginForm } from './hooks/useLoginForm';
import type { LoginFormData } from './types';
import { LoginBackground } from './components/LoginBackground';
import { LoginHeader } from './components/LoginHeader';
import { LoginCard } from './components/LoginCard';
import { ErrorAlert } from './components/ErrorAlert';
import { FormInput } from './components/FormInput';
import { PasswordInput } from './components/PasswordInput';
import { SubmitButton } from './components/SubmitButton';
import { LoginFooter } from './components/LoginFooter';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useLoginForm();

  // Forzar tema claro en el login (independiente del dashboard)
  useEffect(() => {
    // Remover clase dark del html
    document.documentElement.classList.remove('dark');

    // Cleanup: no restaurar el tema al salir, el dashboard lo manejará
    return () => {
      // No hacer nada aquí, dejar que el dashboard maneje su propio tema
    };
  }, []);

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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <LoginBackground />

      <div className="w-full max-w-md relative z-10 animate-in slide-in-from-bottom-8 fade-in duration-700">
        <LoginHeader />

        <LoginCard>
          {error && <ErrorAlert message={error} />}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
            <FormInput
              id="email"
              label="Correo Electrónico"
              type="email"
              icon={Mail}
              placeholder="admin@dominio.com"
              autoComplete="email"
              error={errors.email?.message}
              register={register('email')}
            />

            <PasswordInput
              id="password"
              label="Contraseña"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              register={register('password')}
            />

            <SubmitButton isLoading={isLoading} />
          </form>
        </LoginCard>

        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;

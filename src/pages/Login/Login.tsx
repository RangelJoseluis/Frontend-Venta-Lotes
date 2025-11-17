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
import { DemoCredentials } from './components/DemoCredentials';
import { LoginFooter } from './components/LoginFooter';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading, error, clearError } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useLoginForm();

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
      <LoginBackground />

      <div className="login-content">
        <LoginHeader />

        <LoginCard>
          {error && <ErrorAlert message={error} />}

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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

          <DemoCredentials />
        </LoginCard>

        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;

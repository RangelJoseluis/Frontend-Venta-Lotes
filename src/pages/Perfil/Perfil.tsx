import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, CreditCard, Shield, Calendar, Lock, Bell, Globe, Eye } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import './Perfil.css';

export default function Perfil() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'datos' | 'seguridad'>('datos');

  if (!user) {
    navigate('/login');
    return null;
  }

  const userRole = user.roles && user.roles.length > 0 ? user.roles[0] : 'usuario';
  const userRoleDisplay = userRole === 'admin' ? 'Administrador' : 'Usuario';
  const nombreCompleto = `${user.nombres || ''} ${user.apellidos || ''}`.trim() || 'Usuario sin nombre';
  const iniciales = nombreCompleto.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="perfil-page">
      <div className="perfil-wrapper">
        <button onClick={() => navigate('/dashboard')} className="perfil-back-btn">
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        <div className="perfil-hero">
          <div className="perfil-hero-bg"></div>
          <div className="perfil-hero-content">
            <div className="perfil-avatar-wrapper">
              <div className="perfil-avatar-circle">
                <span className="perfil-avatar-initials">{iniciales}</span>
              </div>
              <div className={`perfil-status-badge ${userRole === 'admin' ? 'status-admin' : 'status-user'}`}>
                <Shield size={12} />
              </div>
            </div>
            <div className="perfil-hero-info">
              <h1 className="perfil-hero-name">{nombreCompleto}</h1>
              <p className="perfil-hero-email">{user.email}</p>
              <div className="perfil-hero-meta">
                <span className={`perfil-role-tag ${userRole === 'admin' ? 'tag-admin' : 'tag-user'}`}>
                  {userRoleDisplay}
                </span>
                {user.creadoEn && (
                  <span className="perfil-join-date">
                    Miembro desde {new Date(user.creadoEn).toLocaleDateString('es-CO', { month: 'short', year: 'numeric' })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="perfil-tabs-container">
          <div className="perfil-tabs">
            <button
              className={`perfil-tab-btn ${activeTab === 'datos' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('datos')}
            >
              <User size={18} />
              <span>Información Personal</span>
            </button>
            <button
              className={`perfil-tab-btn ${activeTab === 'seguridad' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('seguridad')}
            >
              <Shield size={18} />
              <span>Seguridad y Privacidad</span>
            </button>
          </div>
        </div>

        <div className="perfil-body">
          {activeTab === 'datos' && (
            <div className="perfil-section-wrapper">
              <div className="perfil-card">
                <div className="perfil-card-header">
                  <div className="perfil-card-title">
                    <User size={20} />
                    <h2>Datos Personales</h2>
                  </div>
                  <p className="perfil-card-subtitle">
                    Información básica de tu cuenta
                  </p>
                </div>

                <div className="perfil-fields-grid">
                  <div className="perfil-field-group">
                    <label className="perfil-field-label">
                      <User size={16} />
                      <span>Nombre Completo</span>
                    </label>
                    <div className="perfil-field-display">
                      {nombreCompleto}
                    </div>
                  </div>

                  <div className="perfil-field-group">
                    <label className="perfil-field-label">
                      <Mail size={16} />
                      <span>Correo Electrónico</span>
                    </label>
                    <div className="perfil-field-display">
                      {user.email}
                    </div>
                  </div>

                  {user.cedula && (
                    <div className="perfil-field-group">
                      <label className="perfil-field-label">
                        <CreditCard size={16} />
                        <span>Cédula</span>
                      </label>
                      <div className="perfil-field-display">
                        {user.cedula}
                      </div>
                    </div>
                  )}

                  {user.telefono && (
                    <div className="perfil-field-group">
                      <label className="perfil-field-label">
                        <Phone size={16} />
                        <span>Teléfono</span>
                      </label>
                      <div className="perfil-field-display">
                        {user.telefono}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="perfil-card">
                <div className="perfil-card-header">
                  <div className="perfil-card-title">
                    <Shield size={20} />
                    <h2>Información de la Cuenta</h2>
                  </div>
                </div>

                <div className="perfil-stats-grid">
                  <div className="perfil-stat-card">
                    <div className="perfil-stat-icon stat-icon-primary">
                      <Shield size={20} />
                    </div>
                    <div className="perfil-stat-content">
                      <p className="perfil-stat-label">Tipo de cuenta</p>
                      <p className="perfil-stat-value">{userRoleDisplay}</p>
                    </div>
                  </div>

                  {user.creadoEn && (
                    <div className="perfil-stat-card">
                      <div className="perfil-stat-icon stat-icon-success">
                        <Calendar size={20} />
                      </div>
                      <div className="perfil-stat-content">
                        <p className="perfil-stat-label">Fecha de registro</p>
                        <p className="perfil-stat-value">
                          {new Date(user.creadoEn).toLocaleDateString('es-CO', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seguridad' && (
            <div className="perfil-section-wrapper">
              <div className="perfil-card">
                <div className="perfil-card-header">
                  <div className="perfil-card-title">
                    <Lock size={20} />
                    <h2>Seguridad de la Cuenta</h2>
                  </div>
                  <p className="perfil-card-subtitle">
                    Administra la seguridad y privacidad de tu cuenta
                  </p>
                </div>

                <div className="perfil-security-list">
                  <div className="perfil-security-item">
                    <div className="perfil-security-icon">
                      <Lock size={22} />
                    </div>
                    <div className="perfil-security-content">
                      <h3 className="perfil-security-title">Contraseña</h3>
                      <p className="perfil-security-desc">
                        Usa una contraseña segura para proteger tu cuenta
                      </p>
                    </div>
                    <div className="perfil-security-status">
                      <span className="status-text-secure">Protegida</span>
                    </div>
                  </div>

                  <div className="perfil-security-item">
                    <div className="perfil-security-icon">
                      <Mail size={22} />
                    </div>
                    <div className="perfil-security-content">
                      <h3 className="perfil-security-title">Email de recuperación</h3>
                      <p className="perfil-security-desc">{user.email}</p>
                    </div>
                    <div className="perfil-security-status">
                      <span className="status-text-verified">Verificado</span>
                    </div>
                  </div>

                  <div className="perfil-security-item">
                    <div className="perfil-security-icon">
                      <Bell size={22} />
                    </div>
                    <div className="perfil-security-content">
                      <h3 className="perfil-security-title">Notificaciones de seguridad</h3>
                      <p className="perfil-security-desc">
                        Recibe alertas sobre actividad inusual
                      </p>
                    </div>
                    <div className="perfil-security-status">
                      <span className="status-text-active">Activas</span>
                    </div>
                  </div>

                  <div className="perfil-security-item">
                    <div className="perfil-security-icon">
                      <Eye size={22} />
                    </div>
                    <div className="perfil-security-content">
                      <h3 className="perfil-security-title">Privacidad de datos</h3>
                      <p className="perfil-security-desc">
                        Controla quién puede ver tu información
                      </p>
                    </div>
                    <div className="perfil-security-status">
                      <span className="status-text-private">Privado</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="perfil-alert-card alert-info">
                <div className="perfil-alert-icon">
                  <Shield size={24} />
                </div>
                <div className="perfil-alert-content">
                  <h3 className="perfil-alert-title">Recomendaciones de Seguridad</h3>
                  <ul className="perfil-alert-list">
                    <li>Usa una contraseña única y segura con al menos 8 caracteres</li>
                    <li>Nunca compartas tus credenciales con otras personas</li>
                    <li>Verifica la autenticidad de los correos antes de hacer clic en enlaces</li>
                    <li>Cierra sesión cuando uses dispositivos compartidos</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

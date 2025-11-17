import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ArrowLeft, Map, AlertTriangle, Settings, Building2 } from 'lucide-react';
import './ConfiguracionesLayout.css';

const ConfiguracionesLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      path: '/configuraciones/zona',
      icon: Map,
      label: 'Zona y Mapa',
      description: 'Configuración de ubicación'
    },
    {
      path: '/configuraciones/mora',
      icon: AlertTriangle,
      label: 'Sistema de Mora',
      description: 'Tasas y parámetros'
    },
    {
      path: '/configuraciones/negocio',
      icon: Building2,
      label: 'Datos del Negocio',
      description: 'Información de contacto y facturas'
    },
    {
      path: '/configuraciones/general',
      icon: Settings,
      label: 'General',
      description: 'Configuraciones generales',
      disabled: true
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="config-layout-container">
      <div className="config-layout-header">
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-volver"
        >
          <ArrowLeft size={20} />
          Volver al Dashboard
        </button>
        <h1>⚙️ Configuraciones del Sistema</h1>
      </div>

      <div className="config-layout-content">
        <aside className="config-sidebar">
          <nav className="config-sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => !item.disabled && navigate(item.path)}
                  className={`config-sidebar-item ${isActive(item.path) ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                  disabled={item.disabled}
                >
                  <div className="config-sidebar-item-icon">
                    <Icon size={20} />
                  </div>
                  <div className="config-sidebar-item-content">
                    <span className="config-sidebar-item-label">{item.label}</span>
                    <span className="config-sidebar-item-desc">{item.description}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="config-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ConfiguracionesLayout;

import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ArrowLeft, Map, AlertTriangle, Settings, Building2 } from 'lucide-react';

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
    <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto mb-6">
        <button
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:-translate-x-1 transition-all duration-200"
        >
          <ArrowLeft size={20} />
          Volver al Dashboard
        </button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-4">
          ⚙️ Configuraciones del Sistema
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Sidebar */}
        <aside className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-200 dark:border-slate-700 sticky top-6">
          <nav className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => !item.disabled && navigate(item.path)}
                  disabled={item.disabled}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left w-full
                    ${active
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-600'
                      : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-200 dark:hover:border-slate-600'
                    }
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 transition-all duration-200
                    ${active
                      ? 'bg-blue-600 dark:bg-blue-500 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                    }
                  `}>
                    <Icon size={20} />
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <span className={`
                      text-sm font-semibold
                      ${active
                        ? 'text-blue-700 dark:text-blue-400'
                        : 'text-slate-900 dark:text-white'
                      }
                    `}>
                      {item.label}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {item.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 min-h-[500px]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ConfiguracionesLayout;

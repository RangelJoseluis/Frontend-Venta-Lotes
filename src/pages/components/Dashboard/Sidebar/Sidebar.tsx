import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  BarChart3,
  Menu,
  X,
  Home,
  Map,
  Settings,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import NavLink from './NavLink';
import './Sidebar.css';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Panel de control", active: true },
    { 
      href: "/lotes", 
      icon: Building2, 
      label: "Lotes",
      submenu: [
        { href: "/lotes", label: "Lista de Lotes" },
        { href: "/lotes/nuevo", label: "Nuevo Lote" },
        { href: "/mapa", label: "Mapa Interactivo" }
      ]
    },
    { href: "/modelos-casa", icon: Home, label: "Modelos de Casa" },
    { href: "/servicios", icon: Settings, label: "Servicios" },
    { href: "/mapa", icon: Map, label: "Mapa Visual" },
    { href: "/ventas", icon: FileText, label: "Ventas" },
    { href: "/reportes", icon: BarChart3, label: "Reportes" },
    { href: "/pagos", icon: CreditCard, label: "Pagos" },
    { 
      href: "/gestion-mora", 
      icon: AlertTriangle, 
      label: "Mora",
      submenu: [
        { href: "/gestion-mora", label: "Gestión de Mora" },
        { href: "/reportes-mora", label: "Reportes de Mora" }
      ]
    },
    { href: "/clientes", icon: Users, label: "Clientes" },
  ];

  return (
    <>
      {sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-content">
            {sidebarOpen ? (
              <div className="sidebar-logo">
                <h2 className="sidebar-logo-title">Venta Lotes</h2>
                <p className="sidebar-logo-subtitle">Sistema de Gestión</p>
              </div>
            ) : null}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sidebar-toggle-btn"
              aria-label={sidebarOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
              style={!sidebarOpen ? {
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              } : {}}
            >
              {sidebarOpen ? <X className="sidebar-toggle-icon" /> : <Menu className="sidebar-toggle-icon" />}
            </button>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={item.active}
              sidebarOpen={sidebarOpen}
              submenu={item.submenu}
            />
          ))}
        </nav>

        <div className="sidebar-profile">
          <div className={`sidebar-profile-content ${sidebarOpen ? 'profile-expanded' : 'profile-collapsed'}`}>
            <div className="user-avatar-large">
              <span className="avatar-text">A</span>
            </div>
            {sidebarOpen && (
              <div className="user-info">
                <p className="user-name">Administrador</p>
                <p className="user-role">Administrador</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

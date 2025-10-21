import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Calculator,
  Wallet,
  Users,
  BarChart3,
  Menu,
  X,
  Home
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
    { href: "#", icon: Building2, label: "Lotes" },
    { href: "/modelos-casa", icon: Home, label: "Modelos de Casa" },
    { href: "#", icon: FileText, label: "Ventas" },
    { href: "#", icon: Calculator, label: "Cuotas" },
    { href: "#", icon: Wallet, label: "Pagos" },
    { href: "/clientes", icon: Users, label: "Clientes" },
    { href: "/reportes", icon: BarChart3, label: "Reportes" },
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
            ) : (
              <div className="sidebar-logo-collapsed">
                <Home className="sidebar-home-icon" />
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="sidebar-toggle-btn"
              aria-label={sidebarOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
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

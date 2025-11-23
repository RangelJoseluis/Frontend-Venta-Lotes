import { Menu } from 'lucide-react';
import UserMenu from './UserMenu';
import NotificacionesPanel from '../../../../components/NotificacionesPanel';
import './Header.css';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
}

const Header = ({ setSidebarOpen, userMenuOpen, setUserMenuOpen }: HeaderProps) => {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button
          onClick={() => setSidebarOpen(true)}
          className="mobile-menu-btn"
          aria-label="Abrir menú"
        >
          <Menu className="mobile-menu-icon" />
        </button>

        <div className="header-title-container">
          <h1 className="header-title">Panel de Control</h1>
          <p className="header-subtitle">Gestión de Venta de Lotes</p>
        </div>
      </div>

      <div className="header-right">
        <NotificacionesPanel />
        <UserMenu isOpen={userMenuOpen} setIsOpen={setUserMenuOpen} />
      </div>
    </header>
  );
};

export default Header;

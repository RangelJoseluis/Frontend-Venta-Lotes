import { Menu } from 'lucide-react';
import UserMenu from './UserMenu';
import NotificacionesPanel from '../../../../components/NotificacionesPanel';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
}

const Header = ({ setSidebarOpen, userMenuOpen, setUserMenuOpen }: HeaderProps) => {
  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6 text-slate-700" />
          </button>

          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 leading-tight">
              Panel de Control
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-tight">
              Gestión de Venta de Lotes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <NotificacionesPanel />
          <UserMenu isOpen={userMenuOpen} setIsOpen={setUserMenuOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;

import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../store/authStore';

interface UserMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const UserMenu = ({ isOpen, setIsOpen }: UserMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  /**
   * Manejar navegación a perfil
   */
  const handlePerfil = () => {
    navigate('/perfil');
    setIsOpen(false);
  };

  /**
   * Manejar navegación a configuraciones
   */
  const handleConfiguraciones = () => {
    navigate('/configuraciones');
    setIsOpen(false);
  };

  /**
   * Manejar cierre de sesión
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Obtener iniciales del nombre
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Construir nombre completo desde nombres y apellidos
  const userName = user?.nombres && user?.apellidos
    ? `${user.nombres} ${user.apellidos}`
    : user?.nombres || 'Usuario';
  const userEmail = user?.email || '';
  const userRole = user?.roles && user.roles.length > 0 ? user.roles[0] : 'usuario';
  const userRoleDisplay = userRole === 'admin' ? 'Administrador' : 'Usuario';
  const userInitials = getInitials(userName);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 bg-white border border-slate-200 rounded-xl cursor-pointer transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 group"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm shadow-sm">
          {userInitials}
        </div>
        <div className="hidden md:flex flex-col items-start min-w-0">
          <p className="text-sm font-semibold text-slate-800 truncate max-w-[120px]">{userName}</p>
          <p className="text-xs text-slate-500">{userRoleDisplay}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 hidden md:block group-hover:text-slate-600 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 bg-slate-50 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800 truncate">{userName}</p>
            <p className="text-xs text-slate-500 truncate">{userEmail}</p>
            {user?.roles && user.roles.length > 0 && (
              <p className="text-xs text-blue-600 font-medium mt-1 capitalize">{user.roles.join(', ')}</p>
            )}
          </div>

          <div className="p-1">
            <button
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors"
              onClick={handlePerfil}
            >
              <User className="w-4 h-4" />
              <span>Mi Perfil</span>
            </button>
            <button
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors"
              onClick={handleConfiguraciones}
            >
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
          </div>

          <div className="h-px bg-slate-100 my-1 mx-2" />

          <div className="p-1">
            <button
              className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

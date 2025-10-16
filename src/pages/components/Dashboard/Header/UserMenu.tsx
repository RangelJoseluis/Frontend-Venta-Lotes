import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../store/authStore';
import './UserMenu.css';

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

  const userName = user?.nombre || 'Usuario';
  const userEmail = user?.email || '';
  const userInitials = getInitials(userName);

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="user-menu-button"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="user-avatar">
          <span className="avatar-text">{userInitials}</span>
        </div>
        <div className="user-details">
          <p className="user-name">{userName}</p>
          <p className="user-email">{userEmail}</p>
        </div>
        <ChevronDown className={`chevron-icon ${isOpen ? 'chevron-open' : ''}`} />
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="dropdown-header">
            <p className="dropdown-name">{userName}</p>
            <p className="dropdown-email">{userEmail}</p>
            {user?.roles && user.roles.length > 0 && (
              <p className="dropdown-role">{user.roles.join(', ')}</p>
            )}
          </div>

          <div className="dropdown-divider" />

          <div className="dropdown-menu">
            <button className="menu-item">
              <User className="menu-icon" />
              <span>Mi Perfil</span>
            </button>
            <button className="menu-item">
              <Settings className="menu-icon" />
              <span>Configuración</span>
            </button>
          </div>

          <div className="dropdown-divider" />

          <div className="dropdown-menu">
            <button className="menu-item menu-item-danger" onClick={handleLogout}>
              <LogOut className="menu-icon" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

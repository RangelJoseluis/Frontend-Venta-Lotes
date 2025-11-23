import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SubMenuItem {
  href: string;
  label: string;
}

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  active?: boolean;
  sidebarOpen: boolean;
  submenu?: SubMenuItem[];
}

const NavLink = ({ href, icon: Icon, label, active = false, sidebarOpen, submenu }: NavLinkProps) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Si tiene submenú
  if (submenu && submenu.length > 0) {
    return (
      <div className="nav-link-with-submenu">
        <button
          onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
          className={`nav-link ${active ? 'nav-link-active' : 'nav-link-inactive'} ${
            sidebarOpen ? 'nav-link-expanded' : 'nav-link-collapsed'
          }`}
        >
          <Icon className="nav-link-icon" />
          {sidebarOpen && (
            <>
              <span className="nav-link-text">{label}</span>
              {isSubmenuOpen ? (
                <ChevronDown className="nav-link-chevron" size={16} />
              ) : (
                <ChevronRight className="nav-link-chevron" size={16} />
              )}
            </>
          )}
          {!sidebarOpen && (
            <span className="nav-link-tooltip">{label}</span>
          )}
        </button>

        {/* Submenú */}
        {sidebarOpen && isSubmenuOpen && (
          <div className="nav-submenu">
            {submenu.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-submenu-item ${
                  currentPath === item.href ? 'nav-submenu-item-active' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Link normal sin submenú
  return (
    <Link
      to={href}
      className={`nav-link ${active ? 'nav-link-active' : 'nav-link-inactive'} ${
        sidebarOpen ? 'nav-link-expanded' : 'nav-link-collapsed'
      }`}
    >
      <Icon className="nav-link-icon" />
      {sidebarOpen && (
        <span className="nav-link-text">{label}</span>
      )}
      {!sidebarOpen && (
        <span className="nav-link-tooltip">{label}</span>
      )}
    </Link>
  );
};

export default NavLink;

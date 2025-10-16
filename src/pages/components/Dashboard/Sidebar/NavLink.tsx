import type { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  active?: boolean;
  sidebarOpen: boolean;
}

const NavLink = ({ href, icon: Icon, label, active = false, sidebarOpen }: NavLinkProps) => (
  <a
    href={href}
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
  </a>
);

export default NavLink;

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

    const baseLinkClasses = `
    relative flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1
    transition-all duration-200 group
    ${sidebarOpen ? '' : 'justify-center'}
  `;

    const activeClasses = active || currentPath === href
        ? 'bg-blue-600 text-white'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white';

    // Si tiene submenú
    if (submenu && submenu.length > 0) {
        return (
            <div className="mb-1">
                <button
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                    className={`${baseLinkClasses} ${activeClasses} w-full`}
                >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && (
                        <>
                            <span className="flex-1 text-sm font-medium text-left whitespace-nowrap">{label}</span>
                            {isSubmenuOpen ? (
                                <ChevronDown className="w-4 h-4 flex-shrink-0" />
                            ) : (
                                <ChevronRight className="w-4 h-4 flex-shrink-0" />
                            )}
                        </>
                    )}
                    {!sidebarOpen && (
                        <span className="
              absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded
              opacity-0 pointer-events-none group-hover:opacity-100
              whitespace-nowrap z-50 transition-opacity duration-200
            ">
                            {label}
                        </span>
                    )}
                </button>

                {/* Submenú */}
                {sidebarOpen && isSubmenuOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                        {submenu.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`
                  block px-3 py-2 text-sm rounded-lg transition-colors duration-200
                  ${currentPath === item.href
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }
                `}
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
            className={`${baseLinkClasses} ${activeClasses}`}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && (
                <span className="text-sm font-medium whitespace-nowrap">{label}</span>
            )}
            {!sidebarOpen && (
                <span className="
          absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded
          opacity-0 pointer-events-none group-hover:opacity-100
          whitespace-nowrap z-50 transition-opacity duration-200
        ">
                    {label}
                </span>
            )}
        </Link>
    );
};

export default NavLink;

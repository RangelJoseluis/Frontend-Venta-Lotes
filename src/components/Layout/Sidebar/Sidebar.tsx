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
        { href: "/mapa", icon: Map, label: "Mapa Visual" },
        {
            href: "/lotes",
            icon: Building2,
            label: "Lotes",
            submenu: [
                { href: "/lotes", label: "Gestion Lotes" },
                { href: "/lotes/nuevo", label: "Nuevo Lote" },
            ]
        },
        { href: "/modelos-casa", icon: Home, label: "Modelos de Casa" },
        { href: "/servicios", icon: Settings, label: "Servicios" },
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
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`
        fixed top-0 left-0 h-full bg-slate-900 text-white z-50
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-72' : 'w-20'}
        ${!sidebarOpen && isMobile ? '-translate-x-full' : 'translate-x-0'}
        lg:translate-x-0
        flex flex-col
      `}>
                <div className="flex-shrink-0 border-b border-slate-700 p-4">
                    <div className="flex items-center justify-between">
                        {sidebarOpen && (
                            <div className="flex flex-col">
                                <h2 className="text-lg font-bold text-white">Venta Lotes</h2>
                                <p className="text-xs text-slate-400">Sistema de Gestión</p>
                            </div>
                        )}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className={`
                p-2 rounded-lg hover:bg-slate-800 transition-colors duration-200
                ${!sidebarOpen ? 'mx-auto' : ''}
              `}
                            aria-label={sidebarOpen ? 'Cerrar sidebar' : 'Abrir sidebar'}
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-4 px-2">
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

                <div className="flex-shrink-0 border-t border-slate-700 p-4">
                    <div className={`flex items-center gap-3 ${!sidebarOpen ? 'justify-center' : ''}`}>
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-semibold text-white">A</span>
                        </div>
                        {sidebarOpen && (
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm font-medium text-white truncate">Administrador</p>
                                <p className="text-xs text-slate-400 truncate">Administrador</p>
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

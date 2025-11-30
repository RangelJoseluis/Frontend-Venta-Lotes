import { Menu } from 'lucide-react';
import UserMenu from './UserMenu';
import NotificacionesPanel from '../../NotificacionesPanel/NotificacionesPanel';
import ThemeToggle from '../../ThemeToggle/ThemeToggle';
import { useState } from 'react';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Panel de Control</h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                            Sistema de Gestión de Venta de Lotes
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <ThemeToggle />
                    <NotificacionesPanel />
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block"></div>
                    <UserMenu isOpen={isUserMenuOpen} setIsOpen={setIsUserMenuOpen} />
                </div>
            </div>
        </header>
    );
};

export default Header;

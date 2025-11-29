import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useThemeStore();
    const [mounted, setMounted] = useState(false);

    // Evitar hidratación incorrecta y asegurar sincronización
    useEffect(() => {
        setMounted(true);
        // Sincronizar clase con el estado actual
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon size={20} className="transition-transform duration-200 hover:rotate-12" />
            ) : (
                <Sun size={20} className="transition-transform duration-200 hover:rotate-90" />
            )}
        </button>
    );
}

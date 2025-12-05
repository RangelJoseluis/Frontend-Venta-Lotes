import { useEffect } from 'react';
import { useThemeStore } from '../store/themeStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { theme } = useThemeStore();

    useEffect(() => {
        const root = window.document.documentElement;
        console.log('ThemeProvider: Current theme is', theme);

        // Remove both to be safe before adding the correct one
        root.classList.remove('light', 'dark');

        if (theme === 'dark') {
            root.classList.add('dark');
            console.log('ThemeProvider: Added dark class');
        } else {
            // Optional: add 'light' class if needed, but usually removing 'dark' is enough for Tailwind
            // root.classList.add('light'); 
            console.log('ThemeProvider: Removed dark class (Light mode)');
        }
    }, [theme]);

    return <>{children}</>;
}

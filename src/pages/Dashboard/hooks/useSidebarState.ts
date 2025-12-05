// Hook para gestionar el estado del sidebar
import { useState, useEffect } from 'react';
import { SIDEBAR_STORAGE_KEY, SIDEBAR_BREAKPOINT } from '../constants';
import type { UseSidebarStateReturn } from '../types';

export const useSidebarState = (): UseSidebarStateReturn => {
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
            return saved !== null ? saved === 'true' : window.innerWidth >= SIDEBAR_BREAKPOINT;
        }
        return true;
    });

    useEffect(() => {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarOpen));
    }, [sidebarOpen]);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return {
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar
    };
};

export default useSidebarState;

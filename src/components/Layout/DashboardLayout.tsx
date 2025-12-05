import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-fondo-pagina dark:bg-slate-950 flex relative transition-colors duration-200">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className={`
        flex-1 flex flex-col min-w-0 w-full
        transition-[margin-left] duration-300 ease-in-out
        ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}
      `}>
                <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 p-4 sm:p-5 lg:p-6 overflow-x-hidden">
                    <div className="w-full mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

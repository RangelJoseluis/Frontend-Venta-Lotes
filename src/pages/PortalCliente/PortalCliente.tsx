import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { LayoutDashboard, Home, CreditCard, User, LogOut, Bell, AlertCircle, FileText } from 'lucide-react';
import { useDatosCliente } from './hooks/useDatosCliente';
import { MisLotes, MisPagos, EstadoCuenta, MiPerfil } from './components';

type Tab = 'lotes' | 'pagos' | 'estado-cuenta' | 'perfil';

const PortalCliente: React.FC = () => {
    const { user, logout } = useAuthStore();
    const { ventas, loading, error } = useDatosCliente();
    const [activeTab, setActiveTab] = useState<Tab>('lotes');

    // Calcular estadísticas
    const totalLotes = ventas.length;
    const montoPendienteTotal = ventas.reduce((sum, v) => sum + (v.montoPendiente || 0), 0);

    const formatearMoneda = (valor: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(valor);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
            {/* Navbar Superior */}
            <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo y Marca */}
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-lg shadow-blue-500/30">
                                <LayoutDashboard size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Portal Cliente
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    Inmobiliaria Futuro
                                </p>
                            </div>
                        </div>

                        {/* Menú Usuario */}
                        <div className="flex items-center gap-4">
                            <button className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors relative">
                                <Bell size={20} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                            </button>

                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>

                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                        {user?.nombres} {user?.apellidos}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Cliente
                                    </p>
                                </div>
                                <button
                                    onClick={() => setActiveTab('perfil')}
                                    className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold border-2 border-white dark:border-slate-800 shadow-sm hover:scale-110 transition-transform cursor-pointer"
                                    title="Ver Mi Perfil"
                                >
                                    {user?.nombres?.charAt(0)}{user?.apellidos?.charAt(0)}
                                </button>
                                <button
                                    onClick={logout}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors ml-2"
                                    title="Cerrar Sesión"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Contenido Principal */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Saludo */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                        Hola, {user?.nombres?.split(' ')[0]} 👋
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Bienvenido a tu panel de control. Aquí tienes un resumen de tus propiedades.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400">
                        <AlertCircle size={20} />
                        <span>{error}</span>
                    </div>
                )}

                {/* Grid de Resumen (Solo visible en Dashboard/Lotes) */}
                {activeTab === 'lotes' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* Card: Mis Lotes */}
                        <div
                            onClick={() => setActiveTab('lotes')}
                            className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group cursor-pointer ring-2 ring-transparent hover:ring-blue-500/20"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform">
                                    <Home size={24} />
                                </div>
                                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
                                    Activos
                                </span>
                            </div>
                            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                                Mis Lotes
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-800 dark:text-white">
                                    {loading ? '...' : totalLotes}
                                </span>
                                <span className="text-sm text-slate-400">propiedades</span>
                            </div>
                        </div>

                        {/* Card: Monto Pendiente */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow group">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                                    <CreditCard size={24} />
                                </div>
                            </div>
                            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                                Total Pendiente
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-slate-800 dark:text-white">
                                    {loading ? '...' : formatearMoneda(montoPendienteTotal)}
                                </span>
                            </div>
                        </div>

                        {/* Card: Perfil */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow group cursor-pointer">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl group-hover:scale-110 transition-transform">
                                    <User size={24} />
                                </div>
                            </div>
                            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                                Mi Perfil
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">
                                Actualizar datos personales
                            </p>
                        </div>
                    </div>
                )}

                {/* Navegación de Pestañas */}
                <div className="flex space-x-1 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 p-1 mb-8 max-w-md">
                    <button
                        onClick={() => setActiveTab('lotes')}
                        className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200 flex items-center justify-center gap-2
                            ${activeTab === 'lotes'
                                ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-white/[0.12] hover:text-slate-800 dark:hover:text-white'
                            }`}
                    >
                        <Home size={18} />
                        Mis Lotes
                    </button>
                    <button
                        onClick={() => setActiveTab('pagos')}
                        className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200 flex items-center justify-center gap-2
                            ${activeTab === 'pagos'
                                ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-white/[0.12] hover:text-slate-800 dark:hover:text-white'
                            }`}
                    >
                        <FileText size={18} />
                        Mis Pagos
                    </button>
                    <button
                        onClick={() => setActiveTab('estado-cuenta')}
                        className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-200 flex items-center justify-center gap-2
                            ${activeTab === 'estado-cuenta'
                                ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-400 shadow'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-white/[0.12] hover:text-slate-800 dark:hover:text-white'
                            }`}
                    >
                        <CreditCard size={18} />
                        Estado de Cuenta
                    </button>
                </div>

                {/* Contenido Dinámico */}
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {activeTab === 'lotes' && (
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                                Mis Propiedades
                            </h3>
                            <MisLotes ventas={ventas} loading={loading} />
                        </div>
                    )}

                    {activeTab === 'pagos' && (
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                                Historial de Pagos
                            </h3>
                            <MisPagos />
                        </div>
                    )}

                    {activeTab === 'estado-cuenta' && (
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                                Estado de Cuenta
                            </h3>
                            <EstadoCuenta />
                        </div>
                    )}

                    {activeTab === 'perfil' && (
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
                                Mi Perfil
                            </h3>
                            <MiPerfil />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default PortalCliente;

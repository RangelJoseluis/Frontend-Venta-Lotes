import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Phone, MapPin, Home as HomeIcon, TrendingUp, Shield } from 'lucide-react';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
            {/* Header */}
            <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-lg">
                                <HomeIcon size={24} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Inmobiliaria Futuro
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Tu hogar, tu futuro</p>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => navigate('/login')}
                                className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 font-medium"
                            >
                                <LogIn size={18} />
                                <span className="hidden sm:inline">Iniciar Sesión</span>
                            </button>
                            <a
                                href="https://wa.me/573001234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg shadow-green-500/30 font-medium"
                            >
                                <Phone size={18} />
                                <span className="hidden sm:inline">Contactar Vendedor</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
                    <div className="text-center">
                        <h2 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                            Encuentra tu{' '}
                            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Lote Ideal
                            </span>
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
                            Invierte en tu futuro con los mejores lotes en ubicaciones estratégicas.
                            Facilidades de pago y asesoría personalizada.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate('/login')}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl shadow-blue-500/30 font-semibold text-lg"
                            >
                                Ver Lotes Disponibles
                            </button>
                            <a
                                href="https://wa.me/573001234567"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-200 font-semibold text-lg"
                            >
                                Solicitar Información
                            </a>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
                        ¿Por qué elegirnos?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-blue-100 dark:border-slate-600 hover:shadow-xl transition-all duration-200">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center mb-4">
                                <MapPin size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                Ubicaciones Estratégicas
                            </h4>
                            <p className="text-slate-600 dark:text-slate-300">
                                Lotes en zonas de alto crecimiento con excelente valorización a futuro.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-green-100 dark:border-slate-600 hover:shadow-xl transition-all duration-200">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-lg flex items-center justify-center mb-4">
                                <TrendingUp size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                Facilidades de Pago
                            </h4>
                            <p className="text-slate-600 dark:text-slate-300">
                                Planes de financiamiento flexibles adaptados a tus necesidades.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 rounded-xl border border-purple-100 dark:border-slate-600 hover:shadow-xl transition-all duration-200">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-lg flex items-center justify-center mb-4">
                                <Shield size={24} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                Seguridad Jurídica
                            </h4>
                            <p className="text-slate-600 dark:text-slate-300">
                                Todos nuestros lotes cuentan con documentación legal completa.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-slate-400">
                        © 2025 Inmobiliaria Futuro. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;

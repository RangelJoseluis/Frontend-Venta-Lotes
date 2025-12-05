import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Phone, MapPin, Home as HomeIcon, TrendingUp, Shield, Mail, X } from 'lucide-react';
import MapaLotesPublico from './MapaLotesPublico';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [mostrarContacto, setMostrarContacto] = useState(false);

    // Función para hacer scroll suave al mapa con animación
    const scrollToMapa = () => {
        const mapaSection = document.getElementById('mapa-lotes');
        if (mapaSection) {
            const headerHeight = 64;
            const elementPosition = mapaSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight + 188;
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            const duration = 1000; // 1 segundo
            let start: number | null = null;

            // Función de easing para animación suave
            const easeInOutCubic = (t: number): number => {
                return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            };

            const animation = (currentTime: number) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutCubic(progress);

                window.scrollTo(0, startPosition + distance * ease);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
            {/* Header */}
            <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-[1000] shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-14">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-1.5 rounded-lg shadow-lg">
                                <HomeIcon size={20} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                                    LoteSmart
                                </h1>
                                <p className="text-[9px] text-slate-500 dark:text-slate-400 -mt-0.5 leading-none">Inversión inteligente</p>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setMostrarFormulario(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md font-medium"
                            >
                                <Mail size={14} strokeWidth={2.5} />
                                <span className="hidden sm:inline">Solicitar Info</span>
                            </button>
                            <button
                                onClick={() => setMostrarContacto(true)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md font-medium"
                            >
                                <Phone size={14} strokeWidth={2.5} />
                                <span className="hidden sm:inline">Contactar</span>
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 font-medium border border-blue-200 dark:border-blue-800"
                            >
                                <LogIn size={14} strokeWidth={2.5} />
                                <span className="hidden sm:inline">Iniciar Sesión</span>
                            </button>
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
                                onClick={scrollToMapa}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-xl shadow-blue-500/30 font-semibold text-lg"
                            >
                                Ver Lotes Disponibles
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
                </div>
            </section>

            {/* Mapa de Lotes Disponibles */}
            <section id="mapa-lotes" className="py-20 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                            Explora Nuestros Lotes
                        </h3>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            Visualiza en el mapa satelital todos los lotes disponibles
                        </p>
                    </div>

                    {/* Contenedor del Mapa */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                        <MapaLotesPublico />
                    </div>
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
                        © 2025 LoteSmart. Todos los derechos reservados.
                    </p>
                </div>
            </footer>

            {/* Modal de Contacto */}
            {mostrarContacto && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setMostrarContacto(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                            Contactar Vendedor
                        </h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <Mail className="text-blue-600" size={24} />
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Correo</p>
                                    <a href="mailto:zerpejos@gmail.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                                        zerpejos@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <Phone className="text-green-600" size={24} />
                                <div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Teléfono / WhatsApp</p>
                                    <a href="https://wa.me/573005450866" target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 font-medium hover:underline">
                                        +57 300 545 0866
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Formulario */}
            {mostrarFormulario && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-200">
                        <button
                            onClick={() => setMostrarFormulario(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            Solicitar Información
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Déjanos tus datos y te contactaremos pronto
                        </p>

                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Formulario enviado (demo)'); setMostrarFormulario(false); }}>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                    placeholder="Juan Pérez"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    WhatsApp
                                </label>
                                <input
                                    type="tel"
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                    placeholder="+57 300 123 4567"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                                    placeholder="correo@ejemplo.com"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg font-medium"
                            >
                                Enviar Solicitud
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;

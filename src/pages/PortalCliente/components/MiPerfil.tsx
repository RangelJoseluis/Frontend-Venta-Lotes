import React from 'react';
import { useAuthStore } from '../../../store/authStore';
import { User, Mail, Phone, MapPin, CreditCard, Calendar, Info } from 'lucide-react';

export const MiPerfil: React.FC = () => {
    const { user } = useAuthStore();

    const formatearFecha = (fecha: string | undefined) => {
        if (!fecha) return 'No disponible';
        return new Date(fecha).toLocaleDateString('es-CO', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const InfoField = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | undefined }) => (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Icon className="w-4 h-4 inline mr-2" />
                {label}
            </label>
            <div className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white">
                {value || 'No especificado'}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Información de la Cuenta */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <User className="w-10 h-10" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">
                            {user?.nombres} {user?.apellidos}
                        </h2>
                        <p className="text-blue-100">{user?.email}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-sm text-blue-100 mb-1">Fecha de Registro</p>
                        <p className="font-semibold">{formatearFecha(user?.creadoEn)}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <p className="text-sm text-blue-100 mb-1">Último Acceso</p>
                        <p className="font-semibold">{formatearFecha(user?.ultimoAcceso)}</p>
                    </div>
                </div>
            </div>

            {/* Datos Personales */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                        Datos Personales
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Información de tu cuenta
                    </p>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoField icon={User} label="Nombres" value={user?.nombres} />
                        <InfoField icon={User} label="Apellidos" value={user?.apellidos} />
                        <InfoField icon={Mail} label="Email" value={user?.email} />
                        <InfoField icon={CreditCard} label="Cédula" value={user?.cedula} />
                        <InfoField icon={Phone} label="Teléfono" value={user?.telefono} />
                        <InfoField icon={MapPin} label="Dirección" value={user?.direccion} />
                    </div>
                </div>
            </div>

            {/* Información Adicional */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                            Actualización de Datos
                        </h4>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                            Si necesitas actualizar tu información personal, por favor contacta con el administrador.
                            Los cambios en tus datos deben ser verificados y aprobados por seguridad.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * COMPONENTE: ModalRegistrarPago
 * 
 * Modal que encapsula el formulario de registro de pagos
 * Permite registrar pagos sin salir de la gestión de pagos
 */

import React, { useState, useEffect } from 'react';
import { X, AlertCircle, DollarSign } from 'lucide-react';
import { useVentas } from '../../../RegistroPagos/hooks/useVentas';
import { useCuotas } from '../../../RegistroPagos/hooks/useCuotas';
import { usePagoForm } from '../../../RegistroPagos/hooks/usePagoForm';
import SeccionVenta from '../../../RegistroPagos/components/SeccionVenta/SeccionVenta';
import SeccionCuota from '../../../RegistroPagos/components/SeccionCuota/SeccionCuota';
import SeccionPago from '../../../RegistroPagos/components/SeccionPago/SeccionPago';
import PantallaExito from '../../../RegistroPagos/components/PantallaExito/PantallaExito';

interface ModalRegistrarPagoProps {
    isOpen: boolean;
    onClose: () => void;
    onPagoRegistrado: () => void;
}

export default function ModalRegistrarPago({ isOpen, onClose, onPagoRegistrado }: ModalRegistrarPagoProps) {
    // Hooks personalizados (reutilizados de RegistroPagos)
    const { ventas, isLoading: isLoadingVentas, error: errorVentas } = useVentas();
    const {
        formData,
        setFormData,
        handleChange,
        updateField,
        autocompletarMonto,
        handleSubmit,
        resetForm,
        isSubmitting,
        error,
        success,
        pagoResponse,
    } = usePagoForm();

    // Estado local para cuotas y cuota seleccionada
    const [cuotaSeleccionada, setCuotaSeleccionada] = useState<any>(null);

    // Hook para cargar cuotas cuando cambia la venta
    const { cuotas: cuotasDinamicas, isLoading: isLoadingCuotasDinamicas } = useCuotas(
        formData.ventaUid || null
    );

    // Actualizar cuota seleccionada cuando cambia la selección
    useEffect(() => {
        if (formData.cuotaUid && cuotasDinamicas.length > 0) {
            const cuota = cuotasDinamicas.find(c => c.uid === formData.cuotaUid);
            setCuotaSeleccionada(cuota || null);
        } else {
            setCuotaSeleccionada(null);
        }
    }, [formData.cuotaUid, cuotasDinamicas]);

    // Notificar al padre cuando el pago es exitoso para recargar la tabla
    useEffect(() => {
        if (success) {
            onPagoRegistrado();
        }
    }, [success]);

    // Handlers
    const handleVentaChange = (ventaUid: string) => {
        setFormData(prev => ({
            ...prev,
            ventaUid,
            cuotaUid: '',
            monto: ''
        }));
        setCuotaSeleccionada(null);
    };

    const handleCuotaChange = (cuotaUid: string) => {
        updateField('cuotaUid', cuotaUid);
    };

    const handleAutocompletar = () => {
        autocompletarMonto(cuotaSeleccionada);
    };

    const handleNuevoPago = () => {
        resetForm();
        setCuotaSeleccionada(null);
        // onPagoRegistrado(); // Ya se llama en el useEffect
    };

    const handleClose = () => {
        if (!isSubmitting) {
            resetForm();
            setCuotaSeleccionada(null);
            onClose();
        }
    };

    // Cerrar con ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, isSubmitting]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">

                {/* Header del Modal */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                            Registrar Pago
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Complete el formulario para registrar un nuevo pago
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Contenido Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {success && pagoResponse ? (
                        <PantallaExito
                            pagoResponse={pagoResponse}
                            onNuevoPago={handleNuevoPago}
                            onVolver={handleClose}
                        />
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Sección: Selección de Venta */}
                            <SeccionVenta
                                ventas={ventas}
                                selectedVentaUid={formData.ventaUid}
                                onChange={handleVentaChange}
                                isLoading={isLoadingVentas}
                                isDisabled={isSubmitting}
                            />

                            {/* Sección: Selección de Cuota */}
                            {formData.ventaUid && (
                                <SeccionCuota
                                    cuotas={cuotasDinamicas}
                                    selectedCuotaUid={formData.cuotaUid}
                                    cuotaSeleccionada={cuotaSeleccionada}
                                    onChange={handleCuotaChange}
                                    isLoading={isLoadingCuotasDinamicas}
                                    isDisabled={isSubmitting}
                                />
                            )}

                            {/* Sección: Información del Pago */}
                            {formData.cuotaUid && (
                                <SeccionPago
                                    formData={formData}
                                    cuotaSeleccionada={cuotaSeleccionada}
                                    onChange={handleChange}
                                    onAutocompletarMonto={handleAutocompletar}
                                />
                            )}

                            {/* Mensajes de Error */}
                            {(error || errorVentas) && (
                                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
                                    <AlertCircle size={20} className="flex-shrink-0" />
                                    <div>
                                        <strong className="block text-sm font-semibold">Error al procesar el pago</strong>
                                        <p className="text-sm">{error || errorVentas}</p>
                                    </div>
                                </div>
                            )}
                        </form>
                    )}
                </div>

                {/* Footer con Botones (Solo si no es éxito) */}
                {!success && (
                    <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 sticky bottom-0 z-10">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-6 py-2.5 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={(e) => handleSubmit(e as any)}
                            disabled={isSubmitting || !formData.cuotaUid || !formData.monto}
                            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm hover:shadow-md"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    <DollarSign size={20} />
                                    Registrar Pago
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

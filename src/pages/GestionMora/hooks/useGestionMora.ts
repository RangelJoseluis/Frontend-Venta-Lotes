// Hook personalizado para gestionar datos de mora
import { useState, useCallback } from 'react';
import { getErrorMessage } from '../../../services/http.service';
import { moraService } from '../../../services/mora.service';
import { formatCurrency } from '../utils';
import type { CuotaConMora, EstadisticasMora } from '../../../services/mora.service';
import type { UseGestionMoraReturn } from '../types';

export const useGestionMora = (): UseGestionMoraReturn => {
    const [cuotas, setCuotas] = useState<CuotaConMora[]>([]);
    const [estadisticas, setEstadisticas] = useState<EstadisticasMora | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * Cargar datos de mora (estadísticas y cuotas)
     */
    const cargarDatos = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            // Obtener estadísticas de mora
            const stats = await moraService.obtenerEstadisticas();
            setEstadisticas(stats);

            // Obtener cuotas con mora
            const cuotasConMora = await moraService.obtenerCuotasConMora();
            setCuotas(cuotasConMora);

            console.log('✅ Datos de mora cargados exitosamente');
        } catch (err) {
            console.error('❌ Error al cargar datos de mora:', err);
            setError(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, []);

    /**
     * Calcular mora masiva para todas las cuotas vencidas
     */
    const calcularMoraMasiva = useCallback(async () => {
        try {
            setIsLoading(true);
            const result = await moraService.calcularMoraMasiva();

            alert(
                `✅ Mora calculada exitosamente\n\n` +
                `Cuotas actualizadas: ${result.cuotasActualizadas}\n` +
                `Cuotas omitidas: ${result.cuotasOmitidas}\n` +
                `Mora acumulada: ${formatCurrency(result.moraAcumulada)}`
            );

            // Recargar datos
            await cargarDatos();
        } catch (err) {
            console.error('❌ Error al calcular mora:', err);
            alert(getErrorMessage(err));
        } finally {
            setIsLoading(false);
        }
    }, [cargarDatos]);

    /**
     * Limpiar mensaje de error
     */
    const limpiarError = useCallback(() => {
        setError(null);
    }, []);

    return {
        cuotas,
        estadisticas,
        isLoading,
        error,
        cargarDatos,
        calcularMoraMasiva,
        limpiarError
    };
};

export default useGestionMora;

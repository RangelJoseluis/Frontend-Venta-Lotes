// Hook para cargar datos de lotes y clientes
// Maneja la carga inicial de datos necesarios para el formulario

import { useState, useEffect } from 'react';
import { lotesService } from '../../../services/lotes.service';
import { obtenerClientes } from '../../../services/clientes.service';
import type { Lote, LoteOption, ClienteOption } from '../types';
import type { Cliente } from '../../../types';
import { formatLoteLabel, formatClienteLabel } from '../utils/formatters';
import { MESSAGES } from '../constants';

interface UseCargarDatosReturn {
  lotes: Lote[];
  clientes: Cliente[];
  lotesOptions: LoteOption[];
  clientesOptions: ClienteOption[];
  isLoading: boolean;
  error: string | null;
}

export const useCargarDatos = (): UseCargarDatosReturn => {
  const [lotes, setLotes] = useState<Lote[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Formatear opciones para react-select
  const lotesOptions: LoteOption[] = lotes.map(lote => ({
    value: lote.uid,
    label: formatLoteLabel(lote)
  }));

  const clientesOptions: ClienteOption[] = clientes.map(cliente => ({
    value: cliente.uid,
    label: formatClienteLabel(cliente)
  }));

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('🔄 Cargando lotes y clientes...');
        
        const [lotesData, clientesData] = await Promise.all([
          lotesService.obtenerLotesDisponibles(), // Usar endpoint específico de lotes disponibles
          obtenerClientes()
        ]);

        setLotes(lotesData);
        setClientes(clientesData);

        console.log('✅ Lotes disponibles cargados:', lotesData.length);
        console.log('✅ Clientes cargados:', clientesData.length);
      } catch (err) {
        console.error('❌ Error al cargar datos:', err);
        setError(MESSAGES.ERROR_CARGAR_DATOS);
      } finally {
        setIsLoading(false);
      }
    };

    cargarDatos();
  }, []);

  return {
    lotes,
    clientes,
    lotesOptions,
    clientesOptions,
    isLoading,
    error
  };
};

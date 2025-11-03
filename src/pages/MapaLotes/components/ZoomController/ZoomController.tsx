/**
 * COMPONENTE: ZOOM CONTROLLER
 * 
 * Componente auxiliar para controlar el zoom del mapa.
 * Escucha cambios en clienteSeleccionado y hace zoom automático
 * al/los lote(s) del cliente.
 */

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import lotesMapaService from '../../../../services/lotes-mapa.service';
import type { ZoomControllerProps } from '../../types';

const ZoomController: React.FC<ZoomControllerProps> = ({ clienteSeleccionado, lotes }) => {
  const map = useMap();

  useEffect(() => {
    if (!clienteSeleccionado || !map) return;

    console.log('🔍 Buscando lotes para cliente:', clienteSeleccionado);
    console.log('📊 Total de lotes cargados:', lotes.length);

    // Buscar lotes que pertenezcan al cliente seleccionado
    // Comparar por UID (exacto) o por nombre/cédula (parcial)
    const lotesDelCliente = lotes.filter(lote => {
      // Log para debugging
      if (lote.clienteNombre || lote.clienteCedula) {
        console.log(`🎯 Lote ${lote.codigo}: Cliente=${lote.clienteNombre}, Cédula=${lote.clienteCedula}`);
      }

      // Si no tiene datos de cliente, no es un match
      if (!lote.clienteUid && !lote.clienteNombre && !lote.clienteCedula) {
        return false;
      }
      
      // Opción 1: Comparar por UID (más confiable)
      if (lote.clienteUid && lote.clienteUid === clienteSeleccionado.value) {
        console.log(`✅ Match por UID: ${lote.codigo}`);
        return true;
      }
      
      // Opción 2: Buscar por partes del nombre o cédula
      // El label del selector es: "Juan Pérez - 1234567890"
      // Separamos para buscar por partes
      const labelParts = clienteSeleccionado.label.toLowerCase().split(' - ');
      const nombreBuscado = labelParts[0]; // "juan pérez"
      const cedulaBuscada = labelParts[1]; // "1234567890"
      
      // Buscar si el nombre del cliente incluye el nombre buscado
      const nombreMatch = lote.clienteNombre?.toLowerCase().includes(nombreBuscado);
      
      // Buscar si la cédula coincide exactamente
      const cedulaMatch = lote.clienteCedula === cedulaBuscada;
      
      if (nombreMatch || cedulaMatch) {
        console.log(`✅ Match por ${nombreMatch ? 'nombre' : 'cédula'}: ${lote.codigo}`);
        return true;
      }
      
      return false;
    });

    if (lotesDelCliente.length === 0) {
      console.log('⚠️ No se encontraron lotes para el cliente seleccionado');
      return;
    }

    console.log(`🎯 Encontrados ${lotesDelCliente.length} lotes para el cliente`);

    // Si hay un solo lote, hacer zoom directo
    if (lotesDelCliente.length === 1) {
      const lote = lotesDelCliente[0];
      const coords = lotesMapaService.parsearCoordenadas(lote.coordenadas || lote.geojson || '');
      
      if (coords) {
        console.log(`📍 Haciendo zoom al lote: ${lote.codigo}`);
        // Nivel de zoom: 0 (muy lejos) - 22 (muy cerca)
        // Nivel actual: 20 (vista muy cercana del lote)
        // Ajustar aquí para cambiar el acercamiento (18=medio, 20=cercano, 22=muy cercano)
        map.flyTo([coords.latitud, coords.longitud], 20, {
          duration: 1.5, // Duración de la animación en segundos
          easeLinearity: 0.25 // Suavidad de la animación
        });
      }
    } else {
      // Si hay múltiples lotes, calcular el centro y hacer zoom para que todos sean visibles
      const coordenadasValidas = lotesDelCliente
        .map(lote => lotesMapaService.parsearCoordenadas(lote.coordenadas || lote.geojson || ''))
        .filter(coords => coords !== null);

      if (coordenadasValidas.length > 0) {
        const bounds = coordenadasValidas.map(coords => [coords!.latitud, coords!.longitud] as [number, number]);
        console.log(`📍 Haciendo zoom a ${bounds.length} lotes del cliente`);
        map.flyToBounds(bounds, {
          padding: [50, 50],
          duration: 1.5,
          easeLinearity: 0.25
        });
      }
    }
  }, [clienteSeleccionado, lotes, map]);

  return null; // Este componente no renderiza nada
};

export default ZoomController;

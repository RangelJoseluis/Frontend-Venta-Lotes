// Hook para cargar todos los datos del lote
import { useState, useEffect } from 'react';
import { lotesService } from '../../../services/lotes.service';
import { cuotasService } from '../../../services/cuotas.service';
import { obtenerVentasPorLote } from '../../../services/ventas.service';
import { getErrorMessage } from '../../../services/http.service';
import type { Lote, Cuota } from '../types';
import type { Venta } from '../../../types';

export const useDetalleLote = (uid: string | undefined) => {
  const [lote, setLote] = useState<Lote | null>(null);
  const [venta, setVenta] = useState<Venta | null>(null);
  const [cuotas, setCuotas] = useState<Cuota[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCuotas, setLoadingCuotas] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [puntosPoligono, setPuntosPoligono] = useState<[number, number][]>([]);
  const [centroMapa, setCentroMapa] = useState<[number, number] | null>(null);

  useEffect(() => {
    cargarDatosLote();
  }, [uid]);

  const cargarDatosLote = async () => {
    if (!uid) {
      setError('UID del lote no proporcionado');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Cargar lote
      const loteData = await lotesService.obtenerPorUid(uid);
      setLote(loteData);
      console.log('✅ Lote cargado:', loteData);

      // Cargar polígono si existe
      if (loteData.geojson) {
        try {
          const geojsonData = JSON.parse(loteData.geojson);
          if (geojsonData.type === 'Polygon' && geojsonData.coordinates && geojsonData.coordinates[0]) {
            const puntos: [number, number][] = geojsonData.coordinates[0]
              .slice(0, -1)
              .map((coord: number[]) => [coord[1], coord[0]] as [number, number]);
            setPuntosPoligono(puntos);
            
            // Calcular centroide del polígono
            const sumLat = puntos.reduce((sum, punto) => sum + punto[0], 0);
            const sumLng = puntos.reduce((sum, punto) => sum + punto[1], 0);
            const centroide: [number, number] = [
              sumLat / puntos.length,
              sumLng / puntos.length
            ];
            setCentroMapa(centroide);
            console.log('✅ Centroide calculado:', centroide);
          }
        } catch (err) {
          console.error('Error al parsear GeoJSON:', err);
        }
      } else if (loteData.ubicacionX && loteData.ubicacionY) {
        // Si no hay polígono, usar ubicación directa
        setCentroMapa([parseFloat(loteData.ubicacionY), parseFloat(loteData.ubicacionX)]);
      }

      // Cargar venta y cuotas si el lote está en cuotas o vendido
      if (loteData.estado === 'en_cuotas' || loteData.estado === 'vendido') {
        try {
          setLoadingCuotas(true);
          
          // Obtener la venta asociada al lote
          const ventas = await obtenerVentasPorLote(loteData.uid);
          
          if (ventas && ventas.length > 0) {
            const ventaActual = ventas[0]; // Tomamos la primera venta (debería ser única)
            setVenta(ventaActual);
            console.log('✅ Venta cargada:', ventaActual);
            
            // Cargar cuotas de la venta
            if (ventaActual.uid) {
              const cuotasData = await cuotasService.obtenerPorVenta(ventaActual.uid);
              setCuotas(cuotasData);
              console.log('✅ Cuotas cargadas:', cuotasData.length);
            }
          } else {
            console.warn('⚠️ No se encontró venta para el lote');
          }
        } catch (err) {
          console.error('❌ Error al cargar venta/cuotas:', err);
        } finally {
          setLoadingCuotas(false);
        }
      }
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      console.error('❌ Error al cargar lote:', errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    lote,
    venta,
    cuotas,
    loading,
    loadingCuotas,
    error,
    puntosPoligono,
    centroMapa,
    cargarDatosLote,
  };
};

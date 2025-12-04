/**
 * Componente MapController - Controla el zoom y centrado del mapa
 * Se usa para hacer zoom automático a un lote cuando se busca
 */

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import type { LoteParaMapa } from '../../../types/mapa';

interface MapControllerProps {
    loteDestacado: LoteParaMapa | null;
}

/**
 * Parsear coordenadas desde string "lat,lng" o desde geojson
 */
const parsearCoordenadas = (lote: LoteParaMapa): [number, number] | null => {
    // Intentar primero con coordenadas legacy (string "lat,lng")
    if (lote.coordenadas && typeof lote.coordenadas === 'string') {
        const partes = lote.coordenadas.split(',');
        if (partes.length === 2) {
            const lat = parseFloat(partes[0].trim());
            const lng = parseFloat(partes[1].trim());
            if (!isNaN(lat) && !isNaN(lng)) {
                return [lat, lng];
            }
        }
    }

    // Intentar con geojson
    if (lote.geojson && typeof lote.geojson === 'string') {
        try {
            const geojsonObj = JSON.parse(lote.geojson);

            // Si es un punto
            if (geojsonObj.type === 'Point' && Array.isArray(geojsonObj.coordinates)) {
                const [lng, lat] = geojsonObj.coordinates;
                if (!isNaN(lat) && !isNaN(lng)) {
                    return [lat, lng];
                }
            }

            // Si es un polígono, calcular el centroide
            if (geojsonObj.type === 'Polygon' && Array.isArray(geojsonObj.coordinates[0])) {
                const coords = geojsonObj.coordinates[0];
                let latSum = 0;
                let lngSum = 0;

                coords.forEach((coord: number[]) => {
                    lngSum += coord[0];
                    latSum += coord[1];
                });

                const lat = latSum / coords.length;
                const lng = lngSum / coords.length;

                if (!isNaN(lat) && !isNaN(lng)) {
                    return [lat, lng];
                }
            }
        } catch (error) {
            console.error('Error al parsear geojson:', error);
        }
    }

    return null;
};

const MapController = ({ loteDestacado }: MapControllerProps) => {
    const map = useMap();

    useEffect(() => {
        if (loteDestacado) {
            const coordenadas = parsearCoordenadas(loteDestacado);

            if (coordenadas) {
                // Hacer zoom al lote con animación suave
                map.flyTo(coordenadas, 20, {
                    duration: 1.5, // Duración de la animación en segundos
                    easeLinearity: 0.25
                });
            }
        }
    }, [loteDestacado, map]);

    return null;
};

export default MapController;

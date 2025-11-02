/**
 * SERVICIO DE LOTES PARA MAPA
 * 
 * Maneja las peticiones HTTP relacionadas con el mapa interactivo de lotes.
 * Consume los endpoints del backend para obtener lotes según permisos de rol.
 */

import httpClient from './http.service';
import type { LoteParaMapa, RolMapa, FiltrosMapaLotes, Coordenadas } from '../types/mapa';

/**
 * SERVICIO DE LOTES PARA MAPA
 */
const lotesMapaService = {
  /**
   * Mapear datos del backend al formato del frontend
   * El backend devuelve campos diferentes a los que espera el frontend
   */
  mapearLoteBackendAFrontend(loteBackend: any): LoteParaMapa {
    return {
      uid: loteBackend.uid,
      codigo: loteBackend.codigo,
      superficie: parseFloat(loteBackend.superficieM2 || '0'),
      precio: parseFloat(loteBackend.precioLista || '0'),
      ubicacion: loteBackend.direccion || 'Sin dirección',
      coordenadas: loteBackend.ubicacionX && loteBackend.ubicacionY 
        ? `${loteBackend.ubicacionY},${loteBackend.ubicacionX}` 
        : undefined,
      geojson: loteBackend.geojson || undefined,
      estado: loteBackend.estado,
      topografia: loteBackend.topografia,
      estadoDocumentacion: loteBackend.estadoDocumentacion,
      amueblado: loteBackend.amueblado,
      esDelCliente: loteBackend.esDelCliente,
      modeloCasa: loteBackend.modeloCasa ? {
        uid: loteBackend.modeloCasa.uid,
        nombre: loteBackend.modeloCasa.nombre,
        precioBase: parseFloat(loteBackend.modeloCasa.precioBase || '0'),
        descripcion: loteBackend.modeloCasa.descripcion
      } : undefined,
      imagenesUrls: loteBackend.imagenesUrls,
      creadoEn: loteBackend.creadoEn,
      actualizadoEn: loteBackend.actualizadoEn,
      // Datos del cliente propietario (para zoom automático)
      clienteUid: loteBackend.clienteUid,
      clienteNombre: loteBackend.clienteNombre,
      clienteCedula: loteBackend.clienteCedula,
      clienteTelefono: loteBackend.clienteTelefono
    };
  },

  /**
   * Obtener lotes visibles según el rol del usuario
   * Endpoint: GET /lotes/visibles?rol=invitado|cliente|admin
   * 
   * Lógica por Rol:
   * - invitado: Solo lotes "disponible" (Verde)
   * - cliente: Su lote + lotes "disponible"
   * - admin: TODOS los lotes sin restricciones
   */
  async obtenerLotesVisibles(rol: RolMapa): Promise<LoteParaMapa[]> {
    try {
      const response = await httpClient.get<any[]>(`/lotes/visibles?rol=${rol}`);
      // Mapear los datos del backend al formato del frontend
      const lotesMapeados = response.data.map(lote => this.mapearLoteBackendAFrontend(lote));
      console.log('✅ Lotes mapeados:', lotesMapeados);
      return lotesMapeados;
    } catch (error) {
      console.error('❌ Error al obtener lotes visibles:', error);
      throw error;
    }
  },

  /**
   * Buscar lotes por coordenadas GPS (radio de búsqueda)
   * Endpoint: GET /lotes/coordenadas?latitud=4.6097&longitud=-74.0817&radio=5000
   * 
   * @param latitud - Latitud del centro de búsqueda
   * @param longitud - Longitud del centro de búsqueda
   * @param radio - Radio de búsqueda en metros (default: 5000)
   */
  async buscarPorCoordenadas(
    latitud: number,
    longitud: number,
    radio: number = 5000
  ): Promise<LoteParaMapa[]> {
    try {
      const response = await httpClient.get<LoteParaMapa[]>(
        `/lotes/coordenadas?latitud=${latitud}&longitud=${longitud}&radio=${radio}`
      );
      return response.data;
    } catch (error) {
      console.error('❌ Error al buscar lotes por coordenadas:', error);
      throw error;
    }
  },

  /**
   * Obtener lote específico por UID
   * Endpoint: GET /lotes/:uid
   */
  async obtenerLotePorUid(uid: string): Promise<LoteParaMapa> {
    try {
      const response = await httpClient.get<LoteParaMapa>(`/lotes/${uid}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error al obtener lote ${uid}:`, error);
      throw error;
    }
  },

  /**
   * Filtrar lotes por estado
   * Endpoint: GET /lotes/estado/:estado
   * Requiere autenticación (admin)
   */
  async filtrarPorEstado(estado: 'disponible' | 'en_cuotas' | 'vendido'): Promise<LoteParaMapa[]> {
    try {
      const response = await httpClient.get<LoteParaMapa[]>(`/lotes/estado/${estado}`);
      return response.data;
    } catch (error) {
      console.error(`❌ Error al filtrar lotes por estado ${estado}:`, error);
      throw error;
    }
  },

  /**
   * Parsear coordenadas desde string a objeto
   * Soporta dos formatos:
   * 1. Simple: "4.6097,-74.0817" (latitud,longitud)
   * 2. GeoJSON: '{"type":"Point","coordinates":[-74.0817,4.6097]}' (longitud,latitud)
   */
  parsearCoordenadas(coordenadasStr: string): Coordenadas | null {
    try {
      // Intentar parsear como GeoJSON primero
      if (coordenadasStr.includes('{') && coordenadasStr.includes('coordinates')) {
        try {
          const geojson = JSON.parse(coordenadasStr);
          if (geojson.type === 'Point' && Array.isArray(geojson.coordinates)) {
            // GeoJSON usa [longitud, latitud]
            const [longitud, latitud] = geojson.coordinates;
            if (!isNaN(latitud) && !isNaN(longitud)) {
              return { latitud, longitud };
            }
          }
        } catch (e) {
          console.warn('⚠️ Error al parsear GeoJSON, intentando formato simple');
        }
      }

      // Formato simple: "latitud,longitud"
      const partes = coordenadasStr.split(',');
      if (partes.length !== 2) {
        console.warn('⚠️ Formato de coordenadas inválido:', coordenadasStr);
        return null;
      }

      const latitud = parseFloat(partes[0].trim());
      const longitud = parseFloat(partes[1].trim());

      if (isNaN(latitud) || isNaN(longitud)) {
        console.warn('⚠️ Coordenadas no numéricas:', coordenadasStr);
        return null;
      }

      return { latitud, longitud };
    } catch (error) {
      console.error('❌ Error al parsear coordenadas:', error);
      return null;
    }
  },

  /**
   * Aplicar filtros locales a los lotes
   * (Filtrado en el frontend para mejor UX)
   */
  aplicarFiltros(lotes: LoteParaMapa[], filtros: FiltrosMapaLotes): LoteParaMapa[] {
    let lotesFiltrados = [...lotes];

    // Filtro por precio
    if (filtros.precioMin !== undefined) {
      lotesFiltrados = lotesFiltrados.filter(lote => lote.precio >= filtros.precioMin!);
    }
    if (filtros.precioMax !== undefined) {
      lotesFiltrados = lotesFiltrados.filter(lote => lote.precio <= filtros.precioMax!);
    }

    // Filtro por superficie
    if (filtros.superficieMin !== undefined) {
      lotesFiltrados = lotesFiltrados.filter(lote => lote.superficie >= filtros.superficieMin!);
    }
    if (filtros.superficieMax !== undefined) {
      lotesFiltrados = lotesFiltrados.filter(lote => lote.superficie <= filtros.superficieMax!);
    }

    // Filtro por estado
    if (filtros.estado && filtros.estado !== 'todos') {
      lotesFiltrados = lotesFiltrados.filter(lote => lote.estado === filtros.estado);
    }

    // Filtro por búsqueda (código o ubicación)
    if (filtros.busqueda) {
      const busquedaLower = filtros.busqueda.toLowerCase();
      lotesFiltrados = lotesFiltrados.filter(lote => 
        lote.codigo.toLowerCase().includes(busquedaLower) ||
        lote.ubicacion.toLowerCase().includes(busquedaLower)
      );
    }

    return lotesFiltrados;
  },

  /**
   * Formatear precio en pesos colombianos
   */
  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  },

  /**
   * Formatear superficie
   */
  formatearSuperficie(superficie: number): string {
    return `${superficie.toFixed(2)} m²`;
  }
};

export default lotesMapaService;

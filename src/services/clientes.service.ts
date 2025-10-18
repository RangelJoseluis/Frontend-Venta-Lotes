/**
 * SERVICIO DE CLIENTES
 * Maneja todas las operaciones relacionadas con clientes
 */

import httpClient from './http.service';
import type { Cliente } from '../types';

/**
 * Obtener todos los clientes
 */
export const obtenerClientes = async (): Promise<Cliente[]> => {
  const response = await httpClient.get('/clientes');
  return response.data;
};

/**
 * Obtener un cliente por UID
 */
export const obtenerClientePorUid = async (uid: string): Promise<Cliente> => {
  const response = await httpClient.get(`/clientes/${uid}`);
  return response.data;
};

/**
 * Crear un nuevo cliente
 */
export const crearCliente = async (clienteData: Omit<Cliente, 'uid' | 'creadoEn' | 'actualizadoEn'>): Promise<Cliente> => {
  const response = await httpClient.post('/clientes', clienteData);
  return response.data;
};

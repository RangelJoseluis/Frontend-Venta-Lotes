/**
 * SERVICIO DE CLIENTES
 * Maneja todas las operaciones relacionadas con clientes
 */

import httpClient from './http.service';
import type { Cliente } from '../types';

// ============================================================================
// INTERFACES ADICIONALES
// ============================================================================

export interface CrearClienteDto {
  usuarioId: number;
  nombres: string;
  apellidos: string;
  documento: string;
  telefono: string;
  direccion?: string;
}

export interface ActualizarClienteDto {
  nombres?: string;
  apellidos?: string;
  documento?: string;
  telefono?: string;
  direccion?: string;
  estado?: 'activo' | 'inactivo';
}

// ============================================================================
// OPERACIONES CRUD
// ============================================================================

/**
 * Obtener todos los clientes
 */
export const obtenerClientes = async (): Promise<Cliente[]> => {
  try {
    const response = await httpClient.get('/clientes');
    console.log('✅ Clientes obtenidos:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al obtener clientes:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener un cliente por UID
 */
export const obtenerClientePorUid = async (uid: string): Promise<Cliente> => {
  try {
    const response = await httpClient.get(`/clientes/${uid}`);
    console.log('✅ Cliente obtenido:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al obtener cliente:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Crear un nuevo cliente
 * NOTA: Primero debe existir el usuario
 */
export const crearCliente = async (clienteData: CrearClienteDto): Promise<Cliente> => {
  try {
    const response = await httpClient.post('/clientes', clienteData);
    console.log('✅ Cliente creado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al crear cliente:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Actualizar un cliente existente
 */
export const actualizarCliente = async (uid: string, datos: ActualizarClienteDto): Promise<Cliente> => {
  try {
    const response = await httpClient.patch(`/clientes/${uid}`, datos);
    console.log('✅ Cliente actualizado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al actualizar cliente:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Eliminar un cliente
 */
export const eliminarCliente = async (uid: string): Promise<{ mensaje: string }> => {
  try {
    const response = await httpClient.delete(`/clientes/${uid}`);
    console.log('✅ Cliente eliminado:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('❌ Error al eliminar cliente:', error.response?.data || error.message);
    throw error;
  }
};

/**
 * Obtener cliente por UID de usuario
 */
export const obtenerClientePorUsuarioUid = async (usuarioUid: string): Promise<Cliente | null> => {
  try {
    const clientes = await obtenerClientes();
    const cliente = clientes.find(c => c.usuarioUid === usuarioUid);
    return cliente || null;
  } catch (error: any) {
    console.error('❌ Error al buscar cliente por usuario:', error.response?.data || error.message);
    throw error;
  }
};

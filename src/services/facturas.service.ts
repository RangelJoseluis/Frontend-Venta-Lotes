/**
 * SERVICIO: FACTURAS Y TICKETS
 * Descarga y previsualización de facturas de venta y tickets de pago en PDF
 */

import httpClient from './http.service';

/**
 * Descarga la factura de una venta en PDF
 * @param ventaUid UID de la venta
 */
export const descargarFacturaVenta = async (ventaUid: string): Promise<void> => {
  try {
    const response = await httpClient.get(`/ventas/${ventaUid}/factura`, {
      responseType: 'blob', // Importante para archivos PDF
    });

    // Crear URL temporal para el blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // Crear elemento <a> temporal para descargar
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `factura-${ventaUid}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Limpiar
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar factura:', error);
    throw error;
  }
};

/**
 * Descarga el ticket de un pago en PDF
 * @param pagoUid UID del pago
 */
export const descargarTicketPago = async (pagoUid: string): Promise<void> => {
  try {
    const response = await httpClient.get(`/pagos/${pagoUid}/ticket`, {
      responseType: 'blob', // Importante para archivos PDF
    });

    // Crear URL temporal para el blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // Crear elemento <a> temporal para descargar
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ticket-${pagoUid}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Limpiar
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error al descargar ticket:', error);
    throw error;
  }
};

/**
 * Previsualiza la factura de una venta en una nueva pestaña
 * @param ventaUid UID de la venta
 */
export const previsualizarFacturaVenta = async (ventaUid: string): Promise<void> => {
  try {
    const response = await httpClient.get(`/ventas/${ventaUid}/factura`, {
      responseType: 'blob',
    });

    // Crear URL temporal para el blob
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    
    // Abrir en nueva pestaña
    window.open(url, '_blank');
    
    // Limpiar después de 10 segundos (dar tiempo suficiente para que el navegador cargue el PDF)
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 10000);
  } catch (error) {
    console.error('Error al previsualizar factura:', error);
    throw error;
  }
};

/**
 * Previsualiza el ticket de un pago en una nueva pestaña
 * @param pagoUid UID del pago
 */
export const previsualizarTicketPago = async (pagoUid: string): Promise<void> => {
  try {
    const response = await httpClient.get(`/pagos/${pagoUid}/ticket`, {
      responseType: 'blob',
    });

    // Crear URL temporal para el blob
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    
    // Abrir en nueva pestaña
    window.open(url, '_blank');
    
    // Limpiar después de 10 segundos (dar tiempo suficiente para que el navegador cargue el PDF)
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 10000);
  } catch (error) {
    console.error('Error al previsualizar ticket:', error);
    throw error;
  }
};

const facturasService = {
  descargarFacturaVenta,
  descargarTicketPago,
  previsualizarFacturaVenta,
  previsualizarTicketPago,
};

export default facturasService;

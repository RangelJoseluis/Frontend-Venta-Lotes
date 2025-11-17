export interface ConfiguracionZona {
  nombre: string;
  centro: {
    latitud: number;
    longitud: number;
  };
  zoom: number;
  limites?: {
    norte: number;
    sur: number;
    este: number;
    oeste: number;
  };
}

export interface ConfigMora {
  moraHabilitada: boolean;
  tasaMoraDiaria: number;
  tasaMoraMensual: number;
  diasGracia: number;
  calculoMora: 'diario' | 'mensual';
  moraMaximaPorCuotaPorcentaje: number;
  tasaMoraMaximaLegal: number;
}

export interface MensajeConfig {
  tipo: 'success' | 'error';
  texto: string;
}

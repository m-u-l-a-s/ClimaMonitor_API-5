export interface PontoCultivo {
  latitude: string;
  longitude: string;
}

export interface Temperatura {
  data: Date;
  temperatura_media: number;
  temperatura_max: number;
  temperatura_min: number;
}

export interface Pluviometria {
  data: Date;
  pluviometria: number;
}

export interface Cultivo {
  id: string
  ponto_cultivo: PontoCultivo;
  nome_cultivo: string;
  temperatura_max: number;
  pluviometria_max: number;
  temperatura_min: number;
  pluviometria_min: number;
  temperaturas?: Temperatura[];
  pluviometrias?: Pluviometria[];
  alertasTemp?: Temperatura[];
  alertasPluvi?: Pluviometria[];
  lastUpdate?: string;
  createdAt: string;
  deletedAt: string;
  userId: string;
}

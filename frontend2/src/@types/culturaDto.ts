export interface PontoCultivo {
  latitude: string;
  longitude: string;
}

export interface Temperatura {
  data: string;
  temperatura_media: number;
  temperatura_max: number;
  temperatura_min: number;
}

export interface Pluviometria {
  data: string;
  pluviometria: number;
}

export interface Cultivo {
  id_watermelon: string;
  id_mongo: string
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

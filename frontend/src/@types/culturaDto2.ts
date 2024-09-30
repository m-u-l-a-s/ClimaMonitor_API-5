interface  PontoCultivo {
    latitude: string;
    longitude: string;
  }
  
  interface Temperatura {
    data: string;
    temperatura: number;
  }
  
  interface Pluviometria {
    data: string;
    pluviometria: number;
  }
  
  interface Alerta {
    [data: string]: number;
  }
  
  export interface Cultivo {
    _id : string 
    ponto_cultivo: PontoCultivo;
    nome_cultivo: string;
    temperatura_max: number;
    pluviometria_max: number;
    temperatura_min: number;
    pluviometria_min: number;
    temperaturas: Temperatura[];
    pluviometrias: Pluviometria[];
    alertasTemp: Alerta[];
    alertasPluvi: Alerta[];
    lastUpdate: string;
  }
  




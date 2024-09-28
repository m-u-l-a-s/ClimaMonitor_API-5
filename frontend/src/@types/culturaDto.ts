export interface CulturaDto {
    _id: string,
    latitude: string;
    longitude: string;
    nome_cultivo: string;
    tempFrequency: string;
    maxTemp: string;
    minTemp: string;
    pluviFrequency: string;
    maxPluvi: string;
    minPluvi: string;
    temperaturas: Temperatura[],
    pluviometrias: Pluviometria[],
} 

export interface Temperatura{
    data: Date,
    temperatura: number,
}
export interface Pluviometria{
    data: Date,
    pluviometria: number,
}

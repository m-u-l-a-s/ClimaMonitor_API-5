import {Model} from '@nozbe/watermelondb';
import {date, field, json} from '@nozbe/watermelondb/decorators';
import {} from '../@types/culturaDto';

export default class CulturasModel extends Model {
  static table: string = 'cultura';

  @field('nome_cultivo') nome_cultivo!: string;
  @field('latitude') latitude!: string
  @field('longitude') longitude!: string
  @field('temperatura_max') temperatura_max!: number;
  @field('temperatura_min') temperatura_min!: number;
  @field('pluviometria_max') pluviometria_max!: number;
  @field('pluviometria_min') pluviometria_min!: number;
  @field('last_update_mongo') lastUpdate!: string;
  @field('created_at_mongo') createdAt!: string;
  @field('deleted_at_mongo') deletedAt!: string;
  @field('user_id') userId!: string;
  @field('id_cultura') id_cultura!: string;
}

export interface Localizacao {
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

export interface Alerta {
  [date: string]: number;
}

export interface Cultura {
  latitude : string;
  longitude: string;
  nome_cultivo: string;
  temperatura_max: number;
  pluviometria_max: number;
  temperatura_min: number;
  pluviometria_min: number;
  user_id: string;
  id_cultura: string;
  id: string
}

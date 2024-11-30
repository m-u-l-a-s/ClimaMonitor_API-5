import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class TemperaturaModel extends Model {
  static table: string = 'temperatura';
  @field('id_cultura') id_cultura!: string;
  @field('data') data!: string;
  @field('temperatura_media') temperatura_media!: number;
  @field('temperatura_max') temperatura_max!: number;
  @field('temperatura_min') temperatura_min!: number;
}
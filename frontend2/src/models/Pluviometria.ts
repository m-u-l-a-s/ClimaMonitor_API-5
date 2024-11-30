import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class PluviometriaModel extends Model {
  static table: string = 'pluviometria';
  @field('id_cultura') id_cultura!: string;
  @field('data') data!: string;
  @field('pluviometria') temperatura_media!: number;
}
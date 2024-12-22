import {appSchema} from '@nozbe/watermelondb';
import { alertaPluviSchema, alertaTempSchema, culturaSchema, pluviometriaSchema, temperaturaSchema } from './culturaSchema';
// import {alertaPluviSchema, alertaTempSchema, culturaSchema, pluviometriaSchema, temperaturaSchema} from './culturaSchema';

export const mySchema = appSchema({
  version: 1,
  tables: [culturaSchema, alertaPluviSchema, alertaTempSchema, pluviometriaSchema, temperaturaSchema],
});

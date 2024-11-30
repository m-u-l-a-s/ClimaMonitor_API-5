import  SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import { mySchema } from "../models/schema"
import migration from "../models/migration"
import { Database } from "@nozbe/watermelondb"
import Cultura from "../models/Cultura"
import Temperatura from "../models/Temperatura"
import Pluviometria  from "../models/Pluviometria"
import AlertasPluviometria from "../models/AlertasPluviometria"
import AlertasTemperatura from "../models/AlertasTemperatura"
// import {CulturasModel, PluviometriaModel, AlertasPluviometriaModel, TemperaturaModel,AlertasTemperaturaModel} from "../models/Cultura"

const adapter = new SQLiteAdapter({
  schema: mySchema,
  migrations: migration,
  dbName: "climamonitor",
  onSetUpError: error => {}
})

export const database = new Database({adapter : adapter, modelClasses: [Cultura, Temperatura, Pluviometria, AlertasPluviometria, AlertasTemperatura]})
// export const database = new Database({adapter : adapter, modelClasses: [CulturasModel, PluviometriaModel, AlertasPluviometriaModel, TemperaturaModel, AlertasTemperaturaModel]})

import { synchronize } from '@nozbe/watermelondb/sync';
import { Collection, Model, Q } from '@nozbe/watermelondb';
import { Cultivo, Pluviometria, Temperatura } from '../@types/culturaDto';
import { database } from '../database';
import CulturaModel, { Cultura } from '../models/Cultura';
// import { BASE_URL, getTimeStamp } from '../variables';
import { BASE_URL, getTimeStamp } from '../variables';
import { formatInTimeZone } from 'date-fns-tz';
import axios, { all } from 'axios';
import { NotificacaoType } from '../@types/notificacaoDto';
import TemperaturaModel from '../models/Temperatura';
import PluviometriaModel from '../models/Pluviometria';
import * as moment from 'moment';
import { take } from '@nozbe/watermelondb/QueryDescription';


export const getCulturas = async (): Promise<Collection<CulturaModel>> => {
  return database.get('cultura');
};

export const findOneCultura = async (id: string): Promise<CulturaModel> => {
  return (await getCulturas()).find(id);
};

export const findAllCulturaById = async (userId: string): Promise<CulturaModel[]> => {
  const cultura = await getCulturas();
  const allCulturas = await cultura.query(Q.where("user_id", userId))
  return allCulturas;
};

export const findAllTemperaturasById = async (idCultura: string): Promise<Temperatura[]> => {
  const temperaturaT: Collection<TemperaturaModel> = database.get("temperatura")
  const temperaturas: Temperatura[] = []
  const temperaturaQ = (await temperaturaT.query(Q.where("id_cultura", idCultura))).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());

  temperaturaQ.map(temp => {
    temperaturas.push({
      data: new Date(temp.data),
      temperatura_max: temp.temperatura_max,
      temperatura_min: temp.temperatura_min,
      temperatura_media: temp.temperatura_media,
    })
  })

  return temperaturas
}

export const findAllPluviometriasById = async (idCultura: string): Promise<Pluviometria[]> => {
  const pluviometriaT: Collection<PluviometriaModel> = database.get("pluviometria")
  const pluviometrias: Pluviometria[] = []
  const pluviometriaQ = (await pluviometriaT.query(Q.where("id_cultura", idCultura))).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())

  pluviometriaQ.map(pluvi => {
    pluviometrias.push({
      data: new Date(pluvi.data),
      pluviometria: pluvi.pluviometria
    })
  })


  return pluviometrias
}

export const PullCreateCultura = async (culturas : PullCultura[]) => {
  culturas.forEach(async culturaDto => {
    try {
      await database.write(async () => {
        const culturaCollection = database.get<CulturaModel>('Cultura');
        const time = formatInTimeZone(
          new Date(),
          'America/Sao_Paulo',
          "yyyy-MM-dd'T'HH:mm:ssXXX",
        );
        await culturaCollection.create(cultura => {
          cultura.id_cultura = cultura.id_cultura;
          cultura.latitude = culturaDto.latitude;
          cultura.longitude = culturaDto.longitude
          cultura.nome_cultivo = culturaDto.nome_cultivo;
          cultura.temperatura_max = culturaDto.temperatura_max;
          cultura.pluviometria_max = culturaDto.pluviometria_max;
          cultura.temperatura_min = culturaDto.temperatura_min;
          cultura.pluviometria_min = culturaDto.pluviometria_min;
          cultura.lastUpdate = culturaDto.last_update_mongo;
          cultura.createdAt = culturaDto.created_at_mongo;
          cultura.deletedAt = '';
          cultura.userId = culturaDto.user_id;
        });
      });
    } catch (error) {
      console.error('Erro ao criar cultura:', error);
    }
  })
}

export const createNewCultura = async (culturaDto: Cultivo) => {
  try {
    await database.write(async () => {
      const culturaCollection = database.get<CulturaModel>('Cultura');
      const time = formatInTimeZone(
        new Date(),
        'America/Sao_Paulo',
        "yyyy-MM-dd'T'HH:mm:ssXXX",
      );
      await culturaCollection.create(cultura => {
        cultura.id_cultura = '';
        cultura.latitude = culturaDto.ponto_cultivo.latitude;
        cultura.longitude = culturaDto.ponto_cultivo.longitude
        cultura.nome_cultivo = culturaDto.nome_cultivo;
        cultura.temperatura_max = culturaDto.temperatura_max;
        cultura.pluviometria_max = culturaDto.pluviometria_max;
        cultura.temperatura_min = culturaDto.temperatura_min;
        cultura.pluviometria_min = culturaDto.pluviometria_min;
        cultura.lastUpdate = time;
        cultura.createdAt = time;
        cultura.deletedAt = '';
      });
    });
  } catch (error) {
    console.error('Erro ao criar cultura:', error);
  }
};

export const updateCultura = async (culturaDto: Cultura) => {
  const cultivo = await findOneCultura(culturaDto.id);
  const time = formatInTimeZone(
    new Date(),
    'America/Sao_Paulo',
    "yyyy-MM-dd'T'HH:mm:ssXXX",
  );

  await database.write(async () => {
    await cultivo.update(updateCultura => {
      (updateCultura.latitude = culturaDto.latitude),
        (updateCultura.longitude = culturaDto.longitude),
        (updateCultura.nome_cultivo = culturaDto.nome_cultivo),
        (updateCultura.temperatura_max = culturaDto.temperatura_max),
        (updateCultura.temperatura_min = culturaDto.temperatura_min),
        (updateCultura.pluviometria_max = culturaDto.pluviometria_max),
        (updateCultura.pluviometria_min = culturaDto.pluviometria_min),
        (updateCultura.lastUpdate = time)
    }).then(async resp => {
      console.log("Cultura atualizada:")
      console.log(resp)
      mySync(culturaDto.user_id)
    });
  });
};

export interface PullCultura {
  id_cultura: string; // UUID representando o identificador único da cultura
  nome_cultivo: string; // Nome do cultivo
  latitude: string; // Latitude da localização
  longitude: string; // Longitude da localização
  temperatura_max: number; // Temperatura máxima permitida
  temperatura_min: number; // Temperatura mínima permitida
  pluviometria_max: number; // Pluviometria máxima permitida
  pluviometria_min: number; // Pluviometria mínima permitida
  last_update_mongo: string; // Data e hora da última atualização no MongoDB
  created_at_mongo: string; // Data e hora da criação no MongoDB
  deleted_at_mongo: string | null; // Data e hora da exclusão no MongoDB (ou null se não foi excluído)
  user_id: string; // Identificador único do usuário
  id: number; // ID numérico único
}

export const pullUpdateCultura = async (culturasDto: PullCultura[]) => {
  culturasDto.forEach(async culturaDto => {
    const collection : Collection<CulturaModel> = await getCulturas()
  
    const cultivo = (await collection.query(Q.where("id_cultura", culturaDto.id_cultura), take(1))).slice(-1)
  
    const time = formatInTimeZone(
      new Date(),
      'America/Sao_Paulo',
      "yyyy-MM-dd'T'HH:mm:ssXXX",
    );
  
    await database.write(async () => {
      await cultivo[0].update(updateCultura => {
        (updateCultura.latitude = culturaDto.latitude),
          (updateCultura.longitude = culturaDto.longitude),
          (updateCultura.nome_cultivo = culturaDto.nome_cultivo),
          (updateCultura.temperatura_max = culturaDto.temperatura_max),
          (updateCultura.temperatura_min = culturaDto.temperatura_min),
          (updateCultura.pluviometria_max = culturaDto.pluviometria_max),
          (updateCultura.pluviometria_min = culturaDto.pluviometria_min),
          (updateCultura.lastUpdate = culturaDto.last_update_mongo)
      }).then(async resp => {
        console.log("Cultura atualizada:")
        console.log(resp)
        mySync(culturaDto.user_id)
      });
    });
  })
}

export const deleteCultura = async (id: string) => {
  const cultura = await findOneCultura(id);
  await database.write(async () => {
    await cultura.markAsDeleted();
    await cultura.destroyPermanently();
  });
  await fetch(`${BASE_URL}/cultura/${id}`, {
    method: 'DELETE',
  });
};

export async function getLastUpdate(userId: string): Promise<CulturaModel[]> {
  const cultura = await getCulturas();
  const lastUpdate = await cultura
    .query(
      Q.where("user_id", userId)
    );
  lastUpdate.sort((a, b) => new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime()).slice(-1)
  return lastUpdate;
}

// export async function getAlertasDoDia(userId : string) {
//   const notificacoes: NotificacaoType[] = [];
//   const data = new Date();
//   data.setDate(data.getDay()-1)

//   const ontem = formatInTimeZone(data, 'America/Sao_Paulo', 'yyyy-MM-dd');

//   console.log(ontem);

//   const culturas = await findAllCulturaById(userId);

//   for (const cultura of culturas) {
//     let descTemp = '';
//     let descPluvi = '';
//     if (cultura.alertasPluvi == undefined) {
//       console.log('alerta pluviometria undefined');
//     }
//     else if (cultura.alertasPluvi.length != 0){
//       const alertaPluviometria = cultura.alertasPluvi.at(-1);

//         console.log("último alerta de pluviometria: "+alertaPluviometria?.data)

//       if (alertaPluviometria?.data == ontem) {
//         if (cultura.pluviometria_max < alertaPluviometria.pluviometria) {
//           descPluvi = `A pluviometria excedeu a máxima de ${cultura.pluviometria_max}mm.`;
//         }

//         if (cultura.pluviometria_min > alertaPluviometria.pluviometria) {
//           descPluvi = `A pluviometria ficou abaixo do limite mínimo de ${cultura.pluviometria_min}mm.`;
//         }
//       }
//     }

//     if (cultura.alertasTemp == undefined) {
//       console.log('alerta temperatura undefined');
//     }
//     else if (cultura.alertasTemp.length != 0){
//       const alertaTemperatura = cultura.alertasTemp.at(-1);

//       console.log('Ultimo alerta de temperatura: ' + alertaTemperatura?.data);

//       if (alertaTemperatura?.data == ontem) {
//         if (cultura.temperatura_max < alertaTemperatura.temperatura_max) {
//           descPluvi = `A temperatura excedeu a máxima de ${cultura.temperatura_max}°C.`;
//         }

//         if (cultura.temperatura_min > alertaTemperatura.temperatura_min) {
//           descPluvi = `A temperatura ficou abaixo do limite mínimo de ${cultura.temperatura_min}°C.`;
//         }
//       }
//     }
//     if (descPluvi == '' && descTemp == '') {
//       continue;
//     } else {
//       notificacoes.push({
//         nome_cultivo: cultura.nome_cultivo,
//         descPluviometria: descPluvi,
//         descTemperatura: descTemp,
//       });
//     }
//   }

//   return notificacoes;
// }

// const findLastUpdates = async (userId: string) => {
//   const lastUpdate = await getLastUpdate(userId)
//   const lastUpdateDate = new Date(lastUpdate[0].lastUpdate)

//   const cultura = await getCulturas();
//   const allCulturas = await cultura.query(Q.where("user_id", userId))

//   const filteredCulturas = allCulturas.map(cul => new Date(cul.createdAt))
// }

export async function mySync(userId: string) {
  await synchronize({
    database,
    pullChanges: async () => {
      console.log(`${BASE_URL}/cultura/sync/${userId}/${await getTimeStamp(userId)}`);

      const response = await fetch(
        `${BASE_URL}/cultura/sync/${userId}/${await getTimeStamp(userId)}`,
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { changes, timestamp } = await response.json();

      if (!changes || !timestamp) {
        throw new Error('Invalid data returned from server');
      }

      return { changes, timestamp };
    },

    pushChanges: async ({ changes }) => {
      const lastUpdate = await getLastUpdate(userId)
      console.log("LAST UPDATE:")
      console.log(new Date(lastUpdate[0].lastUpdate))

      // console.log(moment.unix(lastPulledAt).toDate())
      const response = await axios.post(
        `${BASE_URL}/cultura/sync`,
        changes
      );

      console.log(`resposta: ${response}`);

      if (!(response.status == 200)) {
        throw new Error(await response.data);
      }
    },
    migrationsEnabledAtVersion: 1,
  });
}
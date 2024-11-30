import { synchronize } from '@nozbe/watermelondb/sync';
import { Collection, Model, Q } from '@nozbe/watermelondb';
import { Cultivo } from '../@types/culturaDto';
import { database } from '../database';
import Cultura from '../models/Cultura';
// import { BASE_URL, getTimeStamp } from '../variables';
import { BASE_URL} from '../variables';
import { formatInTimeZone } from 'date-fns-tz';
import axios from 'axios';
import { NotificacaoType } from '../@types/notificacaoDto';

export const getCulturas = async (): Promise<Collection<Cultura>> => {
  return database.get('cultura');
};

export const findOneCultura = async (id: string): Promise<Cultura> => {
  return (await getCulturas()).find(id);
};

export const findAllCulturaById = async (userId: string): Promise<Cultura[]> => {
  const cultura = await getCulturas();
  const allCulturas = await cultura.query(Q.where("user_id", userId))
  return allCulturas;
};

export const createNewCultura = async (culturaDto: Cultivo) => {
  try {
    await database.write(async () => {
      const culturaCollection = database.get<Cultura>('Cultura');
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

export const updateCultura = async (culturaDto: Cultivo, id: string) => {
  const cultivo = await findOneCultura(id);
  const time = formatInTimeZone(
    new Date(),
    'America/Sao_Paulo',
    "yyyy-MM-dd'T'HH:mm:ssXXX",
  );

  await database.write(async () => {
    await cultivo.update(updateCultura => {
      (updateCultura.latitude = culturaDto.ponto_cultivo.latitude),
        (updateCultura.longitude = culturaDto.ponto_cultivo.longitude),
        (updateCultura.nome_cultivo = culturaDto.nome_cultivo),
        (updateCultura.temperatura_max = culturaDto.temperatura_max),
        (updateCultura.temperatura_min = culturaDto.temperatura_min),
        (updateCultura.pluviometria_max = culturaDto.pluviometria_max),
        (updateCultura.pluviometria_min = culturaDto.pluviometria_min),
        (updateCultura.lastUpdate = time)
    });
  });
};

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

export async function getLastUpdate(userId: string): Promise<Cultura[]> {
  const cultura = await getCulturas();
  const lastUpdate = await cultura
    .query(
      Q.sortBy('lastUpdate', Q.desc),
      Q.take(1),
      Q.where("userId", userId)
    )
    .fetch();
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

export async function mySync(userId: string) {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      console.log(`${BASE_URL}/cultura/sync`);

      const response = await fetch(
        `${BASE_URL}/cultura/sync/${userId}`,
      );
      console.log(response);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { changes, timestamp } = await response.json();

      if (!changes || !timestamp) {
        throw new Error('Invalid data returned from server');
      }

      return { changes, timestamp };
    },

    pushChanges: async ({ changes, lastPulledAt }) => {
      const response = await axios.post(
        `${BASE_URL}/cultura/sync?${lastPulledAt}`,
        changes,
      );

      console.log(`resposta: ${response}`);

      if (!(response.status == 200)) {
        throw new Error(await response.data);
      }
    },
    migrationsEnabledAtVersion: 1,
  });
}
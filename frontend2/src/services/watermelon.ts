import {synchronize} from '@nozbe/watermelondb/sync';
import {Collection, Model, Q} from '@nozbe/watermelondb';
import {Cultivo, Pluviometria, Temperatura} from '../@types/culturaDto';
import {database} from '../database';
import CulturaModel from '../models/Cultura';
import {BASE_URL, getTimeStamp} from '../variables';
import {formatInTimeZone} from 'date-fns-tz';
import axios, {Axios} from 'axios';
import * as moment from 'moment';
import {parseISO} from 'date-fns';
import CulturasModel from '../models/Cultura';
import {NotificacaoType} from '../@types/notificacaoDto';

export const getCulturas = async (): Promise<Collection<CulturaModel>> => {
  return await database.get('Cultura');
};

export const findOneCultura = async (id: string): Promise<CulturaModel> => {
  return (await getCulturas()).find(id);
};

export const findAllCultura = async (): Promise<CulturaModel[]> => {
  const cultura = await getCulturas();
  const allCulturas = await cultura.query().fetch();
  return allCulturas;
};

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
        cultura._id = '';
        cultura.ponto_cultivo = culturaDto.ponto_cultivo;
        cultura.nome_cultivo = culturaDto.nome_cultivo;
        cultura.temperatura_max = culturaDto.temperatura_max;
        cultura.pluviometria_max = culturaDto.pluviometria_max;
        cultura.temperatura_min = culturaDto.temperatura_min;
        cultura.pluviometria_min = culturaDto.pluviometria_min;
        cultura.temperaturas = culturaDto.temperaturas;
        cultura.pluviometrias = culturaDto.pluviometrias;
        cultura.alertasTemp = culturaDto.alertasTemp;
        cultura.alertasPluvi = culturaDto.alertasPluvi;
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
      (updateCultura.ponto_cultivo = culturaDto.ponto_cultivo),
        (updateCultura.nome_cultivo = culturaDto.nome_cultivo),
        (updateCultura.temperatura_max = culturaDto.temperatura_max),
        (updateCultura.temperatura_min = culturaDto.temperatura_min),
        (updateCultura.pluviometria_max = culturaDto.pluviometria_max),
        (updateCultura.pluviometria_min = culturaDto.pluviometria_min),
        (updateCultura.pluviometrias = culturaDto.pluviometrias),
        (updateCultura.lastUpdate = time),
        (updateCultura.alertasPluvi = culturaDto.alertasPluvi),
        (updateCultura.alertasTemp = culturaDto.alertasTemp);
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

export async function getLastUpdate(): Promise<CulturaModel[]> {
  const cultura = await getCulturas();
  const lastUpdate = await cultura
    .query(Q.sortBy('lastUpdate', Q.desc), Q.take(1))
    .fetch();
  return lastUpdate;
}

export async function getAlertasDoDia() {
  const notificacoes: NotificacaoType[] = [];
  const data = new Date();
  data.setDate(data.getDay()-1)

  const ontem = formatInTimeZone(data, 'America/Sao_Paulo', 'yyyy-MM-dd');

  console.log(ontem);

  const culturas = await findAllCultura();

  for (const cultura of culturas) {
    let descTemp = '';
    let descPluvi = '';
    if (cultura.alertasPluvi == undefined) {
      console.log('alerta pluviometria undefined');
    } 
    else if (cultura.alertasPluvi.length != 0){
      const alertaPluviometria = cultura.alertasPluvi.at(-1);

        console.log("último alerta de pluviometria: "+alertaPluviometria?.data)

      if (alertaPluviometria?.data == ontem) {
        if (cultura.pluviometria_max < alertaPluviometria.pluviometria) {
          descPluvi = `A pluviometria excedeu a máxima de ${cultura.pluviometria_max}mm.`;
        }

        if (cultura.pluviometria_min > alertaPluviometria.pluviometria) {
          descPluvi = `A pluviometria ficou abaixo do limite mínimo de ${cultura.pluviometria_min}mm.`;
        }
      }
    }

    if (cultura.alertasTemp == undefined) {
      console.log('alerta temperatura undefined');
    } 
    else if (cultura.alertasTemp.length != 0){
      const alertaTemperatura = cultura.alertasTemp.at(-1);

      console.log('Ultimo alerta de temperatura: ' + alertaTemperatura?.data);

      if (alertaTemperatura?.data == ontem) {
        if (cultura.temperatura_max < alertaTemperatura.temperatura_max) {
          descPluvi = `A temperatura excedeu a máxima de ${cultura.temperatura_max}°C.`;
        }

        if (cultura.temperatura_min > alertaTemperatura.temperatura_min) {
          descPluvi = `A temperatura ficou abaixo do limite mínimo de ${cultura.temperatura_min}°C.`;
        }
      }
    }
    if (descPluvi == '' && descTemp == '') {
      continue;
    } else {
      notificacoes.push({
        nome_cultivo: cultura.nome_cultivo,
        descPluviometria: descPluvi,
        descTemperatura: descTemp,
      });
    }
  }

  return notificacoes;
}

export async function mySync() {
  await synchronize({
    database,
    pullChanges: async ({lastPulledAt}) => {
      console.log(`${BASE_URL}/cultura/sync${await getTimeStamp()}`);

      const response = await fetch(
        `${BASE_URL}/cultura/sync${await getTimeStamp()}`,
      );
      console.log(response);

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const {changes, timestamp} = await response.json();

      return {changes, timestamp};
    },

    pushChanges: async ({changes, lastPulledAt}) => {
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

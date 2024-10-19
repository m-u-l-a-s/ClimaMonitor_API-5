import { synchronize } from '@nozbe/watermelondb/sync'
import { Collection } from "@nozbe/watermelondb";
import { Cultivo, Pluviometria, Temperatura } from "../@types/culturaDto";
import { database } from "../database"
import CulturaModel from "../models/Cultura";
import { BASE_URL } from '../variables';
import { formatInTimeZone } from 'date-fns-tz';


export const getCulturas = async (): Promise<Collection<CulturaModel>> => {
    return await database.get("Cultura")
}

export const findOneCultura = async (id: string): Promise<CulturaModel> => {
    return (await getCulturas()).find(id);
}

export const findAllCultura = async (): Promise<CulturaModel[]> => {
    const cultura = await getCulturas()
    const allCulturas = await cultura.query().fetch()
    return allCulturas
}

export const createNewCultura = async (culturaDto: Cultivo) => {
    try {
        await database.write(async () => {
            const culturaCollection = database.get<CulturaModel>('Cultura');

            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1)

            await culturaCollection.create(cultura => {
                cultura._id = culturaDto._id || undefined;
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
                cultura.lastUpdate = formatInTimeZone(yesterday, 'America/Sao_Paulo', "yyyy-MM-dd'T'HH:mm:ssXXX");
            });
            console.log('Cultura criada com sucesso');
        });
    } catch (error) {
        console.error('Erro ao criar cultura:', error);
    }
}

export const updateCultura = async (culturaDto: Cultivo, id: string) => {
    const cultivo = await findOneCultura(id)

    await database.write(async () => {
        await cultivo.update(updateCultura => {
            updateCultura.ponto_cultivo = culturaDto.ponto_cultivo,
                updateCultura.nome_cultivo = culturaDto.nome_cultivo,
                updateCultura.temperatura_max = culturaDto.temperatura_max,
                updateCultura.temperatura_min = culturaDto.temperatura_min,
                updateCultura.pluviometria_max = culturaDto.pluviometria_max,
                updateCultura.pluviometria_min = culturaDto.pluviometria_min,
                updateCultura.pluviometrias = culturaDto.pluviometrias,
                updateCultura.lastUpdate = formatInTimeZone(new Date(), 'America/Sao_Paulo', "yyyy-MM-dd'T'HH:mm:ssXXX"),
                updateCultura.alertasPluvi = culturaDto.alertasPluvi,
                updateCultura.alertasTemp = culturaDto.alertasTemp
        })
    })
}

export const deleteCultura = async (id: string) => {
    const cultura = await findOneCultura(id)
    await database.write(async () => {
        await cultura.markAsDeleted();
        await cultura.destroyPermanently();
    })
}

export async function deleteAllData() {
    const culturas = await findAllCultura()
    await database.write(async () => {
        culturas.map(async cultura => {
            await cultura.markAsDeleted();
            await cultura.destroyPermanently();
        })
    })
}


export async function mySync() {
    await synchronize({
        database,
        pullChanges: async ({ lastPulledAt, schemaVersion, migration }) => {
            let urlParams
            if (lastPulledAt == null) {
                urlParams = ``
            } else {
                urlParams = `?lastPulledAt=${lastPulledAt}`
            }

            console.log(`${BASE_URL}/cultura/sync${urlParams}`)

            const response = await fetch(`${BASE_URL}/cultura/sync${urlParams}`)
            console.log(lastPulledAt)
            if (!response.ok) {
                console.log(response.url)
                console.log(`lastPulledAt: ${lastPulledAt}`)
                throw new Error(await response.text())
            }

            const { changes, timestamp } = await response.json()

            return { changes, timestamp }
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
            // const response = await fetch(`${BASE_URL}/sync`, {
            //     method: 'POST',
            //     body: JSON.stringify(changes),
            // })
            // if (!response.ok) {
            //     throw new Error(await response.text())
            // }
        },
        migrationsEnabledAtVersion: 1,
    })
}

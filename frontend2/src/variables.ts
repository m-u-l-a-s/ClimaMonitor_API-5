import {getLastUpdate} from './services/watermelon';

// Casa
export const BASE_URL = 'http://192.168.5.77:3000';
// FATEC
// export const BASE_URL = 'http://192.168.5.83:3000';
// export const BASE_URL = 'http://127.0.0.1:3000';

export const getTimeStamp = async (userId : string) => {
  const lastUpdate = await getLastUpdate(userId);

  if (lastUpdate.length == 0) {
    return ``;
  }

  const result = new Date(lastUpdate[0].lastUpdate);
  console.log('timestamp: ' + result);
  return `?lastPulledAt=${result.getTime() / 1000}`;
};

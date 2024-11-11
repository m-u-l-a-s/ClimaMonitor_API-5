import {NotificacaoType} from '../@types/notificacaoDto';
import {BASE_URL} from '../variables';

export const getAlertasDoDia = async (
  userId: string,
): Promise<NotificacaoType[]> => {
  try {
    const response = await fetch(`${BASE_URL}/cultura/alertas/${userId}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error('Erro ao buscar alertas:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    return [];
  }
};

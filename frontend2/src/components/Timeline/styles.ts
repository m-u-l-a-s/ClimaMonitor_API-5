import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  timelineContainer: {
    width: '100%',
    padding: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center', // Alinha verticalmente os itens
  },
  date: {
    fontSize: 16,
    color: '#333',
    width: '30%', // Largura para a data
  },
  dataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%', // Largura para os dados
    alignItems: 'center', // Alinha os dados no centro
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff7f50',
    marginLeft: 5, // Margem entre o ícone e o texto
  },
  pluviometryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15, // Margem para separar a pluviometria
  },
  pluviometry: {
    fontSize: 16,
    color: '#4a90e2',
    marginLeft: 5, // Margem entre o ícone e o texto
  },
});

import {StyleSheet} from 'react-native';
import {themas} from '../../global/themes';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: themas.colors.branco,
    padding: 20,
  },

  titulo: {
    alignItems: 'center',
    marginTop: 13,
    color: 'black',
  },

  texto1: {
    fontSize: 35,
    color: 'black',
  },
  texto2: {
    fontSize: 20,
    color: 'black',
  },

  cards: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 30,
  },

  pluvi: {
    marginTop: 30,
    padding: 10,
  },

  tituloPluvi: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    color: 'black',
  },

  tituloTexto: {
    color: 'black',
    fontSize: 25,
  },

  btn: {
    width: '35%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9BC3EB',
    borderColor: '#9BC3EB',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

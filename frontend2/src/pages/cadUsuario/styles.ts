import {Dimensions, StyleSheet} from 'react-native';
import {themas} from '../../global/themes';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: themas.colors.branco,
    paddingVertical: 20,
  },
  boxTop: {
    height: Dimensions.get('window').height / 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxMid: {
    width: '100%',
    paddingHorizontal: 37,
    alignItems: 'flex-start',
    marginBottom: 20, // Add spacing to avoid overlapping with footer
  },
  img: {
    height: 100,
    width: 180,
    borderRadius: 5,
    marginTop: 20,
  },
  text: {
    fontWeight: 'condensed',
    fontSize: 35,
    color: 'black',
  },
  textBottom: {
    fontSize: 18,
    color: 'black',
  },
  textoRodape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

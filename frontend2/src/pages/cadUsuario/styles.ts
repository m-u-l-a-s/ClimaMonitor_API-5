import {Dimensions, StyleSheet} from 'react-native';
import {themas} from '../../global/themes';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themas.colors.branco,
  },
  boxTop: {
    height: Dimensions.get('window').height / 3,
    width: '100%',
    //backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxMid: {
    height: Dimensions.get('window').height / 2,
    width: '100%',
    //backgroundColor:'green',
    paddingHorizontal: 37,
  },

  img: {
    height: 100,
    width: 180,
    borderRadius: 5,
    marginTop: 40,
  },

  text: {
    fontWeight: 'condensed',
    fontSize: 35,
    color: 'black',
  },

  textBottom: {
    fontSize: 18,
  },

  textoRodape: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

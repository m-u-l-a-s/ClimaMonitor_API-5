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
    // backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 25,
    marginTop: 170,
    color: 'black',
  },
  boxMid: {
    height: Dimensions.get('window').height / 1.1,
    width: '100%',
    // backgroundColor:'green',
    paddingHorizontal: 37,
  },
  text: {
    fontWeight: 'condensed',
    fontSize: 35,
    color: 'black',
  },
  containerCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

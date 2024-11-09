import {StyleSheet} from 'react-native';
import {themas} from '../../global/themes';

export const style = StyleSheet.create({
  tabArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    height: 60,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 28,
    color: '#333',
  },
  floatingButton: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    backgroundColor: '#007AFF',
    borderRadius: 35,
    padding: 10,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingIcon: {
    fontSize: 30,
    color: '#fff',
  },
  centerButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: 15,
    alignSelf: 'center',
    paddingTop: 40,
  },
});

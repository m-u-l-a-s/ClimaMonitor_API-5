import {StyleSheet} from 'react-native';

export const mapStyles = StyleSheet.create({
  container: {flex: 1},
  map: {flex: 1},
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  infoBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  infoText: {fontSize: 16, fontWeight: 'bold'},
  gpsButton: {
    position: 'absolute',
    top: 100,
    left: 60,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 30,
    elevation: 5,
    shadowOpacity: 0.3,
    shadowOffset: {width: 2, height: 2},
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gpsButtonText: {
    fontSize: 20,
    color: 'black',
  },
});

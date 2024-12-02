import {StyleSheet} from 'react-native';
import { themas } from "../../global/themes";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },

  title2: {
    fontSize: 20,
    //fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },

  cultivo: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 16,
    color: "#FF0000",
  },

  label: {
    fontSize: 18,
    marginVertical: 8,
    color: '#000',
  },

  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 8,
  
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#000',
  },

  metricsContainer: {
    marginVertical: 16,
  },

  icon: {
    fontSize: 20,
    color: '#000',
    marginRight: 8,
  },

  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },

  piker:{
    backgroundColor: themas.colors.tabs,
    borderRadius: 10,

  },

});

export default styles;

import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
    color: 'black',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: 'black',
  },
  alertsHeader: {
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
    color: 'black',
  },
  picker: {
    height: 50,
    marginBottom: 12,
  },
});

export default styles;

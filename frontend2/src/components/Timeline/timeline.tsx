import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface Temperature {
  data: string; // A data deve ser uma string no formato desejado
  temperatura_media: number; // Temperatura média
}

interface Pluviometria {
  data: string; // A data deve ser uma string no formato desejado
  pluviometria: number; // Pluviometria
}

interface TimelineProps {
  temperatures: Temperature[]; // Array de temperaturas
  pluviometries: Pluviometria[]; // Array de pluviometria
}

const Timeline: React.FC<TimelineProps> = ({temperatures, pluviometries}) => {
  return (
    <View style={styles.timelineContainer}>
      {temperatures.map((temp, index) => {
        const pluviometria = pluviometries.find(p => p.data === temp.data);

        return (
          <View key={index} style={styles.timelineItem}>
            <Text style={styles.date}>{temp.data}</Text>
            <View style={styles.dataContainer}>
              <View style={styles.temperatureContainer}>
                <Ionicons name="sunny" size={24} color="#FFB74D" />
                <Text style={styles.temperature}>
                  {temp.temperatura_media} °C
                </Text>
              </View>
              {pluviometria && (
                <View style={styles.pluviometriaContainer}>
                  <FontAwesome name="tint" size={24} color="#2196F3" />
                  <Text style={styles.pluviometria}>
                    {pluviometria.pluviometria} mm
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  timelineContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 10,
  },
  timelineItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 18,
    color: '#424242',
    fontWeight: '600',
    marginBottom: 5,
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFB74D',
    marginLeft: 8,
  },
  pluviometriaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  pluviometria: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2196F3',
    marginLeft: 8,
  },
});

export default Timeline;

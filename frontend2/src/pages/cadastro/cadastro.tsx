/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Text, TextInput, Button, Alert, ScrollView, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useAuth} from '../../context/AuthContext';
import {useCultivoContext} from '../../context/CulturaContext';
import {useNavigation} from '@react-navigation/native';
import MapScreen from '../../components/map/mapScreen';
import styles from './styles';
import {BASE_URL} from '../../variables';

const Cadastro = () => {
  const {userId} = useAuth();
  const {fetchCultivos} = useCultivoContext();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [nome_cultivo, setnome_cultivo] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [maxPluvi, setMaxPluvi] = useState('');
  const [minPluvi, setMinPluvi] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude.toString());
        setLongitude(longitude.toString());
      },
      error => {
        Alert.alert('Erro ao obter localização', error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const handleSubmit = async () => {
    if (
      !latitude ||
      !longitude ||
      !nome_cultivo ||
      !maxTemp ||
      !minTemp ||
      !maxPluvi ||
      !minPluvi
    ) {
      Alert.alert('Error', 'Favor preencher todos os campos!');
      return;
    }

    const data = {
      nome_cultivo,
      ponto_cultivo: {latitude, longitude},
      temperatura_max: parseFloat(maxTemp),
      temperatura_min: parseFloat(minTemp),
      pluviometria_max: parseFloat(maxPluvi),
      pluviometria_min: parseFloat(minPluvi),
      userId: userId || '',
    };

    try {
      const response = await fetch(`${BASE_URL}/cultura`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        await fetchCultivos(userId || '');
        navigation.navigate('Home');
      } else {
        const error = await response.json();
        Alert.alert(
          'Erro',
          error.message || 'Ocorreu um erro ao submeter o formulário.',
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Cadastro de Monitoramento</Text>
      <Text style={styles.subtitle}>Ponto de Monitoramento</Text>

      <View style={{height: 300, marginBottom: 20}}>
        <MapScreen
          latitude={parseFloat(latitude) || undefined}
          longitude={parseFloat(longitude) || undefined}
          onSelectLocation={(lat, lng) => {
            setLatitude(lat.toString());
            setLongitude(lng.toString());
          }}
        />
      </View>

      <Text style={styles.label}>Local</Text>
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={value => setLatitude(value)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={value => setLongitude(value)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tipo de Cultivo</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo de cultivo"
        value={nome_cultivo}
        onChangeText={setnome_cultivo}
      />

      <Text style={styles.label}>Temperatura Máxima</Text>
      <TextInput
        style={styles.input}
        placeholder="Temperatura máxima"
        value={maxTemp}
        onChangeText={setMaxTemp}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Temperatura Mínima</Text>
      <TextInput
        style={styles.input}
        placeholder="Temperatura mínima"
        value={minTemp}
        onChangeText={setMinTemp}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Pluviometria Máxima</Text>
      <TextInput
        style={styles.input}
        placeholder="Pluviometria máxima"
        value={maxPluvi}
        onChangeText={setMaxPluvi}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Pluviometria Mínima</Text>
      <TextInput
        style={styles.input}
        placeholder="Pluviometria mínima"
        value={minPluvi}
        onChangeText={setMinPluvi}
        keyboardType="numeric"
      />

      <Button title="Cadastrar" onPress={handleSubmit} color="#007BFF" />
    </ScrollView>
  );
};

export default Cadastro;

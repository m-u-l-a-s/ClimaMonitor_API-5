/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, TextInput, Button, Alert, ScrollView, View} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';

import {mySync} from '../../services/watermelon';

function generateRandomId(): string {
  const idLength = 16; // Comprimento desejado do ID
  return Array.from(
    {length: idLength},
    () => Math.random().toString(36).charAt(2), // Pega um caractere aleatório
  ).join('');
}

import MapScreen from '../../components/map/mapScreen';
import styles from './styles';
import {BASE_URL} from '../../variables';
import {Cultivo} from '../../@types/culturaDto';

const Cadastro = () => {
  const {userId} = useAuth();
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [nome_cultivo, setnome_cultivo] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [maxPluvi, setMaxPluvi] = useState('');
  const [minPluvi, setMinPluvi] = useState('');
  const navigation = useNavigation();

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

    const data: Cultivo = {
      id: generateRandomId(),
      nome_cultivo: nome_cultivo,
      ponto_cultivo: {latitude: latitude, longitude: longitude},
      temperatura_max: parseFloat(maxTemp),
      temperatura_min: parseFloat(minTemp),
      pluviometria_max: parseFloat(maxPluvi),
      pluviometria_min: parseFloat(minPluvi),
      userId: userId || '',
      createdAt: '',
      deletedAt: '',
    };

    try {
      const response = await fetch(`${BASE_URL}/cultura`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await response.json();
        Alert.alert('Success', 'Cadastro realizado com sucesso!');

        mySync(userId || '');
        setLatitude('');
        setLongitude('');
        setnome_cultivo('');
        setMaxTemp('');
        setMinTemp('');
        setMaxPluvi('');
        setMinPluvi('');
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

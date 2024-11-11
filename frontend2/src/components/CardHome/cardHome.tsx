import React, {forwardRef, LegacyRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInputProps,
  TextInput,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {style} from './styles';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {Cultivo} from '../../@types/culturaDto';
import {deleteCultura, mySync} from '../../services/watermelon';
import {BASE_URL} from '../../variables';
import {database} from '../../database';
//import AsyncStorage from '@react-native-async-storage/async-storage';

type IconComponent = React.ComponentType<
  React.ComponentProps<typeof MaterialIcons>
>;

type Props = {
  Icon: IconComponent;
  IconName: string;
  _id?: string;
  id: string;
  ponto_cultivo: string;
  nome_cultivo: string;
  temperatura_max: number;
  pluviometria_max: number;
  temperatura_min: number;
  pluviometria_min: number;
  temperaturas: any[];
  pluviometrias: any[];
  alertasTemp: any[];
  alertasPluvi: any[];
};

type DashboardScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Dashboard'
>;

export const CardHome = (props: Cultivo) => {
  // const { Icon, IconName, nome_cultivo, _id, temperatura_max, pluviometria_max, temperatura_min, pluviometria_min, temperaturas, pluviometrias, alertasTemp, alertasPluvi } = props

  // const navigation = useNavigation<DashboardScreenNavigationProp>();
  // console.log(JSON.stringify(temperaturas))
  // const setValues = async () => {
  //     await AsyncStorage.setItem('temperatura', temperaturas.slice(-1)[0].temperatura)
  //     await AsyncStorage.setItem('pluviometria', pluviometrias.slice(-1)[0].pluviometria)
  //     await AsyncStorage.setItem('cultura', nome_cultivo)

  // };

  // useEffect(() => {
  //     // setValues()
  // }, []);

  // const { Icon, IconName, nome_cultivo, temperaturas, pluviometrias } = props;
  const {Icon, IconName, nome_cultivo, _id, temperaturas, pluviometrias} =
    props;

  const navigation = useNavigation<DashboardScreenNavigationProp>();

  const [modalVisible, setModalVisible] = useState(false);
  // console.log(props)

  const handleDelete = async () => {
    setModalVisible(false); // Fecha o modal
    if (_id) {
      try {
        //vai deletar a cultura no backend
        await deleteCulturaBackend(_id);
        console.log('Cultura excluída do MongoDB');

        // // Vai  Deletar no WatermelonDB
        // await deleteCultura(_id);
        Alert.alert('Cultura excluída com sucesso!', nome_cultivo);
      } catch (error) {
        console.log('erro pego', error);
        if (error instanceof Error) {
          Alert.alert('Erro ao excluir cultura:', error.message);
        } else {
          Alert.alert('Erro desconhecido ao excluir cultura.');
        }
      }
    } else {
      Alert.alert('Erro: ID da cultura não encontrado.');
    }
  };

  const deleteCulturaBackend = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/cultura/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(
          `Erro ${response.status}: Cultura não encontrada ou erro no servidor.`,
        );
      }

      console.log('Cultura removida no backend com sucesso.', id);
    } catch (error) {
      console.error('Erro ao remover cultura no backend:', error);
      throw error;
    }
  };

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.containerTexto}
        onPress={() =>
          navigation.navigate('Dashboard', {
            cultura: props,
          })
        }>
        <Text style={style.text}>{nome_cultivo}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={style.icon}
        onPress={() => setModalVisible(true)}>
        <Icon name={IconName as any} size={35}></Icon>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Rota1');
              }}>
              <Text style={style.modalText}>Relárorio</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Rota2');
              }}>
              <Text style={style.modalText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={style.modalText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={style.closeButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

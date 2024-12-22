/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, View, Modal, Alert} from 'react-native';
import {style} from './styles';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {RootStackParamList} from '../../navigation/types';
import {useAuth} from '../../context/AuthContext';
import {BASE_URL} from '../../variables';

export function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const {userId} = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const response = await fetch(`${BASE_URL}/users/${userId}`);
          const data = await response.json();

          console.log(data);

          if (data) {
            setName(data.name);
          } else {
            Alert.alert(
              'Erro',
              'Não foi possível carregar os dados do usuário',
            );
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Erro', 'Erro ao carregar os dados do usuário');
        }
      }
    };

    fetchUserProfile();
  }, [userId]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={style.container}>
      <View style={style.usuario}>
        <Text style={style.texto}>Bem-vindo {name}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <TouchableOpacity>
              <Text style={style.modalText}>Logout</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={style.closeButton}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={style.notificacao}>
        <TouchableOpacity onPress={() => navigation.navigate('Notificacao')}>
          <SimpleLineIcons name="bell" style={{fontSize: 30}} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

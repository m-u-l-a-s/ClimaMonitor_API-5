import React, {useState} from 'react';
import {
  TouchableHighlightProps,
  TouchableOpacity,
  Text,
  View,
  Modal,
} from 'react-native';
import {style} from './styles';
import {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';

type Props = TouchableHighlightProps & {
  text: string;
  // navigation: NavigationProp<any>;
};

export function Header() {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={style.container}>
      <View style={style.usuario}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <SimpleLineIcons name="user" style={{fontSize: 30}} />
        </TouchableOpacity>
        <Text style={style.texto}>Bem-vindo</Text>
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

import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {BASE_URL} from '../../variables';
import Octicons from 'react-native-vector-icons/Octicons';
import InputPassword from '../../components/InputPassword/inputPassword';
import {useAuth} from '../../context/AuthContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';

type PerfilScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BottomRoutes'
>;

const UserProfile = () => {
  const navigation = useNavigation<PerfilScreenNavigationProp>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const {userId, logout} = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const response = await fetch(`${BASE_URL}/users/${userId}`);
          const data = await response.json();

          if (data.username) {
            setUsername(data.username);
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

  const handleUpdateProfile = () => {
    if (password && !confirmPassword) {
      Alert.alert('Erro', 'Por favor, confirme sua senha');
      return;
    }

    if (confirmPassword && !password) {
      Alert.alert('Erro', 'Por favor, insira sua senha');
      return;
    }

    if (password && confirmPassword && password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    const payload = {
      username: username,
      password: password ? password : undefined,
    };

    fetch(`${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message && data.user) {
          Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
        } else if (data.error) {
          Alert.alert('Erro', data.error);
        } else {
          Alert.alert('Erro', 'Erro ao atualizar o perfil');
        }
      })
      .catch(error => {
        Alert.alert('Erro', 'Erro na requisição');
        console.error(error);
      });
  };

  const handleLogout = () => {
    logout();
    Alert.alert('Sucesso', 'Você foi desconectado');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.subtitle}>Perfil</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Digite o nome de usuário"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Senha</Text>
        <InputPassword
          value={password}
          onChangeText={setPassword}
          placeholder="Digite a nova senha"
          placeholderTextColor="#888"
          IconRigthName={showPassword ? 'eye-closed' : 'eye'}
          IconRigth={Octicons}
          secureTextEntry={showPassword}
          onIconRigthPress={() => setShowPassword(!showPassword)}
        />

        <Text style={styles.label}>Confirmar Senha</Text>
        <InputPassword
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirme a nova senha"
          placeholderTextColor="#888"
          IconRigthName={showConfirmPassword ? 'eye-closed' : 'eye'}
          IconRigth={Octicons}
          secureTextEntry={showConfirmPassword}
          onIconRigthPress={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
          <Text style={styles.buttonText}>Atualizar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserProfile;

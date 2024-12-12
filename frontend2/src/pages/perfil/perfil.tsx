import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Switch,
} from 'react-native';
import {styles} from './styles';
import {BASE_URL} from '../../variables';
import Octicons from 'react-native-vector-icons/Octicons';
import InputPassword from '../../components/InputPassword/inputPassword';
import {useAuth} from '../../context/AuthContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PerfilScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BottomRoutes'
>;

const UserProfile = () => {
  const navigation = useNavigation<PerfilScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const {userId, logout} = useAuth();

  useEffect(() => {
    const fetchBiometricPreference = async () => {
      try {
        const preference = await AsyncStorage.getItem('biometricPreference');
        setBiometricEnabled(preference === 'true');
      } catch (error) {
        console.error('Erro ao carregar preferência de biometria:', error);
      }
    };

    fetchBiometricPreference();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userId) {
        try {
          const response = await fetch(`${BASE_URL}/users/${userId}`);

          const data = await response.json();

          if (data.email) {
            setEmail(data.email);
            setName(data.name);
            setLastName(data.lastName);
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

  const toggleBiometricPreference = async () => {
    try {
      const newPreference = !biometricEnabled;
      setBiometricEnabled(newPreference);
      await AsyncStorage.setItem(
        'biometricPreference',
        newPreference.toString(),
      );
      Alert.alert(
        'Sucesso',
        newPreference
          ? 'Biometria ativada com sucesso!'
          : 'Biometria desativada com sucesso!',
      );
    } catch (error) {
      console.error('Erro ao salvar preferência de biometria:', error);
      Alert.alert(
        'Erro',
        'Não foi possível atualizar a preferência de biometria',
      );
    }
  };

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
      email,
      name,
      lastName,
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
          navigation.navigate('Home');
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

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Digite seu nome"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Digite seu sobrenome"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email de usuário"
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

        <View style={styles.switchContainer}>
          <Text style={styles.label}>Ativar Biometria</Text>
          <Switch
            value={biometricEnabled}
            onValueChange={toggleBiometricPreference}
            trackColor={{false: '#cccccc', true: '#007BFF'}}
            thumbColor={biometricEnabled ? '#ffffff' : '#ffffff'}
          />
        </View>

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

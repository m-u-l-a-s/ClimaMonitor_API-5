/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {style} from './styles';
import Logo from '../../assets/logo.png';
import {InputLogin} from '../../components/InputLogin/inputLogin';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button} from '../../components/Button/button';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BASE_URL} from '../../variables';
import {useAuth} from '../../context/AuthContext';
import {RootStackParamList} from '../../navigation/types';
import RNBiometrics from 'react-native-simple-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {setUser} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [isCheckingBiometrics, setIsCheckingBiometrics] = useState(false);

  const checkBiometricLogin = async () => {
    setIsCheckingBiometrics(true);
    try {
      const canAuthenticate = await RNBiometrics.canAuthenticate();

      console.log('canAuthenticate', canAuthenticate);

      if (!canAuthenticate) return;
      const response = await fetch(`${BASE_URL}/users/check-email`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });

      const data = await response.json();

      if (data.userId) {
        const savedPreference = await AsyncStorage.getItem(
          'biometricPreference',
        );

        if (savedPreference === 'true') {
          const result = await RNBiometrics.requestBioAuth(
            'Login Biométrico',
            'Toque no sensor para autenticar.',
          );

          if (result) {
            setUser(data.userId, data.token);
            navigation.reset({routes: [{name: 'BottomRoutes'}]});
          } else {
            Alert.alert('Erro', 'Autenticação biométrica falhou.');
          }
        }
      }
    } catch (error) {
      console.error(error);

      Alert.alert('Erro', 'Houve um problema ao verificar biometria.');
    } finally {
      setIsCheckingBiometrics(false);
    }
  };

  async function getLogin() {
    try {
      if (!email || !password) {
        return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
      }

      const data = {
        email: email,
        password: password,
      };

      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.status === 200) {
        setUser(responseData.userId, responseData.token);

        const canBiometric = await RNBiometrics.canAuthenticate();

        console.log('canBiometric', canBiometric);

        if (canBiometric) {
          const savedPreference = await AsyncStorage.getItem(
            'biometricPreference',
          );

          console.log('savedPreference', savedPreference);

          if (savedPreference === null) {
            Alert.alert(
              'Ativar biometria?',
              'Deseja ativar a autenticação por biometria para facilitar futuros logins?',
              [
                {
                  text: 'Não',
                  onPress: async () => {
                    await AsyncStorage.setItem('biometricPreference', 'false');
                  },
                  style: 'cancel',
                },
                {
                  text: 'Sim',
                  onPress: async () => {
                    try {
                      await RNBiometrics.requestBioAuth(
                        'Ativar Biometria',
                        'Confirme sua identidade',
                      );
                      await AsyncStorage.setItem('biometricPreference', 'true');
                      Alert.alert('Sucesso', 'Biometria ativada com sucesso!');
                    } catch (error) {
                      Alert.alert('Erro', 'Falha ao ativar a biometria');
                    }
                  },
                },
              ],
            );
          }
        }

        navigation.reset({routes: [{name: 'BottomRoutes'}]});
      } else {
        Alert.alert(
          'Erro',
          responseData.message || 'Falha ao realizar o login',
        );
      }
    } catch (error) {
      console.error('Erro ao realizar o login:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao realizar o login. Tente novamente mais tarde.',
      );
    }
  }

  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Text style={style.text}>ClimaMonitor</Text>
        <Image source={Logo} style={style.img} resizeMode="contain" />
      </View>

      <View style={style.boxMid}>
        <InputLogin
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          title="E-mail"
          IconRigthName="email"
          IconRigth={MaterialIcons}
        />

        <InputLogin
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          title="Senha"
          IconRigthName={showPassword ? 'eye-closed' : 'eye'}
          IconRigth={Octicons}
          secureTextEntry={showPassword}
          onIconRigthPress={() => setShowPassword(!showPassword)}
          onFocus={checkBiometricLogin}
        />

        <Button text="Entrar" onPress={getLogin} />
      </View>

      <View style={style.textoRodape}>
        <Text style={style.textBottom}>Não tem um cadastro?</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('CadastroUsuario')}>
          <Text style={{color: '#007BFF', fontSize: 18}}> Clique aqui!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

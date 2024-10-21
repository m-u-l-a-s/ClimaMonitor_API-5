import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {style} from './styles';
import Logo from '../../assets/logo.png';
import {themas} from '../../global/themes';
import {InputLogin} from '../../components/InputLogin/inputLogin';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Button} from '../../components/Button/button';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {BASE_URL} from '../../variables';

export default function Login() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  async function getLogin() {
    try {
      if (!email || !password) {
        return Alert.alert('Atenção', 'Informe os campos obrigatórios!');
      }

      const data = {
        username: email,
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
      console.log('responseData', responseData);

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Login realizado com sucesso!');
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
        />

        <Button text="Entrar" onPress={getLogin}></Button>
      </View>

      <View style={style.textoRodape}>
        <Text style={style.textBottom}>Não tem um cadastro?</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('CadastroUsuario')}>
          <Text style={{color: themas.colors.btnAzul, fontSize: 18}}>
            {' '}
            Clique aqui!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

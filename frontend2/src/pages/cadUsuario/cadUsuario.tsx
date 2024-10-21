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
import {Button} from '../../components/Button/button';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {BASE_URL} from '../../variables';

export default function CadastroUsuario() {
  const navigation = useNavigation<NavigationProp<any>>();
  //const [nome, setNome] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function getCadastrar() {
    try {
      // Verifica se os campos estão preenchidos
      if (!username || !password) {
        return Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
      }

      // Cria um objeto com os dados do cadastro
      const data = {
        username: username,
        password: password,
      };

      // Faz a requisição POST para o backend
      fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.status === 201) {
            setUsername('');
            setPassword('');
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            // navigation.reset({routes: [{name: 'BottomRoutes'}]});
          } else {
            // Exibe mensagem de erro caso algo dê errado
            setUsername('');
            setPassword('');
            Alert.alert('Erro', 'Falha ao realizar o cadastro');
          }
        })
        .catch(error => {
          console.error('Erro ao cadastrar:', error);
          Alert.alert(
            'Erro',
            'Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.',
          );
        });
    } catch (error) {
      console.log(error, 'Erro ao cadastrar');
    }
  }

  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.boxTop}>
          <Text style={style.text}>Cadastre-se</Text>
          <Text style={style.text}>ClimaMonitor</Text>
          <Image source={Logo} style={style.img} resizeMode="contain" />
        </View>

        <View style={style.boxMid}>
          {/* <InputLogin value={nome} onChangeText={setNome} title="Nome" /> */}

          <InputLogin
            placeholder="Usuário"
            value={username}
            onChangeText={setUsername}
            title="E-mail"
          />

          <InputLogin
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            title="Senha"
          />

          <Button text="Cadastrar" onPress={getCadastrar}></Button>
        </View>
      </View>
    </ScrollView>
  );
}

/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Image, Alert, TouchableOpacity} from 'react-native';
import {style} from './styles';
import Logo from '../../assets/logo.png';
import {InputLogin} from '../../components/InputLogin/inputLogin';
import {Button} from '../../components/Button/button';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {BASE_URL} from '../../variables';

export default function CadastroUsuario() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');

  function getCadastrar() {
    try {
      if (!email || !name || !lastName || !password) {
        return Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
      }

      const data = {
        email,
        name,
        lastName,
        password,
      };

      fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.status === 201) {
            setEmail('');
            setName('');
            setlastName('');
            setPassword('');
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            navigation.reset({routes: [{name: 'Login'}]});
          } else {
            setEmail('');
            setName('');
            setlastName('');
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
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      keyboardShouldPersistTaps="handled">
      <View style={style.container}>
        <View style={style.boxTop}>
          <Text style={style.text}>Cadastre-se</Text>
          <Text style={style.text}>ClimaMonitor</Text>
          <Image source={Logo} style={style.img} resizeMode="contain" />
        </View>

        <View style={style.boxMid}>
          <InputLogin
            placeholder="Nome"
            value={name}
            onChangeText={setName}
            title="Nome"
          />
          <InputLogin
            placeholder="Sobrenome"
            value={lastName}
            onChangeText={setlastName}
            title="Sobrenome"
          />
          <InputLogin
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            title="E-mail"
          />
          <InputLogin
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            title="Senha"
          />
          <Button text="Cadastrar" onPress={getCadastrar} />
        </View>

        <View style={style.textoRodape}>
          <Text style={style.textBottom}>Já tem um cadastro?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#007BFF', fontSize: 18}}> Clique aqui!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

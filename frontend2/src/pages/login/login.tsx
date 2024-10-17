import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import { style } from "./styles";
import Logo from '../../assets/logo.png'
import { themas } from "../../global/themes";
import { InputLogin } from "../../components/InputLogin/inputLogin";
//import { MaterialIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import { Button } from "../../components/Button/button";
import { useNavigation, NavigationProp} from '@react-navigation/native';



export default function Login() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    function getLogin() {
        try {

            if (!email || !password) {
                return Alert.alert('Atenção', 'Informe os campos obrigatórios!')
            }

            navigation.reset({routes:[{name:"BottomRoutes"}]})
            console.log('Logado com sucesso')

        } catch (error) {
            console.log(error, 'Erro ao logar')
        }

    }

    return (
        <View style={style.container} >
            <View style={style.boxTop} >
                <Text style={style.text}>ClimaMonitor</Text>
                <Image source={Logo} style={style.img}
                    resizeMode="contain" />

            </View>

            <View style={style.boxMid}>

                <InputLogin
                    value={email}
                    onChangeText={setEmail}
                    title="E-mail"
                    IconRigthName="email"
                   // IconRigth={MaterialIcons} 
                   />

                <InputLogin
                    value={password}
                    onChangeText={setPassword}
                    title="Senha"
                    //IconRigthName={showPassword ? "eye-closed" : "eye"}
                    //IconRigth={Octicons}
                    secureTextEntry={showPassword}
                    onIconRigthPress={() => setShowPassword(!showPassword)}
                />

                <Button text="Entrar" onPress={getLogin}></Button>


            </View>





            <Text style={style.textBottom}>Não tem um cadastro? <Text style={{ color: themas.colors.btnAzul }}>Clique aqui!</Text></Text>




        </View>
    )
}
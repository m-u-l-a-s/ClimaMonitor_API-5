// src/pages/home/home.tsx
import React from "react";
import { Text, View } from 'react-native';
import { style } from "./styles";
import { Button } from "../../components/Button/button";
import { useNavigation } from '@react-navigation/native';
import { CardHome } from "../../components/CardHome/cardHome";
import { MaterialIcons } from '@expo/vector-icons';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types'; // Import your types

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
    const navigation = useNavigation<HomeScreenNavigationProp>(); //navegação tipada

    const handleNovoCadastro = () => {
        navigation.navigate('Cadastro');
    };

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Text style={style.titulo}>Pontos de Monitoramento</Text>
            </View>
            <View style={style.boxMid}>
                <View style={style.containerCard}>
                    <CardHome Icon={MaterialIcons} IconName={"more-horiz"} cultivo={"Eucalipto"} cidade={"Jambeiro-sp"} />
                </View>
            </View>
            <View style={style.boxBottom}>
                <View style={style.btn}>
                    <Button text={"Novo Cadastro"} onPress={handleNovoCadastro} />
                </View>
            </View>
        </View>
    );
}

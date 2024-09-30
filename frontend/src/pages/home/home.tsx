// src/pages/home/home.tsx
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from 'react-native';
import { style } from "./styles";
import { Button } from "../../components/Button/button";
import { useNavigation } from '@react-navigation/native';
import { CardHome } from "../../components/CardHome/cardHome";
import { MaterialIcons } from '@expo/vector-icons';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types'; // Import your types
import { CulturaDto } from '../../@types/culturaDto';
import { useCultivoContext } from "../../context/CulturaContext";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
    const navigation = useNavigation<HomeScreenNavigationProp>(); //navegação tipada
    const {cultivos, fetchCultivos} = useCultivoContext()

    const handleNovoCadastro = () => {
        navigation.navigate('Cadastro');
    };
    useEffect(() => {
        fetchCultivos()
    }, []);

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Text style={style.titulo}>Pontos de Monitoramento</Text>
            </View>
            <View style={style.boxMid}>
                <View style={style.containerCard}>

                    <FlatList
                        data={cultivos}
                        keyExtractor={(item) => item.id} // Definindo uma chave única para cada item
                        renderItem={({ item }) => (
                            <CardHome
                                Icon={MaterialIcons}
                                IconName={"more-horiz"}
                                _id={item.id}
                                nome_cultivo={item.nome_cultivo}
                                ponto_cultivo={`${item.ponto_cultivo.latitude}, ${item.ponto_cultivo.longitude}`}
                                temperatura_max={item.temperatura_max}
                                pluviometria_max={item.pluviometria_max}
                                temperatura_min={item.temperatura_min}
                                pluviometria_min={item.pluviometria_min}
                                temperaturas={item.temperaturas} // Colocar os dados reais se disponíveis
                                pluviometrias={item.pluviometrias} // Colocar os dados reais se disponíveis
                                alertasTemp={[]} // Colocar os dados reais se disponíveis
                                alertasPluvi={[]} // Colocar os dados reais se disponíveis
                            />
                        )}
                    />
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

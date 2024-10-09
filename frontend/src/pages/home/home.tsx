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
import { RootStackParamList } from '../../navigation/types';
import { Cultivo } from '../../@types/culturaDto';
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
                        renderItem={({ item , index}) => (
                            <CardHome
                                Icon={MaterialIcons}
                                IconName={"more-horiz"}
                                key={index}
                                cultura={item}
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

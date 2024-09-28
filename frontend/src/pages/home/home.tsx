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

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function Home() {
    const navigation = useNavigation<HomeScreenNavigationProp>(); //navegação tipada

    const handleNovoCadastro = () => {
        navigation.navigate('Cadastro');
    };

    const [culturas, setCulturas] = useState<CulturaDto[]>([]);

    useEffect(() => {
        fetchCulturas();
    }, []);




    const fetchCulturas = async () => {
        console.log("Chamando fetchCulturas");
        try {
            const response = await fetch("http://192.168.15.9:3000/cultura");
            if (response.ok) {
                const data: CulturaDto[] = await response.json();
                setCulturas(data);
                console.log( JSON.stringify(data));
            } else {
                console.error("Erro ao obter as culturas else:", response.statusText);
            }
        } catch (error) {
            console.error("Erro ao obter as culturas:", error);
        }
    };

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Text style={style.titulo}>Pontos de Monitoramento</Text>
            </View>
            <View style={style.boxMid}>
                <View style={style.containerCard}>

                    <FlatList
                        data={culturas}
                        keyExtractor={(item) => item._id} // Definindo uma chave única para cada item
                        renderItem={({ item }) => (
                            <CardHome
                                Icon={MaterialIcons}
                                IconName={"more-horiz"}
                                _id={item._id}
                                nome_cultivo={item.nome_cultivo}
                                ponto_cultivo={`${item.latitude}, ${item.longitude}`}
                                temperatura_max={parseFloat(item.maxTemp)}
                                pluviometria_max={parseFloat(item.maxPluvi)}
                                temperatura_min={parseFloat(item.minTemp)}
                                pluviometria_min={parseFloat(item.minPluvi)}
                                temperaturas={[]} // Colocar os dados reais se disponíveis
                                pluviometrias={[]} // Colocar os dados reais se disponíveis
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

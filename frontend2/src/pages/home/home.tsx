// src/pages/home/home.tsx
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from 'react-native';
import { style } from "./styles";
import { Button } from "../../components/Button/button";
import { useNavigation } from '@react-navigation/native';
import { CardHome } from "../../components/CardHome/cardHome";
//import { MaterialIcons } from '@expo/vector-icons';
import { CompositeNavigationProp, NavigatorScreenParams } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { Cultivo } from '../../@types/culturaDto';
import { useCultivoContext } from "../../context/CulturaContext";
import { withObservables } from "@nozbe/watermelondb/react"
import CulturaModel from "../../models/Cultura";
import { findAllCultura, mySync } from "../../services/watermelon";


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const enhance = withObservables(["Cultura"], ({ Cultura }) => ({
    Cultura
}))

const enhanceCulturas = enhance(CardHome)


export default function Home() {
    const navigation = useNavigation<HomeScreenNavigationProp>(); //navegação tipada
    // const { cultivos, fetchCultivos } = useCultivoContext()

    const [cultivos, setCulturas] = useState<CulturaModel[]>([]);

    const fetchCulturas = async () => {
        try {
            const allCulturas = await findAllCultura()
            setCulturas(allCulturas);
        } catch (error) {
            console.error('Erro ao buscar as culturas:', error);
        }
    };

    useEffect( () => {
        fetchCulturas();
    }, [cultivos]);

    const handleNovoCadastro = () => {
        navigation.navigate('Cadastro');
    };
    // useEffect(() => {
    //     fetchCultivos()
    // }, []);

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Text style={style.titulo}>Pontos de Monitoramento</Text>
            </View>
            <View style={style.boxMid}>
                <View style={style.containerCard}>

                    <FlatList
                        data={cultivos}
                        renderItem={({ item, index }) => (
                            <CardHome
                                // Icon={MaterialIcons}
                                // IconName={"more-horiz"}
                                _id={item._id}
                                key={index}
                                nome_cultivo={item.nome_cultivo}
                                lastUpdate=""
                                ponto_cultivo={item.ponto_cultivo}
                                temperatura_max={item.temperatura_max}
                                pluviometria_max={item.pluviometria_max}
                                temperatura_min={item.temperatura_min}
                                pluviometria_min={item.pluviometria_min}
                                temperaturas={item.temperaturas}
                                pluviometrias={item.pluviometrias}
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

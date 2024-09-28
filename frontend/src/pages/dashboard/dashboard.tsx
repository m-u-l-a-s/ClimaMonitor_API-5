import React, { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { CardDashbord } from "../../components/CardDashbord/cardDashbord";
import { Octicons, FontAwesome6 } from '@expo/vector-icons';
import { style } from "./styles";
import { CulturaDto } from '../../@types/culturaDto';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Dashboard() {


    const [temperatura, setTemperatura] = useState("")
    const [pluviometria, setPluviometria] = useState("")
    const [cultivo, setCultivoNome] = useState("")

    useEffect(() => {
        const getData = async () => {
            setCultivoNome(await AsyncStorage.getItem('cultura') ?? '');
            setPluviometria(await AsyncStorage.getItem('pluviometria') ?? '');
            setTemperatura(await AsyncStorage.getItem('temperatura') ?? '');
        }

            getData()
    }, []);




    return (

        <View style={style.container}>

            <View style={style.titulo}>
                <Text style={style.texto1}>{cultivo}</Text>
            </View>


            <View style={style.cards}>
                <CardDashbord
                    title1="Temperatura Hoje"
                    temperatura={temperatura}
                    IconName="sun"
                    Icon={Octicons} />



                <CardDashbord
                    title1="Chuva"
                    temperatura={pluviometria + '%'}
                    IconName="cloud-rain"
                    Icon={FontAwesome6} />

            </View>
        </View>

    )
}
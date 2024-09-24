import React from "react";
import { Text, View } from 'react-native';
import { CardDashbord } from "../../components/CardDashbord/cardDashbord";
import { Octicons, FontAwesome6 } from '@expo/vector-icons';
import { style } from "./styles";

export default function Dashboard() {
    return (

        <View style={style.container}>

            <View style={style.titulo}>
            <Text style={style.texto1}>Plantio</Text>
            <Text style={style.texto2}>Cidade</Text>
            </View>
            

            <View style={style.cards}>
                <CardDashbord
                    title1="Média Hoje"
                    temperatura="25º"
                    IconName="sun"
                    Icon={Octicons} />



                <CardDashbord
                    title1="Chuva"
                    temperatura="0%"
                    IconName="cloud-rain"
                    Icon={FontAwesome6} />

            </View>
        </View>

    )
}
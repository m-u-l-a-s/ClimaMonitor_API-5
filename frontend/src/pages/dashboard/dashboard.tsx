import React, { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import { CardDashbord } from "../../components/CardDashbord/cardDashbord";
import { Octicons, FontAwesome6 } from '@expo/vector-icons';
import { style } from "./styles";
import { RootStackParamList } from "../../navigation/types";
import { RouteProp, useRoute } from '@react-navigation/native';


type DashboardRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;


export default function Dashboard() {


    // const [temperatura, setTemperatura] = useState("")
    // const [pluviometria, setPluviometria] = useState("")
    // const [cultivo, setCultivoNome] = useState("")

    // useEffect(() => {
    //     const getData = async () => {
    //         setCultivoNome(await AsyncStorage.getItem('cultura') ?? '');
    //         setPluviometria(await AsyncStorage.getItem('pluviometria') ?? '');
    //         setTemperatura(await AsyncStorage.getItem('temperatura') ?? '');
    //     }

    //         getData()
    // }, []);


    // const route = useRoute<DashboardRouteProp>();
    // const { temperatura, pluviometria, cultura } = route.params;


    const route = useRoute<DashboardRouteProp>();
    const { temperatura, pluviometria, cultura } = route.params;

    return (

        <View style={style.container}>

            <View style={style.titulo}>
                <Text style={style.texto1}>{cultura.nome_cultivo}</Text>
            </View>


            <View style={style.cards}>
                <CardDashbord
                    _id={cultura._id}
                    key={cultura._id}
                    pluviometria={pluviometria}
                    title1="Hoje"
                    temperatura={temperatura + 'ºC'}
                    IconName="sun"
                    Icon={Octicons}
                    showTemperatura={true} />


                <CardDashbord
                    _id={cultura._id}
                    key={cultura._id}
                    title1="Chuva"
                    pluviometria={pluviometria + '%'}
                    IconName="cloud-rain"
                    Icon={FontAwesome6}
                    showTemperatura={false}
                    temperatura={temperatura}
                />

            </View>
        </View>

    )
}



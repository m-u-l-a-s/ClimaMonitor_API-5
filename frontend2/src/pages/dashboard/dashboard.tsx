import React, { } from "react";
import { Text, View } from 'react-native';
import { CardDashbord } from "../../components/CardDashbord/cardDashbord";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { style } from "./styles";
//import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const { cultura } = route.params;

    return (

        <View style={style.container}>

            <View style={style.titulo}>
                <Text style={style.texto1}>{cultura.nome_cultivo}</Text>
            </View>
            <View style={style.cards}>
                <CardDashbord
                    title1="Máxima"
                    valor={cultura.temperaturas.slice(-1)[0].temperatura_max.toString()}
                    IconName="sun"
                    Icon={Octicons}
                    showTemperatura={true} />

                <CardDashbord
                    title1="Mínima"
                    valor={cultura.temperaturas.slice(-1)[0].temperatura_min.toString()}
                    IconName="partly-sunny-outline"
                    Icon={Ionicons}
                    showTemperatura={true}
                />

            </View>

            <View style={style.cards}>
                <CardDashbord
                    title1="Temp. Média"
                    valor={cultura.temperaturas.slice(-1)[0].temperatura_media.toString()}
                    IconName="sun"
                    Icon={Octicons}
                    showTemperatura={true} />



                <CardDashbord
                    title1="Chuva"
                    valor={cultura.pluviometrias.slice(-1)[0].pluviometria.toString()}
                    IconName="cloud-rain"
                    Icon={FontAwesome6}
                    showTemperatura={false}
                />

            </View>
        </View>

    )
}



import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { CardDashbord } from "../../components/CardDashbord/cardDashbord";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { style } from "./styles";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from "../../navigation/types";
import { RouteProp, useRoute } from '@react-navigation/native';
import BarChartPluviometria from "../../components/ChartPluvi/chartPluvi";
import DateTimePicker from '@react-native-community/datetimepicker';
import { chartPluvi } from '../../@types/chartPluv';


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


    const [dataEscolhida, setDataEscolhida] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [chartData, setChartData] = useState<chartPluvi>({ labels: [], values: [] });

    const onShowDatePicker = () => {
        setShowDatePicker(true);
    };

    const dataInicial = new Date(cultura.pluviometrias[0]?.data);

    const onDateChange = (event: any, dataEscolhida: React.SetStateAction<Date>) => {
        setShowDatePicker(false);
        if (dataEscolhida) {
            setDataEscolhida(dataEscolhida);
        }
    };

    useEffect(() => {
        const filteredData = cultura.pluviometrias.filter(item => {
            const itemDate = new Date(item.data);
            return itemDate.getMonth() === dataEscolhida.getMonth() && itemDate.getFullYear() === dataEscolhida.getFullYear();
        });


        const semana = [0, 0, 0, 0];
        filteredData.forEach(item => {
            const day = new Date(item.data).getDate();
            if (day >= 1 && day <= 7) semana[0] += item.pluviometria;
            else if (day >= 8 && day <= 14) semana[1] += item.pluviometria;
            else if (day >= 15 && day <= 21) semana[2] += item.pluviometria;
            else if (day >= 22 && day <= 31) semana[3] += item.pluviometria;
        });

        const semanaFormatada = semana.map(value => parseFloat(value.toFixed(1)));

        setChartData({
            labels: ['1-7', '8-14', '15-21', '22-31'],
            values: semanaFormatada,
        });
    }, [dataEscolhida, cultura]);




    return (
        <ScrollView>
            <View style={style.container}>
                <View style={style.titulo}>
                    <Text style={style.texto1}>{cultura.nome_cultivo}</Text>
                </View>
                <View style={style.cards}>
                    <CardDashbord
                        title1="Temperatura Máx"
                        valor={cultura.temperaturas && cultura.temperaturas.length != 0 ? cultura.temperaturas.slice(-1)[0].temperatura_max.toString() : "..."}
                        IconName="sun"
                        Icon={Octicons}
                        showTemperatura={true} />

                    <CardDashbord
                        title1="Temperatura Min"
                        valor={cultura.temperaturas && cultura.temperaturas.length != 0 ? cultura.temperaturas.slice(-1)[0].temperatura_min.toString() : "..."}
                        IconName="cloud-rain"
                        Icon={FontAwesome6}
                        showTemperatura={true}
                    />

                </View>

                <View style={style.cards}>
                    <CardDashbord
                        title1="Temperatura Média"
                        valor={cultura.temperaturas && cultura.temperaturas.length != 0 ? cultura.temperaturas.slice(-1)[0].temperatura_media.toString() : "..."}
                        IconName="sun"
                        Icon={Octicons}
                        showTemperatura={true} />



                    <CardDashbord
                        title1="Chuva"
                        valor={cultura.pluviometrias && cultura.pluviometrias.length != 0 ? cultura.pluviometrias.slice(-1)[0].pluviometria.toString() : "..."}
                        IconName="cloud-rain"
                        Icon={FontAwesome6}
                        showTemperatura={false}
                    />

                </View>

                <View style={style.pluvi} >

                    <View style={style.tituloPluvi}>
                        <Text style={style.tituloTexto}>Pluviometria (mm)</Text>

                        <TouchableOpacity style={style.btn} onPress={onShowDatePicker}>
                            <Text style={style.buttonText}>Selecionar Mês</Text>
                        </TouchableOpacity>

                        {/* <Button title="Selecionar Mês" onPress={onShowDatePicker} /> */}

                        {showDatePicker && (
                            <DateTimePicker
                                value={dataEscolhida}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                                minimumDate={dataInicial}
                                maximumDate={new Date()} // Para impedir a seleção de datas futuras
                            />
                        )}
                    </View>
                    <BarChartPluviometria data={chartData} />
                </View>

            </View>

        </ScrollView>
    );


}



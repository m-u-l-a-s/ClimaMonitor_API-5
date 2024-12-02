import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardDashbord } from '../../components/CardDashbord/cardDashbord';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { style } from './styles';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import BarChartPluviometria from '../../components/ChartPluvi/chartPluvi';
import DateTimePicker from '@react-native-community/datetimepicker';
import { chartPluvi } from '../../@types/chartPluv';
import { LineChart } from 'react-native-chart-kit';
import { Pluviometria, Temperatura } from '../../@types/culturaDto';
import { findAllPluviometriasById, findAllTemperaturasById } from '../../services/watermelon';
import GraficoTemperaturas from '../../components/grafico_dashboard/GraficoTemp';
import Timeline from '../../components/Timeline/timeline';

const screenWidth = Dimensions.get('window').width;

type DashboardRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

export default function Dashboard() {
  const route = useRoute<DashboardRouteProp>();
  const { cultura } = route.params;
  const [dataInicial, setDataInicial] = useState<Date>(new Date())
  const [dataEscolhida, setDataEscolhida] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chartData, setChartData] = useState<chartPluvi>({
    labels: [],
    values: [],
  });
  const [temperaturasW, setTemperaturasW] = useState<Temperatura[]>([])
  const [PluviometriaW, setPluviometriaW] = useState<Pluviometria[]>([])


  const getData = async () => {
    const temp = await findAllTemperaturasById(cultura.id_cultura)
    const pluvi = await findAllPluviometriasById(cultura.id_cultura)
    setDataInicial(pluvi[0].data)
    setTemperaturasW(temp)
    setPluviometriaW(pluvi)
  }


  const onShowDatePicker = () => {
    setShowDatePicker(true);
  };


  const onDateChange = (
    event: any,
    dataEscolhida: React.SetStateAction<Date>,
  ) => {
    setShowDatePicker(false);
    if (dataEscolhida) {
      setDataEscolhida(dataEscolhida);
    }
  };


  useEffect(() => {
    getData()
  }, [cultura])

  // if (PluviometriaW.length != 0 && temperaturasW.length != 0) {
  //   const filteredData = PluviometriaW.filter(item => {
  //     return (
  //       item.data.getMonth() === dataEscolhida.getMonth() &&
  //       item.data.getFullYear() === dataEscolhida.getFullYear()
  //     );
  //   });

  //   const semana = [0, 0, 0, 0];
  //   filteredData.forEach(item => {
  //     const day = item.data.getDate();
  //     if (day >= 1 && day <= 7) semana[0] += item.pluviometria;
  //     else if (day >= 8 && day <= 14) semana[1] += item.pluviometria;
  //     else if (day >= 15 && day <= 21) semana[2] += item.pluviometria;
  //     else if (day >= 22 && day <= 31) semana[3] += item.pluviometria;
  //     const semanaFormatada = semana.map(value => parseFloat(value.toFixed(1)));
  //     setChartData({
  //       labels: ['1-7', '8-14', '15-21', '22-31'],
  //       values: semanaFormatada,
  //     })
  //   });

  // }

  // const validTemperaturas = temperaturasW
  //   .filter(temp => temp.data)
  //   .sort((a, b) => (a.data as any) - (b.data as any));

  // const lineChartData = {
  //   labels: validTemperaturas.map(temp =>
  //     temp.data.toLocaleDateString('pt-BR'),
  //   ),
  //   datasets: [
  //     {
  //       data: validTemperaturas.map(temp => temp.temperatura_media),
  //       color: (opacity = 1) => `rgba(0, 128, 255, ${opacity})`,  // Cor laranja
  //       strokeWidth: 3,
  //     },
  //     {
  //       data: validTemperaturas.map(() => cultura.temperatura_min),
  //       color: (opacity = 0) => `rgba(0, 255, 0, ${opacity})`,
  //       strokeWidth: 3,
  //       withDots: false,
  //     },
  //     {
  //       data: validTemperaturas.map(() => cultura.temperatura_max),
  //       color: (opacity = 0) => `rgba(255, 0, 0, ${opacity})`,
  //       strokeWidth: 3,
  //       withDots: false,
  //     },
  //   ],
  // };

  // const handleDataPointClick = (data: { index: number }) => {
  //   const index = data.index;
  //   const clickedTemperature = validTemperaturas[index]?.temperatura_media;
  //   if (clickedTemperature !== undefined) {
  //     Alert.alert(
  //       'Temperatura Média',
  //       `Temperatura: ${clickedTemperature} °C`,
  //       [{ text: 'OK' }],
  //     );
  //   }
  // };

  let tempData = []

  if (temperaturasW.length == 0) {
    tempData = [
      {
        data: new Date(2024, 10, 25),
        temperatura_media: 22,
        temperatura_max: 30,
        temperatura_min: 15,
      },
      {
        data: new Date(2024, 10, 26),
        temperatura_media: 24,
        temperatura_max: 32,
        temperatura_min: 18,
      },
      {
        data: new Date(2024, 10, 27),
        temperatura_media: 26,
        temperatura_max: 33,
        temperatura_min: 19,
      },
    ]
  } else {
    tempData = temperaturasW
  }

  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.titulo}>
          <Text style={style.texto1}>{cultura.nome_cultivo}</Text>
        </View>
        <View style={style.cards}>
          <CardDashbord
            title1="Temperatura Máx"
            valor={
              temperaturasW && temperaturasW.length != 0
                ? temperaturasW.slice(-1)[0].temperatura_max.toString()
                : '...'
            }
            IconName="sun"
            Icon={Octicons}
            showTemperatura={true}
          />

          <CardDashbord
            title1="Temperatura Min"
            valor={
              temperaturasW && temperaturasW.length != 0
                ? temperaturasW.slice(-1)[0].temperatura_min.toString()
                : '...'
            }
            IconName="cloud-rain"
            Icon={FontAwesome6}
            showTemperatura={true}
          />
        </View>

        <View style={style.cards}>
          <CardDashbord
            title1="Temperatura Média"
            valor={
              temperaturasW && temperaturasW.length != 0
                ? temperaturasW.slice(-1)[0].temperatura_media.toString()
                : '...'
            }
            IconName="sun"
            Icon={Octicons}
            showTemperatura={true}
          />

          <CardDashbord
            title1="Chuva"
            valor={
              PluviometriaW && PluviometriaW.length != 0
                ? PluviometriaW.slice(-1)[0].pluviometria.toString()
                : '...'
            }
            IconName="cloud-rain"
            Icon={FontAwesome6}
            showTemperatura={false}
          />
        </View>

        <Text style={{ fontSize: 22, color: '#333', marginVertical: 30 }}>
          Temperaturas (°C)
        </Text>

        <ScrollView horizontal={true}>
          <GraficoTemperaturas temperaturas={tempData} temperatura_max={cultura.temperatura_max} temperatura_min={cultura.temperatura_min} />
        </ScrollView>

        {/* <View style={style.pluvi}>
          <View style={style.tituloPluvi}>
            <Text style={style.tituloTexto}>Pluviometria (mm)</Text>

            <TouchableOpacity style={style.btn} onPress={onShowDatePicker}>
              <Text style={style.buttonText}>Selecionar Mês</Text>
            </TouchableOpacity>

            <Button title="Selecionar Mês" onPress={onShowDatePicker} />

            {showDatePicker && (
              <DateTimePicker
                value={dataEscolhida}
                mode="date"
                display="default"
                // onChange={(e) => onDateChange(e)}
                minimumDate={dataInicial}
                maximumDate={new Date()} // Para impedir a seleção de datas futuras
              />
            )}
          </View>
          <BarChartPluviometria data={chartData} />
        </View> */}


        {/* <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={{ fontSize: 20, marginBottom: 10, color: 'black' }}>
            Timeline - Dias Anteriores
          </Text>
          <Timeline
            temperatures={ }
            pluviometries={ }
          />
        </View> */}
      </View>
    </ScrollView>
  );
}

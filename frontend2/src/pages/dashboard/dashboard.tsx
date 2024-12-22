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
  const [dataInicial, setDataInicial] = useState<Date>(new Date());
  const [dataEscolhida, setDataEscolhida] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [chartData, setChartData] = useState<chartPluvi>({
    labels: [],
    values: [],
  });
  const [temperaturasW, setTemperaturasW] = useState<Temperatura[]>([]);
  const [PluviometriaW, setPluviometriaW] = useState<Pluviometria[]>([]);

  const getData = async () => {
    const temp = await findAllTemperaturasById(cultura.id_cultura);
    const pluvi = await findAllPluviometriasById(cultura.id_cultura);
    setDataInicial(pluvi[0]?.data || new Date());
    setTemperaturasW(temp);
    setPluviometriaW(pluvi);
  };

  const onShowDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDataEscolhida(selectedDate);
    }
  };

  const PluviometriaPorSemana = (pluviometrias : Pluviometria[]) => {
    const semana1 : number[] = []
    const semana2 : number[] = []
    const semana3 : number[] = []
    const semana4 : number[] = []
    
    if (pluviometrias.length > 0) {
      pluviometrias.forEach(item => {
        if (item.data.getDate() <= 7) {
          semana1.push(item.pluviometria)
        }
        if (item.data.getDate() <= 14 && item.data.getDate() > 7 ) {
          semana2.push(item.pluviometria)
        }
        if (item.data.getDate() <= 21 && item.data.getDate() > 14) {
          semana3.push(item.pluviometria)
        }
        if (item.data.getDate() > 21) {
          semana4.push(item.pluviometria)
        }
      })
      const semanas = [semana1, semana2, semana3, semana4]

      const medias = semanas.map(semana => {
        const soma = semana.reduce((acc, value) => acc + value, 0);
        return semana.length > 0 ? soma  : 0; // Média ou 0 se não houver dados
      });

      return medias;
    }

    return [0,0,0,0]
  }

  useEffect(() => {
    getData();
  }, [cultura]);

  useEffect(() => {
    if (PluviometriaW.length !== 0 && temperaturasW.length !== 0) {
      const filteredData = PluviometriaW.filter(item => {
        return (
          item.data.getMonth() === dataEscolhida.getMonth() &&
          item.data.getFullYear() === dataEscolhida.getFullYear()
        );
      });


      const chartValues : number[] = PluviometriaPorSemana(filteredData);

      setChartData({
        labels: ["semana 1","semana 2","semana 3", "semana 4"],
        values: chartValues,
      });
    }
  }, [PluviometriaW, temperaturasW, dataEscolhida]);

  let tempData = [
    {
      data: new Date(),
      temperatura_media: 0,
      temperatura_max: 0,
      temperatura_min: 0,
    },
  ];

  if (temperaturasW.length !== 0) {
    tempData = temperaturasW;
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
              temperaturasW && temperaturasW.length !== 0
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
              temperaturasW && temperaturasW.length !== 0
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
              temperaturasW && temperaturasW.length !== 0
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
              PluviometriaW && PluviometriaW.length !== 0
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
          <GraficoTemperaturas
            temperaturas={tempData}
            temperatura_max={cultura.temperatura_max}
            temperatura_min={cultura.temperatura_min}
          />
        </ScrollView>

        <ScrollView style={style.pluvi}>
          <View style={style.tituloPluvi}>
            <Text style={style.tituloTexto}>Pluviometria Por Semana (mm)</Text>

            <Button title="Selecionar Mês" onPress={onShowDatePicker} />

            {showDatePicker && (
              <DateTimePicker
                value={dataEscolhida}
                onChange={onDateChange}
                mode="date"
                display="default"
                minimumDate={dataInicial}
                maximumDate={new Date()} // Para impedir a seleção de datas futuras
              />
            )}
          </View>
          <BarChartPluviometria data={chartData} />
        </ScrollView>
      </View>
    </ScrollView>
  );
}

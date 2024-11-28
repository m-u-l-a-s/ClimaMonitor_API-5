import React, { useState, useEffect } from 'react';
import { Text, ScrollView, Alert, View, ActivityIndicator } from 'react-native';
import { BASE_URL } from '../../variables';
import { RouteProp, useRoute } from '@react-navigation/native';
import styles from './styles';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Picker } from '@react-native-picker/picker';
import { Temperatura, Pluviometria } from '../../@types/culturaDto'

type RelatorioRouteParams = {
  cultura: {
    _id: string;
    nome_cultivo: string;
    temperaturas: Temperatura[];
    pluviometrias: { data: string; pluviometria: number }[];
    temperatura_max: number;
    temperatura_min: number;
    pluviometria_max: number;
    pluviometria_min: number;
    alertasTemp: number;
    alertasPluvi: number;
    createdAt: string;
    deletedAt?: string;
  };
};


const Relatorio = () => {
  // const route = useRoute<RouteProp<{ params: RelatorioRouteParams }, 'params'>>();
  // const {cultura} = route.params;

  // const [nome_cultivo, setNomeCultivo] = useState("");

  // // Função para buscar os dados do cultivo
  // const fetchCultivo = async () => {
  //   try {
  //     const response = await fetch(`${BASE_URL}/cultura/${cultura}`);
  //     if (!response.ok) {
  //       const errorText = await response.text();
  //       throw new Error(`Erro ${response.status}: ${errorText}`);
  //     }
  //     const data = await response.json();
  //     setNomeCultivo(data.nome_cultivo || 'Cultivo sem nome');
  //   } catch (error) {
  //     console.error('Erro ao buscar cultivo:', error);
  //     Alert.alert('Erro', `Não foi possível carregar os dados do cultivo: ${(error as Error).message}`);
  //   }
  // };

  // // Fetch inicial
  // useEffect(() => {
  //   if (cultura) {
  //     console.log(cultura)
  //     fetchCultivo();
  //   }
  // }, [cultura]);


  const route = useRoute<RouteProp<{ params: RelatorioRouteParams }, 'params'>>();
  const { cultura } = route.params;

  const {
    nome_cultivo,
    temperaturas,
    pluviometrias,
    temperatura_max,
    temperatura_min,
    pluviometria_max,
    pluviometria_min,
    alertasTemp,
    alertasPluvi,
  } = cultura;

  //console.log('Dados do cultivo:', cultura);

  //PARA MÉDIA DE TEMPERATURA

  const [anoSelecionado, setAnoSelecionado] = useState<string>('2024'); //vou usar o msm para os outros cálculos
  const [mesSelecionado, setMesSelecionado] = useState<string>('01'); //vou usar o msm para os outros cálculos
  const [mediaTemp, setMediaTemp] = useState<number | null>(null);

  const calculaMediaTemp = (ano: number, mes: string) => {
    const mesAno = `${ano}-${mes}`;
    let somaTemperaturas = 0;
    let quantidadeTemperaturas = 0;
  
   
    for (const temp of cultura.temperaturas) {
      if (temp.data.startsWith(mesAno)) {
        somaTemperaturas += temp.temperatura_media; 
        quantidadeTemperaturas++; 
      }
    }
  
    
    if (quantidadeTemperaturas === 0) {
      setMediaTemp(null); 
    } else {
      const media = somaTemperaturas / quantidadeTemperaturas; 
      setMediaTemp(media); 
    }
  }; 


  //PARA MÉDIA DA PLUVIOMETRIA

  const [mediaPluvi, setMediaPluvi] = useState<number | null>(null);

  const calculaMediaPluvi = (ano: number, mes: string) => {
    const mesAno = `${ano}-${mes}`;
    let somaPluviometria = 0;
    let quantidadePluviometria = 0;
  
    
    for (const pluvi of cultura.pluviometrias) {
      if (pluvi.data.startsWith(mesAno)) { 
        somaPluviometria += pluvi.pluviometria;
        quantidadePluviometria++;
      }
    }
  
    if (quantidadePluviometria === 0) {
      setMediaPluvi(null); 
    } else {
      const media = somaPluviometria / quantidadePluviometria; 
      setMediaPluvi(media); 
    }
  };
  
//PARA CONTAGEM DE DIAS ACIMA DA TEMPERATURA MAX

const [diasAcimaTemMax, setDiasAcimaTemMax] = useState<number>(0);

const contarDiasAcimaTempMax = (ano: number, mes: string) => {
  const mesAno = `${ano}-${mes}`;
  let contador = 0;

  for (const temp of cultura.temperaturas) {
    if (temp.data.startsWith(mesAno) && temp.temperatura_max > cultura.temperatura_max) {
      contador++;
    }
  }

  
  setDiasAcimaTemMax(contador);
};


//PARA CONTAGEM DE DIAS ABAIXO DA TEMPERATURA MIN

const [diasAbaixoTempMin, setDiasAbaixoTempMin] = useState<number>(0);


const contarDiasAbaixoTempMin = (ano: number, mes: string) => {
  const mesAno = `${ano}-${mes}`;
  let contador = 0;

  for (const temp of cultura.temperaturas) {
    
    if (temp.data.startsWith(mesAno) && temp.temperatura_min < cultura.temperatura_min) {
      contador++;
    }
  }

  
  setDiasAbaixoTempMin(contador);
};


//PARA CONTAGEM DE DIAS ACIMA DA PLUVIOMETRIA MAX

const [diasAcimaPluviMax, setDiasAcimaPluviMax] = useState<number>(0);

const contarDiasAcimaPluviMax = (ano: number, mes: string) => {
  const mesAno = `${ano}-${mes}`;
  let contador = 0;

  for (const pluvi of cultura.pluviometrias) {
    if (pluvi.data.startsWith(mesAno) && pluvi.pluviometria > cultura.pluviometria_max) {
      contador++;
    }
  }

  setDiasAcimaPluviMax(contador);
};

//PARA CONTAGEM DE DIAS ACIMA DA PLUVIOMETRIA Min

const [diasAbaixoPluviMin, setDiasAbaixoPluviMin] = useState<number>(0);


const contarDiasAbaixoPluviMin = (ano: number, mes: string) => {
  const mesAno = `${ano}-${mes}`;
  let contador = 0;

  for (const pluvi of cultura.pluviometrias) {
    if (pluvi.data.startsWith(mesAno) && pluvi.pluviometria < cultura.pluviometria_min) {
      contador++;
    }
  }
  setDiasAbaixoPluviMin(contador);
};




const handleAnoChange = (ano: string) => {
  setAnoSelecionado(ano);
  const anoNumerico = parseInt(ano, 10); 
  
 
  calculaMediaTemp(anoNumerico, mesSelecionado);
  calculaMediaPluvi(anoNumerico, mesSelecionado);
  contarDiasAcimaTempMax(anoNumerico, mesSelecionado);
  contarDiasAbaixoTempMin(anoNumerico, mesSelecionado);
  contarDiasAcimaPluviMax(anoNumerico, mesSelecionado);
  contarDiasAbaixoPluviMin(anoNumerico, mesSelecionado);
};


const handleMes = (mes: string) => {
  setMesSelecionado(mes); 
  const mesAno = `${anoSelecionado}-${mes}`; 

  const anoNumerico = parseInt(anoSelecionado, 10);

  
  calculaMediaTemp(anoNumerico, mes);
  calculaMediaPluvi(anoNumerico, mes);
  contarDiasAcimaTempMax(anoNumerico, mes);
  contarDiasAbaixoTempMin(anoNumerico, mes);
  contarDiasAcimaPluviMax(anoNumerico, mes);
  contarDiasAbaixoPluviMin(anoNumerico, mes);
};


useEffect(() => {
  const mesPadrao = '01';
  setAnoSelecionado('2024'); 
  setMesSelecionado(mesPadrao);

  setMediaTemp(null);
  setMediaPluvi(null);
  setDiasAcimaTemMax(0);
  setDiasAbaixoTempMin(0);
  setDiasAcimaPluviMax(0);
  setDiasAbaixoPluviMin(0);
}, [cultura]);
 

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Relatório Mensal</Text>
      <Text style={styles.title2}>{nome_cultivo || 'Cultivo sem nome'}</Text>


      <Text style={styles.label}>Ano</Text>
      <Picker
        style={styles.piker}
        selectedValue={anoSelecionado}
        onValueChange={handleAnoChange}
      >
        <Picker.Item label="2024" value="2024" />
        <Picker.Item label="2025" value="2025" />
        {/* <Picker.Item label="2026" value="2026" /> */}
      </Picker>

      <Text style={styles.label}>Mês</Text>
      <Picker style={styles.piker}
       selectedValue={mesSelecionado}
       onValueChange={handleMes}
      >
        <Picker.Item label="Janeiro" value="01" />
        <Picker.Item label="Fevereiro" value="02" />
        <Picker.Item label="Março" value="03" />
        <Picker.Item label="Abril" value="04" />
        <Picker.Item label="Maio" value="05" />
        <Picker.Item label="Junho" value="06" />
        <Picker.Item label="Julho" value="07" />
        <Picker.Item label="Agosto" value="08" />
        <Picker.Item label="Setembro" value="09" />
        <Picker.Item label="Outubro" value="10" />
        <Picker.Item label="Novembro" value="11" />
        <Picker.Item label="Dezembro" value="12" />
      </Picker>

      <View style={styles.row1}>
        <Text style={styles.label}>Temperatura Média:</Text>
        <Text style={styles.value}>{mediaTemp !== null ? `${mediaTemp.toFixed(2)} ºC` : 'Sem dados'}</Text>
      </View>

      <View style={styles.row1}>
        <Text style={styles.label}>Pluviometria Média:</Text>
        <Text style={styles.value}>{mediaPluvi !== null ? `${mediaPluvi.toFixed(2)} mm` : 'Sem dados'}</Text>
      </View>

      <Text style={styles.sectionTitle}>MÉTRICAS EM DIAS</Text>

      <View style={styles.metricsContainer}>
        <View style={styles.row2}>
          <FontAwesome6 name="temperature-empty" style={styles.icon} />
          <Text style={styles.label}>Temperatura</Text>
        </View>

        <View style={styles.row1}>
          <Text style={styles.label}>Excedeu a máxima:</Text>
          <Text style={styles.value}> {diasAcimaTemMax > 0 ? `${diasAcimaTemMax} dias` : 'Nenhum dia'}</Text>
        </View>

        <View style={styles.row1}>
          <Text style={styles.label}>Abaixo da mínima:</Text>
          <Text style={styles.value}>{diasAbaixoTempMin > 0 ? `${diasAbaixoTempMin} dias` : 'Nenhum dia'}</Text>
        </View>

        <View style={styles.row2}>
          <Fontisto name="rain" style={styles.icon} />
          <Text style={styles.label}>Pluviometria</Text>
        </View>

        <View style={styles.row1}>
          <Text style={styles.label}>Excedeu a máxima:</Text>
          <Text style={styles.value}>{diasAcimaPluviMax > 0 ? `${diasAcimaPluviMax} dias` : 'Nenhum dia'}</Text>
        </View>

        <View style={styles.row1}>
          <Text style={styles.label}>Abaixo da mínima:</Text>
          <Text style={styles.value}>{diasAbaixoPluviMin > 0 ? `${diasAbaixoPluviMin} dias` : 'Nenhum dia'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Relatorio;

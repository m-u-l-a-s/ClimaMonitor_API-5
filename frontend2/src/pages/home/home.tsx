/* eslint-disable react-native/no-inline-styles */
// src/pages/home/home.tsx
import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {style} from './styles';
import {CardHome} from '../../components/CardHome/cardHome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useCultivoContext} from '../../context/CulturaContext';
import SyncComponent from '../../components/syncComponent/syncComponent';
import {useAuth} from '../../context/AuthContext';
import  CulturasModel  from '../../models/Cultura';
import { findAllCulturaById, mySync } from '../../services/watermelon';

// const enhance = withObservables(['Cultura'], ({Cultura}) => ({
//   Cultura,
// }));

// const enhanceCulturas = enhance(CardHome);

export default function Home() {
  const {userId} = useAuth();
  const [culturas, setCulturas] = useState<CulturasModel[]>([]) 
  // const {cultivos, fetchCultivos} = useCultivoContext();

  useEffect(() => {
    if (userId) {
      console.log("Chegou aqui")
      findAllCulturaById(userId).then(resp => {
        console.log("Chegou aqui 2")
      })
      // fetchCultivos(userId);
    }
  }, [culturas]);

  return (
    <View style={style.container}>
      <SyncComponent />
      <View style={style.boxTop}>
        <Text style={style.titulo}>Pontos de Monitoramento</Text>
      </View>
      <View style={style.boxMid}>
        <View style={style.containerCard}>
          {culturas.length ? (
            <FlatList
              data={culturas}
              renderItem={({item, index}) => (
                <CardHome
                  Icon={MaterialIcons}
                  IconName={'more-horiz'}
                  nome_cultivo={item.nome_cultivo}
                  id={item.id}
                  key={index}
                  // deletedAt={item.deletedAt}
                  // _id={item._id}
                  // key={index}
                  // nome_cultivo={item.nome_cultivo}
                  // lastUpdate=""
                  // ponto_cultivo={{latitude: item.latitude, longitude: item.longitude}}
                  // temperatura_max={item.temperatura_max}
                  // pluviometria_max={item.pluviometria_max}
                  // temperatura_min={item.temperatura_min}
                  // pluviometria_min={item.pluviometria_min}
                  // temperaturas={[]}
                  // pluviometrias={[]}
                  // alertasTemp={[]}
                  // alertasPluvi={[]}
                />
              )}
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text>Nenhum cultivo disponível no momento.</Text>
            </View>
          )}
        </View>
      </View>
      <View style={style.boxBottom}>
        <View style={style.btn}>
          {/* <Button text={"Novo Cadastro"} onPress={handleNovoCadastro} /> */}
        </View>
      </View>
    </View>
  );
}

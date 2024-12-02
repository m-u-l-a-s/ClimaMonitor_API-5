/* eslint-disable react-native/no-inline-styles */
// src/pages/home/home.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { style } from './styles';
import EnhancedCardHome from '../../components/CardHome/cardHome';
import { useAuth } from '../../context/AuthContext';
import CulturasModel from '../../models/Cultura';
import { findAllCulturaById } from '../../services/watermelon';
import { withObservables } from '@nozbe/watermelondb/react'
import SyncComponent from '../../components/syncComponent/syncComponent';



export default function Home() {
  const { userId } = useAuth();
  const [culturas, setCulturas] = useState<CulturasModel[]>([])
  const [contador, setContador] = useState<number>(0)
  // const {cultivos, fetchCultivos} = useCultivoContext();

  const fetchCulturas = async (id: string) => {
    try {
      const allCulturas = await findAllCulturaById(id)
      setCulturas(allCulturas);
    } catch (error) {
      console.error('Erro ao buscar as culturas:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchCulturas(userId);
    }
    const numContador = contador+1
    console.log("rodada: "+ numContador)
    setContador(numContador)
  }, []);


  return (
    <View style={style.container}>
      <SyncComponent/>
      <View style={style.boxTop}>
        <Text style={style.titulo}>Pontos de Monitoramento</Text>
      </View>
      <View style={style.boxMid}>
        <View style={style.containerCard}>
          <FlatList
            data={culturas}
            renderItem={({ item, index }) => (
              <EnhancedCardHome
                key={index}
                cultura={item}
              />
            )}
          />
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


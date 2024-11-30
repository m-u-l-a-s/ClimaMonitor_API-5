/* eslint-disable react-native/no-inline-styles */
// src/pages/home/home.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { style } from './styles';
import { CardHome } from '../../components/CardHome/cardHome';
import { useAuth } from '../../context/AuthContext';
import CulturasModel from '../../models/Cultura';
import { findAllCulturaById } from '../../services/watermelon';
import { withObservables } from '@nozbe/watermelondb/react'

const enhance = withObservables(['cultura'], ({ cultura }) => ({
  cultura
}));

const enhanceCulturas = enhance(CardHome);

export default function Home() {
  const { userId } = useAuth();
  const [culturas, setCulturas] = useState<CulturasModel[]>([])
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
  }, [culturas]);


  return (
    <View style={style.container}>
      <View style={style.boxTop}>
        <Text style={style.titulo}>Pontos de Monitoramento</Text>
      </View>
      <View style={style.boxMid}>
        <View style={style.containerCard}>
          <FlatList
            data={culturas}
            renderItem={({ item, index }) => (
              <CardHome
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


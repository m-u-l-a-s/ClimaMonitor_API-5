/* eslint-disable react-native/no-inline-styles */
// src/pages/home/home.tsx
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { style } from './styles';
import EnhancedCardHome from '../../components/CardHome/cardHome';
import { useAuth } from '../../context/AuthContext';
import { withObservables } from '@nozbe/watermelondb/react';
import SyncComponent from '../../components/syncComponent/syncComponent';
import { Q } from '@nozbe/watermelondb';
import CulturasModel from '../../models/Cultura';
import { database } from '../../database';

function Home({ culturas }: { culturas: CulturasModel[] }) {
  return (
    <View style={style.container}>

      <View style={style.boxTop}>
        <Text style={style.titulo}>Pontos de Monitoramento</Text>
        <SyncComponent />
      </View>
      <View style={style.boxMid}>
        <View style={style.containerCard}>
          <FlatList
            data={culturas}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => (
              <EnhancedCardHome key={index} cultura={item} />
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

const enhance = withObservables(['userId'], ({ userId }: { userId: string }) => ({
  culturas: database
    .get<CulturasModel>('cultura')
    .query(Q.where('user_id', userId))
    .observe(),
}));

export default function HomeWrapper() {
  const { userId } = useAuth();

  if (!userId) {
    return (
      <View style={style.container}>
        <Text style={style.titulo}>Carregando...</Text>
      </View>
    );
  }

  const EnhancedHome = enhance(Home);
  return <EnhancedHome userId={userId} />;
}

// src/pages/home/home.tsx
import React, {useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {style} from './styles';
import {CardHome} from '../../components/CardHome/cardHome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {useCultivoContext} from '../../context/CulturaContext';
import SyncComponent from '../../components/syncComponent/syncComponent';
import {useAuth} from '../../context/AuthContext';

// const enhance = withObservables(['Cultura'], ({Cultura}) => ({
//   Cultura,
// }));

// const enhanceCulturas = enhance(CardHome);

export default function Home() {
  const {userId} = useAuth();
  const {cultivos, fetchCultivos} = useCultivoContext();

  useEffect(() => {
    if (userId) {
      fetchCultivos(userId);
    }
  }, [userId, fetchCultivos]);

  return (
    <View style={style.container}>
      <SyncComponent />
      <View style={style.boxTop}>
        <Text style={style.titulo}>Pontos de Monitoramento</Text>
      </View>
      <View style={style.boxMid}>
        <View style={style.containerCard}>
          <FlatList
            data={cultivos}
            renderItem={({item, index}) => (
              <CardHome
                Icon={MaterialIcons}
                IconName={'more-horiz'}
                createdAt={item.createdAt}
                deletedAt={item.deletedAt}
                _id={item._id}
                key={index}
                nome_cultivo={item.nome_cultivo}
                lastUpdate=""
                ponto_cultivo={item.ponto_cultivo}
                temperatura_max={item.temperatura_max}
                pluviometria_max={item.pluviometria_max}
                temperatura_min={item.temperatura_min}
                pluviometria_min={item.pluviometria_min}
                temperaturas={item.temperaturas}
                pluviometrias={item.pluviometrias}
                alertasTemp={item.alertasTemp} // Colocar os dados reais se disponíveis
                alertasPluvi={item.alertasPluvi} // Colocar os dados reais se disponíveis
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

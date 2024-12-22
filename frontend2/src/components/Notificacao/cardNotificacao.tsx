import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {style} from './styles';
import {NotificacaoType} from '../../@types/notificacaoDto';

export const CardNotificacao = (props: NotificacaoType) => {
  const {nome_cultivo, descTemperatura, descPluviometria} = props;

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.containerTexto}>
        <Text style={style.text}>{nome_cultivo}</Text>
        {descTemperatura !== '' && <Text>{descTemperatura}</Text>}
        {descPluviometria !== '' && <Text>{descPluviometria}</Text>}
      </TouchableOpacity>
    </View>
  );
};

import React, { forwardRef, LegacyRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInputProps, TextInput, Alert } from 'react-native';
import { style } from './styles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Cultivo, PontoCultivo } from '../../@types/culturaDto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NotificacaoType } from '../../@types/notificacaoDto';

//import AsyncStorage from '@react-native-async-storage/async-storage';

type IconComponent = React.ComponentType<React.ComponentProps<typeof AntDesign>>


// type Props = {
//     _id?: string,
//     id: string,
//     nome_cultivo: string,
//     texto_alertas: string,
//     alertasTemp: any[],
//     alertasPluvi: any[],
//     ponto_cultivo?: string
// }


export const CardNotificacao = (props: NotificacaoType) => {
    // const { _id, id, nome_cultivo, texto_alertas, alertasTemp, alertasPluvi, ponto_cultivo} = props;

    const { nome_cultivo, descTemperatura, descPluviometria } = props


    const [modalVisible, setModalVisible] = useState(false);

    
    return (

        <View style={style.container}>
            <TouchableOpacity style={style.containerTexto}>

                <Text style={style.text}>{nome_cultivo}</Text>
                {descTemperatura != "" && (
                <Text >{descTemperatura}</Text>
                )}
                {descPluviometria != "" && (
                <Text >{descPluviometria}</Text>
                )}

            </TouchableOpacity>

            <TouchableOpacity style={style.icon} onPress={() => setModalVisible(true)}>
                <AntDesign name='closesquareo' size={35} ></AntDesign>
            </TouchableOpacity>

        </View>

    )
}
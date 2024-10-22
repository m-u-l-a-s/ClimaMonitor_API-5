import React, { forwardRef, LegacyRef } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { style } from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  Octicons from 'react-native-vector-icons/Octicons';
import  FontAwesome from 'react-native-vector-icons/FontAwesome';
import { themas } from '../../global/themes';
import { Cultivo } from '../../@types/culturaDto';

type IconComponent = React.ComponentType<React.ComponentProps<typeof Ionicons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;


    type Props = {
        Icon: IconComponent,
        IconName: string,
        title1: string,
        valor: string
        showTemperatura: boolean;
    }

export const CardDashbord = (props: Props) => {

    //const { Icon, IconName, nome_cultivo,title1, _id, temperatura_max, pluviometria_max, temperatura_min, pluviometria_min, temperaturas, pluviometrias, alertasTemp, alertasPluvi, showTemperatura } = props
    const {Icon, IconName, title1, valor, showTemperatura } = props


    return (
        <>

            <View style={style.boxInput}>
                <Text style={style.title}>{title1}</Text>


                <Text style={style.temp}>
                {showTemperatura ? `${valor} ºC` : `${valor} mm`}
                </Text>

                <Icon name={IconName as any} size={35} ></Icon>


            </View>
        </>
    );
}

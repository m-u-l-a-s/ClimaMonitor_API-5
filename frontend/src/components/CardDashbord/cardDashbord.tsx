import React, { forwardRef, LegacyRef } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { style } from './styles';
import { MaterialIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import { themas } from '../../global/themes';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;


    type Props = {
        Icon: IconComponent,
        IconName: string,
        _id: string,
        ponto_cultivo: string,
        nome_cultivo: string,
        temperatura_max: number,
        pluviometria_max: number,
        temperatura_min: number,
        pluviometria_min: number,
        temperaturas: any[],
        pluviometrias: any[],
        alertasTemp: any[],
        alertasPluvi: any[],
    }

export const CardDashbord = (props: Props) => {

    const { Icon, IconName, nome_cultivo, _id, temperatura_max, pluviometria_max, temperatura_min, pluviometria_min, temperaturas, pluviometrias, alertasTemp, alertasPluvi } = props


    return (
        <>

            <View style={style.boxInput}>
                <Text style={style.title}>{nome_cultivo}</Text>


                <Text style={style.temp}>
                    {temperaturas} 
                </Text>

                <Icon name={IconName as any} size={35} ></Icon>


            </View>
        </>
    );
}

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
        title1: string,
        _id: string | undefined,
        temperatura?: string,
        pluviometria?:string,
        showTemperatura: boolean;
    }

export const CardDashbord = (props: Props) => {

    const { Icon, IconName,title1,temperatura, pluviometria, showTemperatura } = props


    return (
        <>

            <View style={style.boxInput}>
                <Text style={style.title}>{title1}</Text>


                <Text style={style.temp}>
                {showTemperatura ? temperatura : pluviometria}
                </Text>

                <Icon name={IconName as any} size={35} ></Icon>


            </View>
        </>
    );
}

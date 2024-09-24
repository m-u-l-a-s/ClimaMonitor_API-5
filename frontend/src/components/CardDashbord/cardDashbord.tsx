import React, { forwardRef, LegacyRef } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { style } from './styles';
import { MaterialIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import { themas } from '../../global/themes';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;


type Props = TextInputProps & {
    Icon: IconComponent,
    IconName: string,
    title1: string,
    temperatura: string,
}

export const CardDashbord = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {

    const { title1, Icon, IconName, temperatura, ...rest } = Props


    return (
        <>

            <View style={style.boxInput}>
                <Text style={style.title}>{title1}</Text>

                <Text style={style.temp}>
                    {temperatura}
                </Text>

                <Icon name={IconName as any} size={35} ></Icon>


            </View>
        </>
    )
})

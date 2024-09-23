import React, { forwardRef, LegacyRef } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { style } from './styles';
import { MaterialIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import { themas } from '../../global/themes';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;


type Props = TextInputProps & {
    IconRigth?: IconComponent,
    IconRigthName?: string,
    title?: string,
    onIconRigthPress?: () => void,
}

export const InputLogin = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {

    const { title, IconRigth, IconRigthName, onIconRigthPress, ...rest } = Props


    return (
        <>
            <Text style={style.titleInput}>{title}</Text>
            <View style={style.boxInput}>

                <TextInput
                    style={style.input}
                    {...rest}
                />


                {IconRigth && (
                    <TouchableOpacity onPress={onIconRigthPress} style={style.button}>
                        <IconRigth name={IconRigthName as any} size={20} color={themas.colors.branco} style={style.icon}></IconRigth>
                    </TouchableOpacity>

                )}

            </View>
        </>
    )
})

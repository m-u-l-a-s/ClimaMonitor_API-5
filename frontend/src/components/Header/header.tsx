import React from "react";
import { TouchableHighlightProps, TouchableOpacity, Text, View } from 'react-native';
import { style } from "./styles";
import { SimpleLineIcons} from '@expo/vector-icons';

type Props = TouchableHighlightProps & {
    text: string;
}


export function Header() {
    return (

        <View style={style.container}>
            <View style={style.usuario}>
                <TouchableOpacity>
                    <SimpleLineIcons name="user" style={{ fontSize: 30 }} />
                </TouchableOpacity>
                <Text style={style.texto} >Bem-vindo</Text>
            </View>

            <View style={style.notificacao}>
                <TouchableOpacity>
                    <SimpleLineIcons name="bell" style={{ fontSize: 30 }} />
                </TouchableOpacity>

            </View>


        </View>

    )
}
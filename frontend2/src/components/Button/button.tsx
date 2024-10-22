import React from "react";
import { TouchableHighlightProps, TouchableOpacity, Text } from 'react-native';
import { style } from "./styles";

type Props = TouchableHighlightProps & {
    text: string;
}


export function Button({...rest}:Props){
    return(

        <TouchableOpacity style={style.button} 
        {...rest}
        activeOpacity={0.6}>

            <Text style={style.textButton}>{rest.text}</Text>

        </TouchableOpacity>

    )
}

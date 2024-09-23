import React from "react";
import {Text, View} from 'react-native';
import { style} from "./styles";
import { Button } from "../../components/Button/button";
import { useNavigation, NavigationProp} from '@react-navigation/native';
import ItemComponent from "../../components/CardHome/cardHome";


export default function Home(){

    const exampleItem = {
        id: '1',
        leftText: 'Item teste',
        rightText: 'Details',
    };


    return(

        <View style={style.container}>

            <View style={style.boxTop} >
            <Text style={style.text}>Pontos de Monitoramento</Text>
            <ItemComponent item={exampleItem} onPress={function (): void {
                    throw new Error("Function not implemented.");
                } }/>
            </View>

            <View style={style.boxMid} >

                <Button text={"Novo Cadastro"}/>

            </View>



        </View>

        
    )
}
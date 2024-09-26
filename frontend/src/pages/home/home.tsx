
import React from "react";
import { Text, View } from 'react-native';
import { style } from "./styles";
import { Button } from "../../components/Button/button";
import { useNavigation } from '@react-navigation/native';
import { CardHome } from "../../components/CardHome/cardHome";
import { MaterialIcons } from '@expo/vector-icons';


export default function Home() {
    const navigation = useNavigation();


    const handleNovoCadastro = () => {
                 navigation.navigate('Cadastro');
             };


    return (


        <View style={style.container}>

            <View style={style.boxTop} >


                <Text style={style.titulo}>Pontos de Monitoramento</Text>



            </View>

            <View style={style.boxMid} >

                <View style={style.containerCard}>

                    <CardHome Icon={MaterialIcons} IconName={"more-horiz"} cultivo={"Eucalipto"} cidade={"Jambeiro-sp"} />

                </View>

            </View>




            <View style={style.boxBottom}>

                <View style={style.btn} >

                <Button text={"Novo Cadastro"} onPress={handleNovoCadastro} />

                </View>

            </View>





        </View>

    )
}
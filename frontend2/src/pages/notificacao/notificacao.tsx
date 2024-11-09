// src/pages/home/home.tsx
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from 'react-native';
import { style } from "./styles";
import { CardNotificacao } from "../../components/Notificacao/cardNotificacao";
import { NotificacaoType } from "../../@types/notificacaoDto";
import { getAlertasDoDia } from "../../services/watermelon";


export default function Notificacao() {
    const [notificacoes, setNotificacoes] = useState<NotificacaoType[]>()
    const [alerta, setAlerta] = useState([]);

    useEffect(() => {
        getAlertasDoDia().then(resp => {
            setNotificacoes(resp)
            console.log(resp)
        })
    }, [])

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Text style={style.titulo}>Notificação</Text>
            </View>
            <View style={style.boxMid}>
                <FlatList
                data={notificacoes}
                renderItem={ ({item ,index}) => (
                    <CardNotificacao descPluviometria={item.descPluviometria} descTemperatura={item.descTemperatura} nome_cultivo={item.nome_cultivo} key={index} />
                )}/>

                {/* <View style={style.containerCard}> */}
                {/* <CardNotificacao id={""} nome_cultivo={""} texto_alertas={""} alertasTemp={[]} alertasPluvi={[]} /> */}

                    {/* <FlatList
                        // data={alerta}
                        renderItem={({ item, index }) => (
                            <CardNotificacao id={""} nome_cultivo={""} texto_alertas={""} alertasTemp={[]} alertasPluvi={[]} />
                        )}
                    /> */}
                {/* </View> */}
            </View>
        </View>
    );
}

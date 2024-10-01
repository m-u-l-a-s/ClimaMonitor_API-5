import React, { forwardRef, LegacyRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInputProps, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';
import { style } from './styles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';



type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;


type Props = {
    Icon: IconComponent,
    IconName: string,
    _id?: string,
    ponto_cultivo: string,
    nome_cultivo: string,
    temperatura_max: number,
    pluviometria_max: number,
    temperatura_min: number,
    pluviometria_min: number,
    temperaturas: any[],
    pluviometrias: any[],
    alertasTemp: any[],
    alertasPluvi: any[]
    
}


type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export const CardHome = (props: Props) => {

    // const { Icon, IconName, nome_cultivo, _id, temperatura_max, pluviometria_max, temperatura_min, pluviometria_min, temperaturas, pluviometrias, alertasTemp, alertasPluvi } = props

    // const navigation = useNavigation<DashboardScreenNavigationProp>();
    // console.log(JSON.stringify(temperaturas))
    // const setValues = async () => {
    //     await AsyncStorage.setItem('temperatura', temperaturas.slice(-1)[0].temperatura)
    //     await AsyncStorage.setItem('pluviometria', pluviometrias.slice(-1)[0].pluviometria)
    //     await AsyncStorage.setItem('cultura', nome_cultivo)

    // };



    // useEffect(() => {
    //     // setValues()
    // }, []);


    const { Icon, IconName, nome_cultivo, temperaturas, pluviometrias } = props;
    const navigation = useNavigation<DashboardScreenNavigationProp>();

    const [modalVisible, setModalVisible] = useState(false);
    // console.log(props)


    return (

        <View style={style.container}>
            <TouchableOpacity style={style.containerTexto} onPress={() => navigation.navigate("Dashboard", {
                  temperatura: temperaturas.slice(-1)[0].temperatura,
                  pluviometria: pluviometrias.slice(-1)[0].pluviometria,
                  cultura: nome_cultivo
                  
            } )}>

                <Text style={style.text}>{nome_cultivo}</Text>

            </TouchableOpacity>

            <TouchableOpacity style={style.icon} onPress={() => setModalVisible(true)}>
                <Icon name={IconName as any} size={35} ></Icon>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={style.modalOverlay}>
                    <View style={style.modalContent}>
                        <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Rota1'); }}>
                            <Text style={style.modalText}>Relárorio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Rota2'); }}>
                            <Text style={style.modalText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Excluir'); }}>
                            <Text style={style.modalText}>Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={style.closeButton}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>

    )
}
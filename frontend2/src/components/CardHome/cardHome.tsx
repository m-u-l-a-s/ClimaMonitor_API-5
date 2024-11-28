// src/components/CardHome.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { style } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { BASE_URL } from '../../variables';
//import { deleteCultura } from '../../services/watermelon';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>>;

type Props = {
    Icon: IconComponent,
    IconName: string,
    _id: string, // MongoDB ID for the cultivo
    nome_cultivo: string,
    // other props you need here
};

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export const CardHome = (props: Props) => {
    const { Icon, IconName, nome_cultivo, _id } = props;
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = async () => {
        setModalVisible(false); // Fecha o modal
        if (_id) {
            try {
            //     //vai deletar a cultura no backend
            //     await deleteCulturaBackend(id); 
            // console.log("Cultura excluída do MongoDB");

            // Vai  Deletar no WatermelonDB
            await deleteCulturaBackend(_id); 
            Alert.alert("Cultura excluída com sucesso!");
            } catch (error) {
                console.log("erro pego", error);
                if (error instanceof Error) {
                    Alert.alert("Erro ao excluir cultura:", error.message);
                } else {
                    Alert.alert("Erro desconhecido ao excluir cultura.");
                }
            }
        } else {
            Alert.alert("Erro: ID da cultura não encontrado.");
        }
    };

    const deleteCulturaBackend = async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/cultura/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: Cultura não encontrada ou erro no servidor.`);
            }
            
            console.log("Cultura removida no backend com sucesso.", id);
        } catch (error) {
            console.error("Erro ao remover cultura no backend:", error);
            throw error; 
        }
    };

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.containerTexto} onPress={() => navigation.navigate("Dashboard", { cultura: props })}>
                <Text style={style.text}>{nome_cultivo}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.icon} onPress={() => setModalVisible(true)}>
                <Icon name={IconName as any} size={35} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={style.modalOverlay}>
                    <View style={style.modalContent}>
                        <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Relatorio', { cultura: props}); }}>
                            <Text style={style.modalText}>Relatório</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { 
                            setModalVisible(false); 
                            navigation.navigate('EditarCultivo', { cultivoId: props });
                        }}>
                            <Text style={style.modalText}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleDelete}>
                            <Text style={style.modalText}>Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={style.closeButton}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

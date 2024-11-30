// src/components/CardHome.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { style } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { deleteCultura } from '../../services/watermelon';
import CulturasModel from '../../models/Cultura';
import Icon from 'react-native-vector-icons/MaterialIcons';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>>;



type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
interface Props {
    cultura: CulturasModel
}


export const CardHome = ({ cultura }: Props) => {
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = async () => {
        setModalVisible(false);
        try {
            await deleteCultura(cultura.id_cultura);
            Alert.alert("Cultura excluída com sucesso!", cultura.id_cultura);
        } catch (error) {
            console.error("Erro ao excluir cultura:", error);
            Alert.alert("Erro ao excluir cultura.");
        }
    };

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.containerTexto} onPress={() => navigation.navigate("Dashboard", { cultura: cultura })}>
                <Text style={style.text}>{cultura.nome_cultivo}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.icon} onPress={() => setModalVisible(true)}>
                <MaterialIcons name={"more-horiz" as any} size={35} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={style.modalOverlay}>
                    <View style={style.modalContent}>
                        {/* <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Rota1'); }}>
                            <Text style={style.modalText}>Relatório</Text>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={() => { 
                            setModalVisible(false); 
                            navigation.navigate('EditarCultivo', { cultivoId: cultura.id });
                        }}>
                            <Text style={style.modalText}>Editar</Text>
                        </TouchableOpacity> */}
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

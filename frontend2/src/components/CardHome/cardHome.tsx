// src/components/CardHome.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { style } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { deleteCultura } from '../../services/watermelon';

type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>>;

type Props = {
    Icon: IconComponent,
    IconName: string,
    id: string, // MongoDB ID for the cultivo
    nome_cultivo: string,
    // other props you need here
};

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

export const CardHome = (props: Props) => {
    const { Icon, IconName, nome_cultivo, id } = props;
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = async () => {
        setModalVisible(false);
        try {
            await deleteCultura(id);
            Alert.alert("Cultura excluída com sucesso!", id);
        } catch (error) {
            console.error("Erro ao excluir cultura:", error);
            Alert.alert("Erro ao excluir cultura.");
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
                        <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Rota1'); }}>
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

// src/components/CardHome.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { style } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/types';
import { deleteCultura, findAllPluviometriasById, findAllTemperaturasById } from '../../services/watermelon';
import CulturasModel from '../../models/Cultura';
import { withObservables } from '@nozbe/watermelondb/react'


type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>>;


type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
type EditarCulturaScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditarCultura'>;
type RelatorioScreenNavigationProp = StackNavigationProp<RootStackParamList, "Relatorio">;
interface Props {
    cultura: CulturasModel,
}

const CardHome = ({ cultura }: Props) => {
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const navigationRelatorio = useNavigation<RelatorioScreenNavigationProp>();
    const navigationEditar = useNavigation<EditarCulturaScreenNavigationProp>()
    const [modalVisible, setModalVisible] = useState(false);

    const handleDelete = async () => {
        setModalVisible(false); // Fecha o modal
        if (cultura.id_cultura) {
            try {
                await deleteCultura(cultura.id);
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

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.containerTexto} onPress={async () => navigation.navigate("Dashboard", { cultura: cultura })}>
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
                        {/* <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Rota1'); }}> */}
                        <TouchableOpacity onPress={() => { setModalVisible(false); navigationRelatorio.navigate("Relatorio", { cultura: cultura }); }}>
                            <Text style={style.modalText}>Relatório</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={async () => {
                            setModalVisible(false);
                            navigationEditar.navigate("EditarCultura", { cultura: cultura });
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

const enhance = withObservables(['cultura'], ({ cultura }) => ({
    cultura
}))

const EnhancedCardHome = enhance(CardHome)
export default EnhancedCardHome
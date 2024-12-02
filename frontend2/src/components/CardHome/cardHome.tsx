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
import { Pluviometria, Temperatura } from '../../@types/culturaDto';


type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>>;



type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
interface Props {
    cultura: CulturasModel,
    temperaturas: Temperatura,
    pluviometria: Pluviometria
}


const CardHome = ({ cultura }: Props) => {
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

const enhance = withObservables(['cultura'], ({ cultura }) => ({
    cultura
  }))
  
  const EnhancedCardHome = enhance(CardHome)
  export default EnhancedCardHome

// const enhance = withObservables(['cultura'], ({ cultura }) => ({
//     cultura
//   }));
  
// const enhacedCardHome = enhance(CardHome);

// export default enhacedCardHome
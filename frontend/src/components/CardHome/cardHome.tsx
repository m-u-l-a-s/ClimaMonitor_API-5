import React, { forwardRef, LegacyRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, TextInputProps, TextInput } from 'react-native';
import { MaterialIcons, FontAwesome, Octicons } from '@expo/vector-icons';
import { style } from './styles';
import { useNavigation } from '@react-navigation/native';


type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>> |
    React.ComponentType<React.ComponentProps<typeof FontAwesome>> |
    React.ComponentType<React.ComponentProps<typeof Octicons>>;


type Props = TextInputProps & {
    Icon: IconComponent,
    IconName: string,
    cultivo: string,
    cidade: string,
}

export const CardHome = forwardRef((Props: Props, ref: LegacyRef<TextInput> | null) => {

    const { Icon, IconName, cultivo, cidade, ...rest } = Props

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);


    return (

        <View style={style.container}>
            <TouchableOpacity style={style.containerTexto} onPress={() => navigation.navigate("Dashboard")}>
                
                    <Text style={style.text}>{cultivo}</Text>
                
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
                        <TouchableOpacity onPress={() => { setModalVisible(false); navigation.navigate('Rota3'); }}>
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
})
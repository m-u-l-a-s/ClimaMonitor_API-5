// ItemComponent.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface MenuOption {
    label: string;
    action: () => void;
}

interface Item {
    id: string;
    leftText: string;
    rightText: string;
}

interface ItemComponentProps {
    item: Item;
    onPress: () => void;
}

const ItemComponent: React.FC<ItemComponentProps> = ({ item, onPress }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const menuOptions: MenuOption[] = [
        { label: 'Edit', action: () => alert('Edit pressed') },
        { label: 'Reports', action: () => alert('Reports pressed') },
        { label: 'Delete', action: () => alert('Delete pressed') },
    ];

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.touchable} onPress={onPress}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.leftText}</Text>
                    <Text style={styles.text}>{item.rightText}</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialIcons name="more-horiz" size={24} color="black" />
                </TouchableOpacity>
            </TouchableOpacity>

            {/* Modal for menu options */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <FlatList
                            data={menuOptions}
                            keyExtractor={(option) => option.label}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => {
                                        item.action();
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text>{item.label}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#f9c2ff',
        overflow: 'hidden',
        elevation: 3,
    },
    touchable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    text: {
        fontSize: 18,
        flex: 1,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'flex-start',
    },
    option: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    closeButton: {
        marginTop: 20,
        color: 'blue',
    },
});

export default ItemComponent;

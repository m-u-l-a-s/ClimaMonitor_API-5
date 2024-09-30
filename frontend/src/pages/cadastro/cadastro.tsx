// src/pages/cadastro/Cadastro.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";
import { Cultivo } from '../../@types/culturaDto2';
import { BASE_URL } from "../../variables";
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from "../../navigation/types";
import { useNavigation } from '@react-navigation/native';


type CadastroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cadastro'>;


const Cadastro = () => {
    const navigation = useNavigation<CadastroScreenNavigationProp>(); //navegação tipada
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [nome_cultivo, setnome_cultivo] = useState("");
    const [maxTemp, setMaxTemp] = useState("");
    const [minTemp, setMinTemp] = useState("");
    const [maxPluvi, setMaxPluvi] = useState("");
    const [minPluvi, setMinPluvi] = useState("");

    const handleSubmit = async () => {
        if (!latitude || !longitude || !nome_cultivo || !maxTemp || !minTemp || !maxPluvi || !minPluvi) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }

    
        const data: Cultivo = {
           nome_cultivo: nome_cultivo,
           ponto_cultivo: {latitude:latitude, longitude:longitude},
           temperatura_max: parseFloat(maxTemp),
           temperatura_min: parseFloat(minTemp),
           pluviometria_max:parseFloat(maxPluvi),
           pluviometria_min:parseFloat(minPluvi),
           pluviometrias:[],
           temperaturas:[],
           alertasPluvi:[],
           alertasTemp:[],
           lastUpdate: ""
        };
    
        console.log('dados enviados:', JSON.stringify(data));
        try {

            const response = await fetch(`${BASE_URL}/cultura`, {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
               
            });
    
            if (response.ok) {
                const result = await response.json();
                Alert.alert("Success", `Cadastro submitted for point at Latitude: ${result.latitude}, Longitude: ${result.longitude}`);                
            } else {
                const error = await response.json();
                console.log('else: ', response)
                console.error('Error response:', error); // Log the error response
                Alert.alert("Error", error.message || "Failed to submit the form");
            }
        } catch (error) {
            console.error('Fetch error:', error); // Log the error
            Alert.alert("Error", "Alguém me da uma cartela de diazepam PELO AMOR DE DEUS");
        }
    };
    
    return (
        <ScrollView 
            contentContainerStyle={styles.container} // Use contentContainerStyle here
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.title}>Cadastro de Monitoramento</Text>
            <Text style={styles.subtitle}>Ponto de Monitoramento</Text>
            
            <Text style={styles.label}>Local</Text>
            <TextInput
                style={styles.input}
                placeholder="Latitude"
                value={latitude}
                onChangeText={setLatitude}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Longitude"
                value={longitude}
                onChangeText={setLongitude}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Tipo de Cultivo</Text>
            <TextInput
                style={styles.input}
                placeholder="Tipo de cultivo"
                value={nome_cultivo}
                onChangeText={setnome_cultivo}
            />

            <Text style={styles.alertsHeader}>Alertas</Text>
            
            <Text style={styles.label}>Frequência de Análise de Temperatura</Text>
            <Text style={styles.label}>Diariamente</Text>
            {/* <Picker
                selectedValue={tempFrequency}
                style={styles.picker}
                onValueChange={(itemValue) => setTempFrequency(itemValue)}
            >
                <Picker.Item label="Diariamente" value="diariamente" />
                <Picker.Item label="Semanalmente" value="semanalmente" />
            </Picker> */}

            <Text style={styles.label}>Temperatura Máxima</Text>
            <TextInput
                style={styles.input}
                placeholder="Temperatura máxima"
                value={maxTemp}
                onChangeText={setMaxTemp}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Temperatura Mínima</Text>
            <TextInput
                style={styles.input}
                placeholder="Temperatura mínima"
                value={minTemp}
                onChangeText={setMinTemp}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Frequência de Análise de Pluviometria</Text>
            <Text style={styles.label}>Diariamente</Text>
            {/* <Picker
                selectedValue={pluviFrequency}
                style={styles.picker}
                onValueChange={(itemValue) => setPluviFrequency(itemValue)}
            >
                <Picker.Item label="Diariamente" value="diariamente" />
                <Picker.Item label="Semanalmente" value="semanalmente" />
            </Picker> */}

            <Text style={styles.label}>Pluviometria Máxima (mm)</Text>
            <TextInput
                style={styles.input}
                placeholder="Pluviometria máxima"
                value={maxPluvi}
                onChangeText={setMaxPluvi}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Pluviometria Mínima (mm)</Text>
            <TextInput
                style={styles.input}
                placeholder="Pluviometria mínima"
                value={minPluvi}
                onChangeText={setMinPluvi}
                keyboardType="numeric"
            />

            <Button title="Cadastrar" onPress={handleSubmit} color="#007BFF" />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 16,
        backgroundColor: "#ffffff"
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 12,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    alertsHeader: {
        fontSize: 20,
        marginVertical: 20,
        textAlign: "center",
    },
    picker: {
        height: 50,
        marginBottom: 12,
    },
});

export default Cadastro;
function formatInTimeZone(dataUpdate: Date, arg1: string, arg2: string): string {
    throw new Error("Function not implemented.");
}


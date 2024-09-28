// src/pages/cadastro/Cadastro.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { CulturaDto } from '../../@types/culturaDto';

const Cadastro = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [cultivoType, setCultivoType] = useState("");
    const [tempFrequency, setTempFrequency] = useState("diariamente");
    const [maxTemp, setMaxTemp] = useState("");
    const [minTemp, setMinTemp] = useState("");
    const [pluviFrequency, setPluviFrequency] = useState("");
    const [maxPluvi, setMaxPluvi] = useState("");
    const [minPluvi, setMinPluvi] = useState("");

    const handleSubmit = async () => {
        if (!latitude || !longitude || !cultivoType || !maxTemp || !minTemp || !maxPluvi || !minPluvi) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
    
        const data: CulturaDto = {
            latitude,
            longitude,
            cultivoType,
            tempFrequency,
            maxTemp,
            minTemp,
            pluviFrequency,
            maxPluvi,
            minPluvi,
        };
    
        try {
            const response = await fetch('http://192.168.56.1:3000/cultura', {
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
                value={cultivoType}
                onChangeText={setCultivoType}
            />

            <Text style={styles.alertsHeader}>Alertas</Text>
            
            <Text style={styles.label}>Frequência de Análise de Temperatura</Text>
            <Picker
                selectedValue={tempFrequency}
                style={styles.picker}
                onValueChange={(itemValue) => setTempFrequency(itemValue)}
            >
                <Picker.Item label="Diariamente" value="diariamente" />
                <Picker.Item label="Semanalmente" value="semanalmente" />
            </Picker>

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
            <Picker
                selectedValue={pluviFrequency}
                style={styles.picker}
                onValueChange={(itemValue) => setPluviFrequency(itemValue)}
            >
                <Picker.Item label="Diariamente" value="diariamente" />
                <Picker.Item label="Semanalmente" value="semanalmente" />
            </Picker>

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

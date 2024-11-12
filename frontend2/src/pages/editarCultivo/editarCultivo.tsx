// src/pages/editar/EditarCultivo.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, Button, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import styles from '../cadastro/styles';
import { BASE_URL } from '../../variables';

const EditarCultivo = () => {
    const route = useRoute();
    const navigation = useNavigation();  // Initialize the navigation hook
    const cultivo = route.params?.cultivoId; // Now 'cultivoId' contains the entire props object

    // Check if the cultivo object has an id (log for debugging)
    console.log("Cultivo object received:", cultivo);

    // Initialize state based on the passed data
    const [latitude, setLatitude] = useState(cultivo?.ponto_cultivo.latitude?.toString() || "");
    const [longitude, setLongitude] = useState(cultivo?.ponto_cultivo.longitude?.toString() || "");
    const [nome_cultivo, setNomeCultivo] = useState(cultivo?.nome_cultivo || "");
    const [maxTemp, setMaxTemp] = useState(cultivo?.temperatura_max?.toString() || "");
    const [minTemp, setMinTemp] = useState(cultivo?.temperatura_min?.toString() || "");
    const [maxPluvi, setMaxPluvi] = useState(cultivo?.pluviometria_max?.toString() || "");
    const [minPluvi, setMinPluvi] = useState(cultivo?.pluviometria_min?.toString() || "");

    useEffect(() => {
        if (cultivo) {
            setLatitude(cultivo.ponto_cultivo.latitude?.toString() || "");
            setLongitude(cultivo.ponto_cultivo.longitude?.toString() || "");
            setNomeCultivo(cultivo.nome_cultivo);
            setMaxTemp(cultivo.temperatura_max?.toString() || "");
            setMinTemp(cultivo.temperatura_min?.toString() || "");
            setMaxPluvi(cultivo.pluviometria_max?.toString() || "");
            setMinPluvi(cultivo.pluviometria_min?.toString() || "");
        }
    }, [cultivo]); // Only run this effect if the 'cultivo' object changes

    const handleUpdate = async () => {
        if (!latitude || !longitude || !nome_cultivo || !maxTemp || !minTemp || !maxPluvi || !minPluvi) {
            Alert.alert("Erro", "Favor preencher todos os campos!");
            return;
        }

        const updatedData = {
            nome_cultivo,
            ponto_cultivo: { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
            temperatura_max: parseFloat(maxTemp),
            temperatura_min: parseFloat(minTemp),
            pluviometria_max: parseFloat(maxPluvi),
            pluviometria_min: parseFloat(minPluvi),
            pluviometrias: cultivo.pluviometrias,
            temperaturas: cultivo.temperaturas,
            alertasPluvi: cultivo.alertasPluv,
            alertasTemp: cultivo.alertasTemp,
            createdAt: cultivo.createdAt,  // Ensure createdAt and deletedAt are correct
            deletedAt: cultivo.deletedAt,
            lastUpdate: new Date().toISOString()
        };

        // Debug: check the id being used
        console.log("Updating cultivo with ID:", cultivo._id); // Ensure '_id' is correct here

        try {
            // Adjust the API URL to match the expected format
            const response = await fetch(`${BASE_URL}/cultura/${cultivo._id}/`, { // Notice the trailing slash
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                const errorDetails = await response.json(); // Get detailed error response
                throw new Error(`Erro ao atualizar a cultura: ${errorDetails.message || 'Erro desconhecido'}`);
            }

            Alert.alert("Sucesso", "Cultura atualizada com sucesso!");

            navigation.navigate('Home');

        } catch (error) {
            Alert.alert("Erro", `Erro ao atualizar a cultura: ${error.message}`);
            console.error(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.title}>Editar Monitoramento</Text>
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
                onChangeText={setNomeCultivo}
            />

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

            <Button title="Atualizar" onPress={handleUpdate} color="#007BFF" />
        </ScrollView>
    );
};

export default EditarCultivo;

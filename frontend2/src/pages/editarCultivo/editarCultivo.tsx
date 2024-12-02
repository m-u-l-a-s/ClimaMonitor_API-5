// src/pages/editar/EditarCultivo.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, Button, Alert } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native"; // Import useNavigation hook
import styles from '../cadastro/styles';
import CulturasModel, { Cultura } from "../../models/Cultura";
import { RootStackParamList } from "../../navigation/types";
import { updateCultura } from "../../services/watermelon";


type EditarCulturaRouteProps = RouteProp<RootStackParamList, "EditarCultura">;
type HomeRouteProps = RouteProp<RootStackParamList, "Home">;

const EditarCultivo = () => {
    const route = useRoute<EditarCulturaRouteProps>();
    const navigation = useNavigation<HomeRouteProps>();
    const cultura: CulturasModel = route.params?.cultura;
    // Initialize state based on the passed data
    const [latitude, setLatitude] = useState(cultura.latitude?.toString() || "");
    const [longitude, setLongitude] = useState(cultura.longitude?.toString() || "");
    const [nome_cultivo, setNomeCultivo] = useState(cultura.nome_cultivo || "");
    const [maxTemp, setMaxTemp] = useState(cultura.temperatura_max?.toString() || "");
    const [minTemp, setMinTemp] = useState(cultura.temperatura_min?.toString() || "");
    const [maxPluvi, setMaxPluvi] = useState(cultura.pluviometria_max?.toString() || "");
    const [minPluvi, setMinPluvi] = useState(cultura.pluviometria_min?.toString() || "");

    useEffect(() => {
        if (cultura) {
            setLatitude(cultura.latitude?.toString() || "");
            setLongitude(cultura.longitude?.toString() || "");
            setNomeCultivo(cultura.nome_cultivo);
            setMaxTemp(cultura.temperatura_max?.toString() || "");
            setMinTemp(cultura.temperatura_min?.toString() || "");
            setMaxPluvi(cultura.pluviometria_max?.toString() || "");
            setMinPluvi(cultura.pluviometria_min?.toString() || "");
        }
    }, [cultura]); // Only run this effect if the 'cultivo' object changes

    const handleUpdate = async () => {
        if (!latitude || !longitude || !nome_cultivo || !maxTemp || !minTemp || !maxPluvi || !minPluvi) {
            Alert.alert("Erro", "Favor preencher todos os campos!");
            return;
        }

        const culturaUpdate: Cultura = {
            nome_cultivo: nome_cultivo,
            latitude: latitude,
            longitude: longitude,
            temperatura_max: parseFloat(maxTemp),
            temperatura_min: parseFloat(minTemp),
            pluviometria_max: parseFloat(maxPluvi),
            pluviometria_min: parseFloat(minPluvi),
            id_cultura: cultura.id_cultura,
            id: cultura.id,
            user_id: cultura.userId
        }

        await updateCultura(culturaUpdate)
        // Debug: check the id being used
        console.log("Updating cultivo with ID:", cultura.id_cultura); // Ensure '_id' is correct here
        navigation.navigate("Home")
        // try {
        //     // Adjust the API URL to match the expected format
        //     const response = await fetch(`${BASE_URL}/cultura/${cultura.id_cultura}/`, { // Notice the trailing slash
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(updatedData),
        //     });

        //     if (!response.ok) {
        //         const errorDetails = await response.json(); // Get detailed error response
        //         throw new Error(`Erro ao atualizar a cultura: ${errorDetails.message || 'Erro desconhecido'}`);
        //     }

        //     Alert.alert("Sucesso", "Cultura atualizada com sucesso!");

        //     navigation.navigate("Home");

        // } catch (error) {
        //     Alert.alert("Erro", `Erro ao atualizar a cultura: ${error}`);
        //     console.error(error);
        // }
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

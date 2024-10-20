// src/pages/cadastro/Cadastro.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import { Cultivo } from '../../@types/culturaDto';
import { BASE_URL } from "../../variables";
import { useCultivoContext } from "../../context/CulturaContext";
import styles from './styles';

const Cadastro = () => {
    const { fetchCultivos } = useCultivoContext();
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [nome_cultivo, setnome_cultivo] = useState("");
    const [maxTemp, setMaxTemp] = useState("");
    const [minTemp, setMinTemp] = useState("");
    const [maxPluvi, setMaxPluvi] = useState("");
    const [minPluvi, setMinPluvi] = useState("");


    // Validar e formatar Latitude e Longitude
    const validateCoordinates = (latitude: string, longitude: string): { formattedLat: string, formattedLon: string } | null => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (isNaN(lat) || lat < -90 || lat > 90) {
        console.error("Latitude inválida. Valor deve estar entre -90 e 90.");
        return null;
    }

    if (isNaN(lon) || lon < -180 || lon > 180) {
        console.error("Longitude inválida. Valor deve estar entre -180 e 180.");
        return null;
    }

    const formattedLat = lat.toFixed(6);
    const formattedLon = lon.toFixed(6);

    return { formattedLat, formattedLon };
};



    const handleSubmit = async () => {
        if (!latitude || !longitude || !nome_cultivo || !maxTemp || !minTemp || !maxPluvi || !minPluvi) {
            Alert.alert("Error", "Favor preencher todos os campos!");
            return;
        }

        const formattedCoordinates = validateCoordinates(latitude, longitude);
        if (!formattedCoordinates) {
            Alert.alert("Error", "As coordenadas fornecidas são inválidas.");
            return;
        }
    
        const data: Cultivo = {
            nome_cultivo: nome_cultivo,
            ponto_cultivo: { latitude: latitude, longitude: longitude },
            temperatura_max: parseFloat(maxTemp),
            temperatura_min: parseFloat(minTemp),
            pluviometria_max: parseFloat(maxPluvi),
            pluviometria_min: parseFloat(minPluvi),
            pluviometrias: [],
            temperaturas: [],
            alertasPluvi: [],
            alertasTemp: [],
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
                Alert.alert("Success", "Cadastro realizado com sucesso!");
                await fetchCultivos();
    
                setLatitude("");
                setLongitude("");
                setnome_cultivo("");
                setMaxTemp("");
                setMinTemp("");
                setMaxPluvi("");
                setMinPluvi("");
            } else {
                const error = await response.json();
                console.error('Error response:', error);
                Alert.alert("Error", error.message || "Ocorreu um erro ao submeter o formulário.");
            }
        } catch (error) {
            console.error('Fetch error:', error);
            Alert.alert("Error", "Não foi possível conectar com o backend.");
        }
    };
    

    return (
        <ScrollView 
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            <Text style={styles.title}>Cadastro de Monitoramento</Text>
            <Text style={styles.subtitle}>Ponto de Monitoramento</Text>
            
            <Text style={styles.label}>Local</Text>
            <TextInput
                style={styles.input}
                placeholder="Latitude (ex: '-23.5505')"
                value={latitude}
                onChangeText={setLatitude}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Longitude (ex: '-46.5505')"
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

export default Cadastro;

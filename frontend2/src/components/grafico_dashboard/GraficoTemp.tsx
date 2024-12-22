import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Temperatura } from '../../@types/culturaDto';
import { Alert } from 'react-native';

const { width } = Dimensions.get('window');

const GraficoTemperaturas: React.FC<{ temperaturas: Temperatura[], temperatura_min: number, temperatura_max: number }> = ({ temperaturas, temperatura_min, temperatura_max }) => {
    const [offset, setOffset] = useState(0); // Paginação

    const start = Math.max(0, temperaturas.length - 7 - offset);
    const end = Math.max(0, temperaturas.length - offset);

    const temperaturasSlice = temperaturas.slice(start, end);

    const labels = temperaturasSlice.map((item) =>
        new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    );

    const temperaturasMedias = temperaturasSlice.map((item) => item.temperatura_media);
    const temperaturasMaximas = temperaturasSlice.map((item) => item.temperatura_max);
    const temperaturasMinimas = temperaturasSlice.map((item) => item.temperatura_min);
    const limiteMax = Array(labels.length).fill(temperatura_max);
    const limiteMin = Array(labels.length).fill(temperatura_min);

    const handleDataPointClick = (data: { index: number }) => {
        const index = data.index;
        const clickedTemperature = temperaturasSlice[index]?.temperatura_media;
        if (clickedTemperature !== undefined) {
            Alert.alert(
                'Temperatura Média',
                `Temperatura: ${clickedTemperature} °C`,
                [{ text: 'OK' }],
            );
        }
    };

    return (
        <View style={styles.container}>
            <LineChart
                data={{
                    labels,
                    datasets: [
                        { data: temperaturasMaximas, color: () => '#EBC531', strokeWidth: 2.5 },
                        { data: temperaturasMinimas, color: () => '#313CEB', strokeWidth: 2.5 },
                        { data: temperaturasMedias, color: () => '#31EB6C', strokeWidth: 2.5 },
                        { data: limiteMax, color: () => '#EB3531', strokeWidth: 1.5 },
                        { data: limiteMin, color: () => '#EB3531', strokeWidth: 1.5 },
                    ],
                    legend: ['Máxima', 'Mínima', 'Média', 'Limite'],
                }}
                width={width}
                height={500}
                chartConfig={{
                    backgroundGradientFrom: '#FFFFFF',
                    backgroundGradientTo: '#FFFFFF',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(1, 33, 105, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(1, 33, 105, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForLabels: { fontSize: 15 },
                    propsForVerticalLabels: { fontSize: 15 },
                    propsForDots: { r: '3', strokeWidth: '2', stroke: '#084d6e', fill: '#084d6e' },
                }}
                withVerticalLabels={true}
                withHorizontalLabels={true}
                bezier
                verticalLabelRotation={90}
                onDataPointClick={handleDataPointClick}
                style={styles.chart}
            />
            <View style={styles.buttons}>
                <Button
                    title="Anterior"
                    onPress={() => setOffset((prev) => Math.min(prev + 7, temperaturas.length - 7))}
                    disabled={offset >= temperaturas.length - 7}
                />
                <Button
                    title="Próximo"
                    onPress={() => setOffset((prev) => Math.max(prev - 7, 0))}
                    disabled={offset <= 0}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chart: {
        marginVertical: 0,
        borderRadius: 16,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: '80%',
    },
});

export default GraficoTemperaturas;
